# Microservices Architecture

Simple microservice [architecture](https://drive.google.com/file/d/1Gkxu3mlmp_DR4W0LpoU_Jtofd9rPJVjV/view?usp=sharing) using docker for containerization. Every back-end service uses it's own database, only redis is used across multiple services to simulate a pub/sub pattern. This is only for testing purposes and can be drastically improved.

## How to use
* First, clone the repository: `git clone https://github.com/ToniMititelu/MicroservicesArchitecture.git`
* From the root folder run `docker-compose up -d --build`
	* This will build the containers described in `docker-compose.yml` 
	* After it finishes building it will start the backend services and databases
	* You can find every `Dockerfile` for the backend service in it's folder (e.g. `server/listings-microservice/Dockerfile`)
* To start the frontend application go to `client` and run `npm run start`

## Technologies used
* docker and docker-compose
* nginx
* Python/Django and Node/Express.js for BE
* Angular for FE
* Socket.io for websockets (real-time chat)
* PostgreSQL, MongoDB for storage
* Redis for pub/sub 