import React, { useState } from 'react';
import { Box, TextField, Button, Paper, Typography } from '@mui/material';
import type { SearchParams } from '../types/variant';

interface Props {
  onSearch: (params: SearchParams) => void;
}

const SearchForm: React.FC<Props> = ({ onSearch }) => {
  const [chromosome, setChromosome] = useState('');
  const [start, setStart] = useState<number | ''>('');
  const [end, setEnd] = useState<number | ''>('');

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({
      chromosome: chromosome.trim(),
      start: Number(start) || 0,
      end: Number(end) || 0,
    });
  };

  return (
    <Paper sx={{ p: 2, mb: 2 }} elevation={2}>
      <Typography variant="h6" gutterBottom>
        根据区间搜索 SV
      </Typography>
      <Box component="form" onSubmit={submit} display="flex" gap={2} flexWrap="wrap">
        <TextField
          label="染色体 (例如 1 或 chr1)"
          value={chromosome}
          onChange={(e) => setChromosome(e.target.value)}
          sx={{ minWidth: 160 }}
        />
        <TextField
          label="起始位置"
          type="number"
          value={start}
          onChange={(e) => setStart(e.target.value === '' ? '' : Number(e.target.value))}
          sx={{ minWidth: 160 }}
        />
        <TextField
          label="结束位置"
          type="number"
          value={end}
          onChange={(e) => setEnd(e.target.value === '' ? '' : Number(e.target.value))}
          sx={{ minWidth: 160 }}
        />
        <Box display="flex" alignItems="center">
          <Button type="submit" variant="contained">
            搜索
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default SearchForm;
