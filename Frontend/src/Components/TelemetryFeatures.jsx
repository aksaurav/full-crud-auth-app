import React from "react";
import { motion } from "framer-motion";
import { Shield, Zap, Satellite, Cpu } from "lucide-react";

const TelemetryFeatures = () => {
  const features = [
    {
      title: "Encrypted Uplink",
      desc: "Military-grade JWT protocols ensuring your mission data remains classified.",
      icon: <Shield className="text-cyan-400" />,
      tag: "SECURE",
    },
    {
      title: "Neural Processing",
      desc: "Lightning-fast Node.js backend handles complex trajectory calculations in milliseconds.",
      icon: <Cpu className="text-purple-400" />,
      tag: "CORE",
    },
    {
      title: "Global Coverage",
      desc: "Distributed MongoDB clusters keep your command center online across all sectors.",
      icon: <Satellite className="text-blue-400" />,
      tag: "NETWORK",
    },
    {
      title: "Warp-Speed UI",
      desc: "Optimized React components rendered via Vite for zero-latency interactions.",
      icon: <Zap className="text-yellow-400" />,
      tag: "PERFORMANCE",
    },
  ];

  return (
    <section className="w-full min-h-[60vh] flex flex-col items-center justify-center py-24 px-6">
      {/* Header with an animated "Radar Scan" line */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="text-center mb-16 relative"
      >
        <h2 className="text-sm font-mono tracking-[0.5em] text-blue-500 uppercase mb-4">
          System Capabilities
        </h2>
        <h3 className="text-4xl md:text-5xl font-bold text-white tracking-tight uppercase italic">
          Live Telemetry <span className="text-blue-600">&</span> Control
        </h3>
        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-24 h-1 bg-blue-600 rounded-full blur-sm"></div>
      </motion.div>

      {/* Feature Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl">
        {features.map((f, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ y: -10 }}
            className="group relative p-8 rounded-2xl bg-slate-900/40 backdrop-blur-md border border-white/5 hover:border-blue-500/50 transition-all duration-500"
          >
            {/* Background "Blueprint" Grid Effect */}
            <div
              className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity rounded-2xl pointer-events-none"
              style={{
                backgroundImage:
                  "radial-gradient(#3b82f6 1px, transparent 1px)",
                backgroundSize: "20px 20px",
              }}
            ></div>

            <div className="flex items-start gap-6 relative z-10">
              <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all">
                {f.icon}
              </div>

              <div className="space-y-2">
                <span className="text-[10px] font-mono text-blue-500/80 tracking-widest px-2 py-1 bg-blue-500/5 rounded border border-blue-500/20">
                  {f.tag}
                </span>
                <h4 className="text-xl font-bold text-white uppercase tracking-tight">
                  {f.title}
                </h4>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {f.desc}
                </p>
              </div>
            </div>

            {/* Animated Corner Border */}
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-transparent group-hover:border-blue-500 transition-all rounded-tr-2xl"></div>
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-transparent group-hover:border-blue-500 transition-all rounded-bl-2xl"></div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default TelemetryFeatures;
