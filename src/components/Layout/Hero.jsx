import React from 'react';
import { motion } from 'framer-motion';
import { HeartPulse, ShieldCheck, Activity, Server, BookOpen } from 'lucide-react';

export function Hero({ onOpenModal }) {
  return (
    <section className="hero">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="hero-eyebrow">
          <ShieldCheck size={12} /> Federated Learning · Privacy-Preserving AI
        </div>
      </motion.div>

      <div className="hero-icon-wrap">
        <HeartPulse size={46} color="#ef4444" />
      </div>

      <motion.h1
        className="hero-title"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.6 }}
      >
        Heart Disease<br /><span className="line2">Prediction</span>
      </motion.h1>

      <motion.p
        className="hero-subtitle"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        A privacy-preserving diagnostic system powered by federated machine learning.
        Trained across decentralized hospital nodes — <strong style={{ color: '#f4f4f5' }}>your data never leaves your device.</strong>
      </motion.p>

      <motion.div
        className="hero-actions"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <button
          className="btn-primary"
          style={{ fontSize: 16, padding: '15px 32px' }}
          onClick={() => document.getElementById('diagnose')?.scrollIntoView({ behavior: 'smooth' })}
        >
          <Activity size={18} /> Run Diagnosis
        </button>
        <button
          className="btn-ghost"
          style={{ fontSize: 16, padding: '15px 32px' }}
          onClick={() => document.getElementById('engine')?.scrollIntoView({ behavior: 'smooth' })}
        >
          <Server size={18} /> See FL Engine
        </button>
        <button className="btn-ghost btn-sm" onClick={() => onOpenModal('framework')}>
          <BookOpen size={14} /> How it works
        </button>
      </motion.div>

      <motion.div
        className="hero-stats"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {[
          { value: '10,000', label: 'Patient Records' },
          null,
          { value: '20', label: 'Clinical Features' },
          null,
          { value: '3', label: 'Hospital Nodes' },
          null,
          { value: '82%', label: 'Baseline Accuracy' },
        ].map((item, i) =>
          item === null ? (
            <div key={i} className="hero-stat-divider" />
          ) : (
            <div key={i} className="hero-stat-item">
              <div className="hero-stat-value">{item.value}</div>
              <div className="hero-stat-label">{item.label}</div>
            </div>
          )
        )}
      </motion.div>
    </section>
  );
}
