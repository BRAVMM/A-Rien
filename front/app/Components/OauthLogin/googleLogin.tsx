"use client";

import React, { useEffect, useState } from 'react';

const AUTH_ENDPOINT = "https://accounts.google.com/o/oauth2/v2/auth";
const RESPONSE_TYPE = "code";
const REGISTER_TOKEN_ROUTE = "/services/spotify/registerToken";
const SCOPE = "openid email";
const SHOWDIALOG = true

const GoogleAuth: React.FC = () => {

    useEffect(() => {
    }, []);

    return (
        <div>
            <div className="flex flex-col items-center">
                <button
                    type="submit"
                    className={`flex items-center justify-center bg-[#382B59] text-white font-semibold py-2 px-4 rounded-lg w-32 text-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
                            "bg-primary hover:bg-indigo-500 focus-visible:outline-indigo-600"
                    }`}
                >
                    <a href={`${AUTH_ENDPOINT}?client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`}>Login to GOOGLE</a>
                </button>
            </div>
        </div>
    );
};

export default GoogleAuth;
