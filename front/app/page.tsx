// Make sure to import your CSS file at the top of your _app.js or the specific page
// import '../styles/globals.css';

import Image from 'next/image';
import Navbar from './Components/Navbar';
import TextSection from './Components/TextSection';

export default function Home() {
  return (
    <div className="relative h-screen">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-radial from-[#24204A] to-[#0B0534]">
        <Navbar />
        <div className="container mx-auto flex flex-col items-center justify-center h-1/3">
          <TextSection
            title='An automated application designed for users to upgrade life'
            content={`It's time to experience a new automated application to improve the quality of life. BRVM lets you manage actions and reactions on specific services`} />
        </div>
        <div className="flex items-center justify-center space-x-16">
          <button className="bg-[#382B59] text-white font-semibold py-2 px-4 rounded-lg w-32 text-xl">
            Login
          </button>
          <button className="bg-[#382B59] text-white font-semibold py-2 px-4 rounded-lg w-32 text-xl">
            Register
          </button>
        </div>
        <div className='flex items-center justify-center h-1/3 mt-10'>
          <div className="snake-container">
          </div>
        </div>
      </div>
    </div>
  );
}
