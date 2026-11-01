import { describe, it, expect } from 'vitest';
import { CATEGORICAL_MAPPINGS, splitDataForHospitals } from '../processor';

describe('Data Preprocessing & Node Partitioning', () => {
  it('contains consistent binary and ordinal categorical mappings', () => {
    expect(CATEGORICAL_MAPPINGS.Gender['Male']).toBe(1);
    expect(CATEGORICAL_MAPPINGS.Gender['Female']).toBe(0);
    expect(CATEGORICAL_MAPPINGS.Smoking['Yes']).toBe(1);
    expect(CATEGORICAL_MAPPINGS.Smoking['No']).toBe(0);
    expect(CATEGORICAL_MAPPINGS['Exercise Habits']['High']).toBe(2);
    expect(CATEGORICAL_MAPPINGS['Exercise Habits']['Low']).toBe(0);
  });

  it('partitions dataset evenly across designated hospital nodes', () => {
    const dummyRecords = Array.from({ length: 90 }, (_, i) => ({
      features: [i, i * 2],
      label: i % 2
    }));

    const hospitalSplits = splitDataForHospitals(dummyRecords, 3);

    expect(hospitalSplits).toHaveLength(3);
    expect(hospitalSplits[0]).toHaveLength(30);
    expect(hospitalSplits[1]).toHaveLength(30);
    expect(hospitalSplits[2]).toHaveLength(30);
  });
});
