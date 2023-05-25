import { defineConfig, presetUno, presetIcons } from 'unocss';

export default defineConfig({
  presets: [
    presetUno({ variablePrefix: 'nyc-' }),
    presetIcons()
  ]
});
