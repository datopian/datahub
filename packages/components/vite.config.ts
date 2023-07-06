import react from '@vitejs/plugin-react-swc';
import path from 'node:path';
import { defineConfig } from 'vitest/config';
import dts from 'vite-plugin-dts';
import tailwindcss from 'tailwindcss';
import { UserConfigExport } from 'vite';
import replace from 'rollup-plugin-re';

const app = async (): Promise<UserConfigExport> => {
  return defineConfig({
    plugins: [
      react(),
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
      target: 'es2020',
      lib: {
        entry: path.resolve(__dirname, 'src/index.ts'),
        name: 'components',
        formats: ['es', 'umd'],
        fileName: (format) => `components.${format}.js`,
      },
      rollupOptions: {
        external: [
          'react',
          'ol-mapbox-style',
          'react-dom',
          'tailwindcss',
          'vega-lite',
          'vega',
          'react-vega',
          'ol',
          'ol/dom.js',
          'ol/reproj.js',
        ],
        output: {
          manualChunks: undefined,
          globals: {
            react: 'React',
            ol: 'ol',
            'ol-mapbox-style': 'ol-mapbox-style',
            'ol/dom.js': 'ol/dom.js',
            'ol/reproj.js': 'ol/reproj.js',
            'react-vega': 'react-vega',
            'react-dom': 'ReactDOM',
            tailwindcss: 'tailwindcss',
          },
        },
      },
    },
    test: {
      globals: true,
      environment: 'jsdom',
    },
  });
};
// https://vitejs.dev/config/
export default app;
