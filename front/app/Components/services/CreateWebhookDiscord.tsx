"use client";

import { registerTokenService } from '@/app/Utils/callApi';
import { DiscordDataBody } from '@/app/Interfaces/dataBody.interface';
import React, { useEffect, useState } from 'react';
import generateRandomString from '@/app/Utils/generateRandomString';

const AUTH_ENDPOINT = "https://discord.com/oauth2/authorize";
const RESPONSE_TYPE = "code";
const REGISTER_TOKEN_ROUTE = "/services/discord/registerToken";
const SCOPE = "webhook.incoming";

const DiscordButtonOAuth: React.FC = () => {
    const [code, setCode] = useState<string>('');
    const [state, setState] = useState<string>('');
    console.log("load")

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const queryCode: string | null = queryParams.get('code');

        if (queryCode && queryCode !== code) {
            console.log("queryCode : ", queryCode);
            console.log("code : ", code);
            try {
                registerTokenService(new DiscordDataBody(queryCode), REGISTER_TOKEN_ROUTE);
            } catch(error) {
                console.log(error)
            }
        }
        setState(generateRandomString(16))
    }, []);

    return (
        <div className="App">
            <header className="App-header">
                <a href={`${AUTH_ENDPOINT}?response_type=${RESPONSE_TYPE}&client_id=${process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID}&scope=${SCOPE}&state=${state}&redirect_uri=${process.env.NEXT_PUBLIC_DISCORD_REDIRECT_URI}`}>Login to Discord</a>
            </header>
        </div>
    );
};

export default DiscordButtonOAuth;
