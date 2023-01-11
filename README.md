# Yenum Api

Yenum api implementation built with Node, Express Typescript and MongoDb

## Table of Contents

-   [Technologies](#technologies)
-   [Getting Started](#getting-started)
    -   [Installation](#installation)
    -   [Usage](#usage)
    -   [Testing](#testing)
    -   [Documentation](#documentation)
    -   [Deployment](#deployment)
    -   [Limitations](#limitations)

## Technologies
-   [NodeJS](https://nodejs.org/) - Runtime Environment
-   [Express](https://expressjs.com/) - A Fast, unopinionated, minimalist web framework for Node.js
-   [MongoDb](https://www.mongodb.com/) - A document database used to build highly available and scalable internet applications.
-   [Mongoose](https://mongoosejs.com/) - A Node. js-based Object Data Modeling (ODM) library for MongoDB
-   [Npm](https://www.npmjs.com/) - Dependency Manager

## Getting Started

### Installation

-   git clone
    [Yenum Api](https://github.com/officialyenum/yenum-api.git)
-   Run `npm install` to install packages.
-   Docker or a local mongodb installation is required.
-   There is `docker-compose.yml` file for starting Docker, run `docker-compose up` to start the container.
-   Copy .env.example file, create a .env file if not created and edit database credentials there.
-   Run `npm run start` to run the application in production.-   
-   Run `npm run dev` to run the application in development mode.


### Usage

This is the basic flow of the application.
#### Games
- View all Games.
- can create a Game.
- can update a Game.
- can delete a Game.
#### Prayers
- Get The Daily Rosary Prayer Linked with Mystery for current day  (in development)
- Get The Holy Rosary Mysteries  (in development)
- Get The Catholic Prayers  (in development)

### Testing
-   Run `npm run test` to run the unit tests
-   Run `npm run test:e2e` to run the end to end tests (A '.env.testing' file is included in the project to connect to the in memory mongo server for tests).


### Documentation

-   Please click [here](https://documenter.getpostman.com/view/8719009/2s8Z76w9qx) to access the Postman Collection

### Deployment

This project is hosted on [heroku](https://heroku.com)

-   Please click [here](https://yenum-api.herokuapp.com/api) to access the hosted application
### Limitations
- Caching is not implemented
- Pagination is not implemented
- Testing is not implemented