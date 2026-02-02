import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Rocket,
  Trash2,
  Edit3,
  ShieldAlert,
  Globe,
  Clock,
  X,
  Save,
  Activity,
  Zap,
} from "lucide-react";
import { baseUrl } from "../Url";

const MissionControl = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [mission, setMission] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // States for the Edit functionality
  const [isEditing, setIsEditing] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDesc, setEditDesc] = useState("");

  // States for the delete
  const [deletedTitle, setDeletedTitle] = useState("");
  const [deletedDescription, setDeletedDescription] = useState("");

  const fetchMission = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${baseUrl}/api/mission`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (response.ok) setMission(data);
    } catch (error) {
      console.error(`Radar Failure: Could not fetch mission`, error);
    } finally {
      setTimeout(() => setIsLoading(false), 1200);
    }
  };

  useEffect(() => {
    fetchMission();
  }, []);

  const handleMission = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${baseUrl}/mission/launch`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, description }),
      });
      if (response.ok) {
        setTitle("");
        setDescription("");
        fetchMission();
      }
    } catch (error) {
      console.log(`Mission failed!`, error);
    }
  };

  const startEdit = (m) => {
    setIsEditing(m._id);
    setEditTitle(m.title);
    setEditDesc(m.description);
  };

  const handleUpdate = async (id) => {
    console.log(`Initiating update for ID: `, id);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${baseUrl}/api/mission/update/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title: editTitle, description: editDesc }),
      });

      if (response.ok) {
        setIsEditing(null); // Close the edit UI
        fetchMission(); // Refresh the list
      } else {
        const errorData = await response.json();
        alert(`Update Failed: ${errorData.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Update failed", error);
    }
  };

  const deleteMission = async (id) => {
    if (!window.confirm("Abort mission?")) return;
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${baseUrl}/api/mission/abort/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      body: JSON.stringify({
        title: deletedTitle,
        description: deletedDescription,
      });

      if (response.ok) {
        fetchMission();
      } else {
        const errorData = await response.json();
        alert(`Abort Failed: ${errorData.message || "Unauthorized Access"}`);
      }
    } catch (error) {
      console.error("Communication blackout: Delete failed", error);
    }
  };

  return (
    <div className="relative min-h-screen w-full text-white overflow-x-hidden bg-[#020617]">
      {/* 1. LOADING OVERLAY */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            exit={{ opacity: 0, scale: 1.1 }}
            className="fixed inset-0 z-[100] bg-[#020617] flex flex-col items-center justify-center"
          >
            <div className="relative">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                className="w-24 h-24 border-2 border-blue-500/20 rounded-full border-t-blue-500"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <Rocket className="text-blue-400 animate-pulse" size={32} />
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-8 text-center"
            >
              <h2 className="text-blue-400 font-mono tracking-[0.4em] uppercase text-sm">
                Establishing Orbital Uplink
              </h2>
              <div className="mt-4 w-64 h-[1px] bg-blue-900/50 relative overflow-hidden">
                <motion.div
                  animate={{ x: [-256, 256] }}
                  transition={{
                    repeat: Infinity,
                    duration: 1.5,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-blue-400 to-transparent"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. BACKGROUND VIDEO & EFFECTS */}
      <div className="fixed inset-0 -z-30 w-full h-full overflow-hidden bg-black">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute min-w-full min-h-full object-cover opacity-30"
        >
          <source
            src="https://cdn.pixabay.com/video/2019/10/11/27770-365891067_large.mp4"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-80" />
      </div>

      {/* 3. MAIN CONTENT */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isLoading ? 0 : 1, y: isLoading ? 20 : 0 }}
        className="flex flex-col items-center relative z-10 px-4 md:px-8 pt-32 pb-12"
      >
        <div className="w-full max-w-7xl">
          <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-blue-900/30 pb-8">
            <div className="flex items-center gap-5">
              <div className="p-4 bg-blue-600/10 rounded-2xl border border-blue-500/30 shadow-[0_0_20px_rgba(59,130,246,0.2)]">
                <Rocket className="text-blue-400" size={36} />
              </div>
              <div>
                <h1 className="text-5xl font-black tracking-tighter uppercase italic bg-gradient-to-r from-white via-blue-100 to-blue-500 bg-clip-text text-transparent">
                  Mission Control
                </h1>
                <div className="flex items-center gap-3 mt-1">
                  <span className="flex items-center gap-1 text-green-500 text-[10px] font-mono tracking-widest uppercase">
                    <Activity size={12} /> Live Link
                  </span>
                  <span className="text-blue-300/40 text-[10px] font-mono tracking-widest uppercase">
                    Sector: 7-G / Command
                  </span>
                </div>
              </div>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* INPUT PANEL */}
            <div className="lg:col-span-4 lg:sticky lg:top-32">
              <div className="bg-slate-900/40 backdrop-blur-2xl border border-white/5 p-8 rounded-[2rem] shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
                <h2 className="text-xl font-bold mb-8 flex items-center gap-3 text-blue-100 uppercase">
                  <Globe className="text-blue-400" size={22} /> Initiate
                  Deployment
                </h2>
                <form className="space-y-6" onSubmit={handleMission}>
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono text-blue-400/60 uppercase tracking-widest ml-1">
                      Designation
                    </label>
                    <input
                      type="text"
                      value={title}
                      required
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-white focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 outline-none transition-all"
                      placeholder="e.g. Project Icarus"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono text-blue-400/60 uppercase tracking-widest ml-1">
                      Directives
                    </label>
                    <textarea
                      value={description}
                      required
                      rows="4"
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-white focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 outline-none transition-all resize-none"
                      placeholder="Define mission parameters..."
                    />
                  </div>
                  <motion.button
                    whileHover={{
                      scale: 1.02,
                      boxShadow: "0 0 30px rgba(37,99,235,0.3)",
                    }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-500 py-4 rounded-xl font-black uppercase italic tracking-widest flex items-center justify-center gap-3 transition-all shadow-lg text-white"
                  >
                    <Zap size={20} /> Launch Mission
                  </motion.button>
                </form>
              </div>
            </div>

            {/* FEED PANEL */}
            <div className="lg:col-span-8 space-y-6">
              <div className="flex justify-between items-center mb-2 px-2">
                <h2 className="text-xl font-bold flex items-center gap-3 text-indigo-100 uppercase tracking-tighter italic">
                  <ShieldAlert className="text-indigo-400" size={22} /> Active
                  Deployments
                </h2>
                <div className="flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 px-4 py-1.5 rounded-full">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                  <span className="text-[10px] font-mono text-blue-300 font-bold uppercase tracking-widest">
                    {mission.length} Online
                  </span>
                </div>
              </div>

              <div className="grid gap-5">
                {mission.length > 0 ? (
                  mission.map((m, index) => (
                    <motion.div
                      key={m._id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="group bg-slate-900/30 backdrop-blur-md border border-white/5 p-6 rounded-2xl hover:border-blue-500/30 transition-all flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
                    >
                      {isEditing === m._id ? (
                        <div className="flex-1 w-full space-y-4">
                          <input
                            className="w-full bg-black/60 border border-blue-500/50 rounded-xl p-3 text-white outline-none focus:ring-2 focus:ring-blue-500/20"
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                          />
                          <textarea
                            className="w-full bg-black/60 border border-blue-500/50 rounded-xl p-3 text-white outline-none focus:ring-2 focus:ring-blue-500/20 resize-none"
                            value={editDesc}
                            onChange={(e) => setEditDesc(e.target.value)}
                          />
                          <div className="flex gap-3">
                            <button
                              onClick={() => handleUpdate(m._id)}
                              className="bg-green-600 hover:bg-green-500 text-white px-5 py-2 rounded-lg font-bold flex items-center gap-2 text-xs transition-colors"
                            >
                              <Save size={14} /> Update Files
                            </button>
                            <button
                              onClick={() => setIsEditing(null)}
                              className="bg-white/5 hover:bg-white/10 text-gray-400 px-5 py-2 rounded-lg border border-white/10 flex items-center gap-2 text-xs transition-colors"
                            >
                              <X size={14} /> Abort Edit
                            </button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className="flex-1">
                            <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-blue-400 transition-colors mb-2">
                              {m.title}
                            </h3>
                            <p className="text-gray-400 text-sm leading-relaxed mb-4 max-w-2xl">
                              {m.description}
                            </p>
                            <div className="flex flex-wrap items-center gap-6 font-mono">
                              <span className="flex items-center gap-2 text-[10px] text-gray-500 uppercase tracking-widest">
                                <Clock size={12} className="text-blue-500/50" />
                                {new Date(m.createdAt).toLocaleDateString()}
                              </span>
                              <span className="text-[10px] text-blue-500/50 uppercase tracking-widest border-l border-white/10 pl-6 font-bold">
                                Pilot: {m.author?.username || "Ghost"}
                              </span>
                            </div>
                          </div>
                          <div className="flex gap-3 w-full md:w-auto border-t md:border-t-0 md:border-l border-white/5 pt-4 md:pt-0 md:pl-6">
                            <button
                              onClick={() => startEdit(m)}
                              className="flex-1 md:flex-none p-3 rounded-xl bg-blue-500/10 hover:bg-blue-600/30 text-blue-400 border border-blue-500/20 transition-all"
                            >
                              <Edit3 size={18} />
                            </button>
                            <button
                              onClick={() => deleteMission(m._id)}
                              className="flex-1 md:flex-none p-3 rounded-xl bg-red-500/10 hover:bg-red-600/30 text-red-400 border border-red-500/20 transition-all"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </>
                      )}
                    </motion.div>
                  ))
                ) : (
                  <div className="text-center py-24 border-2 border-dashed border-white/5 rounded-[2rem] bg-white/[0.02]">
                    <Rocket className="mx-auto text-white/10 mb-4" size={48} />
                    <p className="text-gray-500 font-mono text-xs uppercase tracking-[0.2em]">
                      No active missions found.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default MissionControl;
