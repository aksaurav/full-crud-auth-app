import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      {/* 1. VIDEO BACKGROUND */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        {/* Using a high-quality direct link for testing */}
        <source
          src="https://cdn.pixabay.com/video/2016/08/24/4788-180289892_large.mp4"
          type="video/mp4"
        />
      </video>

      {/* 2. OVERLAY (Crucial for text readability) */}
      <div className="absolute inset-0 bg-black/60 z-10"></div>

      {/* 3. OPTIONAL: VIGNETTE EFFECT (Darker edges) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle,_transparent_20%,_black_90%)] z-10 opacity-70"></div>

      {/* 4. MAIN CONTENT (Lifted above the video and overlay) */}
      <div className="relative z-20 text-center px-6 max-w-5xl">
        <div className="inline-block px-4 py-1.5 mb-6 rounded-full border border-blue-400/30 bg-blue-500/10 text-blue-300 text-[10px] font-bold tracking-[0.4em] uppercase">
          Mission Control Active
        </div>

        <h1 className="text-5xl md:text-8xl font-black text-white leading-tight tracking-tighter mb-6">
          LIMITLESS <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-500">
            CONNECTIVITY
          </span>
        </h1>

        <p className="text-blue-100/70 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed font-light">
          A secure gateway to your interstellar data. Manage your profile with
          advanced authentication and high-speed CRUD operations.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <Link
            to="/signup"
            className="px-12 py-4 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-500 transition-all duration-300 shadow-[0_0_25px_rgba(37,99,235,0.4)] active:scale-95"
          >
            START JOURNEY
          </Link>

          <Link
            to="/login"
            className="px-12 py-4 bg-transparent border border-white/30 text-white font-bold rounded-full hover:bg-white/10 transition-all duration-300 backdrop-blur-sm active:scale-95"
          >
            ACCESS PORTAL
          </Link>
        </div>
      </div>

      {/* 5. SCROLL INDICATOR (Purely for visual polish) */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1">
          <div className="w-1 h-2 bg-blue-400 rounded-full"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
