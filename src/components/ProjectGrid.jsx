import React, { useState, useMemo } from 'react';
import { projectsData } from '../data/projects.js';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ExternalLink, SlidersHorizontal, Eye, Box, AlertCircle } from 'lucide-react';

export default function ProjectGrid() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Systems');
  const [viewMode, setViewMode] = useState('all');

  const categories = useMemo(() => {
    return ['All Systems', ...Array.from(new Set(projectsData.map(p => p.category)))];
  }, []);

  const filteredProjects = useMemo(() => {
    return projectsData.filter(project => {
      const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            project.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All Systems' || project.category === selectedCategory;
      const matchesView = viewMode === 'all' || project.featured;

      return matchesSearch && matchesCategory && matchesView;
    });
  }, [searchQuery, selectedCategory, viewMode]);

  return (
    <section id="demos" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 bg-slate-950 min-h-screen">
      
      {/* Filtering Header Interface */}
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between border-b border-slate-800/80 pb-8">
        <div>
          <h2 className="text-xl font-extrabold tracking-tight text-white flex items-center gap-2.5 uppercase font-mono text-sm">
            <Box size={18} className="text-indigo-400" /> Platform Deployment Ecosystem
          </h2>
          <p className="text-xs text-slate-500 mt-1 font-medium">
            Isolated execution nodes verifying frontend integrity parameters across system architectures.
          </p>
        </div>

        {/* View Segment Matrix Switches */}
        <div className="flex bg-slate-900 border border-slate-800 p-1 rounded-xl self-start">
          <button 
            onClick={() => setViewMode('all')}
            className={`px-4 py-2 text-xs font-bold tracking-wider uppercase rounded-lg transition-all ${viewMode === 'all' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-slate-200'}`}
          >
            All Sandboxes ({projectsData.length})
          </button>
          <button 
            onClick={() => setViewMode('featured')}
            className={`px-4 py-2 text-xs font-bold tracking-wider uppercase rounded-lg transition-all ${viewMode === 'featured' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-slate-200'}`}
          >
            Core Featured
          </button>
        </div>
      </div>

      {/* Control Configuration Panels */}
      <div className="mt-8 flex flex-col gap-4 lg:flex-row lg:items-center">
        {/* Search Bar Input */}
        <div className="relative flex-1">
          <Search className="absolute top-3.5 left-4 h-4 w-4 text-slate-500" />
          <input
            type="text"
            placeholder="Query system configurations, endpoints, or keywords..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-slate-800 bg-slate-900/30 pl-11 pr-4 py-3 text-xs font-medium text-white outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 placeholder:text-slate-600 transition-all font-mono"
          />
        </div>

        {/* Category Horizontal Scrolling Tracks */}
        <div id="categories" className="flex items-center gap-2 overflow-x-auto pb-3 lg:pb-0 scrollbar-none">
          <div className="flex items-center text-slate-600 pr-2 border-r border-slate-800 text-xs font-bold gap-1.5 uppercase font-mono">
            <SlidersHorizontal size={12} /> Filter:
          </div>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`whitespace-nowrap rounded-lg px-3.5 py-2 text-xs font-bold tracking-wide uppercase transition-all ${
                selectedCategory === cat 
                  ? 'bg-slate-100 text-slate-950 font-bold shadow-md' 
                  : 'bg-slate-900/50 text-slate-400 border border-slate-800/80 hover:bg-slate-800 hover:text-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Primary Display Layout System Grid */}
      <motion.div layout className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              whileHover={{ y: -5, borderColor: 'rgb(99, 102, 241)' }}
              key={project.title}
              className="flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-800/80 bg-gradient-to-b from-slate-900/60 to-slate-950/40 p-6 shadow-xl backdrop-blur-md transition-all duration-300 group"
            >
              <div>
                {/* Upper Metadata Ribbon */}
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center rounded-md bg-indigo-500/10 border border-indigo-500/20 px-2.5 py-0.5 text-[10px] font-bold tracking-wider uppercase text-indigo-400 font-mono">
                    {project.category}
                  </span>
                  <div className="flex items-center gap-1.5 rounded-full bg-slate-950 px-2.5 py-1 border border-slate-800">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                    </span>
                    <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase font-mono">
                      {project.status}
                    </span>
                  </div>
                </div>

                {/* Card Main Title & Deep Descriptions */}
                <h3 className="mt-5 text-base font-extrabold text-white tracking-tight group-hover:text-indigo-300 transition-colors duration-200">
                  {project.title}
                </h3>
                <p className="mt-2 text-xs text-slate-400 leading-relaxed font-medium line-clamp-3">
                  {project.description}
                </p>
              </div>

              {/* Lower Technical Stack Matrix Elements */}
              <div className="mt-6 pt-4 border-t border-slate-900">
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {project.tech.map((t) => (
                    <span key={t} className="text-[9px] font-bold tracking-widest bg-slate-900 text-slate-500 border border-slate-800 px-2 py-0.5 rounded font-mono uppercase">
                      {t}
                    </span>
                  ))}
                </div>

                {/* System Open Execution Action Target */}
                <a
                  href={project.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 border border-slate-800 hover:bg-indigo-600 hover:border-indigo-500 px-4 py-3 text-xs font-bold tracking-wider uppercase text-slate-300 hover:text-white transition-all shadow-md group/btn"
                >
                  <Eye size={12} className="text-slate-500 group-hover/btn:text-white" />
                  Initialize Demo Node
                  <ExternalLink size={11} className="text-slate-600 group-hover/btn:text-white transition-colors ml-auto" />
                </a>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Exception Fallback Display System */}
      {filteredProjects.length === 0 && (
        <div className="text-center py-20 border border-dashed border-slate-800 rounded-3xl mt-8 bg-slate-900/10">
          <AlertCircle className="mx-auto text-slate-700 mb-3" size={32} />
          <h3 className="text-xs font-bold tracking-wider uppercase text-slate-400 font-mono">Zero matching runtimes identified</h3>
          <p className="text-[11px] text-slate-600 mt-1">Modify your search query parameters or reset system filters.</p>
        </div>
      )}
    </section>
  );
}