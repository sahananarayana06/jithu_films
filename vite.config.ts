
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { defineConfig } from "vite";

const projectRoot = import.meta.dirname;

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(projectRoot, "client", "src"),
      "@shared": path.resolve(projectRoot, "shared"),
      "@assets": path.resolve(projectRoot, "attached_assets"),
    },
  },
  envDir: projectRoot,
  root: path.resolve(projectRoot, "client"),
  publicDir: path.resolve(projectRoot, "client", "public"),
  build: {
    outDir: path.resolve(projectRoot, "dist/public"),
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) return;
          if (/\/(react|react-dom|scheduler)\//.test(id)) return "vendor-react";
          if (/\/gsap\//.test(id)) return "vendor-gsap";
          if (/\/lucide-react\//.test(id)) return "vendor-icons";
          if (/\/(@tanstack|@trpc|superjson|nanoid)\//.test(id)) {
            return "vendor-api";
          }
        },
      },
    },
  },
  server: {
    host: true,
    allowedHosts: true,
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
});
