import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Zap, Play } from 'lucide-react';
import { useFederatedLearning } from './hooks/useFederatedLearning';
import { Navbar } from './components/Layout/Navbar';
import { Hero } from './components/Layout/Hero';
import { Footer } from './components/Layout/Footer';
import { InfoModal } from './components/UI/InfoModal';
import { NodeCard, GlobalStats } from './components/Dashboard/DashboardItems';
import { PredictionForm } from './components/Prediction/PredictionForm';
import { LearningChart } from './components/Analytics/LearningChart';
import { DatasetInsights } from './components/Analytics/DatasetInsights';
import { ModelComparison } from './components/Analytics/ModelComparison';
import { SplashScreen } from './components/UI/SplashScreen';

export default function App() {
  const { status, metrics, startSimulation, predict } = useFederatedLearning();
  const [modal, setModal] = useState(null);
  const [splashDone, setSplashDone] = useState(false);
  const [logs, setLogs] = useState([
    'System initialized. Pre-trained global model loaded.',
    'Privacy protocols active. Data isolation enforced.',
    'Federated nodes standing by.'
  ]);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (status === 'training') {
      const msgs = [
        `[ROUND ${metrics.round}] Distributing global model to ${metrics.hospitalAccuracies.length} nodes...`,
        `[ROUND ${metrics.round}] Local training complete. Accuracies: ${metrics.hospitalAccuracies.map(a => (a * 100).toFixed(1) + '%').join(', ')}`,
        `[ROUND ${metrics.round}] Aggregating encrypted weight vectors via FedAvg...`,
        `[ROUND ${metrics.round}] Global accuracy synchronized: ${(metrics.globalAccuracy * 100).toFixed(2)}%`,
      ];
      setLogs(prev => [...prev, ...msgs].slice(-12));
    }
    if (status === 'completed') {
      setLogs(prev => [...prev, '[DONE] Federated simulation complete. Global model stabilized.'].slice(-12));
    }
  }, [status, metrics.round]);

  const handleRunSimulation = () => {
    startSimulation('/dataset/heart_disease.csv', 3, 5);
  };

  const isSimRunning = status === 'loading' || status === 'training';

  if (!splashDone) {
    return <SplashScreen onComplete={() => setSplashDone(true)} />;
  }

  return (
    <div>
      {/* ── NAVBAR ── */}
      <Navbar scrolled={scrolled} onOpenModal={setModal} />

      {/* ── HERO ── */}
      <Hero onOpenModal={setModal} />

      {/* ── DATASET INSIGHTS ── */}
      <section style={{ padding: '80px 0', borderTop: '1px solid var(--border)' }}>
        <div className="page-wrap">
          <DatasetInsights />
        </div>
      </section>

      {/* ── PREDICTION FORM ── */}
      <section id="diagnose" style={{ padding: '80px 0', borderTop: '1px solid var(--border)', scrollMarginTop: 64 }}>
        <div className="page-wrap">
          <div className="section-header">
            <p className="section-eyebrow">Patient Diagnostic Tool</p>
            <h2 className="section-title">Cardiovascular Risk Assessment</h2>
            <p className="section-desc">
              Enter your clinical metrics below. Our evidence-based model analyzes 20 biomarkers
              against established Framingham Risk Score criteria — instantly, client-side, privately.
            </p>
          </div>
          <PredictionForm onPredict={predict} isModelReady={true} />
        </div>
      </section>

      {/* ── FL ENGINE ── */}
      <section id="engine" style={{ padding: '80px 0', borderTop: '1px solid var(--border)', scrollMarginTop: 64 }}>
        <div className="page-wrap">
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 48, gap: 24, flexWrap: 'wrap' }}>
            <div className="section-header" style={{ marginBottom: 0 }}>
              <p className="section-eyebrow">Live Simulation</p>
              <h2 className="section-title">Federated Learning Engine</h2>
              <p className="section-desc">
                Visualize how the global model is trained across three decentralized hospital nodes without sharing any raw patient data.
              </p>
            </div>
            <button
              className={isSimRunning ? 'btn-ghost' : 'btn-primary'}
              onClick={handleRunSimulation}
              disabled={isSimRunning}
              style={{ flexShrink: 0 }}
            >
              {isSimRunning ? (
                <><Zap size={16} style={{ animation: 'spin 1s linear infinite' }} /> Running Simulation...</>
              ) : (
                <><Play size={16} /> Run Simulation</>
              )}
            </button>
          </div>

          {/* Node Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20, marginBottom: 24 }}>
            {['City General Hospital', 'St. Mary Medical Trust', 'North Regional Clinic'].map((name, i) => (
              <NodeCard
                key={name}
                name={name}
                accuracy={metrics.hospitalAccuracies[i] || 0}
                status={status === 'training' ? 'training' : (metrics.hospitalAccuracies[i] > 0 ? 'completed' : 'idle')}
                isSyncing={status === 'training'}
              />
            ))}
          </div>

          {/* Chart + Terminal */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 20, marginBottom: 20 }}>
            <LearningChart history={metrics.history} />

            {/* Terminal */}
            <div className="terminal" style={{ display: 'flex', flexDirection: 'column' }}>
              <div className="terminal-header">
                <div className="terminal-dot" style={{ background: '#ef4444' }} />
                <div className="terminal-dot" style={{ background: '#f59e0b' }} />
                <div className="terminal-dot" style={{ background: '#10b981' }} />
                <span style={{ marginLeft: 8, fontSize: 11, color: '#52525b', fontFamily: 'JetBrains Mono, monospace' }}>protocol.log</span>
              </div>
              <div className="terminal-body" role="log" aria-live="polite">
                {logs.map((log, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="log-line"
                  >
                    <span className="log-ts">[{new Date().toLocaleTimeString()}]</span>
                    <span className="log-msg">{log}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          <GlobalStats round={metrics.round} accuracy={metrics.globalAccuracy} />

          {/* Comparative Node & Model Efficiency Analytics */}
          <ModelComparison metrics={metrics} status={status} />
        </div>
      </section>

      {/* ── FOOTER ── */}
      <Footer onOpenModal={setModal} />

      {/* ── MODAL ── */}
      <InfoModal modalKey={modal} onClose={() => setModal(null)} />

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
