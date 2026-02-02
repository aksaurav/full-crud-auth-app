import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { baseUrl } from "../Url";

// 1. Destructure setUser from props so it updates the Global State in App.jsx
const Login = ({ setUser }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); // Clear previous messages

    try {
      const res = await fetch(`${baseUrl}api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        // 2. Persist data to LocalStorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        // 3. Update the Global State (This triggers the Navbar change)
        setUser(data.user);

        setMessage(
          `Welcome back, ${data.user.firstName}. Ignition successful!`,
        );

        // 4. Navigate home after a short delay
        setTimeout(() => navigate("/"), 2000);
      } else {
        // 5. Handle backend errors (e.g., Wrong Password)
        setMessage(data.message || "Unauthorized: Check your credentials.");
      }
    } catch (error) {
      console.error(`Login Error:`, error);
      setMessage(`Communication breakdown with the server.`);
    }
  };

  return (
    <div className="flex h-screen w-full bg-black overflow-hidden font-sans">
      {/* LEFT SIDE: VIDEO SECTION */}
      <div className="relative hidden md:flex md:w-1/2 h-full items-center justify-center border-r border-blue-900/30">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        >
          <source
            src="https://cdn.pixabay.com/video/2016/08/24/4788-180289892_large.mp4"
            type="video/mp4"
          />
        </video>

        <div className="relative z-10 text-center px-10">
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-4 uppercase tracking-widest">
            Cosmos Auth
          </h1>
          <p className="text-blue-200 text-lg font-light tracking-wide italic">
            "The universe is under no obligation to make sense to you."
          </p>
        </div>
      </div>

      {/* RIGHT SIDE: FORM SECTION */}
      <div className="w-full md:w-1/2 h-full flex items-center justify-center bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 via-black to-black px-6">
        <div className="w-full max-w-md p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_0_50px_rgba(59,130,246,0.2)]">
          <div className="mb-8">
            <h2 className="text-3xl font-semibold text-white mb-2">Log In</h2>
            <p className="text-gray-400">
              Join the interstellar journey today.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-medium text-blue-400 uppercase mb-1">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 transition-all"
                placeholder="astronomy@nasa.gov"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-blue-400 uppercase mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 transition-all"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold py-3 rounded-lg mt-4 shadow-lg shadow-blue-500/20 active:scale-[0.98] transition-all"
            >
              IGNITION & LOGIN
            </button>
          </form>

          {message && (
            <p
              className={`mt-4 text-center text-sm ${
                message.includes("successful")
                  ? "text-green-400"
                  : "text-red-400"
              }`}
            >
              {message}
            </p>
          )}

          <p className="mt-6 text-center text-gray-500 text-sm">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-400 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
