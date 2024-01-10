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
import Cookies from 'js-cookie';

export default function Services() {

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [servicesList, setServicesList] = useState<ModalDataInterface[]>();
  const [service, setService] = useState<ModalDataInterface>();

  const servicePicture: { [key: string]: string } = {
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
    actionReactionJsonDataService.getAreas().then((areas) => {
      setAreas(areas);
    });
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
   * @function useEffect
   * @description useEffect to check if the user is logged in
   */
  useEffect(() => {
    redirectNotLogged();
  }
    , []);

  /**
   * @function redirectNotLogged
   * @description redirectNotLogged to redirect the user if not logged
   */
  async function redirectNotLogged() {
    const token: string | undefined = Cookies.get("token");

    if (!token) {
      console.log("No token");
      router.push("/");
      return;
    }
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_API + "/users/me", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });
      if (response.status !== 200) {
        console.log("Not logged in");
        router.push("/");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  function getImageFromName(name: string): string {
    switch (name) {
      case "Discord":
        return "./Discord_logo.svg";
      case "Twitch":
        return "./Twitch_logo.svg";
      case "Spotify":
        return "./Spotify_logo.svg";
      case "Teams":
        return "./Teams_logo.svg";
      case "Gmail":
        return "./Gmail_logo.svg";
      case "Outlook":
        return "./Outlook_logo.svg";
      case "TrackerGG":
        return "./TrackerGG_logo.svg";
      case "Onedrive":
        return "./OneDrive_logo.svg";
      case "Weather":
        return "./Weather_logo.svg";
      case "Timer":
        return "./Timer_logo.svg";
      default:
        return "./logo1.svg";
    }
  }

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
        <SpotifyButtonOAuth />
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
                    <AreaIcon id={area.id} image={getImageFromName(area.actionName)} name={area.title} status={area.isActivated} />
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
