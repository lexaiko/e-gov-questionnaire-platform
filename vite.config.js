import { defineConfig } from "vite";
import laravel, { refreshPaths } from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";
import { resolve } from 'node:path';

export default defineConfig({
    plugins: [laravel({
        input: ["resources/css/app.css", "resources/js/app.jsx", "resources/js/app.js"],
        refresh: [
            ...refreshPaths,
            "app/Livewire/**",
            "app/Filament/**",
            "app/Providers/**",
        ],
    }), react(),
],
    resolve: {
        alias: {
            "@": "/resources/js",
            'ziggy-js': resolve(__dirname, 'vendor/tightenco/ziggy')

        },
    },
});
