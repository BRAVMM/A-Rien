"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import styles from './login.module.css';
import logo from '../../public/logo.svg';

export default function Register() {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [error, setError] = useState('');
    const [loginSuccess, setLoginSuccess] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (loginSuccess) {
            // Redirect to the home page
            router.push('/');
        }
    }, [loginSuccess, router]);


    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        if (password !== rePassword) {
            setError('Passwords do not match');
            return;
        }

        setError(''); // Clear any existing errors

        const data = {
            email,
            username,
            password
        };

        const response = await fetch(process.env.NEXT_PUBLIC_API + "/users/register", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            // Redirect to home page
            setLoginSuccess(true);
        } else {
            // Handle errors here
            console.error('Error:', response);
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <div className="h-screen flex bg-custom-gradient overflow-hidden ${styles.frame}">
            <div className="absolute top-5/100 left-3/100">
                <Image src={logo} alt="bravmm-logo" width={70} height={70}/>
            </div>
            <div className={`${styles.polygon}`}></div>
            <div className={`${styles.ellipse}`}></div>
            <div className={`${styles.rectangle}`}></div>

            <div className="z-10 flex-1 flex items-center">
                <div className="text-center ml-1/10">
                    <h2 className="text-6xl font-extrabold text-white">
                        Welcome to BRAVMM
                    </h2>
                    <p className="mt-2 text-2xl text-white">
                        lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>
                </div>
            </div>

            <div className="w-full lg:w-1/2 flex items-center justify-center">
                <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-24">
                    <h1 className="text-3xl font-extrabold text-background mb-6 text-center">
                        Create an account
                    </h1>
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            id="email"
                            placeholder="Email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            className="text-center block w-full rounded-md border-0 py-1.5 text-background shadow-sm ring-2 ring-inset ring-secondary placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary"
                        />

                        <input
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            id="username"
                            placeholder="Username"
                            name="username"
                            type="username"
                            autoComplete="username"
                            required
                            className="text-center block w-full rounded-md border-0 py-1.5 text-background shadow-sm ring-2 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 ring-secondary focus:ring-inset focus:ring-indigo-600"
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

                        <input
                            value={rePassword}
                            onChange={(e) => setRePassword(e.target.value)}
                            id="re-password"
                            placeholder="Repeat Password"
                            name="re-password"
                            type="password"
                            autoComplete="current-password"
                            required
                            className="text-center block w-full rounded-md border-0 py-1.5 text-background shadow-sm ring-2 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 ring-secondary focus:ring-inset focus:ring-indigo-600"
                        />

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-gray-300 text-background focus:ring-indigo-600"
                                />
                                <label htmlFor="remember-me" className="ml-3 block text-sm leading-6 text-background">
                                    I agree to the terms and conditions
                                </label>
                            </div>
                        </div>
                        <div>
                            <button
                                type="submit"
                                className={`flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${error ? 'bg-red focus-visible:outline-red-600' : 'bg-primary hover:bg-indigo-500 focus-visible:outline-indigo-600'}`}
                            >
                                Register
                            </button>
                            {error && <p className="text-red text-center mt-2">{error}</p>}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
