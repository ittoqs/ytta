import { describe, it, expect } from 'vitest';
import { calculateNormalizedScores, computeRecommendations, type Laptop } from './spkEngine';
import rawLaptops from '../data/laptops.json';

const testLaptops = rawLaptops as Laptop[];

describe('SPK Weighted Scoring Engine', () => {
  it('should calculate normalized scores accurately for a laptop', () => {
    const laptop = testLaptops[0]; // ASUS ROG Zephyrus G16
    const norm = calculateNormalizedScores(laptop);

    expect(norm.cpu).toBeGreaterThanOrEqual(0);
    expect(norm.cpu).toBeLessThanOrEqual(10);
    expect(norm.ram).toEqual(10); // 32GB RAM max benchmark is 32GB
    expect(norm.storage).toEqual(10); // 1024GB SSD
  });

  it('should compute top recommendation for Programmer profession', () => {
    const results = computeRecommendations(testLaptops, {
      profession: 'Programmer',
      usage_intensity: 'Berat'
    });

    expect(results.length).toBeGreaterThan(0);
    expect(results[0].rank).toBe(1);
    expect(results[0].compatibility_score).toBeGreaterThan(0);
    // High CPU & RAM laptop like ROG, Zenbook or XPS should rank top for Programmer
    expect(['lap-001', 'lap-003', 'lap-007', 'lap-009']).toContain(results[0].laptop.id);
  });

  it('should filter correctly when budget_range is specified', () => {
    const results = computeRecommendations(testLaptops, {
      profession: 'Siswa',
      budget_range: '3-5M'
    });

    expect(results.length).toBeGreaterThan(0);
    results.forEach(res => {
      expect(res.laptop.price_range).toBe('3-5M');
    });
  });

  it('should filter based on custom hardware specs', () => {
    const results = computeRecommendations(testLaptops, {
      profession: 'Kreator Konten',
      custom_specs: {
        min_ram: 16,
        min_gpu_vram: 4
      }
    });

    expect(results.length).toBeGreaterThan(0);
    results.forEach(res => {
      expect(res.laptop.specs.ram).toBeGreaterThanOrEqual(16);
      expect(res.laptop.specs.gpu.vram).toBeGreaterThanOrEqual(4);
    });
  });
});
