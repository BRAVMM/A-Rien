"use client"
import React from 'react';
import { useMsal } from '@azure/msal-react';

const MicrosoftButtonLogin: React.FC = () => {
  const { instance } = useMsal();

  const handleLogin = async () => {
    try {
      const salut = await instance.loginRedirect(
        {
          // openid email profile offline_access
          scopes: ["openid", "profile", "email"],
        }
      );
      
      console.log(salut)
    } catch (error) {
      console.error('Erreur de connexion :', error);
    }
  };

  return (
    <button onClick={async () => {
      await handleLogin();
    }}>
      Se connecter avec Microsoft Teams
    </button>
  );
};

export default MicrosoftButtonLogin;
