import Image from 'next/image'
import styles from './login.module.css'
import logo from '../../public/logo.svg'

export default function Login() {
    return (
        <div className="h-screen flex bg-custom-gradient overflow-hidden ${styles.frame}">
            <div className="absolute top-5/100 left-3/100">
                <Image src={logo} alt="bravmm-logo" width={70} height={70}/>
            </div>
            <div className={`${styles.polygon}`}></div>
            <div className={`${styles.ellipse}`}></div>
            <div className={`${styles.rectangle}`}></div>

            {/* Left side content with logo and welcome text, centered both horizontally and vertically */}
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
                    <form className="space-y-6" action="#" method="POST">
                        <div>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    placeholder={'Email'}
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="text-center block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-2 ring-inset ring-secondary placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="mt-2">
                                <input
                                    id="username"
                                    placeholder={'Username'}
                                    name="username"
                                    type="username"
                                    autoComplete="username"
                                    required
                                    className="text-center block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-2 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 ring-secondary focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    placeholder={'Password'}
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="text-center block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-2 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 ring-secondary focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    placeholder={'Password'}
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="text-center block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-2 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 ring-secondary focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                />
                                <label htmlFor="remember-me" className="ml-3 block text-sm leading-6 text-background">
                                    I agree to the terms and conditions
                                </label>
                            </div>
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Sign in
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
