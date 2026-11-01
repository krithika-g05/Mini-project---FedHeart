import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink } from 'lucide-react';
import { MODAL_CONTENT } from '../../constants/modalContent';

export function InfoModal({ modalKey, onClose }) {
  if (!modalKey) return null;
  const data = MODAL_CONTENT[modalKey];
  if (!data) return null;
  const Icon = data.icon;

  return (
    <AnimatePresence>
      <motion.div
        key="backdrop"
        className="modal-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <motion.div
          className="modal-box"
          initial={{ opacity: 0, y: 24, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.97 }}
          transition={{ type: 'spring', stiffness: 400, damping: 32 }}
          onClick={e => e.stopPropagation()}
        >
          <button 
            className="modal-close" 
            onClick={onClose}
            aria-label="Close modal"
          >
            <X size={16} />
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 28 }}>
            <div style={{ padding: 10, borderRadius: 12, background: `${data.color}18`, border: `1px solid ${data.color}30` }}>
              <Icon size={22} style={{ color: data.color }} />
            </div>
            <h2 id="modal-title" style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-0.02em' }}>{data.title}</h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {data.sections.map((s, i) => (
              <div key={i}>
                <h3 style={{ fontSize: 13, fontWeight: 700, color: data.color, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{s.heading}</h3>
                <p style={{ fontSize: 14, color: '#a1a1aa', lineHeight: 1.75 }}>{s.body}</p>
              </div>
            ))}
          </div>

          {data.link && (
            <a
              href={data.link.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8, marginTop: 32,
                paddingTop: 24, borderTop: '1px solid #27272a', color: data.color,
                fontSize: 14, fontWeight: 600, textDecoration: 'none'
              }}
            >
              {data.link.label} <ExternalLink size={14} />
            </a>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
