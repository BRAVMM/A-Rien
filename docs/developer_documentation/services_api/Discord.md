# Discord API Documentation

Welcome to the Discord API documentation.
This API allows you to interact with the Discord platform.

## Table of Contents

- [Discord API Documentation](#discord-api-documentation)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Authentication](#authentication)
  - [Endpoints](#endpoints)
  - [Webhooks](#webhooks)
  - [Errors](#errors)
  - [Additional Resources](#additional-resources)

## Introduction

Discord's API is based around two core layers, a HTTPS/REST API for general operations, and persistent secure WebSocket based connection for sending and subscribing to real-time events.  
The most common use case of the Discord API will be providing a service, or access to a platform through the OAuth2 API.

## Authentication

Using OAuth 2.0, you can authenticate your application with Discord.  
To do this, you need to configure your app to send a header with your app ID.
[Discord Documentation](https://discord.com/developers/docs/reference#authentication)

## Endpoints

The Discord API offers several endpoints for different functionalities.
Base URL : `https://discord.com/api/v10`

[Discord Documentation](https://discord.com/developers/docs/reference#http-api)

## Webhooks

`https://discord.com/api/v10/webhooks/{webhook.id}/{webhook.token}`

[Discord Documentation](https://discord.com/developers/docs/resources/webhook)

## Errors

[Discord Documentation](https://discord.com/developers/docs/reference#error-messages)

## Additional Resources

- [Discord API Documentation](https://discord.com/developers/docs/intro)
- [Discord API Reference](https://discord.com/developers/docs/reference)
- [Discord API Js Implementation](https://github.com/discord/discord-interactions-js)
