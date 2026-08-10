import path from 'path';
import checker from 'vite-plugin-checker';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// ----------------------------------------------------------------------

const PORT = 3039;

export default defineConfig({
  plugins: [
    react(),
    // checker({
    //   typescript: true,
    //   eslint: {
    //     useFlatConfig: true,
    //     lintCommand: 'eslint "./src/**/*.{js,jsx,ts,tsx}"',
    //     dev: { logLevel: ['error'] },
    //   },
    //   overlay: {
    //     position: 'tl',
    //     initialIsOpen: false,
    //   },
    // }),
  ],
  resolve: {
    alias: [
      {
        find: /^pages\/(.+)/,
        replacement: path.resolve(process.cwd(), 'src/pages/$1'),
      },
      {
        find: /^layouts\/(.+)/,
        replacement: path.resolve(process.cwd(), 'src/layouts/$1'),
      },
      {
        find: /^sections\/(.+)/,
        replacement: path.resolve(process.cwd(), 'src/sections/$1'),
      },
      {
        find: /^src(.+)/,
        replacement: path.resolve(process.cwd(), 'src/$1'),
      },
    ],
  },
  server: { port: PORT, host: true },
  preview: { port: PORT, host: true },
});
