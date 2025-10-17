import React from 'react'
import { Paper, Typography, Box, Alert } from '@mui/material'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import type { SVRecord } from '../types/variant'

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7f50', '#8dd1e1', '#a4de6c', '#d0ed57', '#ffc0cb']

interface Props { record: SVRecord | null }

const FreqBarChart: React.FC<Props> = ({ record }) => {
  if (!record) return (
    <Paper elevation={2} sx={{ p: 2, mt: 2 }}>
      <Typography variant="subtitle1">按品种频率排序的条形图</Typography>
      <Box sx={{ mt: 1 }}>
        <Typography variant="body2" color="text.secondary">请选择一个变异记录以查看各品种频率</Typography>
      </Box>
    </Paper>
  )

  // build data array from freqs
  const data = Object.entries(record.freqs || {}).map(([name, value]) => ({ name, value: Number(value) || 0 }))
  // sort descending by value (non-mutating copy)
  const sorted = [...data].sort((a, b) => b.value - a.value)

  // Dynamic height: allocate 28px per item plus padding, cap at 1200px
  const perItem = 28
  const header = 36
  const computedHeight = Math.min(1200, header + sorted.length * perItem)

  // diagnostics
  const totalItems = sorted.length
  const nonZero = sorted.filter((s) => s.value > 0).length
  // compute dataMax with fallback so axis isn't collapsed when all zeros
  const dataMax = sorted.length ? Math.max(...sorted.map((s) => s.value)) : 0
  const xDomainMax = dataMax > 0 ? dataMax : 0.001

  // small on-screen debug to help diagnose empty charts
  // eslint-disable-next-line no-console
  console.debug('FreqBarChart selected id=', record.id, 'items=', totalItems, 'nonZero=', nonZero, 'sample=', sorted.slice(0,5))

  return (
    <Paper elevation={2} sx={{ p: 2, mt: 2 }}>
      <Typography variant="subtitle1">按品种频率排序的条形图</Typography>
      <Box sx={{ mt: 1 }}>
        <Typography variant="body2">记录: {record.id} — 品种数: {totalItems} — 非零: {nonZero}</Typography>
      </Box>

      {totalItems === 0 ? (
        <Box sx={{ mt: 2 }}>
          <Alert severity="info">该记录没有可用的品种频率数据。</Alert>
        </Box>
      ) : (
        <div style={{ width: '100%', height: computedHeight, overflow: 'auto' }}>
          <ResponsiveContainer width="100%" height={computedHeight}>
            <BarChart layout="vertical" data={sorted} margin={{ top: 10, right: 30, left: 120, bottom: 10 }}>
              <XAxis type="number" domain={[0, xDomainMax]} tickFormatter={(v) => (v * 100).toFixed(0) + '%'} />
              <YAxis dataKey="name" type="category" width={160} />
              <Tooltip formatter={(v:any) => (Number(v) * 100).toFixed(3) + '%'} />
              <Bar dataKey="value" barSize={18}>
                {sorted.map((entry, idx) => (
                  <Cell key={entry.name} fill={COLORS[idx % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </Paper>
  )
}

export default FreqBarChart
