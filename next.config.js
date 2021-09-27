const { LOCALS } = require("./constants/local");

module.exports = {
    sassOptions: {
        includePaths: [
            // to allow SCSS files to import a plain “_theme.scss” file
            "./stylesheets/themes" +
            (process.env.SITE_ENV === "local" ? "/" + LOCALS[process.env.LOCAL_ID].theme : "")
        ]
    },
}
