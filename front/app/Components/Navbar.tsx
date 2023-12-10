import React from 'react';
import Image from 'next/image'; // Import de next/image

function Navbar() {
  return (
    <nav className="bg-transparent p-4">
      <div className="container mx-auto">
        <div className="flex items-center justify-center">
          <ul className="flex space-x-4 sm:space-x-8 lg:space-x-32 items-center justify-center">
            <Image src="/logo1.svg" alt="Logo" width={100} height={100} />
            <li className="text-white text-xl">Product</li>
            <li className="text-white text-xl">Forums</li>
            <li className="text-white text-xl">Documentation</li>
            <li className="text-white text-xl">FAQ</li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
