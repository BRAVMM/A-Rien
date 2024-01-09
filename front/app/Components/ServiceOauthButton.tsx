// ServiceConnection.tsx
import React from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

interface ServiceConnectionProps {
  user: any;
  service: string;
  onClick: () => void;
}

const ServiceConnection: React.FC<ServiceConnectionProps> = ({ user, service, onClick }) => {

  const handleLogout = () => {
    Cookies.remove("token");
  };

  const handleLogin = () => {
    // Redirect to the login page or perform login logic
  };

  return (
    <div className="mt-4 text-white text-center">
      <p>Service: {service}</p>
      {!user ? (
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
