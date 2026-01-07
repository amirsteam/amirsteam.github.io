// https://vite.dev/config/
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "/", // ✅ REQUIRED for custom domain
  server: {
    port: 3000,
  },
  build: {
    outDir: "dist",
    sourcemap: false,
  },
});
