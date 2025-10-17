import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Debug: print React version to help detect duplicate instances
try {
  // React.version is a string like '19.2.0'
  // eslint-disable-next-line no-console
  console.log('React version (runtime):', (React as any).version)
} catch (e) {
  // eslint-disable-next-line no-console
  console.warn('Unable to read React.version', e)
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
