<!-- omit in toc -->
# Database documentation

<!-- omit in toc -->
## Table of contents

- [Introduction](#introduction)
- [Installation](#installation)
  - [Using Docker Compose](#using-docker-compose)
  - [Using Docker](#using-docker)
- [Database Diagram](#database-diagram)

## Introduction

The database is a PostgreSQL database.  
By default the database uses the port `5432`.  

## Installation

### Using Docker Compose

This is the easiest way to run the project.  
Go at the root of the project and run the following command:

```bash
docker-compose up --build
```

### Using Docker

First, you need to build the image:

```bash
docker build -t database .
```

Then, you can run the container:

```bash
docker run -d -p 5432:5432 database
```

## Database Diagram

> [!NOTE]  
> You can't see this diagram at this time due to github, if you want to see it go in your editor

```mermaid
classDiagram
    Services: id
    Services: Service Name
    Services: Actions IDs
    Services: Reactions IDs
    Actions: id
    Actions: Action Name
    Actions: Args
    Actions: Service IDs
    Reactions: id
    Reactions: Reaction Name
    Reactions: Args
    Reactions: Action IDs
    ActionsData: id
    ActionsData: Owner ID
    ActionsData: Data
    ActionsData: Raaction Datas IDs
    ReactionsData: id
    ReactionsData: Owner ID
    ReactionsData: Data
    ReactionsData: Action Datas IDs
    Services --|> Actions
    Services --|> Reactions
    Actions --|> ActionsData
    Reactions --|> ReactionsData
```
