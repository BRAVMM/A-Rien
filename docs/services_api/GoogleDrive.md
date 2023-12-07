# GoogleDrive Api

Welcome to the GoogleDrive API documentation.
This API allows you to interact with the GoogleDrive platform.

## Table of Contents

- [GoogleDrive Api](#googledrive-api)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Authentication](#authentication)
  - [Endpoints](#endpoints)
  - [Errors](#errors)
  - [Additional Resources](#additional-resources)

## Introduction

GoogleDrive's API is based around two core layers, a HTTPS/REST API for general operations, and persistent secure WebSocket based connection for sending and subscribing to real-time events.
The most common use case of the GoogleDrive API will be providing a service, or access to a platform through the OAuth2 API.

## Authentication

Using OAuth 2.0, you can authenticate your application with GoogleDrive.

[GoogleDrive Documentation](https://developers.google.com/identity/protocols/oauth2/web-server)

The list below quickly summarizes these steps:

- Your application identifies the permissions it needs.
- Your application redirects the user to Google along with the list of requested permissions.
- The user decides whether to grant the permissions to your application.
- Your application finds out what the user decided.
- If the user granted the requested permissions, your application retrieves tokens needed to make API requests on the user's behalf.

More details on the [Official Documentation](https://developers.google.com/identity/protocols/oauth2/web-server#obtainingaccesstokens)

## Endpoints

The GoogleDrive API offers several endpoints for different functionalities.
Base URL : `https://www.googleapis.com/drive/v3`

[GoogleDrive Documentation](https://developers.google.com/drive/api/reference/rest/v3)

## Errors

[GoogleDrive Documentation](https://developers.google.com/drive/api/v3/handle-errors)

## Additional Resources

- [GoogleDrive API Documentation](https://developers.google.com/drive/api/v3/about-sdk)
- [GoogleDrive API Reference](https://developers.google.com/drive/api/v3/reference)
