import React from 'react';
import { Paper, Typography } from '@mui/material';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import type { SVRecord } from '../types/variant';

interface Props {
  record: SVRecord | null;
  topN?: number; // if provided, will limit slices; otherwise show all
}

const COLORS = [
  '#8884d8', '#82ca9d', '#ffc658', '#ff7f50', '#8dd1e1', '#a4de6c', '#d0ed57', '#ffc0cb',
];

const FreqPieChart: React.FC<Props> = ({ record, topN = 10 }) => {
  if (!record) return null;

  const entries = Object.entries(record.freqs || {});
  const data = entries.map(([k, v]) => ({ name: k, value: Number(v) }));

  // If topN is specified, show topN (no 'others' aggregation); otherwise show all
  let sorted = data.sort((a, b) => b.value - a.value);
  if (topN && topN > 0 && sorted.length > topN) {
    sorted = sorted.slice(0, topN);
  }

  return (
    <Paper elevation={2} sx={{ p: 2, mt: 2, height: 360 }}>
      <Typography variant="h6">{record.id} @ {record.chromosome}:{record.position} — 品种频率</Typography>
      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie dataKey="value" data={sorted} innerRadius={50} outerRadius={100} label>
            {sorted.map((_, idx) => (
              <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value: any) => (Number(value) * 100).toFixed(2) + '%'} />
        </PieChart>
      </ResponsiveContainer>

      {/* Legend: full list of populations and values */}
      <div style={{ marginTop: 8 }}>
        {data.map((d, i) => (
          <div key={d.name} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 12, height: 12, background: COLORS[i % COLORS.length], borderRadius: 2 }} />
            <div style={{ fontSize: 12 }}>{d.name}: {(Number(d.value) * 100).toFixed(3)}%</div>
          </div>
        ))}
      </div>
    </Paper>
  );
};

export default FreqPieChart;
