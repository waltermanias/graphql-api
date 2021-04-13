# Football GraphQL API - Hope you enjoy it! :)

The goal of the API is to import football leagues from an external API. Therefore, you're able to query the available data with a GraphQL API.

## API Token

Please, visit [Football API](http://www.football-data.org/), signup there, and get a free token. You will need it in a while.

## Installation

You'll need to install Docker and Docker Compose in order to run minimal services. You can follow the instructions in the below link:

[Docker Compose Installation](https://docs.docker.com/compose/install/).

You can run the next command to load the necessary services. IMPORTANT: Set the env variable with your personal token.

```bash
FOOTBALL_DATA_API_TOKEN=<YOUR_TOKEN_HERE> docker-compose -f "docker-compose.yml" up -d --build
```

That command will run 3 different services:

- `api`: Service that hosts the GraphQL endpoint.
- `database`: Hosts the database. The service exposes port 27018 so you can use your preferred MongoDB client.
- `batch`: Handles all import processes.

## Architecture

![architecture](https://github.com/waltermanias/graphql-api/blob/main/architecture.png?raw=true)

## Usage

Once the services are up and running, you can go to the browser:

```bash
http://localhost:3000/graphql
```

## Import data from external API

### Step 1

The data is requested asynchronously, so, you will have to create a job before all. After the job is created in the database, a message is triggered to a second service that will handle the import process.

```
mutation createJob($leagueCode: String!) {
  createJob(input: {leagueCode: $leagueCode}) {
    id
    leagueCode
    status
    createdAt
  }
}
```

Bellow, how data looks like:

```
{
  "data": {
    "createJob": {
      "id": "6074e411730afe00129ca90b",
      "leagueCode": "PL",
      "status": "WAITING",
      "createdAt": "2021-04-13T00:21:37.283Z"
    }
  }
}
```

The process takes around 3 minutes because the external API has a limited quota.

### Step 2

After the data is imported, you can play with the data.

I'm going to attach some examples:

### Get teams by name

```
query getTeamsByName($name: String!) {
  teams(input: {team: {name: {startsWith: $name}}}) {
    id
    name
    players {
      name
      position
      nationality
    }
  }
}

```

The data looks like this:

```
{
  "data": {
    "teams": [
      {
        "id": "6074e5bde257df0016798ab5",
        "name": "Arsenal FC",
        "players": [
          {
            "name": "Dani Ceballos",
            "position": "Midfielder",
            "nationality": "Spain"
          },
          {
            "name": "Thomas Partey",
            "position": "Midfielder",
            "nationality": "Ghana"
          },
          ...
        ]
      }
    ]
  }
}
```

### Get league by code

```
query getLeaguesByCode($code: String!) {
  leagues(input: {code: $code}) {
    name
    area
    teams {
      name
    }
  }
}
```

The data looks like this:

```
{
  "data": {
    "leagues": [
      {
        "name": "Premier League",
        "area": "England",
        "teams": [
          {
            "name": "Arsenal FC"
          },
          {
            "name": "Aston Villa FC"
          },
          ...
        ]
      }
    ]
  }
}
```

### Get players by different filters:

```
query getPlayers($leagueCode: String!, $playerName: String!, $teamName: String!) {
  players(input: {league: {code: $leagueCode}, name: {startsWith: $playerName}, team: {name: {startsWith: $teamName}}}) {
    name
    position
    nationality
  }
}
```

```
{
  "data": {
    "players": [
      {
        "name": "Dani Ceballos",
        "position": "Midfielder",
        "nationality": "Spain"
      },
      ...
    ]
  }
}
```

## Project structure

The project structure is something like this:

```
app
└── config
└── src
    └── commons
    └── database
    └── importer
    └── models
    └── resolvers
    └── schemas
    └── services
    app.js
```

- `config`: You can config here different kinds of things.
- `commons`: Contains some helpers.
- `database`: Handles the database connection.
- `importer`: Contains all logic to import data from external API.
- `models`: Contains all mongoose models.
- `resolvers`: Contains all resolvers used by types.
- `schemas`: Contains all types, `rootQuery` and `rootMutation`.
- `services`: Contains all services to save data into the database and request the external API.

## Event-Sourcing

There is an example in the `PubSubService`, you can publish events after an action is performed. You can find an example after the job is created or after each state change in the job entity.

## Nice-to-Have Features

- Implement a logger library such as `winston` or `bunyan`.
- Implement some cache libraries such as `redis`.
- Create a new resource that handles subscriptions, so, you can add custom webhooks.
- Implement GitHub actions to deploy services to whatever cloud service.
- Implement some other middleware like cors, helmet, compress, etc.
- Protect the endpoint with a jwt token.

## Database decision

The database has been selected based on:

- Most of the actions are queries. We have only one mutation so far.
- The resources we're getting are JSON. So, it's easier to handle it with some NoSQL database.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
