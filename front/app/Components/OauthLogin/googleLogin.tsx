"use client";

import { GoogleDataBody } from '@/app/Interfaces/dataBody.interface';
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import googleLogo from '../../../public/Google_Logo.svg'
import Image from 'next/image';

const AUTH_ENDPOINT = "https://accounts.google.com/o/oauth2/v2/auth";
const RESPONSE_TYPE = "code";
const LOGIN_ROUTE = "/users/loginGoogle";
const SCOPE = "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile openid email profile";

const GoogleAuth: React.FC = () => {
    const [state, setState] = React.useState<string>('')
    const [token, setToken] = useState<string>("");
    const router = useRouter();

    useEffect(() => {
        if (token) {
            Cookies.set('token', token);
            router.push("/services");
        }
    }
    , [token]);

    const generateStateToken = (length: number) => {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    const doAsync = async () => {
        const queryParams = new URLSearchParams(window.location.search);
        const queryCode: string | null = queryParams.get('code');

        if (queryCode === null) {
            console.error('No code in query...')
            return
        }
        const data : GoogleDataBody = new GoogleDataBody(queryCode)

        try {
            const response = await fetch(process.env.NEXT_PUBLIC_API + LOGIN_ROUTE, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: data.getString(),
            });
            const responseData = await response.json();
            if (!response.ok) {
              console.error(responseData.error);
              throw new Error("an error occurred");
            }
            setToken(responseData.token);
        } catch (err) {
            console.error(err)
        }
    };

    useEffect(() => {
        doAsync()
        setState(generateStateToken(16));
    }, []);

    return (
        <div>
            <div className="flex flex-col items-center">
                <button
                    type="submit"
                    className="flex items-center justify-center bg-white text-black border border-gray-300 font-semibold py-2 px-4 rounded-lg w-50 text-xl hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-400"
                >
                    <Image src={googleLogo} alt="Google" width={32} height={32} className="mr-2"/>
                    <a href={`${AUTH_ENDPOINT}?client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}&state=${state}&prompt=select_account`}>Login with google</a>
                </button>
            </div>
        </div>
    );
};

export default GoogleAuth;
