# Developer documentation

Welcome to the developer documentation of the project.  
This documentation is intended for developers who want to contribute to the project.

## Getting started

### Prerequisites

- [Git](https://git-scm.com/)
- [Docker](https://www.docker.com/) (v20.10.7 or higher)
- [Docker Compose](https://docs.docker.com/compose/) (v1.29.2 or higher)

### Installation

1. Clone the repository

    ```bash
    git clone git@github.com:BRAVMM/A-Rien.git
    ```

2. Deploy the project localy using Docker Compose

    ```bash
    docker-compose up -d
    ```

3. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

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
