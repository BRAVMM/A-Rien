"use client";

import { registerTokenService } from '@/app/Utils/callApi';
import { SpotifyDataBody } from '@/app/Interfaces/dataBody.interface';
import React, { useEffect, useState } from 'react';
import generateRandomString from '@/app/Utils/generateRandomString';

const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
const RESPONSE_TYPE = "code";
const REGISTER_TOKEN_ROUTE = "/services/spotify/registerToken";
const SCOPE = "user-read-private user-read-email playlist-read-private playlist-read-collaborative playlist-modify-private playlist-modify-public user-follow-read user-library-read user-library-modify user-top-read user-read-recently-played";

const SpotifyButtonOAuth: React.FC = () => {
    const [code, setCode] = useState<string>('');
    const [state, setState] = useState<string>('');

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const queryCode: string | null = queryParams.get('code');

        if (queryCode && queryCode !== code) {
            try {
                registerTokenService(new SpotifyDataBody(queryCode), REGISTER_TOKEN_ROUTE);
            } catch(error) {
                console.log(error)
            }
        }
        setState(generateRandomString(16))
    }, []);

    return (
        <div className="App">
            <header className="App-header">
                <a href={`${AUTH_ENDPOINT}?client_id=${process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI}&response_type=${RESPONSE_TYPE}&state=${state}&scope=${SCOPE}&show_dialog=${true}`}>Login to Spotify</a>
            </header>
        </div>
    );
};

export default SpotifyButtonOAuth;
