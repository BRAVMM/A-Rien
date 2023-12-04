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


#### API Apex Legends

```diff
- Get an Apex Legends player's profile stats (v2) Try it out
```
Retrieve career stats for an Apex Legends player.
```http
GET https://public-api.tracker.gg/v2/apex/standard/profile/{platform}/{platformUserIdentifier}
```
body
```json
{
  "platform": "origin",
  "platformUserIdentifier": "votre_identifiant"
}
```
Response:

```json
{
  "StatusCode": 200,
  "Description": "SUCCESS",
  "Response": "Stats for the requested Apex player."
}

```
<br> </br>
```diff
- Get a stats segment for an Apex Legends player
```

Retrieve a portion of the stats for an Apex Legends player. We divide stats into logical segments, such as playlists, seasons, heroes, etc.(whatever happens to be useful for a specific game.)
Refer to the full documentation for the complete list of available endpoints.

```http
GET https://public-api.tracker.gg/v2/apex/standard/profile/{platform}/{platformUserIdentifier}/segments/{segmentType}
```
body
```json
{
  "platform": "battlenet",
  "platformUserIdentifier": "votre_identifiant",
  "segmentType": "legend"
}

```
Response:
```json
{
  "Status Code": 200,
  "Description": "SUCCESS",
  "Response": "Stats for the requested Overwatch player.",
  "Data": "ApiResponse<Segment[]>"
}

```

## Examples of Requests

Here are some common request examples that you can make using the Tracker.gg API:

```http
GET https://public-api.tracker.gg/v2/apex/standard/profile/{platform}/{platformUserIdentifier}/segments/{segmentType}
GET https://public-api.tracker.gg/v2/apex/standard/profile/{platform}/{platformUserIdentifier}
