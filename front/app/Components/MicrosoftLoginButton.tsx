"use client"
import React, { useEffect, useState } from 'react';
import { useMsal } from '@azure/msal-react';

const AUTH_ENDPOINT = `https://login.microsoftonline.com/${process.env.NEXT_PUBLIC_MICROSOFT_TENANT_ID}/oauth2/v2.0/authorize`;
const RESPONSE_TYPE = "code";
const SCOPE = "openid profile offline_access email user.readwrite user.read mail.read mail.send chat.readwrite";

const MicrosoftButtonLogin: React.FC = () => {
  return (
    <div className="App">
        <header className="App-header">
            <button>
                <a href={`${AUTH_ENDPOINT}?client_id=${process.env.NEXT_PUBLIC_MICROSOFT_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_MICROSOFT_REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`}>Login to Spotify</a>
            </button>
        </header>
    </div>
  );
};

export default MicrosoftButtonLogin;
