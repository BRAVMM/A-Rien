"use client";

import {registerTokenService} from '@/app/Utils/callApi';
import {DiscordDataBody} from '@/app/Interfaces/dataBody.interface';
import React, {useEffect, useRef, useState} from 'react';
import generateRandomString from '@/app/Utils/generateRandomString';
import Cookies from 'js-cookie';

const AUTH_ENDPOINT = "https://discord.com/oauth2/authorize";
const RESPONSE_TYPE = "code";
const REGISTER_TOKEN_ROUTE = "/services/discord/registerToken";
const SCOPE = "webhook.incoming";

const DiscordButtonOAuth: React.FC = () => {
    const state = useRef<string>('');

    const doAsync = async () => {
        const queryParams = new URLSearchParams(window.location.search);
        const queryCode: string | null = queryParams.get('code');
        const queryState: string | null = queryParams.get('state');
        const queryGuildId: string | null = queryParams.get('guild_id');
        const state: string | undefined = Cookies.get('state');

        if (queryCode === null) {
            console.error('No code in query...')
            return
        }
        if (queryState === null) {
            console.error('No state in query...')
            return
        }
        if (queryGuildId === null) {
            console.error('No guild_id in query...')
            return
        }
        try {
            if (queryState !== state) {
                console.error('State is different : ' + queryState + ' != ' + state)
                return
            }
            const returnValue: Boolean = await registerTokenService(new DiscordDataBody(queryCode, queryGuildId), REGISTER_TOKEN_ROUTE);
            if (returnValue) {
                console.log('Token registered !')
                Cookies.remove('state')
                Cookies.remove('code')
                Cookies.remove('guild_id')
            } else {
                console.error('Token not registered...')
            }
        } catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        if (Cookies.get('state')) {
            state.current = Cookies.get('state')!;
            console.log('State already set : ' + Cookies.get('state')!);
        } else {
            state.current = generateRandomString(16);
            Cookies.set('state', state.current);
            console.log('State set to : ' + state.current);
        }
        doAsync()
    }, []);

    return (
        <div className="mt-4 text-white text-center">
            <p>Service: Discord</p>
            <button
                className="text-white text-xl font-bold mt-2 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 bg-fourthly rounded-md px-4 hover:bg-indigo-500 focus-visible:outline-indigo-600">
                <a href={`${AUTH_ENDPOINT}?response_type=${RESPONSE_TYPE}&client_id=${process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID}&scope=${SCOPE}&state=${state.current}&redirect_uri=${process.env.NEXT_PUBLIC_DISCORD_REDIRECT_URI}`}>Login</a>
            </button>
        </div>
    )
        ;
};

export default DiscordButtonOAuth;
