/// <reference types='vitest' />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { nxCopyAssetsPlugin } from '@nx/vite/plugins/nx-copy-assets.plugin';
import { tanstackRouter } from '@tanstack/router-plugin/vite';
import path from 'path';

export default defineConfig(() => ({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/frontend',
  server: {
    port: 3001,
    host: 'localhost',
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
  preview: {
    port: 3001,
    host: 'localhost',
  },
  plugins: [
    tanstackRouter({ target: 'react', autoCodeSplitting: true }),
    react(),
    nxViteTsPaths(),
    nxCopyAssetsPlugin(['*.md']),
  ],
  resolve: {
    alias: {
      '@frontend/translation': path.resolve(__dirname, './src/translation'),
      '@frontend/state': path.resolve(__dirname, './src/global-state'),
      '@frontend/supabase': path.resolve(__dirname, './src/supabase-client.ts'),
      '@frontend/components': path.resolve(__dirname, './src/components'),
      '@frontend/types': path.resolve(__dirname, './src/types.ts'),
    },
  },
  build: {
    outDir: '../../dist/frontend',
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
  test: {
    watch: false,
    globals: true,
    environment: 'jsdom',
    include: ['{src,tests}/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    reporters: ['default'],
    coverage: {
      reportsDirectory: '../../coverage/frontend',
      provider: 'v8' as const,
    },
  },
}));
