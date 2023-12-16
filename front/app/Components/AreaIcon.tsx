import React from "react";
import Image from "next/image"; // Import de next/image

interface AreaIconProps {
  image: string;
  name: string;
  status: boolean;
}

function AreaIcon({ image, name, status }: AreaIconProps) {
  return (
    <div className="flex items-center container flex-col aspect-square bg-[#382B59]">
      <div className="basis-1/3 place-items-end flex-row-reverse">
        <div className="basis-1/3 items-center justify-center space-x-16">
          <Pastille status={status} />
        </div>
      </div>
      <div className="flex-row basis-2/3">
        <Image src={image} alt="Logo" width={100} height={100} />
      </div>
      <text className="text-3xl font-bold justify-center basis-1/3">{name}</text>
    </div>
  );
}

function Pastille({ status }: { status: boolean }) {
  if (status) {
    return (
      <div className="w-4 h-4 rounded-full bg-green"></div>
    );
  } else {
    return (
      <div className="w-4 h-4 rounded-full bg-red"></div>
    );
  }
}

export default AreaIcon;
