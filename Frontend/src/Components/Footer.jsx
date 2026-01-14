import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full bg-black border-t border-white/10 relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50"></div>

      <div className="max-w-7xl mx-auto px-6 py-10 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Brand/Logo Section */}
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 uppercase tracking-widest">
              Cosmos Auth
            </h2>
            <p className="text-gray-500 text-sm mt-1 tracking-wide">
              Exploring the digital frontier.
            </p>
          </div>

          {/* Quick Links */}
          <nav className="flex gap-8">
            <Link
              to="/"
              className="text-gray-400 hover:text-blue-400 transition-colors text-sm uppercase tracking-tighter"
            >
              Home
            </Link>
            <Link
              to="/signup"
              className="text-gray-400 hover:text-blue-400 transition-colors text-sm uppercase tracking-tighter"
            >
              Join
            </Link>
            <Link
              to="/login"
              className="text-gray-400 hover:text-blue-400 transition-colors text-sm uppercase tracking-tighter"
            >
              Portal
            </Link>
          </nav>

          {/* Copyright/Legal */}
          <div className="text-gray-400 text-[10px] uppercase tracking-[0.2em]">
            © 2024 Interstellar Systems • All Rights Reserved
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
