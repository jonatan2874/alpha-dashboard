import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // build: {
    // rollupOptions: {
      // entryFileNames: '[name].js',
      // chunkFileNames: '[name].js'
    // }
  // }
  // build: {
  //   // target: "ES2022" // <--------- ✅✅✅✅✅✅
  //   target: "esnext"
  // }
})
