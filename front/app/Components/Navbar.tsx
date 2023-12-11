import React from "react";
import Image from "next/image"; // Import de next/image

function Navbar() {
  return (
    <nav className="bg-transparent p-4">
      <div className="container mx-auto flex items-center justify-between">
        <Image src="/logo1.svg" alt="Logo" width={100} height={100} />
        <ul className="flex-grow flex space-x-4 sm:space-x-8 lg:space-x-32 items-center justify-center"> {/* Utibuttonsez flex-grow pour centrer la buttonste */}
          <button className="text-white text-xl">Product</button>
          <button className="text-white text-xl">Forums</button>
          <button className="text-white text-xl">Documentation</button>
          <button className="text-white text-xl">FAQ</button>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
