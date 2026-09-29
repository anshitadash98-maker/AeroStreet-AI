import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// /api calls go to the AeroStreet backend (npm run dev in repo root, port 3000)
export default defineConfig({
  plugins: [react()],
  server: { proxy: { '/api': 'http://localhost:3000' } },
});
