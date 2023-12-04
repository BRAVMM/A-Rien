# Tracker.gg API Documentation

Welcome to the Tracker.gg API documentation. This API allows you to access information about game statistics, leaderboards, and much more for many popular games.

## Table of Contents

1. [Introduction](#introduction)
2. [Authentication](#authentication)
3. [Endpoints](#endpoints)
4. [Examples of Requests](#examples-of-requests)
5. [Responses](#responses)
6. [Errors](#errors)
7. [Additional Resources](#additional-resources)

## Introduction

The Tracker.gg API provides a powerful way to access game data. Whether you want to retrieve a player's statistics, access leaderboards, get information about weapons, or any other type of game-related data, this API allows you to do so efficiently.

## Authentication

Step 1: Add the TRN-Api-Key Header

When you send an HTTP request to Tracker Network, you must prove that your application is a registered Tracker Network app. To do this, you need to configure your app to send a header with your app ID.

TRN-Api-Key header

Set your Tracker Network app ID as the value of this header. For example:

```http
TRN-Api-Key: XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
```

## Endpoints

The Tracker.gg API offers several endpoints for different functionalities. Here are some of the most commonly used endpoints:

- `/v1/player/{platform}/{username}`: Retrieve statistics for a specific player.
- `/v1/leaderboards/{game}`: Get leaderboards for a specific game.
- `/v1/weapons/{game}/{weapon}`: Access information about a specific weapon.

Refer to the full documentation for the complete list of available endpoints.

## Examples of Requests

Here are some common request examples that you can make using the Tracker.gg API:

```http
GET /v1/player/pc/username123
GET /v1/leaderboards/apex-legends
GET /v1/weapons/warzone/m16
