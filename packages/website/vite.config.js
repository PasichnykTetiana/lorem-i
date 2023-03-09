import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import babel from "vite-plugin-babel";
import dns from "dns";

// https://vitejs.dev/config/
dns.setDefaultResultOrder("verbatim");

export default defineConfig({
  server: {
    host: "localhost",
    port: 8080,
  },
  plugins: [
    react(),
    svgr({
      svgr: {
        /* SVGR config */
      },
      svgrState: {
        /* SVGR state */
      },
      esbuild: {
        /* esbuild config */
      },
      defaultExport: false,
    }),
    babel(),
  ],
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        additionalData: "@root-entry-name: default;",
      },
    },
  },
});
