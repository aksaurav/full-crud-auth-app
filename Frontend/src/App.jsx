import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";

// ... (Your other imports stay the same)
import AstroChat from "./Components/AstroChat"; // <-- ADD THIS IMPORT

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
    <div className="min-h-screen w-full text-white selection:bg-blue-500/30 bg-[#020617] relative">
      {/* 1. NAVIGATION */}
      {!isAuthPage && <Navbar user={user} setUser={setUser} />}

      {/* 2. MAIN CONTENT AREA */}
      <main>
        <Routes>
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

      {/* 4. AI CHATBOT (COMM-LINK) */}
      {/* This only shows if NOT on login/signup page */}
      {!isAuthPage && <AstroChat />}
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
