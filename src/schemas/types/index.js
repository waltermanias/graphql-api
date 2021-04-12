const graphql = require("graphql");
const { DateTimeResolver, ObjectIDResolver } = require("graphql-scalars");

module.exports = (resolvers) => {
  const Player = new graphql.GraphQLObjectType({
    name: "Player",
    fields: {
      id: { type: new graphql.GraphQLNonNull(ObjectIDResolver) },
      name: { type: new graphql.GraphQLNonNull(graphql.GraphQLString) },
      position: { type: new graphql.GraphQLNonNull(graphql.GraphQLString) },
      dateOfBirth: { type: new graphql.GraphQLNonNull(DateTimeResolver) },
      countryOfBirth: {
        type: new graphql.GraphQLNonNull(graphql.GraphQLString),
      },
      nationality: { type: new graphql.GraphQLNonNull(graphql.GraphQLString) },
      externalReference: {
        type: new graphql.GraphQLNonNull(graphql.GraphQLInt),
      },
      createdAt: { type: new graphql.GraphQLNonNull(DateTimeResolver) },
      updatedAt: { type: new graphql.GraphQLNonNull(DateTimeResolver) },
    },
  });

  const Team = new graphql.GraphQLObjectType({
    name: "Team",
    fields: {
      id: { type: new graphql.GraphQLNonNull(ObjectIDResolver) },
      name: { type: graphql.GraphQLString },
      code: { type: graphql.GraphQLString },
      externalReference: {
        type: new graphql.GraphQLNonNull(graphql.GraphQLInt),
      },
      players: {
        type: new graphql.GraphQLNonNull(graphql.GraphQLList(Player)),
        resolve: ({ id }) => resolvers.players.getByTeam(id),
      },
      createdAt: { type: new graphql.GraphQLNonNull(DateTimeResolver) },
      updatedAt: { type: new graphql.GraphQLNonNull(DateTimeResolver) },
    },
  });

  const League = new graphql.GraphQLObjectType({
    name: "League",
    fields: {
      id: { type: new graphql.GraphQLNonNull(ObjectIDResolver) },
      name: { type: new graphql.GraphQLNonNull(graphql.GraphQLString) },
      area: { type: new graphql.GraphQLNonNull(graphql.GraphQLString) },
      code: { type: new graphql.GraphQLNonNull(graphql.GraphQLString) },
      externalReference: {
        type: new graphql.GraphQLNonNull(graphql.GraphQLInt),
      },
      teams: {
        type: new graphql.GraphQLNonNull(graphql.GraphQLList(Team)),
      },
      createdAt: { type: new graphql.GraphQLNonNull(DateTimeResolver) },
      updatedAt: { type: new graphql.GraphQLNonNull(DateTimeResolver) },
    },
  });

  const Job = new graphql.GraphQLObjectType({
    name: "Job",
    fields: {
      id: { type: new graphql.GraphQLNonNull(ObjectIDResolver) },
      leagueCode: { type: new graphql.GraphQLNonNull(graphql.GraphQLString) },
      status: { type: new graphql.GraphQLNonNull(graphql.GraphQLString) },
      createdAt: { type: new graphql.GraphQLNonNull(DateTimeResolver) },
      updatedAt: { type: new graphql.GraphQLNonNull(DateTimeResolver) },
    },
  });

  const InputCreateJob = new graphql.GraphQLInputObjectType({
    name: "InputCreateJob",
    fields: {
      leagueCode: { type: graphql.GraphQLNonNull(graphql.GraphQLString) },
    },
  });

  const InputLeagueFilter = new graphql.GraphQLInputObjectType({
    name: "InputLeagueFilter",
    fields: {
      code: { type: graphql.GraphQLNonNull(graphql.GraphQLString) },
    },
  });

  const LeagueFilter = new graphql.GraphQLInputObjectType({
    name: "LeagueFilter",
    fields: {
      code: { type: new graphql.GraphQLNonNull(graphql.GraphQLString) },
    },
  });

  const NameFilter = new graphql.GraphQLInputObjectType({
    name: "NameFilter",
    fields: {
      startsWith: { type: graphql.GraphQLString },
    },
  });

  const TeamFilter = new graphql.GraphQLInputObjectType({
    name: "TeamFilter",
    fields: {
      name: { type: NameFilter },
    },
  });

  const InputPlayerFilter = new graphql.GraphQLInputObjectType({
    name: "InputPlayerFilter",
    fields: {
      league: { type: LeagueFilter },
      name: { type: NameFilter },
      team: { type: TeamFilter },
    },
  });

  const InputTeamFilter = new graphql.GraphQLInputObjectType({
    name: "InputTeamFilter",
    fields: {
      team: { type: TeamFilter },
    },
  });

  return {
    Team,
    League,
    Job,
    Player,
    InputCreateJob,
    InputLeagueFilter,
    InputPlayerFilter,
    InputTeamFilter,
  };
};
