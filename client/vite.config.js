import path from "path-browserify"; // Thay thế module path gốc bằng path-browserify
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve("./src"),
      "path": "path-browserify", // Alias path vào path-browserify
    },
  },
});
