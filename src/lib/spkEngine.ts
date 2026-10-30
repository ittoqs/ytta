export interface LaptopSpecs {
  cpu: {
    name: string;
    cores: number;
    threads: number;
  };
  gpu: {
    name: string;
    vram: number;
  };
  ram: number; // GB
  storage: {
    type: 'SSD' | 'HDD';
    capacity: number; // GB
  };
  display: {
    size: number; // inches
    resolution: string;
    refresh_rate: number; // Hz
    panel_type: string;
  };
  battery: number; // hours
  weight: number; // kg
}

export interface Laptop {
  id: string;
  brand: string;
  model: string;
  price: number; // IDR
  image_url: string;
  specs: LaptopSpecs;
  price_range: '3-5M' | '5-8M' | '8-12M' | '12M+';
  suitable_for: string[];
  rating: number;
  review_count: number;
}

export interface CriteriaWeights {
  cpu: number;
  gpu: number;
  ram: number;
  storage: number;
  display: number;
  battery: number;
  portability: number;
  price: number;
}

export interface UserPreferences {
  profession: string;
  usage_intensity?: 'Jarang' | 'Sedang' | 'Berat';
  portability_needed?: boolean;
  budget_range?: 'All' | '3-5M' | '5-8M' | '8-12M' | '12M+';
  gaming_needed?: boolean;
  priority?: 'Performa' | 'Baterai' | 'Portabilitas' | 'Harga';
  custom_specs?: {
    min_ram?: number;
    min_storage?: number;
    min_cpu_cores?: number;
    min_gpu_vram?: number;
  };
}

export interface RecommendationResult {
  laptop: Laptop;
  compatibility_score: number; // 0 to 100
  normalized_scores: Record<keyof CriteriaWeights, number>; // 0 to 10
  rank: number;
  match_reasons: string[];
}

export const PROFESSION_PRESETS: Record<string, {
  name: string;
  description: string;
  icon: string;
  weights: CriteriaWeights;
}> = {
  'Kreator Konten': {
    name: 'Kreator Konten',
    description: 'Editing video 4K, rendering 3D, desain grafis & fotografi',
    icon: 'Video',
    weights: { cpu: 25, gpu: 25, ram: 20, storage: 15, display: 15, battery: 0, portability: 0, price: 0 }
  },
  'Programmer': {
    name: 'Programmer / Developer',
    description: 'Kompilasi kode, jalankan Docker, emulator, & IDE berat',
    icon: 'Code',
    weights: { cpu: 30, gpu: 5, ram: 25, storage: 15, display: 10, battery: 10, portability: 5, price: 0 }
  },
  'Game Tester': {
    name: 'Game Tester / Gamer',
    description: 'Bermain game AAA, FPS tinggi, & testing performa game',
    icon: 'Gamepad2',
    weights: { cpu: 20, gpu: 35, ram: 15, storage: 10, display: 15, battery: 0, portability: 0, price: 5 }
  },
  'Guru': {
    name: 'Guru / Dosen',
    description: 'Presentasi, Zoom meeting, olah dokumen, & manajemen nilai',
    icon: 'GraduationCap',
    weights: { cpu: 15, gpu: 5, ram: 15, storage: 15, display: 15, battery: 20, portability: 15, price: 0 }
  },
  'Siswa': {
    name: 'Siswa / Mahasiswa',
    description: 'Tugas sekolah/kuliah, browsing, streaming, & hemat anggaran',
    icon: 'BookOpen',
    weights: { cpu: 15, gpu: 0, ram: 20, storage: 15, display: 10, battery: 20, portability: 10, price: 10 }
  },
  'Pekerja Kantoran': {
    name: 'Pekerja Kantoran',
    description: 'Multitasking Office, spreadsheet berat, & baterai tahan lama',
    icon: 'Briefcase',
    weights: { cpu: 20, gpu: 0, ram: 20, storage: 15, display: 10, battery: 20, portability: 15, price: 0 }
  },
  'Influencer': {
    name: 'Influencer / Streamer',
    description: 'Live streaming, vlogging, & mobilitas tinggi',
    icon: 'Camera',
    weights: { cpu: 20, gpu: 20, ram: 15, storage: 15, display: 15, battery: 10, portability: 5, price: 0 }
  },
  'Data Analyst': {
    name: 'Data Analyst',
    description: 'Olah dataset besar, SQL, Python, machine learning & visualisasi',
    icon: 'BarChart3',
    weights: { cpu: 30, gpu: 10, ram: 30, storage: 15, display: 10, battery: 5, portability: 0, price: 0 }
  },
  'Personalisasi': {
    name: 'Personalisasi (Custom)',
    description: 'Atur preferensi kriteria kamu sendiri sesuai selera',
    icon: 'Sliders',
    weights: { cpu: 20, gpu: 20, ram: 15, storage: 15, display: 10, battery: 10, portability: 10, price: 0 }
  }
};

