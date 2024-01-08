"use client"
import { useRouter } from 'next/router';
import { useEffect, useState } from "react";

export default function Redirect() {

    const [code, setCode] = useState<string | null>(null);

    useEffect(() => {
      const queryParams = new URLSearchParams(window.location.hash.substring(1)); // remove the '#' at start
      const codeFound = queryParams.get('code');
      setCode(codeFound);
      console.log(codeFound);
    }, []);


  return (
    <div className="relative h-screen">
      {code && <div>Code: {code}</div>}
    </div>
  );
}
