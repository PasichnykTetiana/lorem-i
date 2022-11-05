import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import babel from 'vite-plugin-babel';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr({      svgr: {/* SVGR config */},
    svgrState: {/* SVGR state */},
    esbuild: {/* esbuild config */},
    defaultExport: false,}), babel(),],
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        additionalData: '@root-entry-name: default;',
      },
    },
  },

})
