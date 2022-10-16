const { defineConfig } = require('cypress')

module.exports = defineConfig({
    e2e: {
        baseUrl: 'http://localhost:3000',
        projectId : "d944bj",
        viewportWidth: 1280,
        viewportHeight: 800,
        excludeSpecPattern: [
            "**/__snapshots__/*",
            "**/__image_snapshots__/*"
        ]
    }
})