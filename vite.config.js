import { defineConfig } from 'vite';
import path from 'path';
import UnoCSS from 'unocss/vite';
import postcssPresetEnv from 'postcss-preset-env';
import postcss from 'rollup-plugin-postcss';

export default defineConfig({
    root: 'src',
    build: {
        outDir: '../dist',
        minify: false,
        cssMinify: false,
        cssCodeSplit: true,
        modulePreload: false,
        lib: {
            entry: [path.resolve(__dirname, 'src/main.js'), path.resolve(__dirname, 'src/docs/docs.js')],
            name: "DOFDS"
        },
        rollupOptions: {
            output: {
                assetFileNames: (assetInfo) => {
                    if (assetInfo.name === 'docs.css') return 'dof-2023-docs.css';
                    if (assetInfo.name === 'main.css') return 'dof-2023-styles.css';
                    return assetInfo.name;
                },
            },
            // plugins: [
            //     postcss({
            //         include: path.resolve(__dirname, 'src/docs/docs.css'),
            //         extract: path.resolve(__dirname, 'dist/docs.css')
            //     })
            // ]
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
