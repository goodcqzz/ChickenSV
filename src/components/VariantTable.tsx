import React from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
} from '@mui/material';
import LaunchIcon from '@mui/icons-material/Launch';
import type { SVRecord } from '../types/variant';

interface Props {
  variants: SVRecord[];
  onViewFreqs: (v: SVRecord) => void;
}

const VariantTable: React.FC<Props> = ({ variants, onViewFreqs }) => {
  return (
    <Paper elevation={2} sx={{ mt: 2 }}>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Chr</TableCell>
              <TableCell>POS</TableCell>
              <TableCell>REF</TableCell>
              <TableCell>ALT</TableCell>
              <TableCell>LEN</TableCell>
              <TableCell>Gene</TableCell>
              <TableCell>Mean_fre</TableCell>
              <TableCell align="right">操作</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {variants.map((v) => (
              <TableRow key={v.id + '_' + v.position} hover>
                <TableCell>{v.id}</TableCell>
                <TableCell>{v.chromosome}</TableCell>
                <TableCell>{v.position}</TableCell>
                <TableCell>{v.ref}</TableCell>
                <TableCell>{v.alt}</TableCell>
                <TableCell>{v.svLength ?? 0}</TableCell>
                <TableCell>{v.gene}</TableCell>
                <TableCell>{(v.mean_fre ?? 0).toFixed(3)}</TableCell>
                <TableCell align="right">
                  <IconButton size="small" onClick={() => onViewFreqs(v)}>
                    <LaunchIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default VariantTable;
