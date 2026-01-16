import React from "react";
import { Rocket, Trash2, Edit3, ShieldAlert, Globe, Clock } from "lucide-react";

const MissionControl = () => {
  const dummyMissions = [
    {
      _id: "1",
      title: "Voyager III",
      description: "Deep space exploration.",
      createdAt: new Date(),
    },
    {
      _id: "2",
      title: "Lunar Base Alpha",
      description: "Research station on the Moon.",
      createdAt: new Date(),
    },
  ];

  return (
    <div className="relative min-h-screen w-full text-white font-sans overflow-x-hidden">
      {/* VIDEO BACKGROUND */}
      <div className="fixed inset-0 -z-20 w-full h-full overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute min-w-full min-h-full object-cover opacity-60"
        >
          {/* Replace this URL with your video file path or a high-quality space loop */}
          <source
            src="https://cdn.pixabay.com/video/2019/10/11/27770-365891067_large.mp4"
            type="video/mp4"
          />
        </video>

        {/* DARK OVERLAY: This ensures your text is always readable against the video */}
        <div className="absolute inset-0 bg-black/70 -z-10"></div>
      </div>

      {/* MAIN CONTENT WRAPPER */}
      <div className="flex flex-col items-center">
        <div className="w-full max-w-7xl px-4 md:px-8 pt-40 pb-12">
          {/* HEADER */}
          <header className="mb-10 flex items-center gap-4 border-b border-blue-900/50 pb-6">
            <div className="p-3 bg-blue-600/20 rounded-full border border-blue-500/50 shadow-[0_0_15px_rgba(59,130,246,0.5)]">
              <Rocket className="text-blue-400" size={32} />
            </div>
            <div>
              <h1 className="text-4xl font-bold tracking-tighter uppercase italic text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">
                Mission Control
              </h1>
              <p className="text-blue-300/60 text-sm tracking-widest uppercase">
                Central Command Interface
              </p>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* FORM COLUMN */}
            <div className="lg:col-span-4 lg:sticky lg:top-24">
              <div className="bg-black/40 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-2xl">
                <h2 className="text-xl font-semibold mb-6 flex items-center gap-2 text-blue-400">
                  <Globe size={20} /> New Launch Sequence
                </h2>
                <form className="space-y-5">
                  <div>
                    <label className="block text-xs font-medium text-blue-400 uppercase mb-2">
                      Mission Name
                    </label>
                    <input
                      type="text"
                      className="w-full bg-black/60 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-blue-500 transition-all outline-none"
                      placeholder="e.g. Project Artemis"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-blue-400 uppercase mb-2">
                      Objectives
                    </label>
                    <textarea
                      rows="4"
                      className="w-full bg-black/60 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-blue-500 transition-all outline-none"
                      placeholder="Mission parameters..."
                    />
                  </div>
                  <button
                    type="button"
                    className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-all active:scale-95 shadow-[0_0_20px_rgba(37,99,235,0.4)]"
                  >
                    <Rocket size={18} /> INITIATE LAUNCH
                  </button>
                </form>
              </div>
            </div>

            {/* FEED COLUMN */}
            <div className="lg:col-span-8 space-y-4">
              <div className="flex justify-between items-center mb-4 px-2">
                <h2 className="text-xl font-semibold flex items-center gap-2 text-indigo-400">
                  <ShieldAlert size={20} /> Active Deployments
                </h2>
                <span className="text-xs bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full border border-blue-500/30 backdrop-blur-md">
                  {dummyMissions.length} ONLINE
                </span>
              </div>

              <div className="grid gap-4">
                {dummyMissions.map((mission) => (
                  <div
                    key={mission._id}
                    className="group bg-black/40 backdrop-blur-md hover:bg-black/60 border border-white/10 p-5 rounded-xl transition-all duration-300 flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
                  >
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-blue-100 group-hover:text-blue-400 transition-colors">
                        {mission.title}
                      </h3>
                      <p className="text-gray-300 text-sm mt-1">
                        {mission.description}
                      </p>
                      <div className="flex items-center gap-3 mt-3 text-[10px] text-gray-500 uppercase tracking-widest">
                        <span className="flex items-center gap-1">
                          <Clock size={12} /> {new Date().toLocaleDateString()}
                        </span>
                        <span className="text-blue-500/50 underline">
                          ID: {mission._id}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2 w-full md:w-auto">
                      <button className="flex-1 md:flex-none p-2 rounded-lg bg-white/5 hover:bg-indigo-600/30 border border-white/10 text-indigo-400 transition-all">
                        <Edit3 size={18} />
                      </button>
                      <button className="flex-1 md:flex-none p-2 rounded-lg bg-white/5 hover:bg-red-600/30 border border-white/10 text-red-400 transition-all">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MissionControl;
