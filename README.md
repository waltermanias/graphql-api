# Football GraphQL API - Hope you enjoy it! :)

The goal of the API is to import football leagues from an external API. Therefore, you're able to query the available data with a GraphQL API.

## API Token

Please, visit [Football API](http://www.football-data.org/), signup there, and get a free token. You will need it in a while.

## Installation

### Running inside Docker containers

The project was prepared with Docker & Docker Compose to make your life easier.

#### Step 1: Make sure you have on your local computer Docker Engine & Docker Compose

You can check if you already have docker & docker compose executing the following commands.

```bash
docker --version
```

```bash
docker-compose --version
```

If some of the commands throw an error, you can follow the official documentation to install them.

[Docker Compose Installation](https://docs.docker.com/compose/install/)

#### Step 2: Generate the proper `.env`file.

To generate the `.env`you can execute the next command in the Terminal.

```bash
cp .env-template-docker .env
```

This command will generate a file called `.env` in your root directory. The only thing you have to do in that file is set the API token, so, your `.env` file will look like the following one:

```
PORT=3000
BATCH_PROCESS_ENDPOINT=http://batch:3000/webhooks
FOOTBALL_DATA_API_TOKEN=****<YOUR_TOKEN_HERE>****
DB_AUTH_DB=admin
DB_HOST=database
DB_PORT=27017
DB_NAME=football
DB_USERNAME=root
DB_PASSWORD=supersecret
```

#### Step 4: Run all containers

In order to up and running all containers, I attached a script into `package.json` file.

```bash
npm run docker
```

This command will read your `.env` file and execute the proper container images.

#### Services

- `api`: Service that hosts the GraphQL endpoint.
- `database`: Hosts the database. The service exposes port 27018 so you can use your preferred MongoDB client.
- `batch`: Handles all import processes.

### Running locally

#### Step 1: Install dependencies

```bash
npm install
```

#### Step 2: Generate the proper `.env` file

To generate the `.env`you can execute the next command in the Terminal.

```bash
cp .env-template-localhost .env
```

This command will generate a file called `.env` in your root directory. You will have to configure some things here. For instance, the database settings and the API token. So, your `.env` file will look like the following one:

```
PORT=3000
BATCH_PROCESS_ENDPOINT=http://localhost:3000/webhooks
FOOTBALL_DATA_API_TOKEN=****<YOUR_TOKEN_HERE>****
DB_AUTH_DB=****<YOUR_AUTH_DATABASE>****
DB_HOST=****<YOUR_DB_HOST>****
DB_PORT=27017
DB_NAME=football
DB_USERNAME=****<YOUR_DB_USERNAME>****
DB_PASSWORD=****<YOUR_DB_PASSWORD>****
```

#### Step 3: Run the API

```bash
npm start
```

Now, you can start playing with the API in your preferred browser.

### Seed data

Optionally, you can seed your database with some data either with script or a curl command.

```bash
npm run seed
```

You can run this script or just execute the request using some tool like Postman.

```bash
curl --location --request POST 'http://localhost:3000/seed'
```

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
    └── data
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
- `data`: Contains the route that helps you to seed your database.
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
