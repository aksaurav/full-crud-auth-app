import React from "react";
import { Users, Rocket, Milestone, Zap } from "lucide-react";
import { motion } from "framer-motion"; // For animations

const GalaxyStatus = ({ missionCount }) => {
  const stats = [
    {
      label: "Active Pilots",
      value: "1,204",
      icon: <Users size={20} className="text-blue-400" />,
      suffix: "Online",
    },
    {
      label: "Missions Launched",
      value: missionCount || "0",
      icon: <Rocket size={20} className="text-indigo-400" />,
      suffix: "Confirmed",
    },
    {
      label: "Light Years",
      value: "4.2M",
      icon: <Milestone size={20} className="text-cyan-400" />,
      suffix: "Traveled",
    },
    {
      label: "System Load",
      value: "99.9",
      icon: <Zap size={20} className="text-yellow-400" />,
      suffix: "% Stable",
    },
  ];

  // Animation variants for the container and items
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }, // Delay between each card
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section className="w-full flex justify-center py-20 relative">
      {/* SECTION BACKGROUND: A subtle radial gradient to create focus in the middle */}
      <div className="absolute inset-0 bg-radial-at-c from-blue-900/10 via-transparent to-transparent -z-10"></div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }} // Animates only the first time you scroll to it
        className="w-full max-w-6xl px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover={{ scale: 1.05, translateY: -5 }} // Hover animation
            className="relative group bg-slate-950/60 backdrop-blur-2xl border border-white/10 p-8 rounded-3xl shadow-[0_0_30px_rgba(0,0,0,0.5)] flex flex-col items-center text-center transition-colors hover:border-blue-500/40"
          >
            {/* Top Glowing Ornament */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-blue-500 to-transparent shadow-[0_0_10px_#3b82f6]"></div>

            {/* Icon Circle */}
            <div className="p-4 mb-4 bg-blue-500/10 rounded-full border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
              {stat.icon}
            </div>

            <div>
              <p className="text-[10px] font-bold text-blue-400/60 uppercase tracking-[0.3em] mb-1">
                {stat.label}
              </p>
              <h2 className="text-4xl font-black tracking-tighter text-white mb-1">
                {stat.value}
              </h2>
              <p className="text-[9px] text-gray-500 font-mono uppercase tracking-widest">
                {stat.suffix}
              </p>
            </div>

            {/* Scanning Line Animation Effect */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
              <div className="absolute top-0 left-0 w-full h-[100%] bg-gradient-to-b from-blue-500/5 to-transparent -translate-y-full group-hover:animate-scan"></div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default GalaxyStatus;
