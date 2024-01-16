<!-- omit in toc -->
# Back documentation

<!-- omit in toc -->
## Table of contents

- [Introduction](#introduction)
- [Installation](#installation)
  - [Using Docker Compose](#using-docker-compose)
  - [Using Docker](#using-docker)
  - [Using Node.js](#using-nodejs)
- [API](#api)
  - [API Introduction](#api-introduction)
  - [Routes](#routes)
  - [Endpoints](#endpoints)
    - [Root](#root)
    - [User Management](#user-management)
    - [Area Operations](#area-operations)
    - [Services Information](#services-information)
    - [Spotify Integration](#spotify-integration)
    - [Discord Integration](#discord-integration)
    - [About Information](#about-information)

## Introduction

The back uses the [ExpressJs](https://expressjs.com/) framework.

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

## API

### API Introduction

This API provides various endpoints to manage user authentication, retrieve information about services, areas, actions, reactions, and OAuth IDs. It also allows interactions with Spotify services through token registration.

### Routes

| Method | Route                                       | Description                          |
| ------ | ------------------------------------------  | ------------------------------------ |
| GET    | /                                           | Hello World                          |
| POST   | /users/register                             | Create a user                        |
| POST   | /users/login                                | Login a user                         |
| POST   | /users/logout                               | Logout a user                        |
| GET    | /users/me                                   | Get the current user                 |
| GET    | /area/getActionsFromServiceId/:serviceId    | Get the actions from a service id    |
| GET    | /area/getReactionsFromActionId/:actionId    | Get the reactions from an action id  |
| GET    | /area/getServices                           | Get all the services                 |
| GET    | /area/getOauthIdsFromServiceId/:serviceId   | Get the oauth ids from a service id  |
| GET    | /area/getOauthIdsFromActionId/:actionId     | Get the oauth ids from an action id  |
| GET    | /area/getOauthIdsFromReactionId/:reactionId | Get the oauth ids from a reaction id |
| POST   | /area/storeArea                             | Store an area                        |
| POST   | /services/spotify/registerToken             | Register a Spotify token             |
| POST   | /services/discord/registerToken             | Register a Discord token             |
| GET    | /about.json                                 | Get the about.json file              |

### Endpoints

#### Root

- **Root**
  - **Method**: GET
  - **Route**: `/`
  - **Description**: A simple Hello World endpoint.
  - **Example**:

    ```http
    GET /
    ```

#### User Management

- **Register User**
  - **Method**: POST
  - **Route**: `/users/register`
  - **Description**: Create a new user.
  - **Token Requirement**: No
  - **Example**:

    ```http
    POST /users/register
    Request Body:
    {
      "username": "example_user",
      "password": "example_password"
    }
    ```

- **Login User**
  - **Method**: POST
  - **Route**: `/users/login`
  - **Description**: Login an existing user.
  - **Token Requirement**: No
  - **Example**:

    ```http
    POST /users/login
    Request Body:
    {
      "username": "example_user",
      "password": "example_password"
    }
    ```

- **Logout User**
  - **Method**: POST
  - **Route**: `/users/logout`
  - **Description**: Logout the currently logged-in user.
  - **Token Requirement**: Yes
  - **Example**:

    ```http
    POST /users/logout
    Headers:
    {
      "Content-Type": "application/json",
      "Authorization": "Bearer token"
    }
    ```

- **Get Current User**
  - **Method**: GET
  - **Route**: `/users/me`
  - **Description**: Retrieve details of the current user.
  - **Token Requirement**: Yes
  - **Example**:

    ```http
    GET /users/me
    Headers:
    {
      "Content-Type": "application/json",
      "Authorization": "Bearer token"
    }
    ```

#### Area Operations

- **Store Area**
  - **Method**: POST
  - **Route**: `/area/storeArea`
  - **Description**: Store an area.
  - **Token Requirement**: Yes
  - **Example**:

    ```http
    POST /area/storeArea
    Headers:
    {
      "Content-Type": "application/json",
      "Authorization": "Bearer token"
    }
    Request Body:
    {
      "name": "example_area",
      "description": "Example area description"
    }
    ```

#### Services Information

For endpoints requiring tokens, I'll include the necessary header:

- **Get All Services**
  - **Method**: GET
  - **Route**: `/area/getServices`
  - **Description**: Retrieve information about all available services.
  - **Token Requirement**: Yes
  - **Example**:

    ```http
    GET /area/getServices
    ```

- **Get Actions by Service ID**
  - **Method**: GET
  - **Route**: `/area/getActionsFromServiceId/:serviceId`
  - **Description**: Retrieve actions associated with a specific service.
  - **Token Requirement**: Yes
  - **Example**:

    ```http
    GET /area/getActionsFromServiceId/123456
    Headers:
    {
      "Content-Type": "application/json",
      "Authorization": "Bearer token"
    }
    ```

- **Get Reactions by Action ID**
  - **Method**: GET
  - **Route**: `/area/getReactionsFromActionId/:actionId`
  - **Description**: Retrieve reactions associated with a specific action.
  - **Token Requirement**: Yes
  - **Example**:

    ```http
    GET /area/getReactionsFromActionId/987654
    Headers:
    {
      "Content-Type": "application/json",
      "Authorization": "Bearer token"
    }
    ```

- **Get OAuth IDs by Service ID**
  - **Method**: GET
  - **Route**: `/area/getOauthIdsFromServiceId/:serviceId`
  - **Description**: Retrieve OAuth IDs associated with a specific service.
  - **Token Requirement**: Yes
  - **Example**:

    ```http
    GET /area/getOauthIdsFromServiceId/123456
    Headers:
    {
      "Content-Type": "application/json",
      "Authorization": "Bearer token"
    }
    ```

- **Get OAuth IDs by Action ID**
  - **Method**: GET
  - **Route**: `/area/getOauthIdsFromActionId/:actionId`
  - **Description**: Retrieve OAuth IDs associated with a specific action.
  - **Token Requirement**: Yes
  - **Example**:

    ```http
    GET /area/getOauthIdsFromActionId/987654
    Headers:
    {
      "Content-Type": "application/json",
      "Authorization": "Bearer token"
    }
    ```

- **Get OAuth IDs by Reaction ID**
  - **Method**: GET
  - **Route**: `/area/getOauthIdsFromReactionId/:reactionId`
  - **Description**: Retrieve OAuth IDs associated with a specific reaction.
  - **Token Requirement**: Yes
  - **Example**:

    ```http
    GET /area/getOauthIdsFromReactionId/567890
    Headers:
    {
      "Content-Type": "application/json",
      "Authorization": "Bearer token"
    }
    ```

#### Spotify Integration

- **Register Spotify Token**
  - **Method**: POST
  - **Route**: `/services/spotify/registerToken`
  - **Description**: Register a Spotify access token.
  - **Token Requirement**: Yes
  - **Example**:

    ```http
    POST /services/spotify/registerToken
    Headers:
    {
      "Content-Type": "application/json",
      "Authorization": "Bearer token"
    }
    Request Body:
    {
      "code" : "spotify_code",
      "mobile": false,
    }
    ```

#### Discord Integration

- **Register Discord Token**
  - **Method**: POST
  - **Route**: `/services/discord/registerToken`
  - **Description**: Register a Discord access token.
  - **Token Requirement**: Yes
  - **Example**:

    ```http
    POST /services/discord/registerToken
    Headers:
    {
      "Content-Type": "application/json",
      "Authorization": "Bearer token"
    }
    Request Body:
    {
      "code": "discord_code",
      "guildId": "discord_guild_id",
      "mobile": false,
    }
    ```

#### About Information

- **Get about.json**
  - **Method**: GET
  - **Route**: `/about.json`
  - **Description**: Retrieve information from the about.json file.
  - **Token Requirement**: Yes
  - **Example**:

    ```http
    GET /about.json
    ```
