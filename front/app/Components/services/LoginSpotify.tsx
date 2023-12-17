"use client";

import { registerTokenService } from '@/app/Utils/callApi';
import { SpotifyDataBody } from '@/app/Utils/interface/dataBody.interface';
import React, { useEffect, useState } from 'react';

const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
const RESPONSE_TYPE = "code";
const REGISTER_TOKEN_ROUTE = "/services/spotify/registerToken";

const SpotifyButtonOAuth: React.FC = () => {
    const [code, setCode] = useState<string>('');

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
    }, [code]);

    return (
        <div className="App">
            <header className="App-header">
                <a href={`${AUTH_ENDPOINT}?client_id=${process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>Login to Spotify</a>
            </header>
        </div>
    );
};

export default SpotifyButtonOAuth;
