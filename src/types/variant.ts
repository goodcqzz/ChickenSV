export interface SVRecord {
  id: string; // Population column value
  chromosome: string; // Chr
  position: number; // POS
  ref: string; // REF
  alt: string; // ALT
  region: string; // Region
  gene: string; // Gene
  mean_fre: number; // Mean_fre
  svLength?: number; // computed SV length (abs difference between REF and ALT when numeric)
  freqs: Record<string, number>; // key: population code (column header), value: frequency
}

export interface SearchParams {
  chromosome: string;
  start: number;
  end: number;
}