// Benchmarking values for normalizations (max values across domain)
const MAX_BENCHMARKS = {
  cpu_cores: 16,
  cpu_threads: 22,
  gpu_vram: 8,
  ram: 32,
  storage: 1024,
  refresh_rate: 240,
  battery: 18,
  min_weight: 1.1, // lighter is better
  max_weight: 2.5,
  min_price: 4500000,
  max_price: 35000000
};

export function calculateNormalizedScores(laptop: Laptop): Record<keyof CriteriaWeights, number> {
  // CPU Score (based on cores + threads)
  const cpuVal = (laptop.specs.cpu.cores * 0.5) + (laptop.specs.cpu.threads * 0.5);
  const cpuMax = (MAX_BENCHMARKS.cpu_cores * 0.5) + (MAX_BENCHMARKS.cpu_threads * 0.5);
  const cpuScore = Math.min(10, (cpuVal / cpuMax) * 10);

  // GPU Score (based on VRAM and discrete vs integrated)
  let gpuVal = laptop.specs.gpu.vram;
  if (gpuVal === 0) {
    if (laptop.specs.gpu.name.toLowerCase().includes('arc')) gpuVal = 3;
    else if (laptop.specs.gpu.name.toLowerCase().includes('m3')) gpuVal = 5;
    else gpuVal = 1; // Intel UHD / Iris / Radeon integrated
  }
  const gpuScore = Math.min(10, (gpuVal / MAX_BENCHMARKS.gpu_vram) * 10);

  // RAM Score
  const ramScore = Math.min(10, (laptop.specs.ram / MAX_BENCHMARKS.ram) * 10);

  // Storage Score
  const storageScore = Math.min(10, (laptop.specs.storage.capacity / MAX_BENCHMARKS.storage) * 10);

  // Display Score (Panel type + refresh rate + resolution)
  let displayBonus = 0;
  if (laptop.specs.display.panel_type === 'OLED') displayBonus += 3;
  else if (laptop.specs.display.panel_type === 'IPS') displayBonus += 1.5;

  const refreshScore = (laptop.specs.display.refresh_rate / MAX_BENCHMARKS.refresh_rate) * 4;
  const displayScore = Math.min(10, 3 + refreshScore + displayBonus);

  // Battery Score
  const batteryScore = Math.min(10, (laptop.specs.battery / MAX_BENCHMARKS.battery) * 10);

  // Portability Score (Lower weight = higher score)
  const weight = Math.max(1.0, Math.min(3.0, laptop.specs.weight));
  const portabilityScore = Math.max(0, 10 - ((weight - MAX_BENCHMARKS.min_weight) / (MAX_BENCHMARKS.max_weight - MAX_BENCHMARKS.min_weight)) * 10);

  // Price Score (Lower price = higher score for budget efficiency)
  const priceClamped = Math.max(MAX_BENCHMARKS.min_price, Math.min(MAX_BENCHMARKS.max_price, laptop.price));
  const priceScore = Math.max(0, 10 - ((priceClamped - MAX_BENCHMARKS.min_price) / (MAX_BENCHMARKS.max_price - MAX_BENCHMARKS.min_price)) * 10);

  return {
    cpu: Math.round(cpuScore * 10) / 10,
    gpu: Math.round(gpuScore * 10) / 10,
    ram: Math.round(ramScore * 10) / 10,
    storage: Math.round(storageScore * 10) / 10,
    display: Math.round(displayScore * 10) / 10,
    battery: Math.round(batteryScore * 10) / 10,
    portability: Math.round(portabilityScore * 10) / 10,
    price: Math.round(priceScore * 10) / 10
  };
}

