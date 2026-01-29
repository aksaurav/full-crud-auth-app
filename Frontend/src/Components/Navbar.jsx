import React from "react"; // Removed unused useState
import { useNavigate, Link } from "react-router-dom";

const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate();

  // Unified the naming to handleLogout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);

    // Redirecting home after clearing state
    navigate("/");
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

        {/* Navigation Links - Only show certain links if logged in */}
        <div className="hidden md:flex items-center space-x-10">
          <Link
            to="/"
            className="text-sm font-medium text-gray-300 hover:text-blue-400 tracking-widest transition-colors"
          >
            HOME
          </Link>
          {user && (
            <>
              <Link
                to="/dashboard"
                className="text-sm font-medium text-gray-300 hover:text-blue-400 tracking-widest transition-colors"
              >
                LAUNCH MISSION
              </Link>
              <Link
                to="/profile"
                className="text-sm font-medium text-gray-300 hover:text-blue-400 tracking-widest transition-colors"
              >
                PROFILE
              </Link>
            </>
          )}
        </div>

        {/* Auth Buttons */}
        <div className="flex items-center space-x-6">
          {user ? (
            <>
              <span className="hidden sm:block text-gray-300 text-[15px] font-medium tracking-widest uppercase">
                Commander,{" "}
                <span className="text-blue-400">{user.firstName}</span>
              </span>
              <button
                onClick={handleLogout} // Name now matches the function above
                className="px-6 py-2 border border-red-500/40 text-red-400 text-xs font-bold rounded-full hover:bg-red-500 hover:text-white transition-all duration-300 active:scale-95 hover: cursor-pointer"
              >
                LOGOUT
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
              >
                LOG IN
              </Link>
              <Link
                to="/signup"
                className="px-6 py-2 bg-blue-600/20 border border-blue-500/50 text-blue-400 text-sm font-bold rounded-full hover:bg-blue-600 hover:text-white shadow-[0_0_20px_rgba(59,130,246,0.2)] transition-all duration-300"
              >
                LAUNCH
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
