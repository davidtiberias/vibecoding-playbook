import { defineConfig } from "vite";
import react from '@vitejs/plugin-react';
import { Mode, plugin as markdown } from 'vite-plugin-markdown';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    markdown({
      mode: [Mode.HTML, Mode.REACT]
    })
  ],

  base: "/vibecoding-playbook/",
  build: {
    outDir: "dist",
    sourcemap: true,
  },
  server: {
    port: 3000,
    open: true,
  },
});
