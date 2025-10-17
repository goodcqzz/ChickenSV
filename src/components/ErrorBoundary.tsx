import React from 'react'
import { Box, Typography, Button } from '@mui/material'

type State = { hasError: boolean; error?: Error | null }

export default class ErrorBoundary extends React.Component<React.PropsWithChildren, State> {
  constructor(props: any) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    // Log to console - dev tools will show stack trace
    console.error('Uncaught error in React tree:', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box sx={{ p: 4 }}>
          <Typography variant="h5" color="error" gutterBottom>
            应用发生错误 — 请查看控制台获取更多信息。
          </Typography>
          <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap', mb: 2 }}>
            {this.state.error?.message}
          </Typography>
          <Button variant="contained" onClick={() => location.reload()}>
            刷新页面
          </Button>
        </Box>
      )
    }

    return this.props.children as React.ReactElement
  }
}
