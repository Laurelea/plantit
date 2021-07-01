const {
  override,
  addDecoratorsLegacy,
  disableEsLint,
} = require("customize-cra");
const path = require("path");

module.exports = override(
    // enable legacy decorators babel plugin
    addDecoratorsLegacy(),

    // disable eslint in webpack
    disableEsLint(),
);