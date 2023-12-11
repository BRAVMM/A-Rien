import { Request, Response } from 'express';
import QueryString from 'qs';
import dotenv from 'dotenv';
import * as crypto from 'crypto'
import request from 'request';

dotenv.config();

const stateKey : string = 'spotify_auth_state';

const generateRandomString = (length : number): string => {
    return crypto
        .randomBytes(60)
        .toString('hex')
        .slice(0, length);
}

const login = async (req: Request, res: Response): Promise<void> => {
    const state: string = generateRandomString(16);
    const scope: string = 'user-read-private user-read-email';

    res.redirect('https://accounts.spotify.com/authorize?' +
        QueryString.stringify({
            response_type: 'code',
            client_id: process.env.SPOTIFY_CLIENT_ID,
            scope: scope,
            redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
            state: state
    }));
}

const spotifyAuth = async (req: Request, res: Response): Promise<void> => {
    const code = req.query.code || null;
    const state = req.query.state || null;
    const storedState = req.cookies ? req.cookies[stateKey] : null;

    if (state === null || state !== storedState) {
        res.redirect('/#' +
          QueryString.stringify({
            error: 'state_mismatch'
          }));
    } else {
        res.clearCookie(stateKey);
        const authOptions = {
          url: 'https://accounts.spotify.com/api/token',
          form: {
            code: code,
            redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
            grant_type: 'authorization_code'
          },
          headers: {
            'content-type': 'application/x-www-form-urlencoded',
            Authorization: 'Basic ' + Buffer.from(process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_REDIRECT_URI).toString('base64')
          },
          json: true
        };

        request.post(authOptions, (error, response, body) => {
            if (!error && response.statusCode === 200) {
      
              var access_token = body.access_token,
                  refresh_token = body.refresh_token;
      
              var options = {
                url: 'https://api.spotify.com/v1/me',
                headers: { 'Authorization': 'Bearer ' + access_token },
                json: true
              };
      
              // we can also pass the token to the browser to make requests from there
              res.redirect('/#' +
                QueryString.stringify({
                  access_token: access_token,
                  refresh_token: refresh_token
                }));
            } else {
              res.redirect('/#' +
                QueryString.stringify({
                  error: 'invalid_token'
                }));
            }
        });
    }
}

export { login, spotifyAuth };
