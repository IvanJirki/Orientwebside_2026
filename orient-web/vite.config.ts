import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  // `true` = listen on all interfaces. If http://localhost:8080 fails in the browser, try http://127.0.0.1:8080/
  server: {
    host: true,
    port: 8080,
    strictPort: false,
    // OneDrive / cloud-sync folders often break native FS watchers on Windows; polling is slower but reliable.
    watch: {
      usePolling: true,
      interval: 1000,
    },
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
