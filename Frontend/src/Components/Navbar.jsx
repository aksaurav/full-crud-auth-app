import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const handleLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setTimeout(() => navigate("/"), 2000);
  };
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/40 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo / Brand */}
        <Link to="/" className="flex items-center space-x-2 group">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center shadow-[0_0_15px_rgba(37,99,235,0.5)] group-hover:scale-110 transition-transform">
            <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
          </div>
          <span className="text-xl font-bold text-white tracking-[0.2em] uppercase">
            Cosmos<span className="text-blue-400">Auth</span>
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-10">
          <Link
            to="/"
            className="text-sm font-medium text-gray-300 hover:text-blue-400 tracking-widest transition-colors"
          >
            HOME
          </Link>
          <Link
            to="/mission"
            className="text-sm font-medium text-gray-300 hover:text-blue-400 tracking-widest transition-colors"
          >
            MISSION
          </Link>
          <Link
            to="/galaxy"
            className="text-sm font-medium text-gray-300 hover:text-blue-400 tracking-widest transition-colors"
          >
            GALAXY
          </Link>
        </div>

        {/* Auth Buttons */}
        <div className="flex items-center space-x-6">
          <Link
            to="/login"
            className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
          >
            LOG IN
          </Link>
          <Link
            to="/signup"
            className="px-6 py-2 bg-blue-600/20 border border-blue-500/50 text-blue-400 text-sm font-bold rounded-full hover:bg-blue-600 hover:text-white shadow-[0_0_20px_rgba(59,130,246,0.2)] transition-all duration-300 active:scale-95"
          >
            LAUNCH
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
