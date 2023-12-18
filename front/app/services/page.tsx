"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import IconService from "../Components/IconService";
import AreaIcon from "../Components/AreaIcon";
import { useRouter } from "next/navigation";
import TextSection from "../Components/TextSection";

interface AreaDetails {
  id: number;
  image: string;
  name: string;
  status: boolean;
}

function getAreas() {
  let _areas: AreaDetails[] = [
    {
      id: 1,
      name: "Discord",
      image: "/logo.svg",
      status: true,
    },
    {
      id: 2,
      name: "Twitter",
      image: "/logo.svg",
      status: true,
    },
    {
      id: 3,
      name: "Instagram",
      image: "/logo.svg",
      status: true,
    },
    {
      id: 4,
      name: "Twitch",
      image: "/logo.svg",
      status: true,
    },
    {
      id: 5,
      name: "Youtube",
      image: "/logo.svg",
      status: true,
    },
    {
      id: 6,
      name: "Github",
      image: "/logo.svg",
      status: true,
    },
    {
      id: 7,
      name: "Spotify",
      image: "/logo.svg",
      status: true,
    },
    {
      id: 8,
      name: "TikTok",
      image: "/logo.svg",
      status: true,
    },
    {
      id: 9,
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

            <div className="basis-5/6 pl-3 overflow-y-scroll">
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-20">
                {areas.length > 0 ? areas.map((area: AreaDetails) => (
                  <div key={area.id} className="h-56 w-56">
                    <AreaIcon image={area.image} name={area.name} status={area.status} />
                  </div>
                ))
                  : <p className="font-bold justify-center" >No areas</p>
              }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
