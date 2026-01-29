import React from "react";
import { motion } from "framer-motion";
import { Radio, Globe } from "lucide-react";

const MissionLiveFeed = () => {
  const publicMissions = [
    {
      id: "TX-90",
      status: "STABLE",
      pilot: "Commander Aris",
      target: "Andromeda",
    },
    { id: "KJ-44", status: "WARP", pilot: "Pilot Nova", target: "Kepler-186" },
    {
      id: "OS-12",
      status: "ORBIT",
      pilot: "S. Commander Rex",
      target: "Lunar Base",
    },
  ];

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <div className="flex items-center gap-4 mb-12">
        <div className="p-2 bg-blue-500/20 rounded-lg">
          <Radio className="text-blue-400 animate-pulse" size={24} />
        </div>
        <div>
          <h2 className="text-2xl font-bold uppercase italic tracking-tighter text-white">
            Public Uplink Feed
          </h2>
          <p className="text-[10px] font-mono text-blue-500/60 uppercase tracking-[0.2em]">
            Intercepting global deployment data
          </p>
        </div>
      </div>

      <div className="grid gap-4">
        {publicMissions.map((m, i) => (
          <motion.div
            key={m.id}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="group flex flex-col md:flex-row items-center justify-between p-6 bg-slate-900/20 border border-white/5 rounded-2xl hover:bg-blue-600/5 transition-colors cursor-crosshair"
          >
            <div className="flex items-center gap-6">
              <span className="font-mono text-blue-500 text-sm font-bold tracking-widest">
                {m.id}
              </span>
              <div className="h-8 w-[1px] bg-white/10 hidden md:block" />
              <div>
                <p className="text-white font-bold text-lg uppercase italic">
                  {m.target} Deployment
                </p>
                <p className="text-xs text-gray-500 font-mono tracking-widest uppercase">
                  PILOT: {m.pilot}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 mt-4 md:mt-0">
              <span className="text-[10px] font-mono bg-blue-500/10 text-blue-400 border border-blue-500/20 px-3 py-1 rounded-full">
                STATUS: {m.status}
              </span>
              <Globe
                size={18}
                className="text-gray-600 group-hover:text-blue-500 transition-colors"
              />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default MissionLiveFeed;
