"use client";

import React, { useEffect, useState } from 'react';

const AUTH_ENDPOINT: string = "https://accounts.spotify.com/authorize";
const RESPONSE_TYPE: string = "token";

const SpotifyButtonOAuth: React.FC = () => {
    const [token, setToken] = useState('');

    useEffect(() => {
        const hash: string = window.location.hash;
        let token: string | null = window.localStorage.getItem("token");

        if (!token && hash) {
            token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token"))!.split("=")[1];

            window.location.hash = "";
            window.localStorage.setItem("token", token);
        }

        setToken(token ?? "");

    }, []);

    const logout = (): void => {
        setToken("");
        window.localStorage.removeItem("token");
    };

    return (
        <div className="App">
            <header className="App-header">
                {!token ?
                    <a href={`${AUTH_ENDPOINT}?client_id=${process.env.SPOTIFY_CLIENT_ID}&redirect_uri=${process.env.SPOTIFY_REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>Login to Spotify</a>
                    : <button onClick={logout}>Logout</button>}
            </header>
        </div>
    );
};

export default SpotifyButtonOAuth;
