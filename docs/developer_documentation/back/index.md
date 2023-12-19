<!-- omit in toc -->
# Back documentation

<!-- omit in toc -->
## Table of contents

- [Introduction](#introduction)
- [Installation](#installation)
  - [Using Docker Compose](#using-docker-compose)
  - [Using Docker](#using-docker)
  - [Using Node.js](#using-nodejs)

## Introduction

The back uses the [NestJS](https://nestjs.com/) framework.

## Installation

First, you need to define the environment variables.  
To do this, create a `.env` file in the `/back` directory.  
Then, fill in the following variables:

```bash
# .env

# Port on which the server will listen
PORT="8080"
# Database host
DB_HOST="127.0.0.1"
# Database user
DB_USER="user"
# Database password
DB_PASS="password"
# Database name
DB_NAME="database"
# Database port
DB_PORT="5432"
# JWT secret
JWT_SECRET="jwt_secret"
# Crypto secret
CRYPTO_SECRET="crypto_secret"
# Crypto algorithm
CRYPTO_ALGO="aes-..."
# Crypto iv
SALT_ROUNDS=10
# JWT token expiration
JWT_TOKEN_EXPIRATION="1h"
# Interval between each service check
INTERVAL=60000
```

### Using Docker Compose

This is the easiest way to run the project.  
Go at the root of the project and run the following command:

```bash
docker-compose up --build
```

### Using Docker

First, you need to build the Docker image.

```bash
docker build -t a-rien/back .
```

Then, you can run the Docker image.

```bash
docker run -d -p 8080:8080 --env-file .env a-rien/back
```

### Using Node.js

First, you need to install the dependencies.

```bash
npm install
```

Then, you can run the project.

```bash
npm run start
```
