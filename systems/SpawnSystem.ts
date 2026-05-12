export function getSpawnIntervalMs(wave: number): number {
  const baseCadence = 820 - wave * 35;
  const roundBoost = Math.floor(wave / 5) * 35;
  return Math.max(120, baseCadence - roundBoost);
}

export function getSpawnBatchSize(wave: number): number {
  return Math.min(8, 1 + Math.floor(wave / 5));
}
