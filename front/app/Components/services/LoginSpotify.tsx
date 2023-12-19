"use client";

import { registerTokenService } from '@/app/Utils/callApi';
import { SpotifyDataBody } from '@/app/Interfaces/dataBody.interface';
import React, { useEffect, useState } from 'react';
import generateRandomString from '@/app/Utils/generateRandomString';

const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
const RESPONSE_TYPE = "code";
const REGISTER_TOKEN_ROUTE = "/services/spotify/registerToken";
const SCOPE = "user-read-private user-read-email playlist-read-private playlist-read-collaborative playlist-modify-private playlist-modify-public user-follow-read user-library-read user-library-modify user-top-read user-read-recently-played";
const SHOWDIALOG = true

const SpotifyButtonOAuth: React.FC = () => {
    const [code, setCode] = useState<string>('');

    const doAsync = async () => {
        const queryParams = new URLSearchParams(window.location.search);
        const queryCode: string | null = queryParams.get('code');

        if (queryCode === null) {
            console.error('No code in query...')
            return
        }
        try {
            await registerTokenService(new SpotifyDataBody(queryCode), REGISTER_TOKEN_ROUTE);
        } catch (err) {
            console.error(err)
        }
    };

    useEffect(() => {
        doAsync()
    }, []);

    return (
        <div className="App">
            <header className="App-header">
                <button>
                    <a href={`${AUTH_ENDPOINT}?client_id=${process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}&show_dialog=${SHOWDIALOG}`}>Login to Spotify</a>
                </button>
            </header>
        </div>
    );
};

export default SpotifyButtonOAuth;