export function computeRecommendations(
  laptops: Laptop[],
  prefs: UserPreferences
): RecommendationResult[] {
  const preset = PROFESSION_PRESETS[prefs.profession] || PROFESSION_PRESETS['Personalisasi'];
  let weights: CriteriaWeights = { ...preset.weights };

  // Adjust weights based on user preferences
  if (prefs.usage_intensity === 'Berat') {
    weights.cpu += 5;
    weights.ram += 5;
  }
  if (prefs.portability_needed) {
    weights.portability += 15;
    weights.battery += 10;
  }
  if (prefs.gaming_needed) {
    weights.gpu += 15;
    weights.display += 10;
  }
  if (prefs.priority === 'Performa') {
    weights.cpu += 15;
    weights.ram += 10;
  } else if (prefs.priority === 'Baterai') {
    weights.battery += 20;
  } else if (prefs.priority === 'Portabilitas') {
    weights.portability += 20;
  } else if (prefs.priority === 'Harga') {
    weights.price += 25;
  }

  // Filter budget if specified
  let targetLaptops = laptops;
  if (prefs.budget_range && prefs.budget_range !== 'All') {
    targetLaptops = laptops.filter(l => l.price_range === prefs.budget_range);
    // If filter results in empty list, fall back to all laptops
    if (targetLaptops.length === 0) targetLaptops = laptops;
  }

  // Apply custom hardware specs filter if specified
  if (prefs.custom_specs) {
    const { min_ram, min_storage, min_cpu_cores, min_gpu_vram } = prefs.custom_specs;
    targetLaptops = targetLaptops.filter(l => {
      if (min_ram && l.specs.ram < min_ram) return false;
      if (min_storage && l.specs.storage.capacity < min_storage) return false;
      if (min_cpu_cores && l.specs.cpu.cores < min_cpu_cores) return false;
      if (min_gpu_vram && l.specs.gpu.vram < min_gpu_vram) return false;
      return true;
    });
    if (targetLaptops.length === 0) targetLaptops = laptops;
  }

  const totalWeight = Object.values(weights).reduce((a, b) => a + b, 0) || 1;

  const results: RecommendationResult[] = targetLaptops.map(laptop => {
    const norm = calculateNormalizedScores(laptop);

    let weightedSum = 0;
    (Object.keys(weights) as (keyof CriteriaWeights)[]).forEach(key => {
      weightedSum += weights[key] * norm[key];
    });

    const rawScore = (weightedSum / totalWeight) * 10; // 0 - 100
    const compatibilityScore = Math.min(100, Math.max(0, Math.round(rawScore)));

    const matchReasons: string[] = [];
    if (laptop.suitable_for.includes(prefs.profession)) {
      matchReasons.push(`Sangat cocok untuk profesi ${prefs.profession}`);
    }
    if (norm.cpu >= 8) matchReasons.push('Performa CPU sangat kencang');
    if (norm.gpu >= 8) matchReasons.push('Grafis / GPU powerful untuk rendering & game');
    if (norm.battery >= 8) matchReasons.push('Ketahanan baterai sangat luar biasa');
    if (norm.portability >= 8) matchReasons.push('Desain sangat ringan & portabel');
    if (norm.ram >= 8) matchReasons.push('Kapasitas RAM besar untuk multitasking lancar');
    if (matchReasons.length === 0) matchReasons.push('Memberikan keseimbangan spesifikasi yang baik');

    return {
      laptop,
      compatibility_score: compatibilityScore,
      normalized_scores: norm,
      rank: 0,
      match_reasons: matchReasons.slice(0, 3)
    };
  });

  // Sort by compatibility score descending, then by price ascending
  results.sort((a, b) => {
    if (b.compatibility_score !== a.compatibility_score) {
      return b.compatibility_score - a.compatibility_score;
    }
    return a.laptop.price - b.laptop.price;
  });

  // Assign ranks
  results.forEach((res, idx) => {
    res.rank = idx + 1;
  });

  return results;
}
