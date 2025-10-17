import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      // Force Vite to use the project's own React to avoid multiple copies
      { find: 'react', replacement: path.resolve(__dirname, 'node_modules/react') },
      { find: 'react-dom', replacement: path.resolve(__dirname, 'node_modules/react-dom') },
      // runtime aliases can help with react/jsx-runtime resolution
      { find: 'react/jsx-runtime', replacement: path.resolve(__dirname, 'node_modules/react/jsx-runtime') },
    ],
  },
})
