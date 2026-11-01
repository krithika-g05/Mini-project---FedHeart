import React from 'react';
import { HeartPulse, Github } from 'lucide-react';

export function Footer({ onOpenModal }) {
  return (
    <footer style={{ borderTop: '1px solid var(--border)', padding: '48px 0' }}>
      <div className="page-wrap" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div className="navbar-logo" style={{ width: 30, height: 30 }}>
            <HeartPulse size={16} color="#fff" />
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 14 }}>FedHeart Framework</div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Privacy-preserving cardiovascular AI research</div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <button className="nav-btn" onClick={() => onOpenModal('framework')}>Architecture</button>
          <button className="nav-btn" onClick={() => onOpenModal('dataset')}>Dataset</button>
          <button className="nav-btn" onClick={() => onOpenModal('privacy')}>Privacy</button>
          <a
            href="https://github.com/krithika-g05/Mini-project---FedHeart"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Repository"
            style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center' }}
          >
            <Github size={18} />
          </a>
        </div>

        <div style={{ fontSize: 12, color: 'var(--text-dim)' }}>
          © 2026 FedHeart · For academic research & educational use only
        </div>
      </div>
    </footer>
  );
}
