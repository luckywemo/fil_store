import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/utils/setup.ts'],
    include: ['src/**/*.test.{ts,tsx}', 'app/**/__tests__/**/*.test.{ts,tsx}'],
    exclude: ['**/node_modules/**', '**/dist/**'],
    deps: {
      optimizer: {
        web: {
          include: ['lucide-react', 'react-router-dom']
        }
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './')
    }
  }
})