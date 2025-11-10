# docker-controller

## Installation
```bash
git clone https://github.com/transgerda/docker-controller.git
docker compose up -d
```

## Usage
Add an x-api-key in your .env file which should be used to authenticate yourself for reasons. The api key should be passed in an header.
To specify which container should be started/stopped you should put it in the body as "nameOrId".

>[!IMPORTANT]
>The containers which are controller by this application should be started with `docker start {container}` and stopped with `docker stop {container}`. If used for example `docker compose down` then this application won't work correctly.

### Stopping a docker container
http://{ip}/stop

### Stopping a docker container
http://{ip}/stop

### Stopping the controller 
```bash
docker compose down
```
