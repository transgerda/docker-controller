# docker-controller

## Installation
This application can be installed like this. Make sure docker is correctly installed.
```bash
git clone https://github.com/transgerda/docker-controller.git
cd docker-controller
docker compose up -d
```

## Usage
- Add an x-api-key in your .env file which should be used to authenticate yourself for reasons. The api key should be passed in an header.
- To specify which container should be started/stopped you should put it in the body as "nameOrId". 
- Allowed contianers are mentioned in the docke compose file as an env variable.
- This controller uses port 3333 which could easily be modified in the server.js.

>[!IMPORTANT]
>The containers which are controller by this application should be started with `docker start {container}` and stopped with `docker stop {container}`. If used for example `docker compose down` then this application won't work correctly.

### Stopping a docker container
```bash
http://{host}:3333/stop
```

### Stopping a docker container
```bash
http://{host}:3333/stop
```

### Stopping the controller 
```bash
docker compose down
```

## Example request
```bash
curl -X POST http://{host}:3333/start \
  -H "Content-Type: application/json" \
  -H "x-api-key: {your-api-key}" \
  -d '{"nameOrId":"{container-name-or-id}"}'
```
