import Image from "next/image";
import React from "react";
import IconService from "../Components/IconService";
import SpotifyButtonOAuth from "../Components/services/LoginSpotify";

export default function Services() {
  return (
    <div className="relative h-screen flex">
      <div className="w-1/6 h-full overflow-hidden overflow-y-scroll bg-gradient-radial from-[#24204A] to-[#0B0534]">
        <div className="flex items-center justify-start ml-[8%] mt-[5%] h-1/6 w-full">
          <Image src="/logo1.svg" alt="Logo" width={100} height={100} />
        </div>
        <SpotifyButtonOAuth/>
        <div className="flex items-center justify-center h-1/6 text-white text-3xl truncate">
          <p>Select a service</p>
        </div>
        <div className="overflow-hidden flex flex-col justify-center items-center space-y-5">
          <IconService
            path="./Spotify_logo_without_text.svg"
            witdh={100}
            height={100}
            name="Spotify"
          />
        </div>
      </div>

      <div className="flex-1 relative h-full">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-radial from-[#24204A] to-[#0B0534]">
          <h1>Services</h1>
        </div>
      </div>
    </div>
  );
}
