"use client";

import React, { useState, useEffect } from "react";
import logo from "../../public/logo.svg";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Profile() {
  const router = useRouter();

  return (
    <div className="relative h-screen flex">
      <div className="w-1/6 h-full overflow-hidden bg-gradient-radial from-[#24204A] to-[#0B0534]">
        <div className="flex items-center justify-start ml-[8%] mt-[5%] h-1/6 w-full">
          <Image src="/logo1.svg" alt="Logo" width={100} height={100} />
        </div>
        
        <div className="flex items-center justify-center mt-4">
          <div className="w-32 h-32 mt-1/10 bg-white rounded-full"></div>
        </div>
      </div>

      <div className="flex-1 relative h-full">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-radial from-[#24204A] to-[#0B0534]">
          <h1>Profile</h1>
        </div>
      </div>
    </div>
  );
}
