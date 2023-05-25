// Vite is not reading plugins from this file
const postcssPresetEnv  = require('postcss-preset-env')

module.exports = {
  plugins: [
    postcssPresetEnv({
      stage: 1,
    }),
  ]
}
