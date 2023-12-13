"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import logo from "../../public/logo.svg";
import TextSection from "../Components/TextSection";
import styles from "./home.module.css";
import AreaIcon from "../Components/AreaIcon";

interface AreaDetails {
  image: string;
  name: string;
  status: boolean;
}

function getAreas() {
  let _areas: [AreaDetails] = [
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

export default function Home() {
  const [areas, setAreas] = useState<[AreaDetails]>([]);
  const router = useRouter();

  useEffect(() => {
    setAreas(getAreas());
  }, []);

  return (
    <div
      className={`h-screen flex bg-custom-gradient flex-col`}
    >
      <div className="basis-1/12">
        <button className="">
          <Image
            src={logo}
            alt="bravmm-logo"
            width={70}
            height={70}
            onClick={() => router.push("/")}
          />
        </button>
      </div>
      <div className="basis-11/12 flex flex-row flex-none">
        <nav className="basis-1/6 justify-between items-center">
          <TextSection title="Select a service" content="" />
        </nav>
        <div className="snake-container">
          <div className="grid grid-cols-5 gap-4 space-x-4 space-y-4">
            {areas.map((area: AreaDetails, index: number) => (
              <div key={index} className="p-4 border rounded">
                <AreaIcon image={area.image} name={area.name} status={area.status} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
