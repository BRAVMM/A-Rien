"use client"

import { useEffect, useState } from "react";
import { registerTokenService } from '../Utils/callApi';
import { MicroSoftDataBody } from '../Interfaces/dataBody.interface';
import { useRouter } from "next/navigation";

export default function Redirect() {

    const [code, setCode] = useState<string>("null");
    const router = useRouter();

    useEffect(() => {
      const queryParams = new URLSearchParams(window.location.search); // remove the '#' at start
      const codeFound: string = queryParams.get('code') ?? "";

      const callApi = async () => {
        await registerTokenService(new MicroSoftDataBody(codeFound), "/services/microsoft/registerToken")
      }
      if (codeFound) {
        setCode(codeFound);
        callApi();
        router.push("/profile");
      }
    }, []);


  return (
    <div className="relative h-screen">
      {code && <div>Code: {code}</div>}
    </div>
  );
}
