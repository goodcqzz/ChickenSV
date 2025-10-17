import React from 'react'
import { AppBar, Toolbar, Typography, Box, IconButton, Tooltip, Container } from '@mui/material'
import InfoIcon from '@mui/icons-material/Info'
import GetAppIcon from '@mui/icons-material/GetApp'

const TopBanner: React.FC = () => {
  return (
    <AppBar position="sticky" color="transparent" elevation={0} sx={{ backdropFilter: 'blur(6px)', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
      <Toolbar disableGutters>
        <Container maxWidth="lg" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 1 }}>
          <Box sx={{ textAlign: 'left' }}>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              Chicken Genome SV Database
            </Typography>
            <Typography variant="caption" sx={{ display: 'block', color: 'text.secondary' }}>
              Structural variant frequency browser — 搜索基于染色体位置，查看各品种频率（GRCg7b）
            </Typography>
          </Box>

          <Box>
            <Tooltip title="下载当前视图数据（占位）">
              <IconButton size="small" color="inherit">
                <GetAppIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="帮助">
              <IconButton size="small" color="inherit">
                <InfoIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Container>
      </Toolbar>
    </AppBar>
  )
}

export default TopBanner
