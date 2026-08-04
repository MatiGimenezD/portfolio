import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "/portfolio/",
  server: {
    allowedHosts: ["nondelicately-aphoristic-esme.ngrok-free.dev"],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules/three") || id.includes("node_modules/@react-three")) {
            return "three-vendor";
          }
          if (id.includes("node_modules/react-github-calendar") || id.includes("node_modules/lenis")) {
            return "ui-vendor";
          }
        },
      },
    },
  },
});
