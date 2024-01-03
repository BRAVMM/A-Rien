"use client"
import React from 'react';
import { MsalProvider } from '@azure/msal-react';
import { Configuration } from '@azure/msal-browser';
import { IPublicClientApplication, PublicClientApplication } from '@azure/msal-browser'; 

const OauthProvider = ({ children }: { children: React.ReactNode }) => {

  const msalConfig: Configuration = {
    auth: {
      clientId: process.env.NEXT_PUBLIC_MICROSOFT_CLIENT_ID ?? '',
      authority: `https://login.microsoftonline.com/${process.env.NEXT_PUBLIC_MICROSOFT_TENANT_ID}`,
      redirectUri: process.env.NEXT_PUBLIC_MICROSOFT_REDIRECT_URI,
    },
    cache: {
      cacheLocation: 'sessionStorage',
      storeAuthStateInCookie: false,
    },
  };

  const msalInstance: IPublicClientApplication = new PublicClientApplication(msalConfig);

  return (
    <MsalProvider instance={msalInstance}>
      {children}
    </MsalProvider>
  );
};

export default OauthProvider;
