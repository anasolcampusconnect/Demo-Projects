import React from 'react';
import { motion } from 'framer-motion';
import { projectsData } from '../data/projects.js';
import { LayoutGrid, CheckCircle2, Box, Command } from 'lucide-react';

export default function Stats() {
  const totalCount = projectsData.length;
  const uniqueCategories = Array.from(new Set(projectsData.map(p => p.category))).length;
  
  const statistics = [
    { label: 'Registered Architectures', value: totalCount, icon: LayoutGrid, glow: 'from-violet-500/20 to-transparent', color: 'text-violet-400 border-violet-500/30' },
    { label: 'Active Sandbox Nodes', value: totalCount, icon: CheckCircle2, glow: 'from-emerald-500/20 to-transparent', color: 'text-emerald-400 border-emerald-500/30' },
    { label: 'Strategic Domain Modules', value: uniqueCategories, icon: Box, glow: 'from-cyan-500/20 to-transparent', color: 'text-cyan-400 border-cyan-500/30' },
    { label: 'Core Technology Matrix', value: 'VANILLA JS', icon: Command, glow: 'from-amber-500/20 to-transparent', color: 'text-amber-400 border-amber-500/30' },
  ];

  return (
    <section className="px-4 py-6 sm:px-6 lg:px-8 bg-slate-950">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {statistics.map((stat, idx) => (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              key={idx}
              className={`relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/40 p-6 backdrop-blur-md`}
            >
              {/* Corner Glow Mask Mapping */}
              <div className={`absolute -top-12 -right-12 h-24 w-24 rounded-full bg-gradient-to-br ${stat.glow} blur-xl opacity-60`} />
              
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[10px] font-bold tracking-widest text-slate-500 uppercase font-mono">
                    {stat.label}
                  </p>
                  <h3 className="mt-3 text-2xl font-black text-white sm:text-3xl tracking-tight">
                    {stat.value}
                  </h3>
                </div>
                <div className={`rounded-xl border p-2.5 ${stat.color} bg-slate-950`}>
                  <stat.icon size={18} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}