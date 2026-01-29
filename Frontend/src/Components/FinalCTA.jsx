import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Power } from "lucide-react";

const FinalCTA = () => {
  return (
    <section className="py-32 px-6">
      <motion.div
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 40 }}
        className="max-w-5xl mx-auto rounded-[3rem] p-12 md:p-20 bg-gradient-to-br from-blue-600 to-indigo-900 relative overflow-hidden text-center group"
      >
        {/* Decorative Grid Overlay */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/10 blur-[80px] rounded-full" />

        <h2 className="relative z-10 text-4xl md:text-6xl font-black italic uppercase tracking-tighter text-white mb-8">
          Ready for <br /> Immediate Launch?
        </h2>

        <p className="relative z-10 text-blue-100/70 text-lg md:text-xl max-w-xl mx-auto mb-12">
          Join the rank of elite commanders. Secure your pilot credentials today
          and take control of your orbital operations.
        </p>

        <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-6">
          <Link to="/register">
            <motion.button
              whileHover={{
                scale: 1.05,
                backgroundColor: "#ffffff",
                color: "#2563eb",
              }}
              whileTap={{ scale: 0.95 }}
              className="px-12 py-5 bg-transparent border-2 border-white text-white rounded-2xl font-black uppercase italic tracking-widest transition-colors flex items-center gap-3"
            >
              <Power size={20} /> Register Terminal
            </motion.button>
          </Link>
        </div>
      </motion.div>
    </section>
  );
};

export default FinalCTA;
