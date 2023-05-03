import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    rewrites: [{ source: "/(.*)", destination: "/index.html" }],
  },
});
