const msalConfig = {
  auth: {
    clientId: process.env.NEXT_PUBLIC_MICROSOFT_CLIENT_ID,
    authority: `https://login.microsoftonline.com/${process.env.NEXT_PUBLIC_MICROSOFT_TENANT_ID}`,
    redirectUri: process.env.NEXT_PUBLIC_MICROSOFT_REDIRECT_URI, // L'URI de redirection doit correspondre à celui configuré dans le portail Microsoft 365
  },
  cache: {
    cacheLocation: 'sessionStorage',
    storeAuthStateInCookie: false,
  },
};

export default msalConfig;
