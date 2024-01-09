"use client"
import { useRouter } from 'next/router';
import { useEffect, useState } from "react";
import { registerTokenService } from '../Utils/callApi';
import { MicroSoftDataBody } from '../Interfaces/dataBody.interface';

export default function Redirect() {

    const [code, setCode] = useState<string>("null");

    useEffect(() => {
      const queryParams = new URLSearchParams(window.location.search); // remove the '#' at start
      const codeFound: string = queryParams.get('code') ?? "";

      const callApi = async () => {
        await registerTokenService(new MicroSoftDataBody(codeFound), "/services/microsoft/registerToken")
      }
      if (codeFound) {
        setCode(codeFound);
        callApi();
      }
    }, []);


  return (
    <div className="relative h-screen">
      {code && <div>Code: {code}</div>}
    </div>
  );
}
