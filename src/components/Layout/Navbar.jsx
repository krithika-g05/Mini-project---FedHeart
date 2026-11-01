import React from 'react';
import { motion } from 'framer-motion';
import { Server, Database, Lock, ShieldCheck, BookOpen, Github } from 'lucide-react';
import { HeartLogo } from '../UI/HeartLogo';

export function Navbar({ scrolled, onOpenModal }) {
  return (
    <nav className="navbar" style={{ boxShadow: scrolled ? '0 1px 32px rgba(0,0,0,0.4)' : 'none' }}>
      <div className="navbar-brand">
        <motion.div
          animate={{ scale: [1, 1.1, 1, 1.06, 1] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut', times: [0, 0.14, 0.28, 0.42, 1] }}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', filter: 'drop-shadow(0 0 8px rgba(239,68,68,0.5))' }}
        >
          <HeartLogo size={34} />
        </motion.div>
        FedHeart
      </div>

      <div className="navbar-nav">
        <button className="nav-btn" onClick={() => onOpenModal('framework')}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Server size={14} /> Architecture</span>
        </button>
        <button className="nav-btn" onClick={() => onOpenModal('dataset')}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Database size={14} /> Dataset</span>
        </button>
        <button className="nav-btn" onClick={() => onOpenModal('privacy')}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Lock size={14} /> Privacy</span>
        </button>
        <div className="nav-divider" />
        <div className="nav-badge">
          <ShieldCheck size={13} /> Privacy Secured
        </div>
        <div className="nav-divider" />
        <a
          href="https://drive.google.com/file/d/16V_VO41QDsWZ1u7sMI7yGGdgAn2UA7jI/view?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          className="nav-btn"
          style={{ display: 'flex', alignItems: 'center', gap: 5 }}
        >
          <BookOpen size={14} /> Research
        </a>
        <a
          href="https://github.com/krithika-g05/Mini-project---FedHeart"
          target="_blank"
          rel="noopener noreferrer"
          className="nav-btn"
          aria-label="GitHub Repository"
          style={{ display: 'flex', alignItems: 'center', gap: 5 }}
        >
          <Github size={14} /> GitHub
        </a>
      </div>
    </nav>
  );
}
