# Developer documentation

Welcome to the developer documentation of the A-RIEN project.  
This documentation is intended for developers who want to contribute to the project.  
  
If you are a new contributor, you should start by reading the [getting started](#getting-started) section.  
If you need some precise information, see the following sections :  

- [back](back/index.md)
- [db](db/index.md)
- [front](front/index.md)
- [mobile](mobile/index.md)
- [services_api](services_api/index.md)

## Getting started

### Before you begin

Before you begin, you should have a basic understanding of the following:

- Take a look at the [contributing guidelines](../CONTRIBUTING.md) to understand how to contribute to the project.
- Take a look at the [code of conduct](../CODE_OF_CONDUCT.md) to understand how to behave in the project.
- Take a look at the [project structure](#project-structure) to understand how the project is organized.

### Prerequisites

- [Git](https://git-scm.com/)
- [Docker](https://www.docker.com/) (v20.10.7 or higher)
- [Docker Compose](https://docs.docker.com/compose/) (v1.29.2 or higher)

### Installation

1. Clone the repository

    ```bash
    git clone git@github.com:BRAVMM/A-Rien.git
    ```

2. Move to the project directory

    ```bash
    cd A-Rien
    ```

3. Deploy the project locally using Docker Compose

    ```bash
    docker-compose up --build
    ```

### Usage

Access the application via the address: [http://localhost:3000](http://localhost:3000)

Access the API via the address: [http://localhost:8080](http://localhost:8080)

Access the mobile application via expo on your phone or via the address: [http://localhost:19002](http://localhost:19002)

## Learn more

### Project structure

The project is structured as follows:

```bash
docker-compose.yml
├── back
│   ├── Dockerfile
│   ├── package.json
│   ├── .env
│   ├── src/
├── db
│   ├── Dockerfile
│   ├── CreateDB.sql
├── front
│   ├── Dockerfile
│   ├── package.json
│   ├── .env.development
│   ├── app/
├── mobile
│   ├── Dockerfile
│   ├── package.json
│   ├── app/
```

### Interactions

The following diagram shows the interactions between the different parts of the project:

```txt
   +------------+                              +----------+
   |    Front   | <---+          +-----------> |    DB    |
   +------------+     |          |             +----------+
                      |     +----------+
                      +---> |   BACK   |
                      |     +----------+
   +------------+     |          |             +----------+
   |   Mobile   | <---+          +-----------> | EXT API  |
   +------------+                              +----------+
```

The front and mobile communicate with the back via the API.
Depending on the request, the back will communicate with the database.

To update the services, the back communicates with the external services API.
