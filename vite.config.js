import { resolve } from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { crx } from "@crxjs/vite-plugin";
import manifest from "./extension/manifest-dev.json";

const radix_ui = resolve(__dirname, "node_modules/@radix-ui");

export default defineConfig({
  resolve: {
    alias: {
      "@radix-ui": radix_ui,
    },
  },
  plugins: [react(), crx({ manifest })],
});
