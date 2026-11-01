import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, Activity, AlertTriangle, AlertCircle, CheckCircle, 
  ChevronDown, Copy, Check, Download, Printer, ShieldCheck, FileText 
} from 'lucide-react';

/* ── Field components ─────────────────────────────── */
const Field = ({ label, id, children }) => (
  <div>
    <label htmlFor={id} className="input-label">{label}</label>
    {children}
  </div>
);

const NumberInput = ({ id, value, field, min, max, step, onChange }) => (
  <input
    id={id}
    type="number"
    className="input-field"
    value={value}
    min={min} 
    max={max} 
    step={step || 1}
    onChange={e => onChange(field, Number(e.target.value))}
  />
);

const SelectInput = ({ id, value, field, options, onChange }) => (
  <select
    id={id}
    className="input-field"
    value={value}
    onChange={e => onChange(field, Number(e.target.value))}
    style={{ cursor: 'pointer' }}
  >
    {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
  </select>
);

const YES_NO = [{ label: 'No', value: 0 }, { label: 'Yes', value: 1 }];
const LEVEL3 = [{ label: 'Low', value: 0 }, { label: 'Medium', value: 1 }, { label: 'High', value: 2 }];

/* ── Risk Result & Clinical Summary ──────────────────────────────────── */
function RiskResult({ score, formData }) {
  const [copied, setCopied] = useState(false);
  const pct = Math.round(score * 100);
  let config;

  if (score > 0.6) {
    config = {
      cls: 'risk-card-high',
      icon: AlertTriangle,
      label: 'High Risk',
      color: '#ef4444',
      desc: 'Significant cardiovascular risk indicators detected. Please consult a cardiologist or healthcare physician urgently.',
      action: 'Schedule a comprehensive cardiovascular check-up and clinical review.'
    };
  } else if (score > 0.35) {
    config = {
      cls: 'risk-card-moderate',
      icon: AlertCircle,
      label: 'Moderate Risk',
      color: '#f59e0b',
      desc: 'Elevated cardiovascular risk factors identified. A proactive medical check-up is strongly recommended.',
      action: 'Consider lipid panel retesting, regular blood pressure monitoring, and lifestyle changes.'
    };
  } else {
    config = {
      cls: 'risk-card-low',
      icon: CheckCircle,
      label: 'Low Risk',
      color: '#10b981',
      desc: 'Your metrics indicate a favorable cardiovascular risk profile. Continue maintaining your healthy habits.',
      action: 'Maintain regular physical activity, balanced diet, and periodic routine screenings.'
    };
  }

  // Identify specific flagged clinical biomarkers
  const flaggedFactors = [];
  if (formData.bp >= 140) flaggedFactors.push(`Elevated Blood Pressure (${formData.bp} mmHg)`);
  if (formData.cholesterol >= 200) flaggedFactors.push(`Elevated Cholesterol (${formData.cholesterol} mg/dL)`);
  if (formData.smoking === 1) flaggedFactors.push('Active Tobacco Smoking');
  if (formData.diabetes === 1) flaggedFactors.push('Diagnosed Diabetes Mellitus');
  if (formData.familyHD === 1) flaggedFactors.push('Family History of Coronary Heart Disease');
  if (formData.triglycerides >= 150) flaggedFactors.push(`Elevated Triglycerides (${formData.triglycerides} mg/dL)`);
  if (formData.crp >= 3.0) flaggedFactors.push(`Elevated hs-CRP (${formData.crp} mg/L - Vascular Inflammation)`);
  if (formData.homocysteine >= 15) flaggedFactors.push(`High Homocysteine (${formData.homocysteine} μmol/L)`);
  if (formData.bmi >= 30) flaggedFactors.push(`BMI in Obese Range (${formData.bmi})`);

  const generateReportText = () => {
    const timestamp = new Date().toLocaleString();
    return [
      `======================================================`,
      `          FEDHEART CLINICAL RISK ASSESSMENT REPORT`,
      `======================================================`,
      `Report Generated: ${timestamp}`,
      `Risk Assessment:  ${pct}% (${config.label})`,
      `Algorithmic Basis: Framingham Heart Study + ACC/AHA 2019 Guidelines`,
      `Privacy Protocol:  100% Client-Side In-Browser Processing (No Data Sent)`,
      ``,
      `--- PATIENT BIOMARKERS ---`,
      `Age:                  ${formData.age} yrs | Gender: ${formData.gender === 1 ? 'Male' : 'Female'}`,
      `Blood Pressure:       ${formData.bp} mmHg`,
      `Total Cholesterol:    ${formData.cholesterol} mg/dL`,
      `Body Mass Index (BMI):${formData.bmi}`,
      `Triglycerides:        ${formData.triglycerides} mg/dL`,
      `Fasting Blood Sugar:  ${formData.fastingBS} mg/dL`,
      `hs-CRP (Inflammation):${formData.crp} mg/L`,
      `Homocysteine Level:   ${formData.homocysteine} μmol/L`,
      `Smoking Status:       ${formData.smoking === 1 ? 'Yes' : 'No'}`,
      `Diabetes Status:      ${formData.diabetes === 1 ? 'Yes' : 'No'}`,
      `Family Heart History: ${formData.familyHD === 1 ? 'Yes' : 'No'}`,
      `Sleep Duration:       ${formData.sleep} hrs/day`,
      ``,
      `--- IDENTIFIED RISK DRIVERS ---`,
      flaggedFactors.length > 0 ? flaggedFactors.map(f => `* ${f}`).join('\n') : '* No acute clinical outliers flagged',
      ``,
      `--- CLINICAL ACTION RECOMMENDATION ---`,
      `${config.action}`,
      ``,
      `======================================================`,
      `DISCLAIMER: This report is generated by FedHeart for`,
      `academic and educational evaluation. It is not an official`,
      `medical diagnosis. Always consult a licensed physician.`,
      `======================================================`
    ].join('\n');
  };

  const handleCopySummary = async () => {
    try {
      await navigator.clipboard.writeText(generateReportText());
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  const handleDownloadReport = () => {
    const report = generateReportText();
    const blob = new Blob([report], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `FedHeart_Clinical_Report_${Date.now()}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    window.print();
  };

  const Icon = config.icon;
  return (
    <motion.div
      className={config.cls}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      role="region"
      aria-live="polite"
    >
      <div style={{ display: 'flex', gap: 24, alignItems: 'center', flexWrap: 'wrap' }}>
        <div className="risk-score-ring" style={{ color: config.color }}>
          <span style={{ fontSize: 30, fontWeight: 900, lineHeight: 1 }}>{pct}%</span>
          <span style={{ fontSize: 10, fontWeight: 600, opacity: 0.7, marginTop: 2 }}>RISK</span>
        </div>

        <div style={{ flex: 1, minWidth: 240 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <Icon size={20} style={{ color: config.color }} />
            <h3 style={{ fontSize: 22, fontWeight: 800, color: config.color, letterSpacing: '-0.02em' }}>{config.label}</h3>
          </div>
          <p style={{ fontSize: 14, color: '#a1a1aa', lineHeight: 1.7, marginBottom: 12 }}>{config.desc}</p>
          <div style={{
            fontSize: 12, fontWeight: 600, color: config.color,
            background: `${config.color}15`, border: `1px solid ${config.color}25`,
            padding: '8px 14px', borderRadius: 8, display: 'inline-block'
          }}>
            → {config.action}
          </div>
        </div>
      </div>

      {/* Flagged Biomarkers */}
      {flaggedFactors.length > 0 && (
        <div style={{ marginTop: 20, paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#f4f4f5', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>
            Flagged Clinical Indicators
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {flaggedFactors.map((f, i) => (
              <span 
                key={i} 
                style={{
                  fontSize: 12, background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.25)',
                  color: '#fca5a5', padding: '4px 10px', borderRadius: 6
                }}
              >
                ⚠ {f}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Clinical Action Toolbar */}
      <div style={{ marginTop: 24, paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
        <button
          type="button"
          onClick={handleCopySummary}
          className="btn-ghost btn-sm"
          style={{ fontSize: 13, gap: 6 }}
        >
          {copied ? <Check size={14} color="#10b981" /> : <Copy size={14} />}
          {copied ? 'Copied Summary!' : 'Copy Summary'}
        </button>

        <button
          type="button"
          onClick={handleDownloadReport}
          className="btn-ghost btn-sm"
          style={{ fontSize: 13, gap: 6 }}
        >
          <Download size={14} /> Download Clinical Report (.txt)
        </button>

        <button
          type="button"
          onClick={handlePrint}
          className="btn-ghost btn-sm"
          style={{ fontSize: 13, gap: 6 }}
        >
          <Printer size={14} /> Print Report
        </button>

        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: '#71717a' }}>
          <ShieldCheck size={13} color="#10b981" /> Client-Side Privacy Guaranteed
        </div>
      </div>

      <p style={{ fontSize: 11, color: '#52525b', marginTop: 18 }}>
        ⚠ This assessment is computed using client-side mathematical risk heuristics derived from the Framingham Heart Study and ACC/AHA cardiovascular guidelines. It is not an official clinical diagnosis. Always consult a licensed physician.
      </p>
    </motion.div>
  );
}

/* ── Collapsible Section ──────────────────────────── */
function FormSection({ title, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={{ marginBottom: 8 }}>
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        style={{
          width: '100%', background: 'transparent', border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '14px 0', borderBottom: '1px solid var(--border)', color: 'var(--text-muted)',
          fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.09em'
        }}
      >
        {title}
        <ChevronDown size={14} style={{ transform: open ? 'rotate(180deg)' : 'none', transition: '0.2s' }} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{ paddingTop: 20, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 16, paddingBottom: 8 }}>
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Main Form ────────────────────────────────────── */
export const PredictionForm = ({ onPredict }) => {
  const [form, setForm] = useState({
    age: 45, gender: 1, bp: 120, cholesterol: 200,
    exercise: 1, smoking: 0, familyHD: 0, diabetes: 0,
    bmi: 24.5, highBP: 0, lowHDL: 0, highLDL: 0,
    alcohol: 0, stress: 1, sleep: 7, sugar: 1,
    triglycerides: 150, fastingBS: 95, crp: 1.5, homocysteine: 10
  });
  const [result, setResult] = useState(null);
  const set = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

  const handleSubmit = e => {
    e.preventDefault();
    const features = [
      form.age, form.gender, form.bp, form.cholesterol,
      form.exercise, form.smoking, form.familyHD, form.diabetes,
      form.bmi, form.highBP, form.lowHDL, form.highLDL,
      form.alcohol, form.stress, form.sleep, form.sugar,
      form.triglycerides, form.fastingBS, form.crp, form.homocysteine
    ];
    setResult(onPredict(features));
  };

  return (
    <div className="card card-red-accent" style={{ padding: 32, maxWidth: 960, margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 32 }}>
        <div style={{ padding: 10, background: 'var(--red-dim)', border: '1px solid var(--red-border)', borderRadius: 12 }}>
          <Heart size={22} color="var(--red)" />
        </div>
        <div>
          <h2 style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-0.02em' }}>Patient Risk Assessment</h2>
          <p style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 2 }}>
            All 20 clinical features · Evidence-based Framingham/AHA scoring · Fully client-side
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <FormSection title="Demographics & Vitals" defaultOpen>
          <Field id="field-age" label="Age (years)">
            <NumberInput id="field-age" value={form.age} field="age" min={1} max={120} onChange={set} />
          </Field>
          <Field id="field-gender" label="Gender">
            <SelectInput id="field-gender" value={form.gender} field="gender" options={[{ label: 'Male', value: 1 }, { label: 'Female', value: 0 }]} onChange={set} />
          </Field>
          <Field id="field-bp" label="Blood Pressure (mmHg)">
            <NumberInput id="field-bp" value={form.bp} field="bp" min={60} max={300} onChange={set} />
          </Field>
          <Field id="field-cholesterol" label="Cholesterol (mg/dL)">
            <NumberInput id="field-cholesterol" value={form.cholesterol} field="cholesterol" min={100} max={700} onChange={set} />
          </Field>
          <Field id="field-bmi" label="BMI">
            <NumberInput id="field-bmi" value={form.bmi} field="bmi" min={10} max={70} step={0.1} onChange={set} />
          </Field>
          <Field id="field-sleep" label="Sleep Hours / day">
            <NumberInput id="field-sleep" value={form.sleep} field="sleep" min={2} max={14} step={0.5} onChange={set} />
          </Field>
        </FormSection>

        <FormSection title="Lab Biomarkers" defaultOpen>
          <Field id="field-triglycerides" label="Triglycerides (mg/dL)">
            <NumberInput id="field-triglycerides" value={form.triglycerides} field="triglycerides" min={50} max={1000} onChange={set} />
          </Field>
          <Field id="field-fastingBS" label="Fasting Blood Sugar">
            <NumberInput id="field-fastingBS" value={form.fastingBS} field="fastingBS" min={60} max={400} onChange={set} />
          </Field>
          <Field id="field-crp" label="CRP Level (mg/L)">
            <NumberInput id="field-crp" value={form.crp} field="crp" min={0} max={20} step={0.1} onChange={set} />
          </Field>
          <Field id="field-homocysteine" label="Homocysteine (μmol/L)">
            <NumberInput id="field-homocysteine" value={form.homocysteine} field="homocysteine" min={0} max={50} step={0.5} onChange={set} />
          </Field>
        </FormSection>

        <FormSection title="Medical History & Lipid Flags">
          <Field id="field-diabetes" label="Diagnosed Diabetes">
            <SelectInput id="field-diabetes" value={form.diabetes} field="diabetes" options={YES_NO} onChange={set} />
          </Field>
          <Field id="field-familyHD" label="Family Heart Disease">
            <SelectInput id="field-familyHD" value={form.familyHD} field="familyHD" options={YES_NO} onChange={set} />
          </Field>
          <Field id="field-highBP" label="High Blood Pressure">
            <SelectInput id="field-highBP" value={form.highBP} field="highBP" options={YES_NO} onChange={set} />
          </Field>
          <Field id="field-lowHDL" label="Low HDL Cholesterol">
            <SelectInput id="field-lowHDL" value={form.lowHDL} field="lowHDL" options={YES_NO} onChange={set} />
          </Field>
          <Field id="field-highLDL" label="High LDL Cholesterol">
            <SelectInput id="field-highLDL" value={form.highLDL} field="highLDL" options={YES_NO} onChange={set} />
          </Field>
          <Field id="field-smoking" label="Smoking">
            <SelectInput id="field-smoking" value={form.smoking} field="smoking" options={YES_NO} onChange={set} />
          </Field>
        </FormSection>

        <FormSection title="Lifestyle Factors">
          <Field id="field-exercise" label="Exercise Habits">
            <SelectInput id="field-exercise" value={form.exercise} field="exercise" options={LEVEL3} onChange={set} />
          </Field>
          <Field id="field-stress" label="Stress Level">
            <SelectInput id="field-stress" value={form.stress} field="stress" options={LEVEL3} onChange={set} />
          </Field>
          <Field id="field-sugar" label="Sugar Consumption">
            <SelectInput id="field-sugar" value={form.sugar} field="sugar" options={LEVEL3} onChange={set} />
          </Field>
          <Field id="field-alcohol" label="Alcohol Consumption">
            <SelectInput id="field-alcohol" value={form.alcohol} field="alcohol" options={LEVEL3} onChange={set} />
          </Field>
        </FormSection>

        <button
          type="submit"
          className="btn-primary"
          style={{ width: '100%', justifyContent: 'center', fontSize: 16, marginTop: 28, padding: '15px' }}
        >
          <Activity size={18} /> Analyze Risk Profile
        </button>
      </form>

      <AnimatePresence>
        {result !== null && (
          <motion.div style={{ marginTop: 28 }}>
            <RiskResult score={result} formData={form} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
