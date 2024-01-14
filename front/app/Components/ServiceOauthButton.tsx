// ServiceConnection.tsx
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

interface ServiceConnectionProps {
  user: any;
  service: string;
  onClick: () => void;
  serviceID: number;
}

const ServiceConnection: React.FC<ServiceConnectionProps> = ({ user, service, onClick, serviceID }) => {

  const [microsoftLogin, setMicrosoftLogin] = useState<boolean>(false);

  const handleLogout = async () => {
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_API + "/services/removetoken", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + Cookies.get("token"),
        },
        body: JSON.stringify({
          serviceId: serviceID,
        }),
      });
      if (response.ok) {
        setMicrosoftLogin(false);
      }
    } catch (error) {
      console.log(error);

    }
    };

  const handleLogin = () => {
    // Redirect to the login page or perform login logic
  };

  //Microsoft
  useEffect(() => {
    const checkHasToken = async () => {
      const token = Cookies.get("token");

      if (!token) {
        return;
      }
      try {
        const response = await fetch(process.env.NEXT_PUBLIC_API + "/services/microsoft/userHasToken", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (data?.OAuthData?.ownerId) {
          setMicrosoftLogin(true);
        }
      } catch (error) {
        console.log(error);
      }
    }
    checkHasToken();
  }
  , []);

  return (
    <div className="mt-4 text-white text-center">
      <p>Service: {service}</p>
      {microsoftLogin ? (
        <button
          className="text-white text-xl font-bold mt-2 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 bg-fourthly rounded-md px-4 hover:bg-indigo-500 focus-visible:outline-indigo-600"
          onClick={handleLogout}
        >
          Logout
        </button>
      ) : (
        <button
          className="text-white text-xl font-bold mt-2 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 bg-fourthly rounded-md px-4 hover:bg-indigo-500 focus-visible:outline-indigo-600"
          onClick={onClick}
        >
          Login
        </button>
      )}
    </div>
  );
};

export default ServiceConnection;
