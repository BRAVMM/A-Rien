"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import IconService from "../Components/IconService";
import AreaIcon from "../Components/AreaIcon";
import { useRouter } from "next/navigation";
import TextSection from "../Components/TextSection";

interface AreaDetails {
  image: string;
  name: string;
  status: boolean;
}

function getAreas() {
  let _areas: AreaDetails[] = [
    {
      name: "Discord",
      image: "/logo.svg",
      status: true,
    },
    {
      name: "Twitter",
      image: "/logo.svg",
      status: true,
    },
    {
      name: "Instagram",
      image: "/logo.svg",
      status: true,
    },
    {
      name: "Twitch",
      image: "/logo.svg",
      status: true,
    },
    {
      name: "Youtube",
      image: "/logo.svg",
      status: true,
    },
    {
      name: "Github",
      image: "/logo.svg",
      status: true,
    },
    {
      name: "Spotify",
      image: "/logo.svg",
      status: true,
    },
    {
      name: "TikTok",
      image: "/logo.svg",
      status: true,
    },
    {
      name: "Facebook",
      image: "/logo.svg",
      status: true,
    },
  ];

  return _areas;
}


export default function Services() {
  const [areas, setAreas] = useState<AreaDetails[]>([]);
  const router = useRouter();

  useEffect(() => {
    setAreas(getAreas());
  }, []);

  return (
    <div className="relative h-screen flex flex-row">
      <div className="w-1/6 h-full overflow-hidden overflow-y-scroll bg-gradient-radial from-[#24204A] to-[#0B0534]">
        <div className="flex items-center justify-start ml-[8%] mt-[5%] h-1/6 w-full">
          <Image src="/logo1.svg" alt="Logo" width={100} height={100} />
        </div>
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
          <div className="w-full h-full flex flex-col flex-none">
            <div className="feh-full basis-1/6 justify-between items-center">
              <TextSection title="Services" content="" />
            </div>

            <div className="snake-container basis-5/6">
              <div className="grid grid-cols-5 gap-4 space-x-4 space-y-4">
                {areas.map((area: AreaDetails, index: number) => (
                  <div key={index} className="p-4 rounded">
                    <AreaIcon image={area.image} name={area.name} status={area.status} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
