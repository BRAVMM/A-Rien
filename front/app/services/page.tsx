"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import IconService from "../Components/IconService";
import ModalUI from "../Components/Modal";
import { ModalDataInterface } from "../Interfaces/ModalData.interface";
import actionReactionJsonDataService from "@/app/Utils/actionReactionJsonData.service";
import AreaIcon from "../Components/AreaIcon";
import { useRouter } from "next/navigation";
import TextSection from "../Components/TextSection";
import { AreaDetailsInterface } from "../Interfaces/AreaDetails.Interface";
import SpotifyButtonOAuth from "../Components/services/LoginSpotify";
import DiscordButtonOAuth from "../Components/services/CreateWebhookDiscord";

function getAreas() {
    let _areas: AreaDetailsInterface[] = [
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

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [servicesList, setServicesList] = useState<ModalDataInterface[]>();
  const [service, setService] = useState<ModalDataInterface>();

  const servicePicture : {[key: string]: string} = {
    "Discord": "./Discord_logo.svg",
    "Twitch": "./Twitch_logo.svg",
    "Spotify": "./Spotify_logo.svg",
    "Teams": "./Teams_logo.svg",
    "Gmail": "./Gmail_logo.svg",
    "Outlook": "./Outlook_logo.svg",
    "TrackerGG": "./TrackerGG_logo.svg",
    "Onedrive": "./OneDrive_logo.svg",
    "Weather": "./Weather_logo.svg",
    "Timer": "./Timer_logo.svg",
  }

    const [areas, setAreas] = useState<AreaDetailsInterface[]>([]);
    const router = useRouter();

    useEffect(() => {
        setAreas(getAreas());
    }, []);

  /**
   * @function useEffect
   * @description useEffect to fetch actionJsonData when ModalData is defined
   */
  useEffect(() => {
    if (isModalOpen) {
      console.log("Modal is open");
    }
  }, [isModalOpen]);

  /**
   * @function useEffect
   * @description useEffect to fetch actionJsonData when ModalData is defined
   */
  useEffect(() => {
    const services = actionReactionJsonDataService.getServices();

    services.then((services) => {
      setServicesList(services);
    });
  }, []);

  /**
   * @function handleModal
   * @description handleModal to open the modal
   * @param {ModalDataInterface} service - service to display in the modal
   */
  const handleModal = (service: ModalDataInterface) => {
    setIsModalOpen(true);
    setService(service);
  };

  return (
    <div className="relative h-screen flex">
      <ModalUI
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        ModalData={service}
      />
      <div className="w-1/6 h-full overflow-hidden overflow-y-scroll bg-gradient-radial from-[#24204A] to-[#0B0534]">
        <div className="flex items-center justify-start ml-[8%] mt-[5%] h-1/6 w-full">
          <Image src="/logo1.svg" alt="Logo" width={70} height={70} />
        </div>
        <SpotifyButtonOAuth/>
        <DiscordButtonOAuth/>
        <div className="flex items-center justify-center h-1/6 text-white text-3xl truncate">
          <p>Select a service</p>
        </div>
        <div className="overflow-hidden flex flex-col justify-center items-center space-y-5">
          {servicesList !== undefined && (servicesList?.map((service) => (
            <button
              key={service.id}
              className="w-full h-1/2 flex items-center justify-center"
              onClick={() => handleModal(service)}            >
              <IconService
                path={servicePicture[service.name]}
                witdh={100}
                height={100}
                name={service.name}
              />
            </button>
          )))}
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
                {areas.length > 0 ? areas.map((area: AreaDetailsInterface) => (
                  <div key={area.id} className="h-56 w-56">
                    <AreaIcon id={area.id} image={area.image} name={area.name} status={area.status} />
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
