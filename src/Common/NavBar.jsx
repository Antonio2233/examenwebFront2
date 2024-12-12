import React from 'react';
import { Link } from 'react-router-dom';
import GoogleLog from './GoogleLog';

const Navbar = () => {
  return (
    <nav className="w-full flex flex-col sm:flex-row items-center justify-between p-4 bg-teal-900	 text-white">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo o título */}
        <div className="text-white text-lg font-semibold">
          <Link to="/">Mi Aplicación</Link>
        </div>
        {/* Botones */}
        <div className="flex space-x-4">
          {/* <Link
            to="/"
            className="text-white px-4 py-2 rounded hover:bg-gray-700 transition"
          >Home</Link> */}


          <GoogleLog/>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
