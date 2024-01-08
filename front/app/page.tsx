"use client"
import { useMsal } from "@azure/msal-react";
import MicrosoftButtonLogin from "./Components/MicrosoftLoginButton";
import Navbar from "./Components/Navbar";
import TextSection from "./Components/TextSection";
import { useRouter } from 'next/navigation';
import { useEffect } from "react";

export default function Home() {

  const router = useRouter();

  const handleLoginClick = () => {
    router.push('/login');
  };

  const handleRegisterClick = () => {
    router.push('/register');
  };

  const { instance, accounts, inProgress } = useMsal();

  useEffect(() => {
    const initializeMSAL = async () => {
      try {
        if (!inProgress) {
          // Vérifiez si MSAL est déjà en cours d'initialisation
          // pour éviter de lancer l'initialisation plusieurs fois
          await instance.handleRedirectPromise();
          // L'initialisation est terminée
          console.log('MSAL initialisé avec succès.');
        }
      } catch (error) {
        console.error('Erreur lors de l\'initialisation de MSAL :', error);
      }
    };

    initializeMSAL();
  }, [inProgress, instance]);

  useEffect(() => {
    const acquireToken = async () => {
      try {
        // Assurez-vous que MSAL est initialisé avant d'appeler acquireTokenByCode
        if (!inProgress) {
          const request = {
            scopes: ['User.Read'],
          };
          console.log('Récupération du token...');
          const response = await instance.acquireTokenByCode(request);

          console.log('Token récupéré :', response.accessToken);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération du token :', error);
      }
    };

    acquireToken();
  }, [accounts, instance, inProgress]);
  

  return (
    <div className="relative h-screen">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-radial from-[#24204A] to-[#0B0534]">
        <Navbar />
        <div className="container mx-auto flex flex-col items-center justify-center h-1/3">
          <TextSection
            title="An automated application designed for users to upgrade life"
            content={`It's time to experience a new automated application to improve the quality of life. BRVM lets you manage actions and reactions on specific services`}
          />
        </div>
        <div className="flex items-center justify-center space-x-16">
          <button
            onClick={handleLoginClick}
            className="bg-[#382B59] text-white font-semibold py-2 px-4 rounded-lg w-32 text-xl"
          >
            Login
          </button>
          <button
            onClick={handleRegisterClick}
            className="bg-[#382B59] text-white font-semibold py-2 px-4 rounded-lg w-32 text-xl"
          >
            Register
          </button>
        </div>
        <div className="flex items-center justify-center h-1/3 mt-10">
          <div className="snake-container">
          </div>
            <MicrosoftButtonLogin />
        </div>
      </div>
    </div>
  );
}
