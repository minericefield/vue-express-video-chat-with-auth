const config = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ]
}

if(process.env.NODE_ENV === 'production') {
  config.plugins = [['transform-remove-console', { exclude: ['error', 'warn'] }]]
}

module.exports = config
