import React, { useState, useMemo } from 'react';
import { Search, Eye, ExternalLink, AlertCircle, ArrowRight, Key, User, Copy, Check, LayoutGrid, Briefcase, Code, Shield, Sparkles, SlidersHorizontal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { projectsData } from './data/projects.js';
import logoImg from './assets/logo.png';
import './App.css';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Projects');
  const [copiedField, setCopiedField] = useState(null);
  
  const handleCopy = (text, projectId, field) => {
    navigator.clipboard.writeText(text);
    setCopiedField({ projectId, field });
    setTimeout(() => setCopiedField(null), 2000);
  };

  const uniqueCategories = useMemo(() => {
    return ['All Projects', ...Array.from(new Set(projectsData.map(p => p.category)))];
  }, []);

  const filteredProjects = useMemo(() => {
    return projectsData.filter(project => {
      const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            project.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All Projects' || project.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const getTechColor = (tech) => {
    const colors = {
      'React': 'bg-blue-50 text-blue-600 border-blue-100',
      'Node.js': 'bg-green-50 text-green-600 border-green-100',
      'Python': 'bg-yellow-50 text-yellow-600 border-yellow-100',
      'Java': 'bg-red-50 text-red-600 border-red-100',
      'AWS': 'bg-orange-50 text-orange-600 border-orange-100',
      'MongoDB': 'bg-emerald-50 text-emerald-600 border-emerald-100',
      'PostgreSQL': 'bg-cyan-50 text-cyan-600 border-cyan-100',
      'Docker': 'bg-sky-50 text-sky-600 border-sky-100',
      'Kubernetes': 'bg-indigo-50 text-indigo-600 border-indigo-100',
    };
    return colors[tech] || 'bg-gray-50 text-gray-600 border-gray-100';
  };

  return (
    <div className="relative min-h-screen font-sans overflow-x-clip bg-slate-50/50">
      
      {/* --- BACKGROUND ANIMATIONS (Behind the grid) --- */}
      <div className="fixed inset-0 -z-10 bg-gradient-animate bg-gradient-to-br from-white via-blue-50 to-pink-50 animate-gradient-xy opacity-70" />
      <div className="fixed inset-0 -z-5 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
        <div className="absolute top-40 right-10 w-96 h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000" />
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-pink-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000" />
      </div>

      {/* --- NAVBAR --- */}
      <nav className="sticky top-0 z-50 w-full bg-slate-900 shadow-xl border-b border-slate-800">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div className="flex h-24 items-center justify-between">
            <div className="flex items-center gap-3">
              <img 
                src={logoImg} 
                alt="Anasol Consultancy Services" 
                className="h-32 w-auto object-contain"
                onError={(e) => {
                  e.target.style.display = 'none';
                  document.getElementById('logo-fallback').style.display = 'block';
                }}
              />
              <div id="logo-fallback" className="hidden">
                <div className="text-xl font-bold text-white tracking-wide">ANASOL</div>
                <div className="text-[9px] font-medium text-slate-400 tracking-widest uppercase">Consultancy Services</div>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-8">
              {['Home', 'Demo Projects', 'Categories', 'Contact'].map((item, idx) => (
                <a 
                  key={idx} 
                  href={item === 'Home' ? '#' : item === 'Demo Projects' ? '#projects' : item === 'Categories' ? '#projects' : 'https://campus-connect.anasol.co.in/contact'}
                  target={item === 'Contact' ? '_blank' : undefined}
                  rel={item === 'Contact' ? 'noopener noreferrer' : undefined}
                  className={`text-sm font-semibold transition-all duration-200 relative group ${item === 'Home' ? 'text-blue-400' : 'text-slate-300 hover:text-white'}`}
                >
                  {item}
                  {item === 'Home' && <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-blue-400 rounded-full" />}
                  <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-blue-400 rounded-full group-hover:w-full transition-all duration-300" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* --- PHOTOGRAPHIC HERO SECTION --- */}
      <section 
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2070&auto=format&fit=crop')`,
          backgroundPosition: 'center',
          backgroundSize: 'cover'
        }}
        className="relative w-full py-28 flex items-center justify-center bg-fixed shadow-2xl z-10"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/95 via-slate-900/80 to-slate-900/95 backdrop-blur-sm"></div>
        
        <div className="relative z-10 mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 backdrop-blur-md mb-8">
              <Sparkles size={14} className="text-blue-400" />
              <span className="text-xs font-bold text-blue-300 tracking-widest uppercase">Enterprise Demo Center</span>
            </div>
            
            <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl drop-shadow-lg">
              Welcome to <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Anasol</span>
            </h1>
            
            <p className="mt-8 text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-light">
              Explore and test our robust software architecture with <span className="text-blue-400 font-semibold">Industry-Leading Solutions</span> designed for the future.
            </p>
            
            <p className="mt-4 text-2xl text-slate-400 italic font-serif">
              "Where Logic Meets <span className="text-purple-400 font-bold not-italic">Execution</span>"
            </p>

            <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
              <a href="#projects" className="inline-flex items-center gap-2 px-8 py-4 text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full hover:from-blue-500 hover:to-indigo-500 transition-all duration-300 shadow-[0_0_20px_rgba(59,130,246,0.4)] hover:shadow-[0_0_30px_rgba(59,130,246,0.6)] transform hover:-translate-y-1">
                Explore Demos <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

          </motion.div>

          {/* Hero Stats */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="mt-24 grid grid-cols-2 gap-8 md:grid-cols-4 border-t border-slate-700/50 pt-12">
            {[
              { label: 'Active Demos', value: projectsData.length, icon: LayoutGrid },
              { label: 'Tech Categories', value: uniqueCategories.length - 1, icon: Code },
              { label: 'Enterprise Ready', value: '24/7', icon: Shield },
              { label: 'Support SLA', value: '99.9%', icon: Briefcase },
            ].map((stat, idx) => (
              <div key={idx} className="text-center group">
                <div className="flex justify-center mb-3 transform group-hover:scale-110 transition-transform duration-300">
                  <div className="p-3 bg-slate-800/50 rounded-2xl border border-slate-700/50 backdrop-blur-md">
                    <stat.icon size={24} className="text-blue-400" />
                  </div>
                </div>
                <div className="text-2xl font-black text-white tracking-tight">{stat.value}</div>
                <div className="text-[10px] font-bold tracking-widest uppercase text-slate-400 mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* --- DASHBOARD ECOSYSTEM SECTION --- */}
      <section id="projects" className="relative mx-auto max-w-[1400px] px-4 py-20 sm:px-6 lg:px-8">
        
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-4xl font-extrabold tracking-tight text-slate-900">Deployment Ecosystem</h2>
            <div className="mt-3 h-1.5 w-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
            <p className="mt-4 text-slate-600 font-medium max-w-2xl text-sm leading-relaxed">
              Browse and securely access our live staging environments. Each node demonstrates full-stack capabilities and enterprise architectures.
            </p>
          </div>
        </div>

        {/* Split Layout: Sidebar + Grid */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* LEFT SIDEBAR */}
          {/* LEFT SIDEBAR */}
          <aside className="w-full lg:w-[320px] shrink-0 lg:sticky lg:top-32 self-start z-20 flex flex-col gap-6">
            
            {/* Search Box */}
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 border border-white shadow-xl shadow-slate-200/50 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
              <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                <Search size={14} className="text-blue-500" /> Global Search
              </h3>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Find a system..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-2xl border-0 bg-slate-50 px-4 py-3.5 text-sm font-semibold text-slate-900 outline-none ring-1 ring-slate-200 focus:ring-2 focus:ring-blue-500 transition-all placeholder:text-slate-400 shadow-inner"
                />
              </div>
            </div>

            {/* Filter Categories */}
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 border border-white shadow-xl shadow-slate-200/50 hidden lg:block">
              <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                <SlidersHorizontal size={14} className="text-purple-500" /> Environments
              </h3>
              <div className="flex flex-col gap-1.5">
                {uniqueCategories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`text-left w-full rounded-2xl px-4 py-3 text-xs font-bold transition-all duration-300 flex items-center gap-3 ${
                      selectedCategory === cat 
                        ? 'bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-600 shadow-sm border border-blue-100' 
                        : 'bg-transparent text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    <div className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${selectedCategory === cat ? 'bg-blue-500 scale-150' : 'bg-slate-300'}`}></div>
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* RIGHT MAIN CONTENT (Projects Grid) */}
          <main className="w-full lg:flex-1">
            <AnimatePresence mode="popLayout">
              {filteredProjects.length > 0 ? (
                <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {filteredProjects.map((project, idx) => (
                    <motion.div
                      layout
                      initial={{ opacity: 0, scale: 0.95, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.4, delay: idx * 0.05 }}
                      key={project.title}
                      className="flex flex-col justify-between overflow-hidden rounded-[2rem] bg-white/90 backdrop-blur-sm border border-white shadow-xl shadow-slate-200/40 hover:shadow-2xl hover:shadow-blue-900/10 hover:-translate-y-1.5 transition-all duration-500 group relative"
                    >
                      {/* Gradient Hover Border */}
                      <div className="absolute inset-0 rounded-[2rem] border-2 border-transparent group-hover:border-blue-400/30 transition-colors duration-500 pointer-events-none"></div>

                      <div className="p-8">
                        {/* Status Badges */}
                        <div className="flex items-center justify-between mb-6">
                          <span className="inline-flex items-center rounded-full bg-blue-50 border border-blue-100 px-3.5 py-1.5 text-[10px] font-black tracking-widest uppercase text-blue-600">
                            {project.category}
                          </span>
                          <span className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                            {project.status}
                          </span>
                        </div>

                        {/* Title & Desc */}
                        <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors duration-300 leading-tight">
                          {project.title}
                        </h3>
                        <p className="mt-4 text-sm text-slate-500 leading-relaxed font-medium line-clamp-3">
                          {project.description}
                        </p>

                        {/* Interactive Credentials Box */}
                        {(project.username || project.password) && (
                          <div className="mt-6 bg-slate-50 rounded-2xl p-4 border border-slate-100 shadow-inner">
                            <div className="grid grid-cols-2 gap-4">
                              {project.username && (
                                <div className="flex flex-col gap-1.5">
                                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                                    <User size={12} /> Username
                                  </span>
                                  <div className="flex items-center justify-between bg-white px-3 py-2 rounded-xl border border-slate-200 shadow-sm">
                                    <span className="text-xs font-mono font-bold text-slate-700 truncate">{project.username}</span>
                                    <button onClick={() => handleCopy(project.username, project.title, 'username')} className="text-slate-400 hover:text-blue-500 transition-colors p-1">
                                      {copiedField?.projectId === project.title && copiedField?.field === 'username' ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                                    </button>
                                  </div>
                                </div>
                              )}
                              {project.password && (
                                <div className="flex flex-col gap-1.5">
                                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                                    <Key size={12} /> Password
                                  </span>
                                  <div className="flex items-center justify-between bg-white px-3 py-2 rounded-xl border border-slate-200 shadow-sm">
                                    <span className="text-xs font-mono font-bold text-slate-700 truncate">{project.password}</span>
                                    <button onClick={() => handleCopy(project.password, project.title, 'password')} className="text-slate-400 hover:text-blue-500 transition-colors p-1">
                                      {copiedField?.projectId === project.title && copiedField?.field === 'password' ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                                    </button>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Card Footer: Tech Stack & Button */}
                      <div className="mt-2 p-8 pt-0">
                        <div className="flex flex-wrap gap-2 mb-6">
                          {project.tech.map((tech) => (
                            <span key={tech} className={`text-[10px] font-extrabold px-3 py-1.5 rounded-lg border uppercase tracking-wider ${getTechColor(tech)}`}>
                              {tech}
                            </span>
                          ))}
                        </div>

                        <a href={project.url} target="_blank" rel="noopener noreferrer" className="relative flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-900 px-4 py-4 text-xs font-bold text-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-indigo-500 transition-all duration-500 shadow-lg group/btn overflow-hidden">
                          <Eye size={16} className="group-hover/btn:scale-110 transition-transform" />
                          <span className="tracking-wide uppercase">View Live Demo</span>
                          <ExternalLink size={14} className="absolute right-6 opacity-50 group-hover/btn:opacity-100 group-hover/btn:translate-x-1 transition-all" />
                        </a>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center py-32 px-4 border-2 border-dashed border-slate-200 rounded-[3rem] mt-2 bg-white/50 backdrop-blur-sm text-center">
                  <div className="h-20 w-20 bg-slate-100 rounded-full flex items-center justify-center mb-6">
                    <AlertCircle className="text-slate-400" size={40} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800">No Environments Found</h3>
                  <p className="text-sm text-slate-500 mt-2 max-w-md">We couldn't find any deployment nodes matching your search criteria. Please adjust your filters.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </main>
        </div>
      </section>

      {/* --- CORPORATE FOOTER --- */}
      
      <footer id="contact" className="relative mt-120 bg-slate-900 text-slate-300">
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-900 via-purple-400 to-pink-400" />
        <div className="mx-auto max-w-1xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-3">
              <div className="flex items-center gap-6 mb-4">
                <img src={logoImg} alt="Anasol" className="h-36 w-auto object-contain" />
                <div id="footer-logo-fallback" className="hidden"><div className="text-xl font-bold text-white">ANASOL</div></div>
              </div>
                    <p className="text-sm text-slate-100 leading-relaxed">Empowering the next generation of tech leaders with industry-ready skills and enterprise-grade solutions.</p>
              
            </div>

            <div>
              <h3 className="text-white text-sm font-bold mb-6 inline-block relative pb-2 tracking-widest uppercase">
                Quick Links
                <span className="absolute bottom-0 left-0 w-8 h-[2px] bg-purple-500"></span>
              </h3>
              <ul className="flex flex-col gap-4 text-sm font-medium">
                <li><a href="#" className="hover:text-blue-400 transition-colors">Home</a></li>
                <li><a href="https://campus-connect.anasol.co.in/contact" target="_blank" rel="noreferrer" className="hover:text-blue-400 transition-colors">Contact</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-white text-sm font-bold mb-6 inline-block relative pb-2 tracking-widest uppercase">
                Get in Touch
                <span className="absolute bottom-0 left-0 w-8 h-[2px] bg-pink-500"></span>
              </h3>
              <ul className="flex flex-col gap-5 text-sm font-medium">
                <li className="flex items-start gap-3">
                  <span className="text-lg mt-0.5">📍</span>
                  <span className="leading-relaxed text-slate-400">
                    Anasol Consultancy Services Pvt Ltd<br />
                    1016, 10th floor, DSL Abacus IT Park,<br />
                    Uppal, Hyderabad, 500039, India
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-lg">📧</span>
                  <a href="mailto:hr@anasolconsultancyservices.com" className="hover:text-blue-400 transition-colors text-slate-400">hr@anasolconsultancyservices.com</a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-white text-sm font-bold mb-6 inline-block relative pb-2 tracking-widest uppercase">
                Follow Us
                <span className="absolute bottom-0 left-0 w-8 h-[2px] bg-blue-500"></span>
              </h3>
              <p className="text-sm font-medium mb-6 text-slate-400">Stay connected with our community.</p>
              <div className="flex items-center gap-4">
                <a href="https://www.linkedin.com/company/anasol-consultancy-services/posts/?feedView=all" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="flex h-12 w-12 items-center justify-center rounded-full bg-[#2962ff]/10 text-[#2962ff] hover:bg-[#2962ff] hover:text-white transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                </a>
                <a href="https://www.instagram.com/anasol_consultancy_services" target="_blank" rel="noreferrer" aria-label="Instagram" className="flex h-12 w-12 items-center justify-center rounded-full bg-[#d81b60]/10 text-[#d81b60] hover:bg-[#d81b60] hover:text-white transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                </a>
                <a href="https://x.com/anasol_services" target="_blank" rel="noreferrer" aria-label="Twitter" className="flex h-12 w-12 items-center justify-center rounded-full bg-[#29b6f6]/10 text-[#29b6f6] hover:bg-[#29b6f6] hover:text-white transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
                </a>
              </div>
            </div>

          </div>

          <div className="flex flex-col items-center justify-between gap-4 border-t border-slate-800/80 pt-8 text-xs font-semibold md:flex-row">
            <p className="tracking-wide">&copy; {new Date().getFullYear()} Anasol Consultancy Services Pvt Ltd. All Rights Reserved.</p>
            <div className="flex items-center gap-6">
              <a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-blue-400 transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}