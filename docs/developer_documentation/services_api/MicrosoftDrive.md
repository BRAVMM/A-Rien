# OneDrive API

Welcome to the OneDrive API documentation. This API allows you to interact with the OneDrive platform to store, manage, and share files and folders.

## Table of Contents

- [OneDrive API](#onedrive-api)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Authentication](#authentication)
  - [Endpoints](#endpoints)
  - [Errors](#errors)
  - [Additional Resources](#additional-resources)

## Introduction

The OneDrive API offers functionalities to manage files, folders, and documents stored in OneDrive. It uses an HTTPS/REST architecture for common operations and provides endpoints to perform operations such as retrieving, adding, modifying, and deleting files.

## Authentication

Authentication with OneDrive is done via Microsoft Graph using OAuth 2.0.

[OneDrive Documentation](https://docs.microsoft.com/en-us/onedrive/dev/rest-api/)

The authentication process involves the following steps:

- Your application specifies the required permissions.
- User consent is obtained for your application to access OneDrive data.
- Access tokens are exchanged after user authorization, allowing API requests on behalf of the user.

For complete details, refer to the [official documentation](https://docs.microsoft.com/en-us/onedrive/dev/rest-api/).

## Endpoints

The OneDrive API offers multiple endpoints for different functionalities.
Base URL: `https://graph.microsoft.com/v1.0`

[OneDrive Documentation](https://docs.microsoft.com/en-us/onedrive/dev/rest-api/)

## Errors

[OneDrive Documentation](https://docs.microsoft.com/en-us/onedrive/dev/rest-api/error-codes)

## Additional Resources

- [OneDrive API Documentation](https://docs.microsoft.com/en-us/onedrive/)
- [OneDrive API Reference](https://docs.microsoft.com/en-us/onedrive/dev/rest-api/reference/)
