import Image from 'next/image';
import React from 'react';
import GradientBar from './GradiantBar';

interface IconServiceProps {
  path: string;
  witdh: number;
  height: number;
  name: string;
}

function IconService({ path, witdh, height, name }: IconServiceProps) {
  return (
    <div className="flex flex-col w-full items-center justify-center h-1/6 text-white text-3xl truncate space-y-5">
      <Image src={path} alt={name} width={witdh} height={height} />
      <p>{name}</p>
      <GradientBar />
    </div>
  );
}

export default IconService;
