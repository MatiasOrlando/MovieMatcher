import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    fs: {
      strict: false,
    },
    middleware: [
      (req, res, next) => {
        if (req.originalUrl !== "/" && !req.originalUrl.includes(".")) {
          req.url = "/";
        }
        next();
      },
    ],
  },
});
