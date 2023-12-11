[dash]: https://developer.spotify.com/dashboard
[PKCE]: https://datatracker.ietf.org/doc/html/rfc7636#section-4.1
[spotify]: https://developer.spotify.com/documentation/web-api
[follow]: https://developer.spotify.com/documentation/web-api/reference/get-followed
[artistsAlbum]: https://developer.spotify.com/documentation/web-api/reference/get-an-artists-albums
[userTracks]: https://developer.spotify.com/documentation/web-api/reference/get-users-saved-tracks
[followRoute]: https://developer.spotify.com/documentation/web-api/reference/follow-artists-users
[playlistGet]: https://developer.spotify.com/documentation/web-api/reference/get-playlist
# Summary of Spotify Developer Documentation

## Authentication for Spotify Application
- **Objective**: Configure authentication to access user profile information via Spotify.
- **Method**: Use the Implicit OAuth 2.0 grant flow and the PKCE method (mobile).
- **Sample Application**: Spotify.

### Configuration Steps
1. **Application Registration**: Required for OAuth 2.0 authentication.
  - Register on the [Spotify Developer Dashboard][dash].
  - Create a new app and get the client secret and ID in the app settings.

2. **Generate token with OAuth 2.0**
   - Using the OAuth 2.0 grant flow will be used on PC.

- To do so, we need to create a route using a redirection to spotify OAuth :
```js
var client_id = 'CLIENT_ID';
var redirect_uri = 'YOUR_URI';

var app = express();

app.get('/login', function(req, res) {

  var state = generateRandomString(16);
  var scope = 'user-read-private user-read-email';

  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      state: state
    }));
});
```

  - Then we need to request.post with some auth options :

```js
var authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: req.query.code,
        redirect_uri: [YourRedirectURI],
        grant_type: 'authorization_code'
      },
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        Authorization: 'Basic ' + (new Buffer.from([YourClientID] + ':' + [YourClientSecret]).toString('base64'))
      },
      json: true
    };
```
  - And get the token from the body :
```js
request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {

        var access_token = body.access_token,
        refresh_token = body.refresh_token;

        // we can also pass the token to the browser to make requests from there
        res.redirect('/#' +
          querystring.stringify({
            access_token: access_token,
            refresh_token: refresh_token
          }));
      } else {
        res.redirect('/#' +
          querystring.stringify({
            error: 'invalid_token'
          }));
      }
    });
```

You can see all spotify documention [here][spotify].


## Requests that should be interesting
- Get a new release based on your artists :
    - [/me/following][follow]
    - [/artists/{id}/albums][artistsAlbum]

- Get the new music liked :
    - [/me/tracks][userTracks]

- Get information about a playlist :
    - [/playlists/{playlist_id}][playlistGet]
