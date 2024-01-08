"use client"
import { useRouter } from 'next/router';
import { useEffect, useState } from "react";
import { registerTokenService } from '../Utils/callApi';
import { MicroSoftDataBody } from '../Interfaces/dataBody.interface';

export default function Redirect() {

    const [code, setCode] = useState<string>("null");

    useEffect(() => {
      const queryParams = new URLSearchParams(window.location.hash.substring(1)); // remove the '#' at start
      const codeFound: string = queryParams.get('code') ?? "";
      setCode(codeFound);
      console.log(codeFound);
      const handleSetData = async () => {
        const res = await registerTokenService(new MicroSoftDataBody(codeFound), "/services/microsoft/registerToken");
        console.log(res);
      }
      if (codeFound !== "") {
        handleSetData();
      }
    }, []);


  return (
    <div className="relative h-screen">
      {code && <div>Code: {code}</div>}
    </div>
  );
}
