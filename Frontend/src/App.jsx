import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

// Import your Pages
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";

// Import your Components
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import MissionControl from "./Components/MissionControl";

// 1. Logic Wrapper (Handles State and Routing Context)
const AppContent = () => {
  const [user, setUser] = useState(null);
  const location = useLocation();

  // Persistence: Keep user logged in on refresh
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const hideLayout =
    location.pathname === "/login" || location.pathname === "/signup";

  return (
    <>
      {!hideLayout && <Navbar user={user} setUser={setUser} />}

      <Routes>
        <Route path="/" element={<Home user={user} />} />

        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/signup" element={<Signup setUser={setUser} />} />
        <Route path="/dashboard" element={<MissionControl />} />
      </Routes>

      {!hideLayout && <Footer />}
    </>
  );
};

// 2. THE MAIN APP FUNCTION (Missing previously)
const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

// 3. THE DEFAULT EXPORT (The fix for your SyntaxError)
export default App;
