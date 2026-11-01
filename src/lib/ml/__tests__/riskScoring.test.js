import { describe, it, expect } from 'vitest';
import { computeRiskScore } from '../riskScoring';

describe('Cardiovascular Risk Scoring Engine', () => {
  const healthyPatient = {
    age: 22,
    gender: 0, // Female
    bp: 110,
    cholesterol: 160,
    exercise: 2, // High
    smoking: 0,
    familyHD: 0,
    diabetes: 0,
    bmi: 21,
    highBP: 0,
    lowHDL: 0,
    highLDL: 0,
    alcohol: 0,
    stress: 0,
    sleep: 8,
    sugar: 0,
    triglycerides: 100,
    fastingBS: 85,
    crp: 0.5,
    homocysteine: 7
  };

  it('classifies a young healthy individual into the Low Risk tier (< 35%)', () => {
    const score = computeRiskScore(healthyPatient);
    expect(score).toBeLessThan(0.35);
    expect(score).toBeGreaterThan(0.0);
  });

  it('triggers critical override into High Risk (> 60%) when BP >= 180 (Hypertensive Crisis)', () => {
    const hypertensiveCrisisPatient = {
      ...healthyPatient,
      bp: 185
    };
    const score = computeRiskScore(hypertensiveCrisisPatient);
    expect(score).toBeGreaterThan(0.60);
  });

  it('triggers critical override into High Risk when Cholesterol >= 300 mg/dL', () => {
    const severeCholesterolPatient = {
      ...healthyPatient,
      cholesterol: 320
    };
    const score = computeRiskScore(severeCholesterolPatient);
    expect(score).toBeGreaterThan(0.60);
  });

  it('correctly elevates risk for multi-factor moderate profiles', () => {
    const moderateRiskPatient = {
      ...healthyPatient,
      age: 55,
      bp: 145,
      cholesterol: 230,
      bmi: 28,
      stress: 2,
      smoking: 1,
      crp: 3.5
    };
    const score = computeRiskScore(moderateRiskPatient);
    expect(score).toBeGreaterThan(0.40);
  });

  it('always bounds risk score between 0.02 and 0.98', () => {
    const extremeHighRisk = {
      age: 80,
      gender: 1,
      bp: 220,
      cholesterol: 450,
      exercise: 0,
      smoking: 1,
      familyHD: 1,
      diabetes: 1,
      bmi: 42,
      highBP: 1,
      lowHDL: 1,
      highLDL: 1,
      alcohol: 3,
      stress: 2,
      sleep: 4,
      sugar: 2,
      triglycerides: 550,
      fastingBS: 250,
      crp: 12,
      homocysteine: 35
    };
    const score = computeRiskScore(extremeHighRisk);
    expect(score).toBeLessThanOrEqual(0.98);
    expect(score).toBeGreaterThanOrEqual(0.02);
  });
});
