"use client";

import React, { useState, useEffect, use } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import styles from "./login.module.css";
import logo from "../../public/logo.svg";
import TextSection from "../Components/TextSection";
import { loginUser } from "../Utils/callApi";
import Cookies from 'js-cookie';

export default function Login() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loginSuccess, setLoginSuccess] = useState<boolean>(false);
  const [token, setToken] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    if (loginSuccess) {
      router.push("/services");
    }
  }, [loginSuccess, router]);

  useEffect(() => {
    if (token) {
      Cookies.set('token', token);
    }
  }
  , [token]);

  const handleError = (error: any) => {
    console.error("Error:", error);
    setError("An error occurred, please try again");
  };

	const handleSubmit = async (e: { preventDefault: () => void }) => {
		e.preventDefault();
	
		setError("");
	
		try {
			const json = await loginUser(username, password);
			setLoginSuccess(true);
			setToken(json.token);
		} catch (error) {
        handleError(error);
    }
	};

  return (
    <div
      className={`h-screen flex bg-custom-gradient overflow-hidden ${styles.frame}`}
    >
      <button className="absolute top-5/100 left-3/100">
        <Image
          src={logo}
          alt="bravmm-logo"
          width={70}
          height={70}
          onClick={() => router.push("/")}
        />
      </button>
      <div className={`${styles.polygon}`}></div>
      <div className={`${styles.ellipse}`}></div>
      <div className={`${styles.rectangle}`}></div>

      <TextSection
        title="Welcome back to BRVMM"
        content={`It's time to experience a new automated application to improve the quality of life. BRVM lets you manage actions and reactions on specific services`}
      />

      <div className="w-full lg:w-1/2 flex items-center justify-center z-10">
        <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-24">
          <h1 className="text-3xl font-extrabold text-background mb-6 text-center">
            Login
          </h1>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              id="email"
              placeholder="Email"
              name="email"
              type="data"
              required
              className="text-center block w-full rounded-md border-0 py-1.5 text-background shadow-sm ring-2 ring-inset ring-secondary placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary"
            />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              placeholder="Password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="text-center block w-full rounded-md border-0 py-1.5 text-background shadow-sm ring-2 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 ring-secondary focus:ring-inset focus:ring-indigo-600"
            />
            <div className="flex flex-col items-center">
              <button
                type="submit"
                className={`flex items-center justify-center bg-[#382B59] text-white font-semibold py-2 px-4 rounded-lg w-32 text-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
                  error
                    ? "bg-red focus-visible:outline-red-600"
                    : "bg-primary hover:bg-indigo-500 focus-visible:outline-indigo-600"
                }`}
              >
                Login
              </button>
              {error && <p className="text-red text-center mt-2">{error}</p>}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
