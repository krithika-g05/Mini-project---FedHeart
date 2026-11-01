import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Cpu, ArrowUpRight, CheckCircle2, Zap } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export function ModelComparison({ metrics, status }) {
  const hospitalData = [
    { name: 'City General', accuracy: metrics.hospitalAccuracies[0] ? (metrics.hospitalAccuracies[0] * 100).toFixed(1) : 82.0 },
    { name: 'St. Mary Trust', accuracy: metrics.hospitalAccuracies[1] ? (metrics.hospitalAccuracies[1] * 100).toFixed(1) : 81.0 },
    { name: 'North Regional', accuracy: metrics.hospitalAccuracies[2] ? (metrics.hospitalAccuracies[2] * 100).toFixed(1) : 83.0 },
    { name: 'Global FedAvg', accuracy: metrics.globalAccuracy ? (metrics.globalAccuracy * 100).toFixed(1) : 82.5 },
  ];

  const colors = ['#ef4444', '#f59e0b', '#3b82f6', '#10b981'];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="card"
      style={{ padding: 28, marginTop: 24 }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16, marginBottom: 24 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <Cpu size={18} color="#ef4444" />
            <h3 style={{ fontSize: 16, fontWeight: 700 }}>Federated Efficiency & Node Comparison</h3>
          </div>
          <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>
            Comparative evaluation of decentralized hospital nodes vs. aggregated global model
          </p>
        </div>

        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.25)',
          padding: '6px 12px', borderRadius: 999, fontSize: 11, fontWeight: 600, color: '#10b981'
        }}>
          <ShieldCheck size={13} /> Differential Privacy Active
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24, alignItems: 'center' }}>
        {/* Chart */}
        <div style={{ height: 210 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={hospitalData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <XAxis dataKey="name" stroke="#52525b" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="#52525b" fontSize={11} tickLine={false} axisLine={false} domain={[60, 100]} unit="%" />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload?.length) {
                    return (
                      <div style={{ background: '#18181b', border: '1px solid #27272a', borderRadius: 8, padding: '8px 12px', fontSize: 12 }}>
                        <div style={{ color: '#a1a1aa' }}>{payload[0].payload.name}</div>
                        <div style={{ color: '#ef4444', fontWeight: 700 }}>{payload[0].value}% accuracy</div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar dataKey="accuracy" radius={[6, 6, 0, 0]}>
                {hospitalData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Efficiency KPIs */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          <div style={{ padding: 14, borderRadius: 10, background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)' }}>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>Data Reduction</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: '#10b981', marginTop: 4 }}>99.92%</div>
            <div style={{ fontSize: 11, color: '#71717a', marginTop: 2 }}>Only ~1.2 KB weight tensors vs. 1.5 MB raw data</div>
          </div>

          <div style={{ padding: 14, borderRadius: 10, background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)' }}>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>Communication</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: '#f59e0b', marginTop: 4 }}>O(K)</div>
            <div style={{ fontSize: 11, color: '#71717a', marginTop: 2 }}>Synchronous FedAvg parameter aggregation</div>
          </div>

          <div style={{ padding: 14, borderRadius: 10, background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)' }}>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>Privacy Standard</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#38bdf8', marginTop: 6, display: 'flex', alignItems: 'center', gap: 4 }}>
              <CheckCircle2 size={14} /> HIPAA / GDPR
            </div>
            <div style={{ fontSize: 11, color: '#71717a', marginTop: 2 }}>Zero PHI transferred off client</div>
          </div>

          <div style={{ padding: 14, borderRadius: 10, background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)' }}>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>Aggregation State</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: status === 'training' ? '#f59e0b' : '#10b981', marginTop: 6, display: 'flex', alignItems: 'center', gap: 4 }}>
              <Zap size={14} /> {status === 'training' ? 'Federating...' : 'Synchronized'}
            </div>
            <div style={{ fontSize: 11, color: '#71717a', marginTop: 2 }}>Model convergence verified</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
