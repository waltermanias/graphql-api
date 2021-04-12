const { Promise } = require("bluebird");
const { splitArray } = require("../commons/helpers");
const sleep = require("util").promisify(setTimeout);

module.exports = ({
  leaguesApiService,
  teamsApiService,
  leaguesService,
  teamsService,
  playersService,
  jobsService,
  pubSubService,
}) => {
  const createLocalTeam = ({
    name,
    shortName,
    tla,
    area: { name: area },
    crestUrl: imageUrl,
    code,
    id: externalReference,
  }) =>
    teamsService.create({
      name,
      shortName,
      tla,
      area,
      imageUrl,
      code,
      externalReference,
    });

  const resolvePlayersToUpsert = ({ teamId: team, externalPlayers }) =>
    externalPlayers.map(
      ({
        name,
        id: externalReference,
        position,
        dateOfBirth,
        countryOfBirth,
        nationality,
      }) => ({
        name,
        externalReference,
        position,
        dateOfBirth,
        countryOfBirth,
        nationality,
        team,
      })
    );

  const resolvePlayersToDelete = ({ localPlayers, externalPlayers }) =>
    localPlayers
      .filter(
        (localPlayer) =>
          !externalPlayers.find(
            (externalPlayer) =>
              externalPlayer.id === localPlayer.externalReference
          )
      )
      .map(({ _id }) => _id);

  const importTeam = async (team) => {
    const externalTeam = await teamsApiService.getById(team.id);
    if (!externalTeam) throw new Error("The team was not found.");

    let localTeam = await teamsService.getByExternalReference(team.id);
    if (!localTeam) localTeam = await createLocalTeam(team);

    const localPlayers = await playersService.getByTeam(localTeam._id);
    const externalPlayers = externalTeam.squad.filter(
      (player) => player.role === "PLAYER"
    );

    const playersToUpsert = resolvePlayersToUpsert({
      teamId: localTeam._id,
      externalPlayers,
    });

    const playersToDelete = resolvePlayersToDelete({
      localPlayers,
      externalPlayers,
    });

    await Promise.map(playersToDelete, playersService.deleteById, {
      concurrency: 30,
    });
    await Promise.map(playersToUpsert, playersService.upsert, {
      concurrency: 30,
    });

    return localTeam;
  };

  const updateJob = async ({ jobId, status, additionalInfo }) => {
    const updatedJob = await jobsService.update(jobId, {
      status,
      additionalInfo,
    });

    pubSubService
      .publish({
        type: "JobStatusChanged",
        payload: {
          job: { _id: jobId },
          status,
          oldStatus: "WAITING",
        },
      })
      .catch((err) => {
        console.error(err.message);
      });

    return updatedJob;
  };

  const createLocalLeague = ({ name, area: { name: area }, code, teams }) =>
    leaguesService.create({
      name,
      area,
      code,
      teams,
    });

  const processJob = async ({ id: jobId, leagueCode }) => {
    let updatedJob = await updateJob({ jobId, status: "IN-PROGRESS" });

    let league = await leaguesService.getByCode(leagueCode);
    if (!league) {
      try {
        const externalLeague = await leaguesApiService.getByCode(leagueCode);
        if (!externalLeague) throw new Error("The league was not found.");

        const { teams } = await teamsApiService.getByLeagueCode(leagueCode);

        const chunks = splitArray(teams, 8);
        const processedChunks = await Promise.each(chunks, async (chunk) => {
          const importedTeams = await Promise.map(chunk, importTeam, {
            concurrency: 8,
          });
          await sleep(65000);
          return importedTeams;
        });

        const importedTeams = processedChunks.reduce(
          (acc, cur) => [...acc, ...cur],
          []
        );

        await createLocalLeague({
          ...externalLeague,
          teams: importedTeams.map(({ _id }) => _id),
        });

        updatedJob = await updateJob({ jobId, status: "COMPLETED" });
      } catch (err) {
        updatedJob = await updateJob({
          jobId,
          status: "FAILED",
          additionalInfo: err.message,
        });
      }
    } else {
      updatedJob = await updateJob({ jobId, status: "SKIPPED" });
    }

    return updatedJob;
  };

  return { processJob };
};
