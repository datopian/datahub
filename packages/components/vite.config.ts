import react from '@vitejs/plugin-react'
import path from 'node:path'
import { defineConfig } from 'vitest/config'
import dts from 'vite-plugin-dts'
import tailwindcss from 'tailwindcss'
import { UserConfigExport } from 'vite'
import replace from "rollup-plugin-re"

const app = async (): Promise<UserConfigExport> => {
  return defineConfig({
    plugins: [
      react(),
      replace({
          patterns: [
            {
              match: /js-sha256/,
              test: `eval("require('crypto')")`,
              replace: `require('crypto')`,
            },
            {
              match: /js-sha256/,
              test: `eval("require('buffer').Buffer")`,
              replace: `require('buffer').Buffer`,
            },
          ],
        }),
      dts({
        insertTypesEntry: true,
      }),
    ],
    css: {
      postcss: {
        plugins: [tailwindcss],
      },
    },
    build: {
      lib: {
        entry: path.resolve(__dirname, 'src/index.ts'),
        name: 'components',
        formats: ['es', 'umd'],
        fileName: (format) => `components.${format}.js`,
      },
      rollupOptions: {
        external: ['react', 'react-dom', 'tailwindcss', 'vega-lite', 'vega', 'react-vega', 'leaflet'],
        output: {
          globals: {
            react: 'React',
            'react-dom': 'ReactDOM',
            tailwindcss: 'tailwindcss',
            leaflet: 'leaflet'
          },
        },
      },
    },
    test: {
      globals: true,
      environment: 'jsdom',
    },
  })
}
// https://vitejs.dev/config/
export default app
