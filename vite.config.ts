import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
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
