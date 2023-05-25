import { defineConfig } from 'vite';
import UnoCSS from 'unocss/vite';
import postcssPresetEnv from 'postcss-preset-env';

export default defineConfig({
  root: 'src',
  build: {
    outDir: '../dist',
  },
  css: {
    // postcss: '../',
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
