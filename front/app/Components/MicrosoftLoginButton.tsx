"use client"
import React from 'react';
import { useMsal } from '@azure/msal-react';

const MicrosoftButtonLogin: React.FC = () => {
  const { instance } = useMsal();

  const handleLogin = async () => {
    try {
      await instance.loginPopup();
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
