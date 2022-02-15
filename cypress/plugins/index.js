const fs = require('fs')

/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
module.exports = (on, config) => {
  on('task', {
    // Needs to be done through a task, as we can't access `fs` in test case
    // (this task runs in Node which allows use of external libraries).
    readFileMaybe(filename) {
      // console.log('Loading ', filename);
      if (fs.existsSync(filename)) {
        return fs.readFileSync(filename, 'utf8');
      }
      // console.log('Could not find ', filename);
      return '';
    }
  });
}
