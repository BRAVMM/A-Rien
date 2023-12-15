"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import IconService from "../Components/IconService";
import ModalUI from "../Components/Modal";
import { ModalDataInterface } from "../Interfaces/ModalData.interface";

export default function Services() {

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [service, setService] = useState<ModalDataInterface>();

  const servicePicture : {[key: string]: string} = {
    "Spotify": "./Spotify_logo_without_text.svg",
    "Teams": "./Spotify_logo_without_text.svg",
  }

  const json = {
    "services": [
      {
        "name": "Spotify",
        "id": 1,
        "actionIds": [1, 2, 3],
        "reactionIds": [1, 2, 3]
      },
      {
        "name": "Teams",
        "id": 2,
        "actionIds": [1, 2, 3],
        "reactionIds": [1, 2, 3]
      }
    ]
  };


  const handleModal = (service: ModalDataInterface) => {
    setIsModalOpen(true);
    setService(service);
    console.log(service);
  };

  useEffect(() => {
    if (isModalOpen) {
      console.log("Modal is open");
    }
  }, [isModalOpen]);


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
        <div className="flex items-center justify-center text-white text-3xl truncate font-bold mb-10">
          <p>Select a service</p>
        </div>
        <div className="overflow-hidden flex flex-col justify-center items-center space-y-5">
          {json.services.map((service) => (
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
          ))}
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
