import React from "react";
import Image from "next/image"; // Import from next/image
import { AreaDetailsInterface } from "../Interfaces/AreaDetails.Interface";
import Pastille from "./Pastille";

function AreaIcon({ id, image, name, status }: AreaDetailsInterface) {
  return (
    <div className="flex items-center container flex-col aspect-square bg-[#382B59] rounded-xl overflow-hidden">
      <div className="flex basis-1/3 w-full flex-row">
        <div className="flex basis-2/3" />
        <div className="flex basis-1/3 items-center justify-center space-x-16">
          <Pastille status={status} />
        </div>
      </div>
      <div className="flex-row basis-2/3">
        <Image src={image} alt="Logo" width={100} height={100} />
      </div>
      <p className="text-3xl font-bold text-center basis-1/3">{name}</p>
    </div>
  );
}

export default AreaIcon;
