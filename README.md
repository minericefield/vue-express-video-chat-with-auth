# vue-express-videoChat-withAuth

Learning theme of express.

## Development

#### Build
- Make your account and create a project from [agora](https://www.agora.io).
- Get the appId from it.
- Rename `/client/src/agora.config.sample.ts` to `agora.config.ts` and set the appId.
- Build or run the container
  - `$ docker-compose -f docker-compose.dev.yml --env-file=.env.dev up -d --build`
  - `$ docker-compose -f docker-compose.dev.yml --env-file=.env.dev up -d`
- Server progress would take a quite some time.   
  Make sure to see the logs.
  - `$ docker-compose -f docker-compose.dev.yml logs -f server`   
  It would be ready when the `!!! Server listening on port 3000 !!!` is shown.

#### Activate an account
- Access to `http://localhost:3000/register` and register an account.
- Access to `http://localhost:8025`
- Verify an account from the link in the email.

## Features
- Video chat communication with multiple people.
- Display the list of active channels that can be joined.

## Cores
- Vue3
- Composition api
- express
- socket.io
- agora
