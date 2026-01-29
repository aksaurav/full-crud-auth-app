import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";

// Pages
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Profile from "./Pages/Profile";

// Components
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import MissionControl from "./Components/MissionControl";
import GalaxyStatus from "./Components/GalaxyStatus";
import TelemetryFeatures from "./Components/TelemetryFeatures";

// New "Crazy" Landing Sections
import MissionLiveFeed from "./Components/MissionLiveFeed";
import TechArchitecture from "./Components/TechArchitecture";
import FinalCTA from "./Components/FinalCTA";

const AppContent = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/signup";

  if (loading) return null;

  return (
    <div className="min-h-screen w-full text-white selection:bg-blue-500/30 bg-[#020617]">
      {/* 1. NAVIGATION */}
      {!isAuthPage && <Navbar user={user} setUser={setUser} />}

      {/* 2. MAIN CONTENT AREA */}
      <main>
        <Routes>
          {/* HOME PAGE: The complete cinematic sequence */}
          <Route
            path="/"
            element={
              <div className="flex flex-col">
                <Home user={user} />
                <GalaxyStatus />
                <TelemetryFeatures />

                <MissionLiveFeed />
                <TechArchitecture />
                <FinalCTA />
              </div>
            }
          />

          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/signup" element={<Signup setUser={setUser} />} />

          <Route
            path="/dashboard"
            element={user ? <MissionControl /> : <Navigate to="/login" />}
          />
          <Route
            path="/profile"
            element={user ? <Profile user={user} /> : <Navigate to="/login" />}
          />
        </Routes>
      </main>

      {/* 3. FOOTER */}
      {!isAuthPage && <Footer />}
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
