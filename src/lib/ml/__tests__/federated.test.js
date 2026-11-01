import { describe, it, expect } from 'vitest';
import * as tf from '@tensorflow/tfjs';
import { aggregateWeights } from '../federated';

describe('Federated Averaging (FedAvg) Weight Aggregator', () => {
  it('returns null when empty or invalid weights list is passed', () => {
    expect(aggregateWeights(null)).toBeNull();
    expect(aggregateWeights([])).toBeNull();
  });

  it('correctly calculates the mathematical element-wise mean of local model weights', () => {
    // Simulate 2 models with 1 weight tensor each of shape [2, 2]
    const model1Weights = [tf.tensor2d([[2, 4], [6, 8]])];
    const model2Weights = [tf.tensor2d([[4, 8], [12, 16]])];

    const aggregated = aggregateWeights([model1Weights, model2Weights]);

    expect(aggregated).toHaveLength(1);
    const aggregatedValues = aggregated[0].arraySync();

    // Expected average: [[3, 6], [9, 12]]
    expect(aggregatedValues).toEqual([[3, 6], [9, 12]]);

    // Clean up tensors
    model1Weights[0].dispose();
    model2Weights[0].dispose();
    aggregated[0].dispose();
  });
});
