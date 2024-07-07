import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"
import jsonServer from 'vite-plugin-simple-json-server'


export default defineConfig({
  plugins: [jsonServer()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src/"),
    }
  }
})
