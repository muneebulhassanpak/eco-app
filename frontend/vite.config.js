import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    https: {
      key: "./ecoapp-privateKey.key",
      cert: "./ecoapp.crt",
    },
  },
  plugins: [react()],
});
