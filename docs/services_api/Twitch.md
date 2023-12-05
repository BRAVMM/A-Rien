# Twitch API Documentation

Welcome to the Twitch API documentation.
This API allows you to interact with Twitch data in your own application.

## Table of Contents

- [Twitch API Documentation](#twitch-api-documentation)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Authentication](#authentication)
    - [Register the app](#register-the-app)
    - [Get the user to authorize our app](#get-the-user-to-authorize-our-app)
    - [Use the authorization code to get a token](#use-the-authorization-code-to-get-a-token)
  - [Webhooks](#webhooks)
    - [List of request headers](#list-of-request-headers)
    - [Example of implementation](#example-of-implementation)
    - [More information](#more-information)
  - [Endpoints](#endpoints)
    - [Example](#example)
      - [Request](#request)
      - [Response](#response)
  - [Additional Resources](#additional-resources)

## Introduction

The Twitch API provides the tools and data used to develop Twitch integrations. The data models and systems are designed to provide relevant data in an easy, consistent, and reliable way. For the full list of endpoints that you can use in your integration, explore the Twitch API Reference.
The Twitch API uses OAuth 2.0 for authentication.

## Authentication

Twitch APIs use OAuth 2.0 access tokens to access resources.  
The Twitch APIs use two types of access tokens: user access tokens and app access tokens.  
In our case, we will use the authorization code grant flow.  
This flow is meant for apps that use a server, can securely store a client secret, and can make server-to-server requests to the Twitch API.  
To get a user access token using the authorization code grant flow, our app must Get the user to authorize our app and then Use the authorization code to get a token.

[Twitch Documentation](https://dev.twitch.tv/docs/authentication/getting-tokens-oauth/#authorization-code-grant-flow)

### Register the app

`https://dev.twitch.tv/docs/authentication/register-app/`

### Get the user to authorize our app

To get the authorization, in your web browser control, navigate the user to `https://id.twitch.tv/oauth2/authorize`.  
Specify the following query parameters as appropriate for your application.

| Parameter | Required? | Type | Description |
| --------- | --------- | ---- | ----------- |
| client_id | Yes | String | The app’s registered client ID. |
| force_verify | No | Boolean | Set to true to force the user to re-authorize your app’s access to their resources. The default is false. |
| redirect_uri | Yes | URI | Your app’s registered redirect URI. The authorization code is sent to this URI. |
| response_type | Yes | String | Must be code. |
| scope | Yes | String | A space-delimited list of scopes. The APIs that you’re calling will identify the scopes you must list. You must URL encode the list. |
| state | No | String | Although optional, you are strongly encouraged to pass a state string to help prevent Cross-Site Request Forgery (CSRF) attacks. The server returns this string to you in your redirect URI (see the state parameter in the fragment portion of the URI). If this string doesn’t match the state string that you passed, ignore the response. The state string should be randomly generated and unique for each OAuth request. |

Here is an exemple of a request :

```http
https://id.twitch.tv/oauth2/authorize
    ?response_type=code
    &client_id=hof5gwx0su6owfnys0nyan9c87zr6t
    &redirect_uri=http://localhost:3000
    &scope=channel%3Amanage%3Apolls+channel%3Aread%3Apolls
    &state=c3ab8aa609ea11e793ae92361f002671
```

If the user authorized your app by clicking Authorize, the server sends the authorization code to your redirect URI (see the code query parameter):

```http
http://localhost:3000/
    ?code=gulfwdmys5lsm6qyz4xiz9q32l10
    &scope=channel%3Amanage%3Apolls+channel%3Aread%3Apolls
    &state=c3ab8aa609ea11e793ae92361f002671
```

If the user didn’t authorize your app, the server sends the error code and description to your redirect URI (see the error and error_description query parameters):

```http
http://localhost:3000/
    ?error=access_denied
    &error_description=The+user+denied+you+access
    &state=c3ab8aa609ea11e793ae92361f002671
```

### Use the authorization code to get a token

The second step in this flow is to use the authorization code (see above) to get an access token and refresh token.

To get the tokens, send an HTTP POST request to `https://id.twitch.tv/oauth2/token`.  
Set the following x-www-form-urlencoded parameters in the body of the POST.

| Parameter | Required? | Type | Description |
| --- | --- | --- | --- |
| client_id | Yes | String | Your app’s [registered](/docs/authentication/register-app) client ID. |
| client_secret | Yes | String | Your app’s registered client secret. |
| code | Yes | String | The code that the `/authorize` response returned in the _code_ query parameter. |
| grant_type | Yes | String | Must be set to `authorization_code`. |
| redirect_uri | Yes | URI | Your app’s registered redirect URI. |

The following example shows the parameters in the body of the POST (the parameters are formatted for easier reading).

```http
client_id=hof5gwx0su6owfnys0yan9c87zr6t
    &client_secret=41vpdji4e9gif29md0ouet6fktd2
    &code=gulfwdmys5lsm6qyz4xiz9q32l10
    &grant_type=authorization_code
    &redirect_uri=http://localhost:3000
```

If the request succeeds, it returns an access token and refresh token.

```json
{
  "access_token": "rfx2uswqe8l4g1mkagrvg5tv0ks3",
  "expires_in": 14124,
  "refresh_token": "5b93chm6hdve3mycz05zfzatkfdenfspp1h1ar2xxdalen01",
  "scope": [
    "channel:moderate",
    "chat:edit",
    "chat:read"
  ],
  "token_type": "bearer"
}
```

When the access token expires, use the refresh token to get a new access token. For information about using refresh tokens, see Refreshing Access Tokens.

## Webhooks

[Twitch Webhooks Dcoumentation](https://dev.twitch.tv/docs/eventsub/handling-webhook-events/)

Before subscribing to events, you must create a callback that listens for events. Your callback must use SSL and listen on port 443.  

The following table lists the types of notifications your handler must process. The Twitch-Eventsub-Message-Type request header contains the notification’s type.

| Notification Type | Description |
| --- | --- |
| notification | Contains the event’s data. |
| webhook\_callback\_verification | Contains the challenge used to prove that you own the event handler. This is the first event you’ll receive after subscribing to an event. |
| revocation | Contains the reason why Twitch revoked your subscription. |

You must respond to notification requests within a few seconds. If your server takes too long to respond, the request will time out. If you fail to respond quickly enough too many times, the subscription’s status changes to notification_failures_exceeded and Twitch revokes the subscription. If your server can’t process a notification request quickly enough, consider writing the event to temporary storage and processing the notification after responding with 2XX.

### List of request headers

| Header | Description |
| --- | --- |
| Twitch-Eventsub-Message-Id | An ID that uniquely identifies this message. This is an opaque ID, and is not required to be in any particular format. |
| Twitch-Eventsub-Message-Retry | Twitch sends you a notification at least once. If Twitch is unsure of whether you received a notification, it’ll resend the event, which means you may receive a notification twice. |
| Twitch-Eventsub-Message-Type | The type of notification. Possible values are:  notification — Contains the event's data. See [Processing an event](https://dev.twitch.tv/docs/eventsub/handling-webhook-events/#processing-an-event). webhook\_callback\_verification — Contains the challenge used to verify that you own the event handler. See [Responding to a challenge request](https://dev.twitch.tv/docs/eventsub/handling-webhook-events/#responding-to-a-challenge-request).revocation — Contains the reason why Twitch revoked your subscription. See [Revoking your subscription](https://dev.twitch.tv/docs/eventsub/handling-webhook-events/#revoking-your-subscription). |
| Twitch-Eventsub-Message-Signature | The HMAC signature that you use to verify that Twitch sent the message. See [Verifying the event message](https://dev.twitch.tv/docs/eventsub/handling-webhook-events/#verifying-the-event-message). |
| Twitch-Eventsub-Message-Timestamp | The UTC date and time (in RFC3339 format) that Twitch sent the notification. |
| Twitch-Eventsub-Subscription-Type | The subscription type you subscribed to. For example, **channel.follow**. |
| Twitch-Eventsub-Subscription-Version | The version number that identifies the definition of the subscription request. This version matches the version number that you specified in your subscription request. |

### Example of implementation

From the [Twitch Documentation](https://dev.twitch.tv/docs/eventsub/handling-webhook-events/#simple-nodejs-example)

```js
const crypto = require('crypto')
const express = require('express');
const app = express();
const port = 8080;
    
// Notification request headers
const TWITCH_MESSAGE_ID = 'Twitch-Eventsub-Message-Id'.toLowerCase();
const TWITCH_MESSAGE_TIMESTAMP = 'Twitch-Eventsub-Message-Timestamp'.toLowerCase();
const TWITCH_MESSAGE_SIGNATURE = 'Twitch-Eventsub-Message-Signature'.toLowerCase();
const MESSAGE_TYPE = 'Twitch-Eventsub-Message-Type'.toLowerCase();

// Notification message types
const MESSAGE_TYPE_VERIFICATION = 'webhook_callback_verification';
const MESSAGE_TYPE_NOTIFICATION = 'notification';
const MESSAGE_TYPE_REVOCATION = 'revocation';

// Prepend this string to the HMAC that's created from the message
const HMAC_PREFIX = 'sha256=';

app.use(express.raw({          // Need raw message body for signature verification
    type: 'application/json'
}))  


app.post('/eventsub', (req, res) => {
    let secret = getSecret();
    let message = getHmacMessage(req);
    let hmac = HMAC_PREFIX + getHmac(secret, message);  // Signature to compare

    if (true === verifyMessage(hmac, req.headers[TWITCH_MESSAGE_SIGNATURE])) {
        console.log("signatures match");

        // Get JSON object from body, so you can process the message.
        let notification = JSON.parse(req.body);
        
        if (MESSAGE_TYPE_NOTIFICATION === req.headers[MESSAGE_TYPE]) {
            // TODO: Do something with the event's data.

            console.log(`Event type: ${notification.subscription.type}`);
            console.log(JSON.stringify(notification.event, null, 4));
            
            res.sendStatus(204);
        }
        else if (MESSAGE_TYPE_VERIFICATION === req.headers[MESSAGE_TYPE]) {
            res.set('Content-Type', 'text/plain').status(200).send(notification.challenge);
        }
        else if (MESSAGE_TYPE_REVOCATION === req.headers[MESSAGE_TYPE]) {
            res.sendStatus(204);

            console.log(`${notification.subscription.type} notifications revoked!`);
            console.log(`reason: ${notification.subscription.status}`);
            console.log(`condition: ${JSON.stringify(notification.subscription.condition, null, 4)}`);
        }
        else {
            res.sendStatus(204);
            console.log(`Unknown message type: ${req.headers[MESSAGE_TYPE]}`);
        }
    }
    else {
        console.log('403');    // Signatures didn't match.
        res.sendStatus(403);
    }
})
  
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})


function getSecret() {
    // TODO: Get secret from secure storage. This is the secret you pass 
    // when you subscribed to the event.
    return 'your secret goes here';
}

// Build the message used to get the HMAC.
function getHmacMessage(request) {
    return (request.headers[TWITCH_MESSAGE_ID] + 
        request.headers[TWITCH_MESSAGE_TIMESTAMP] + 
        request.body);
}

// Get the HMAC.
function getHmac(secret, message) {
    return crypto.createHmac('sha256', secret)
    .update(message)
    .digest('hex');
}

// Verify whether our hash matches the hash that Twitch passed in the header.
function verifyMessage(hmac, verifySignature) {
    return crypto.timingSafeEqual(Buffer.from(hmac), Buffer.from(verifySignature));
}
```

### More information

- [Twitch Documentation Verifying events](https://dev.twitch.tv/docs/eventsub/handling-webhook-events/#verifying-the-event-message)
- [Twitch Documentation Processing Events](https://dev.twitch.tv/docs/eventsub/handling-webhook-events/#processing-an-event)
- [Twitch Documentation Responding Challenge Request](https://dev.twitch.tv/docs/eventsub/handling-webhook-events/#responding-to-a-challenge-request)
- [Twitch Documentation Revoking Subscription](https://dev.twitch.tv/docs/eventsub/handling-webhook-events/#revoking-your-subscription)
- [Twitch Documentation Subscription Format](https://dev.twitch.tv/docs/eventsub/manage-subscriptions/)
- [Twitch Documentation Subscription Types](https://dev.twitch.tv/docs/eventsub/eventsub-subscription-types/)

## Endpoints

See the [Twitch API Reference](https://dev.twitch.tv/docs/api/reference/) for more information.

### Example

Create a poll (see [Twitch API Reference](https://dev.twitch.tv/docs/api/reference/#create-poll) for more information)

#### Request

```http
curl -X POST 'https://api.twitch.tv/helix/polls' \
-H 'Authorization: Bearer cfabdegwdoklmawdzdo98xt2fo512y' \
-H 'Client-Id: uo6dggojyb8d6soh92zknwmi5ej1q2' \
-H 'Content-Type: application/json' \
-d '{
  "broadcaster_id":"141981764",
  "title":"Heads or Tails?",
  "choices":[{
    "title":"Heads"
  },
  {
    "title":"Tails"
  }],
  "channel_points_voting_enabled":true,
  "channel_points_per_vote":100,
  "duration":1800
}'
```

#### Response

```json
{
  "data": [
    {
      "id": "ed961efd-8a3f-4cf5-a9d0-e616c590cd2a",
      "broadcaster_id": "141981764",
      "broadcaster_name": "TwitchDev",
      "broadcaster_login": "twitchdev",
      "title": "Heads or Tails?",
      "choices": [
        {
          "id": "4c123012-1351-4f33-84b7-43856e7a0f47",
          "title": "Heads",
          "votes": 0,
          "channel_points_votes": 0,
          "bits_votes": 0
        },
        {
          "id": "279087e3-54a7-467e-bcd0-c1393fcea4f0",
          "title": "Tails",
          "votes": 0,
          "channel_points_votes": 0,
          "bits_votes": 0
        }
      ],
      "bits_voting_enabled": false,
      "bits_per_vote": 0,
      "channel_points_voting_enabled": true,
      "channel_points_per_vote": 100,
      "status": "ACTIVE",
      "duration": 1800,
      "started_at": "2021-03-19T06:08:33.871278372Z"
    }
  ]
}
```

## Additional Resources

- [Twitch API Documentation](https://dev.twitch.tv/docs/)
- [Twitch API Reference](https://dev.twitch.tv/docs/api/reference/)
