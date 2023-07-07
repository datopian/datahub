// vite.config.ts
import react from "file:///home/urutu-branco/Projetos/portaljs/node_modules/@vitejs/plugin-react-swc/index.mjs";
import path from "node:path";
import { defineConfig } from "file:///home/urutu-branco/Projetos/portaljs/node_modules/vitest/dist/config.js";
import dts from "file:///home/urutu-branco/Projetos/portaljs/node_modules/vite-plugin-dts/dist/index.mjs";
import tailwindcss from "file:///home/urutu-branco/Projetos/portaljs/node_modules/tailwindcss/lib/index.js";
var __vite_injected_original_dirname = "/home/urutu-branco/Projetos/portaljs/packages/components";
var app = async () => {
  return defineConfig({
    plugins: [
      react(),
      dts({
        insertTypesEntry: true
      })
    ],
    css: {
      postcss: {
        plugins: [tailwindcss]
      }
    },
    build: {
      target: "es2020",
      lib: {
        entry: path.resolve(__vite_injected_original_dirname, "src/index.ts"),
        name: "components",
        formats: ["es", "umd"],
        fileName: (format) => `components.${format}.js`
      },
      rollupOptions: {
        external: [
          "react",
          "ol-mapbox-style",
          "react-dom",
          "tailwindcss",
          "vega-lite",
          "vega",
          "react-vega",
          "ol",
          "ol/dom.js"
        ],
        output: {
          manualChunks: void 0,
          globals: {
            react: "React",
            ol: "ol",
            "ol/dom.js": "ol/dom.js",
            "react-vega": "react-vega",
            "react-dom": "ReactDOM",
            tailwindcss: "tailwindcss"
          }
        }
      }
    },
    test: {
      globals: true,
      environment: "jsdom"
    }
  });
};
var vite_config_default = app;
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS91cnV0dS1icmFuY28vUHJvamV0b3MvcG9ydGFsanMvcGFja2FnZXMvY29tcG9uZW50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL2hvbWUvdXJ1dHUtYnJhbmNvL1Byb2pldG9zL3BvcnRhbGpzL3BhY2thZ2VzL2NvbXBvbmVudHMvdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL2hvbWUvdXJ1dHUtYnJhbmNvL1Byb2pldG9zL3BvcnRhbGpzL3BhY2thZ2VzL2NvbXBvbmVudHMvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgcmVhY3QgZnJvbSAnQHZpdGVqcy9wbHVnaW4tcmVhY3Qtc3djJztcbmltcG9ydCBwYXRoIGZyb20gJ25vZGU6cGF0aCc7XG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlc3QvY29uZmlnJztcbmltcG9ydCBkdHMgZnJvbSAndml0ZS1wbHVnaW4tZHRzJztcbmltcG9ydCB0YWlsd2luZGNzcyBmcm9tICd0YWlsd2luZGNzcyc7XG5pbXBvcnQgeyBVc2VyQ29uZmlnRXhwb3J0IH0gZnJvbSAndml0ZSc7XG5pbXBvcnQgcmVwbGFjZSBmcm9tICdyb2xsdXAtcGx1Z2luLXJlJztcblxuY29uc3QgYXBwID0gYXN5bmMgKCk6IFByb21pc2U8VXNlckNvbmZpZ0V4cG9ydD4gPT4ge1xuICByZXR1cm4gZGVmaW5lQ29uZmlnKHtcbiAgICBwbHVnaW5zOiBbXG4gICAgICByZWFjdCgpLFxuICAgICAgZHRzKHtcbiAgICAgICAgaW5zZXJ0VHlwZXNFbnRyeTogdHJ1ZSxcbiAgICAgIH0pLFxuICAgIF0sXG4gICAgY3NzOiB7XG4gICAgICBwb3N0Y3NzOiB7XG4gICAgICAgIHBsdWdpbnM6IFt0YWlsd2luZGNzc10sXG4gICAgICB9LFxuICAgIH0sXG4gICAgYnVpbGQ6IHtcbiAgICAgIHRhcmdldDogJ2VzMjAyMCcsXG4gICAgICBsaWI6IHtcbiAgICAgICAgZW50cnk6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMvaW5kZXgudHMnKSxcbiAgICAgICAgbmFtZTogJ2NvbXBvbmVudHMnLFxuICAgICAgICBmb3JtYXRzOiBbJ2VzJywgJ3VtZCddLFxuICAgICAgICBmaWxlTmFtZTogKGZvcm1hdCkgPT4gYGNvbXBvbmVudHMuJHtmb3JtYXR9LmpzYCxcbiAgICAgIH0sXG4gICAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICAgIGV4dGVybmFsOiBbXG4gICAgICAgICAgJ3JlYWN0JyxcbiAgICAgICAgICAnb2wtbWFwYm94LXN0eWxlJyxcbiAgICAgICAgICAncmVhY3QtZG9tJyxcbiAgICAgICAgICAndGFpbHdpbmRjc3MnLFxuICAgICAgICAgICd2ZWdhLWxpdGUnLFxuICAgICAgICAgICd2ZWdhJyxcbiAgICAgICAgICAncmVhY3QtdmVnYScsXG4gICAgICAgICAgJ29sJyxcbiAgICAgICAgICAnb2wvZG9tLmpzJyxcbiAgICAgICAgXSxcbiAgICAgICAgb3V0cHV0OiB7XG4gICAgICAgICAgbWFudWFsQ2h1bmtzOiB1bmRlZmluZWQsXG4gICAgICAgICAgZ2xvYmFsczoge1xuICAgICAgICAgICAgcmVhY3Q6ICdSZWFjdCcsXG4gICAgICAgICAgICBvbDogJ29sJyxcbiAgICAgICAgICAgICdvbC9kb20uanMnOiAnb2wvZG9tLmpzJyxcbiAgICAgICAgICAgICdyZWFjdC12ZWdhJzogJ3JlYWN0LXZlZ2EnLFxuICAgICAgICAgICAgJ3JlYWN0LWRvbSc6ICdSZWFjdERPTScsXG4gICAgICAgICAgICB0YWlsd2luZGNzczogJ3RhaWx3aW5kY3NzJyxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9LFxuICAgIHRlc3Q6IHtcbiAgICAgIGdsb2JhbHM6IHRydWUsXG4gICAgICBlbnZpcm9ubWVudDogJ2pzZG9tJyxcbiAgICB9LFxuICB9KTtcbn07XG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgYXBwO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUEwVixPQUFPLFdBQVc7QUFDNVcsT0FBTyxVQUFVO0FBQ2pCLFNBQVMsb0JBQW9CO0FBQzdCLE9BQU8sU0FBUztBQUNoQixPQUFPLGlCQUFpQjtBQUp4QixJQUFNLG1DQUFtQztBQVF6QyxJQUFNLE1BQU0sWUFBdUM7QUFDakQsU0FBTyxhQUFhO0FBQUEsSUFDbEIsU0FBUztBQUFBLE1BQ1AsTUFBTTtBQUFBLE1BQ04sSUFBSTtBQUFBLFFBQ0Ysa0JBQWtCO0FBQUEsTUFDcEIsQ0FBQztBQUFBLElBQ0g7QUFBQSxJQUNBLEtBQUs7QUFBQSxNQUNILFNBQVM7QUFBQSxRQUNQLFNBQVMsQ0FBQyxXQUFXO0FBQUEsTUFDdkI7QUFBQSxJQUNGO0FBQUEsSUFDQSxPQUFPO0FBQUEsTUFDTCxRQUFRO0FBQUEsTUFDUixLQUFLO0FBQUEsUUFDSCxPQUFPLEtBQUssUUFBUSxrQ0FBVyxjQUFjO0FBQUEsUUFDN0MsTUFBTTtBQUFBLFFBQ04sU0FBUyxDQUFDLE1BQU0sS0FBSztBQUFBLFFBQ3JCLFVBQVUsQ0FBQyxXQUFXLGNBQWM7QUFBQSxNQUN0QztBQUFBLE1BQ0EsZUFBZTtBQUFBLFFBQ2IsVUFBVTtBQUFBLFVBQ1I7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFFBQ0Y7QUFBQSxRQUNBLFFBQVE7QUFBQSxVQUNOLGNBQWM7QUFBQSxVQUNkLFNBQVM7QUFBQSxZQUNQLE9BQU87QUFBQSxZQUNQLElBQUk7QUFBQSxZQUNKLGFBQWE7QUFBQSxZQUNiLGNBQWM7QUFBQSxZQUNkLGFBQWE7QUFBQSxZQUNiLGFBQWE7QUFBQSxVQUNmO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsSUFDQSxNQUFNO0FBQUEsTUFDSixTQUFTO0FBQUEsTUFDVCxhQUFhO0FBQUEsSUFDZjtBQUFBLEVBQ0YsQ0FBQztBQUNIO0FBRUEsSUFBTyxzQkFBUTsiLAogICJuYW1lcyI6IFtdCn0K
