"use client";

import React, { useState, useEffect } from "react";
import logo from "../../public/logo.svg";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Cookies from "js-cookie";
import ServiceConnection from "../Components/ServiceOauthButton";

export default function Profile() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const checkToken = async () => {
      // Vérifier si le cookie "token" existe
      const token = Cookies.get("token");

      if (!token) {
        // Rediriger vers la page de connexion si le cookie n'est pas présent
        router.push("/login");
        return;
      }

      // Si le cookie est présent, effectuer la requête pour obtenir les données de l'utilisateur
      const response = await fetch(process.env.NEXT_PUBLIC_API + "/users/me", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data);
      } else {
        // Rediriger vers la page de connexion en cas d'échec de la requête
        router.push("/login");
      }
    };

    checkToken();
  }, [router]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(process.env.NEXT_PUBLIC_API + "/users/me", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + Cookies.get("token"),
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data);
      }
    };

    fetchData();
  }, []);


  return (
    <div className="relative h-screen flex">
      <div className="w-1/6 h-full overflow-hidden bg-gradient-radial from-[#24204A] to-[#0B0534]">
        <div className="flex items-center justify-start ml-[8%] mt-[5%] h-1/6 w-full">
          <Image src="/logo1.svg" alt="Logo" width={100} height={100} />
        </div>

        <div className="flex flex-col items-center justify-center mt-4">
          <div className="w-32 h-32 mt-1/10 bg-white rounded-full"></div>
          <p className="mt-10 text-white text-center text-xl font-bold">
            {user?.username as string}
          </p>
          <button
            className="text-white text-xl font-bold mt-10 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 bg-fourthly rounded-md px-4 hover:bg-indigo-500 focus-visible:outline-indigo-600"
            onClick={() => {
              Cookies.remove("token");
              router.push("/login");
            }}
          >
            Logout
          </button>
          <p className="text-lg font-bold mt-[20%]">Service Connection</p>
          <ServiceConnection user={user} service="Spotify" />
          <ServiceConnection user={user} service="TrackerGG" />
        </div>
      </div>
      <div className="flex-1 relative h-full">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-radial from-[#24204A] to-[#0B0534]">
          <h1>Profile</h1>
        </div>
      </div>
    </div>
  );
}
