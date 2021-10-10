const { LOCALS } = require("./constants/local");

const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
    sassOptions: {
        includePaths: [
            // to allow SCSS files to import a plain “_theme.scss” file
            "./stylesheets/themes" +
            (process.env.SITE_ENV === "local" ? "/" + LOCALS[process.env.LOCAL_ID].theme : "")
        ]
    },
})
