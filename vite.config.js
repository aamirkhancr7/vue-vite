// import { fileURLToPath, URL } from 'node:url';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { manualChunksPlugin } from 'vite-plugin-webpackchunkname';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue(), manualChunksPlugin()],
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src'),
            // '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
});
