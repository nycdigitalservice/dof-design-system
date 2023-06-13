import { defineConfig } from 'vite';
import path from 'path';
import UnoCSS from 'unocss/vite';
import postcssPresetEnv from 'postcss-preset-env';
import Inspect from 'vite-plugin-inspect'

export default defineConfig({
    root: 'src',
    build: {
        outDir: '../dist',
        minify: false,
        cssMinify: false,
        cssCodeSplit: false,
        modulePreload: false,
        lib: {
            entry: path.resolve(__dirname, 'src/main.js'),
            name: "DOF2023"
        },
        rollupOptions: {
            output: {
                assetFileNames: (assetInfo) => {
                    if (assetInfo.name === 'style.css') return 'dof-2023-styles.css';
                    return assetInfo.name;
                },
            },
        },
    },
    css: {
        postcss: {
            plugins: [
                postcssPresetEnv({
                    stage: 2,
                    features: {
                        'nesting-rules': true,
                        'custom-selectors': true
                    }
                }),
            ]
        }
    },
    plugins: [
        UnoCSS()
    ],
});
