const { defineConfig } = require('cypress')

module.exports = defineConfig({
  projectId: 'd944bj',
  viewportWidth: 1280,
  viewportHeight: 800,
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config)
    },
    baseUrl: 'http://localhost:3000',
    specPattern: 'cypress/e2e/**/*.spec.js',
    excludeSpecPattern: ['**/__snapshots__/*', '**/__image_snapshots__/*'],
  },
})
