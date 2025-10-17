import Papa from 'papaparse';
import type { ParseResult } from 'papaparse';
import type { SVRecord } from '../types/variant';

type CsvRow = Record<string, any>;

export async function loadSVs(csvPath = '/2147.pop.freq_R2F.csv'): Promise<SVRecord[]> {
  return new Promise<SVRecord[]>((resolve, reject) => {
    Papa.parse<CsvRow>(csvPath, {
      download: true,
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      complete: (results: ParseResult<CsvRow>) => {
        try {
          const data = results.data as CsvRow[];
          if (!data || data.length === 0) return resolve([]);

          // first 8 columns are meta, from 9th column onwards are populations
          const headers = results.meta.fields || [];
          const popCols = headers.slice(8);

          const records: SVRecord[] = data.map((row) => {
            const freqs: Record<string, number> = {};
            for (const col of popCols) {
              const v = row[col];
              freqs[col] = typeof v === 'number' ? v : parseFloat(String(v)) || 0;
            }

            return {
              id: String(row['Population'] || row['population'] || ''),
              chromosome: String(row['Chr'] || row['chr'] || ''),
              position: Number(row['POS'] || row['pos'] || 0),
              ref: String(row['REF'] || ''),
              alt: String(row['ALT'] || ''),
              // attempt to parse SV length from ALT or a special column (AILT)
              svLength: (() => {
                const ailt = row['AILT'] || row['A I L T'] || row['A-ILT'] || row['AILT(alt)'] || undefined;
                if (ailt) {
                  const n = Number(ailt);
                  if (!Number.isNaN(n)) return Math.abs(n);
                }
                // if ALT is numeric (length) or like <DEL:123> try to extract
                const altRaw = String(row['ALT'] || '')
                const m = altRaw.match(/(\d+)/);
                if (m) return Math.abs(Number(m[1]));
                // fallback: use length of REF/ALT strings
                try { return Math.abs(String(row['REF'] || '').length - String(row['ALT'] || '').length); } catch { return 0 }
              })(),
              region: String(row['Region'] || ''),
              gene: String(row['Gene'] || ''),
              mean_fre: Number(row['Mean_fre'] || row['mean_fre'] || 0),
              freqs,
            } as SVRecord;
          });

          resolve(records);
        } catch (err) {
          reject(err as Error);
        }
      },
      error: (err) => reject(err),
    });
  });
}
