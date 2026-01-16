import { defineConfig } from "vite";
import react from '@vitejs/plugin-react';
import vike from 'vike/plugin'; // 1. Import Vike

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    vike(), 
  ],

  base: "/vibecoding-playbook/",
  build: {
    outDir: "dist",
    sourcemap: true,
  },
  server: {
    port: 3000,
    open: false,
  },
});
