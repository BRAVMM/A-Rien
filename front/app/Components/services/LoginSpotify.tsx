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
        <div className="mt-4 text-white text-center">
            <p>Service: Spotify</p>
            <button className="text-white text-xl font-bold mt-2 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 bg-fourthly rounded-md px-4 hover:bg-indigo-500 focus-visible:outline-indigo-600">
                <a href={`${AUTH_ENDPOINT}?client_id=${process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}&show_dialog=${SHOWDIALOG}`}>Login</a>
            </button>
        </div>
    );
};

export default SpotifyButtonOAuth;
