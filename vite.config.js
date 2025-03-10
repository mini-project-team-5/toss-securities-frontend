import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import svgrPlugin from "vite-plugin-svgr";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), svgrPlugin()],
  server: {
    port: 3000,
  },
});
