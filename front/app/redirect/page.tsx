"use client"
'use client'
import {  useRouter } from 'next/navigation';
import { useEffect } from "react";

export default function Redirect() {


    useEffect(() => {
        const queryParams = window.location.hash
        console.log(queryParams)
    }, []);
  

  return (
    <div className="relative h-screen">

    </div>
);/*  */
}
