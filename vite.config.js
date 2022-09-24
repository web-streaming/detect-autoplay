import fs from 'fs'
import { defineConfig } from 'vite'

const type = process.env.BUILD_TYPE

fs.rmSync('./lib', { recursive: true, force: true })
if (type !== 'es') {
  fs.rmSync('./dist', { recursive: true, force: true })
}

export default defineConfig(({ command }) => {
  if (command === 'build') {
    if (type === 'es') {
      return {
        build: {
          emptyOutDir: false,
          minify: false,
          rollupOptions: {
            input: './src/index.ts',
            preserveEntrySignatures: 'strict',
            output: {
              manualChunks: undefined,
              format: 'es',
              dir: './lib',
              preserveModules: true,
              entryFileNames: '[name].js',
              assetFileNames: '[name][extname]',
            }
          }
        }
      }
    } else {
      return {
        build: {
          emptyOutDir: false,
          lib: {
            entry: './src/index.ts',
            name: 'detectAutoplay',
            formats: ['umd'],
            fileName: () => 'index.min.js'
          },
          minify: 'terser',
          sourcemap: true
        }
      }
    }
  }
})
