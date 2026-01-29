import React from "react";
import { motion } from "framer-motion";
import { Database, Shield, Layout, Globe } from "lucide-react";

const TechArchitecture = () => {
  const layers = [
    { title: "Neuro-Link Core", tech: "Node.js / Express", icon: Database },
    { title: "Quantum Storage", tech: "MongoDB Cluster", icon: Shield },
    { title: "Visual HUD", tech: "React / Framer", icon: Layout },
  ];

  return (
    <section className="py-32 bg-gradient-to-b from-transparent via-blue-900/5 to-transparent">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter text-white">
            System Architecture
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto mt-4 rounded-full" />
        </div>

        <div className="relative flex flex-col items-center">
          {/* Vertical Connecting Line */}
          <div className="absolute top-0 bottom-0 w-[2px] bg-gradient-to-b from-blue-500/0 via-blue-500/50 to-blue-500/0" />

          {layers.map((layer, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className={`relative z-10 flex flex-col items-center mb-16 last:mb-0`}
            >
              <div className="p-6 bg-slate-950 border-2 border-blue-500/20 rounded-full shadow-[0_0_30px_rgba(59,130,246,0.1)] group hover:border-blue-500 transition-all">
                <layer.icon
                  className="text-blue-400 group-hover:scale-110 transition-transform"
                  size={40}
                />
              </div>
              <div className="mt-4 text-center">
                <h4 className="text-white font-bold uppercase tracking-widest">
                  {layer.title}
                </h4>
                <p className="text-blue-500 font-mono text-xs mt-1">
                  {layer.tech}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechArchitecture;
