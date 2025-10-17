import React, { useEffect, useState } from 'react';
import { Container, CircularProgress, Box, Typography } from '@mui/material';
import SearchForm from '../components/SearchForm';
import VariantTable from '../components/VariantTable';
import FreqList from '../components/FreqList';
import { loadSVs } from '../utils/csvParser';
import type { SVRecord, SearchParams } from '../types/variant';

const HomePage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [all, setAll] = useState<SVRecord[]>([]);
  const [results, setResults] = useState<SVRecord[]>([]);
  const [selected, setSelected] = useState<SVRecord | null>(null);

  useEffect(() => {
    loadSVs().then((recs) => {
      setAll(recs);
      setLoading(false);
    }).catch((e) => {
      console.error('Failed to load CSV', e);
      setLoading(false);
    });
  }, []);

  const handleSearch = (params: SearchParams) => {
    const chr = params.chromosome.replace(/^chr/i, '');
    const filtered = all.filter((r) => {
      const rchr = r.chromosome.replace(/^chr/i, '');
      return rchr === chr && r.position >= params.start && r.position <= params.end;
    });
    setResults(filtered);
    setSelected(filtered[0] || null);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>基因组变异数据库浏览器</Typography>
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" sx={{ height: 200 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <SearchForm onSearch={handleSearch} />
          <Box display="flex" gap={2} alignItems="flex-start">
            <Box flex={2}>
              <VariantTable variants={results} onViewFreqs={(v) => setSelected(v)} />
            </Box>
            <Box flex={1}>
              <FreqList record={selected} />
            </Box>
          </Box>
        </>
      )}
    </Container>
  );
};

export default HomePage;
