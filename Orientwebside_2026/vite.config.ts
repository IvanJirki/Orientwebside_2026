import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  // `true` = listen on all interfaces. Local: http://localhost:5173/ — if port is busy, stop other `npm run dev` first.
  server: {
    host: true,
    // Vite default; avoids silent port drift (8081, 8082…) when another dev server still holds 8080.
    port: 5173,
    strictPort: true,
    open: true,
    // OneDrive / cloud-sync folders often break native FS watchers on Windows; polling is slower but reliable.
    watch: {
      usePolling: true,
      interval: 1000,
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
