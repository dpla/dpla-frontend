const {LOCALS} = require("./constants/local");
const path = require('path')
const dotenv = require('dotenv').config()
const process = require('process')

const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
    sassOptions: {
        // to allow SCSS files to import a plain “theme.module.scss” file
        includePaths: [process.env.SITE_ENV === "local" ?
            path.join(__dirname, "stylesheets", "themes", LOCALS[process.env.LOCAL_ID].theme) :
            path.join(__dirname, "stylesheets", "themes")]
    },
    webpack: (config) => {
        config.resolve.fallback = {
            fs: false,
            path: false,
            process: false
        };
        return config;
    }
})
