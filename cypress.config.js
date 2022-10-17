const { defineConfig } = require('cypress')

const { initPlugin } = require('cypress-plugin-snapshots/plugin');


module.exports = defineConfig({
    e2e: {
        baseUrl: 'http://localhost:3000',
        projectId : "d944bj",
        viewportWidth: 1280,
        viewportHeight: 800,
        excludeSpecPattern: [
            "**/__snapshots__/*",
            "**/__image_snapshots__/*"
        ],
        setupNodeEvents(on, config) {
            initPlugin(on, config);
            return config;
        }
    }
})