import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Shield,
  Rocket,
  Calendar,
  Hash,
  Activity,
  Zap,
} from "lucide-react";
import { baseUrl } from "../Url";

const Profile = ({ user }) => {
  const [pilot, setPilot] = useState(user);
  const [stats, setStats] = useState({ total: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getInitialData = async () => {
      const token = localStorage.getItem("token");
      try {
        const statsRes = await fetch(`${baseUrl}/api/mission`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const statsData = await statsRes.json();
        if (statsRes.ok) setStats({ total: statsData.length });

        if (user?._id) {
          const pilotRes = await fetch(`${baseUrl}/api/users/${user._id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          const pilotData = await pilotRes.json();
          if (pilotRes.ok) setPilot(pilotData.user);
        }
      } catch (error) {
        console.error("Link Failure", error);
      } finally {
        setTimeout(() => setLoading(false), 1000); // Artificial delay for "Scanning" feel
      }
    };
    getInitialData();
  }, [user?._id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center space-y-4">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
          className="p-4 border-t-2 border-blue-500 rounded-full"
        >
          <Rocket className="text-blue-500" size={40} />
        </motion.div>
        <p className="text-blue-400 font-mono animate-pulse tracking-[0.3em]">
          SYNCHRONIZING BIO-DATA...
        </p>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen w-full bg-[#020617] flex items-center justify-center p-6 overflow-hidden pt-24">
      {/* BACKGROUND PARTICLES/GLOWS */}
      <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/20 blur-[150px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-600/20 blur-[150px] rounded-full animate-pulse" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="relative z-10 w-full max-w-2xl bg-slate-900/40 backdrop-blur-2xl border border-blue-500/20 rounded-[2.5rem] overflow-hidden shadow-[0_0_50px_rgba(30,58,138,0.3)]"
      >
        {/* TOP HUD BAR */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-6 text-[10px] text-blue-500/50 font-mono tracking-[0.2em] uppercase">
          <div className="flex items-center gap-1">
            <Activity size={10} /> System: Online
          </div>
          <div className="flex items-center gap-1">
            <Zap size={10} /> Sync: 99%
          </div>
        </div>

        {/* HEADER AREA */}
        <div className="h-48 bg-gradient-to-b from-blue-600/10 to-transparent border-b border-white/5 flex items-end p-10 relative overflow-hidden">
          {/* Animated Scanner Line */}
          <motion.div
            animate={{ top: ["0%", "100%", "0%"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="absolute left-0 w-full h-[2px] bg-blue-400/30 blur-sm z-20"
          />

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="w-28 h-28 rounded-3xl bg-slate-950 border-2 border-blue-500/50 flex items-center justify-center shadow-[0_0_30px_rgba(59,130,246,0.3)] translate-y-14 relative z-30 group"
          >
            <User
              size={56}
              className="text-blue-400 group-hover:text-blue-300 transition-colors"
            />
            <div className="absolute -inset-1 bg-blue-500/20 rounded-3xl blur opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.div>
        </div>

        <div className="p-10 pt-20">
          <div className="flex justify-between items-start">
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <h1 className="text-4xl font-black tracking-tighter uppercase italic bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent">
                {pilot?.firstName}
              </h1>
              <div className="flex items-center gap-2 mt-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-ping" />
                <p className="text-blue-400 font-mono text-xs tracking-widest">
                  RANK: ELITE COMMANDER
                </p>
              </div>
            </motion.div>
          </div>

          {/* STAGGERED GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
            {[
              {
                label: "Deployments",
                value: stats.total,
                icon: Rocket,
                color: "blue",
              },
              {
                label: "Security Clearance",
                value: "Alpha-9",
                icon: Shield,
                color: "indigo",
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + idx * 0.1 }}
                whileHover={{
                  y: -5,
                  backgroundColor: "rgba(255,255,255,0.05)",
                }}
                className="bg-white/5 border border-white/10 p-6 rounded-2xl transition-colors"
              >
                <div className="flex items-center gap-3 text-blue-400/60 mb-3">
                  <item.icon size={18} />
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em]">
                    {item.label}
                  </span>
                </div>
                <p className="text-3xl font-bold tracking-tight">
                  {item.value}
                </p>
              </motion.div>
            ))}
          </div>

          {/* SYSTEM INFO TABLE */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-10 space-y-4 pt-8 border-t border-white/5"
          >
            <div className="flex justify-between items-center group cursor-crosshair">
              <span className="text-gray-500 text-xs flex items-center gap-3 font-mono uppercase tracking-wider group-hover:text-blue-400 transition-colors">
                <Calendar size={14} /> Registry Hub
              </span>
              <span className="text-gray-300 text-sm font-medium">
                {pilot?.email}
              </span>
            </div>
            <div className="flex justify-between items-center group cursor-crosshair">
              <span className="text-gray-500 text-xs flex items-center gap-3 font-mono uppercase tracking-wider group-hover:text-blue-400 transition-colors">
                <Hash size={14} /> Neural ID
              </span>
              <span className="text-blue-500 font-mono text-xs opacity-80">
                {pilot?._id}
              </span>
            </div>
          </motion.div>

          {/* EDIT BUTTON */}
          <motion.button
            whileHover={{
              scale: 1.02,
              boxShadow: "0 0 20px rgba(59,130,246,0.4)",
            }}
            whileTap={{ scale: 0.98 }}
            className="w-full mt-10 bg-blue-600 py-4 rounded-2xl font-black uppercase italic tracking-widest text-sm shadow-lg transition-all"
          >
            Modify Pilot Credentials
          </motion.button>
        </div>

        {/* BOTTOM SCANLINE EFFECT */}
        <div className="h-1.5 w-full bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50 shadow-[0_0_15px_rgba(59,130,246,1)]" />
      </motion.div>
    </div>
  );
};

export default Profile;
