const { LOCALS } = require("./constants/local");
const path = require('path')

const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
    sassOptions: {
        // to allow SCSS files to import a plain “theme.module.scss” file
        includePaths: [ process.env.SITE_ENV === "local" ?
            path.join(__dirname, "stylesheets", "themes", LOCALS[process.env.LOCAL_ID].theme) :
            path.join(__dirname, "stylesheets", "themes") ]
    }
})
