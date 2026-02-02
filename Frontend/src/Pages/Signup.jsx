import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { baseUrl } from "../Url";

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "", // Added to track the re-type field
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // 1. FIXED: Handle input changes correctly
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 2. Added validation for matching passwords
    if (formData.password !== formData.confirmPassword) {
      return setMessage("Passwords do not match. Check your coordinates.");
    }

    try {
      const res = await fetch(`${baseUrl}/api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // We only send the fields the backend needs (omit confirmPassword)
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(
          `Welcome aboard, ${data.user.firstName}! Ignition successful.`,
        );
        // Wait 2 seconds so they can see the success message before redirecting
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setMessage(data.message || "Launch failed.");
      }
    } catch (error) {
      console.error(`Signup Error`, error);
      setMessage(`Communication breakdown with the server`);
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
            src="https://cdn.pixabay.com/video/2015/08/07/2-135653517_large.mp4"
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
            <h2 className="text-3xl font-semibold text-white mb-2">
              Create Account
            </h2>
            <p className="text-gray-400">
              Join the interstellar journey today.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex gap-4">
              <div className="w-1/2">
                <label className="block text-xs font-medium text-blue-400 uppercase mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 transition-all"
                  placeholder="Neil"
                  required
                />
              </div>
              <div className="w-1/2">
                <label className="block text-xs font-medium text-blue-400 uppercase mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 transition-all"
                  placeholder="Armstrong"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-blue-400 uppercase mb-1">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 transition-all"
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
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 transition-all"
                placeholder="••••••••"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-blue-400 uppercase mb-1">
                Re-type Password
              </label>
              <input
                type="password"
                name="confirmPassword" // Corrected name
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 transition-all"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold py-3 rounded-lg mt-4 shadow-lg shadow-blue-500/20 active:scale-[0.98] transition-all"
            >
              IGNITION & SIGNUP
            </button>
          </form>

          {message && (
            <p
              className={`mt-4 text-center text-sm font-medium ${
                message.includes("Success") || message.includes("Welcome")
                  ? "text-green-400"
                  : "text-red-400"
              }`}
            >
              {message}
            </p>
          )}

          <p className="mt-6 text-center text-gray-500 text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-400 hover:underline">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
