const path = require("path");

module.exports = {
  mode: "production", //  'development' | 'production'
  entry: {
    background: "./src/background/background.js",
    content_script: "./src/content-scripts/main.js",
  },

  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "build"),
  },
};
