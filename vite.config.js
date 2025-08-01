import { defineConfig } from "vite";
import laravel, { refreshPaths } from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";
import { resolve } from 'node:path';
import flowbiteReact from "flowbite-react/plugin/vite";

export default defineConfig({
    plugins: [laravel({
        input: ["resources/css/app.css", "resources/js/app.jsx"],
        refresh: [
            ...refreshPaths,
            "app/Livewire/**",
            "app/Filament/**",
            "app/Providers/**",
        ],
    }), react(), flowbiteReact()],
    resolve: {
        alias: {
            "@": "/resources/js",
            'ziggy-js': resolve(__dirname, 'vendor/tightenco/ziggy')

        },
    },
});