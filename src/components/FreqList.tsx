import React from 'react'
import { Paper, Typography, Box, LinearProgress, List, ListItem, ListItemText, Chip, IconButton, Stack, Tooltip } from '@mui/material'
import DownloadIcon from '@mui/icons-material/FileDownload'
import type { SVRecord } from '../types/variant'

interface Props { record: SVRecord | null }

function downloadCsv(record: SVRecord) {
  const rows = [['population', 'frequency']]
  for (const [k, v] of Object.entries(record.freqs || {})) rows.push([k, String(v)])
  const csv = rows.map((r) => r.map((c) => '"' + String(c).replace(/"/g, '""') + '"').join(',')).join('\n')
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${record.id || 'record'}_freqs.csv`
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
}

const FreqList: React.FC<Props> = ({ record }) => {
  if (!record) return (
    <Paper elevation={3} sx={{ p: 2, mt: 2 }}>
      <Typography variant="h6" align="center">各品种突变型基因频率</Typography>
      <Box sx={{ mt: 1 }}>
        <Typography variant="body2" color="text.secondary">请选择一个变异记录以查看各品种频率</Typography>
      </Box>
    </Paper>
  )

  const entries = Object.entries(record.freqs || {}).map(([name, value]) => ({ name, value: Number(value) || 0 }))
  // sort descending
  entries.sort((a, b) => b.value - a.value)

  return (
    <Paper elevation={3} sx={{ p: 2, mt: 2 }}>
      <Box>
        <Typography variant="h6" align="center">各品种基因频率</Typography>
        <Box sx={{ mt: 0.5, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography variant="caption" color="text.secondary">记录: {record.id} • Chr {record.chromosome}:{record.position}</Typography>
          </Box>
        </Box>
        <Stack direction="row" spacing={1} alignItems="center">
          <Chip label={`REF:${record.ref || '-'}`} size="small" />
          <Chip label={`ALT:${record.alt || '-'}`} size="small" />
          <Chip label={`LEN:${record.svLength ?? '-'}`} size="small" />
          <Tooltip title="下载当前频率为 CSV">
            <IconButton size="small" onClick={() => downloadCsv(record)}>
              <DownloadIcon />
            </IconButton>
          </Tooltip>
        </Stack>
      </Box>

      <Typography variant="body2" sx={{ mt: 1 }}>品种数: {entries.length} • 平均频率: {(record.mean_fre * 100).toFixed(3)}%</Typography>

      <Box sx={{ mt: 1, maxHeight: 560, overflow: 'auto' }}>
        <List dense disablePadding>
          {entries.map((e) => (
            <ListItem key={e.name} sx={{ alignItems: 'center', py: 0.5 }}>
              <ListItemText primary={<Typography variant="body2" sx={{ fontWeight: 600 }}>{e.name}</Typography>} secondary={<Typography variant="caption" color="text.secondary">{(e.value * 100).toFixed(3)}%</Typography>} sx={{ mr: 2, minWidth: 120 }} />
              <Box sx={{ width: '55%', mr: 2 }}>
                <LinearProgress variant="determinate" value={Math.min(100, e.value * 100)} sx={{ height: 10, borderRadius: 2 }} />
              </Box>
              <Box sx={{ width: 56, textAlign: 'right' }}>
                <Typography variant="body2">{(e.value * 100).toFixed(3)}%</Typography>
              </Box>
            </ListItem>
          ))}
        </List>
      </Box>
    </Paper>
  )
}

export default FreqList
