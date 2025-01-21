import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { logout } = useContext(AuthContext);

  return (
    <nav className="bg-blue-400 px-4 py-3 sm:px-6 sm:py-4 md:px-8 lg:px-12 text-white flex flex-wrap sm:flex-nowrap justify-between items-center">
      {/* Title */}
      <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold">
        Personal Finance Tracker
      </h1>

      {/* Logout Button */}
      <button
        onClick={logout}
        className="mt-2 sm:mt-0 bg-red-500 text-sm sm:text-base md:text-lg px-3 sm:px-4 md:px-6 py-2 sm:py-2 md:py-3 rounded hover:bg-red-600 transition"
      >
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
