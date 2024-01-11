"use client";

import React, { useState, useEffect } from "react";
import logo from "../../public/logo.svg";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Cookies from "js-cookie";
import ServiceConnection from "../Components/ServiceOauthButton";
import SpotifyButtonOAuth from "../Components/services/LoginSpotify";

export default function Profile() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  const [editableUsername, setEditableUsername] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState('');

  const AUTH_ENDPOINT = `https://login.microsoftonline.com/${process.env.NEXT_PUBLIC_MICROSOFT_TENANT_ID}/oauth2/v2.0/authorize`;
  const RESPONSE_TYPE = "code";
  const SCOPE = "openid profile offline_access email user.read mail.read mail.send ChannelMessage.Send mail.readwrite";

  useEffect(() => {
    const checkToken = async () => {
      const token = Cookies.get("token");

      if (!token) {
        router.push("/login");
        return;
      }

      const response = await fetch(process.env.NEXT_PUBLIC_API + "/users/me", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data);
      } else {
        router.push("/login");
      }
    };

    checkToken();
  }, [router]);

  const handleEditClick = () => {
    setEditableUsername(user?.username || '');
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  const handleSaveClick = async () => {
    const token = Cookies.get('token');

    if (!token) {
      router.push('/login');
      return;
    }

    const response = await fetch(process.env.NEXT_PUBLIC_API + '/users/modifyUsername', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify({
        username: user?.username,
        newUsername: editableUsername
      }),
    });

    if (response.ok) {
      const updatedUserData = await response.json();
      setUser(updatedUserData);
      setIsEditing(false);
    } else {
      console.error('Error updating username');
      setError('Error updating username');
    }
  };

  return (
    <div className="relative h-screen flex">
      <div className="w-1/6 h-full overflow-hidden bg-gradient-radial from-[#24204A] to-[#0B0534]">
        <div className="flex items-center justify-start ml-[8%] mt-[5%] h-1/6 w-full">
          <Image src="/logo1.svg" alt="Logo" width={100} height={100} />
        </div>

        <div className="flex flex-col items-center justify-center mt-4">
          <div className="w-32 h-32 mt-1/10 bg-white rounded-full"></div>
          <p className="mt-10 text-white text-center text-xl font-bold">
            {user?.username as string}
          </p>
          <button
            className="text-white text-xl font-bold mt-10 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 bg-fourthly rounded-md px-4 hover:bg-indigo-500 focus-visible:outline-indigo-600"
            onClick={() => {
              Cookies.remove("token");
              router.push("/login");
            }}
          >
            Logout
          </button>
          <p className="text-lg font-bold mt-[20%]">Service Connection</p>
          <ServiceConnection
            user={user}
            service="Microsoft"
            onClick={() => {
              window.location.href = `${AUTH_ENDPOINT}?client_id=${process.env.NEXT_PUBLIC_MICROSOFT_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_MICROSOFT_REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}&prompt=select_account`;
            }}
          />
          <SpotifyButtonOAuth/>
        </div>
      </div>
      <div className="flex-1 relative h-full">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-radial from-[#24204A] to-[#0B0534]">
          {isEditing ? (
            <div className="flex flex-col items-center justify-center h-full">
              <input
                type="text"
                className="border-2 border-white rounded-md p-2 mb-4 text-black"
                value={editableUsername}
                onChange={(e) => setEditableUsername(e.target.value)}
              />
              <div className="flex">
                <button
                  className="text-white text-xl font-bold mr-4 bg-fourthly rounded-md px-4 hover:bg-indigo-500"
                  onClick={handleSaveClick}
                >
                  Save
                </button>
                <button
                  className="text-white text-xl font-bold bg-fourthly rounded-md px-4 hover:bg-indigo-500"
                  onClick={handleCancelClick}
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <h1 className="text-white text-4xl font-bold">{user?.username}</h1>
              <button
                className="text-white text-xl font-bold ml-4 bg-fourthly rounded-md px-4 hover:bg-indigo-500"
                onClick={handleEditClick}
              >
                Edit
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
