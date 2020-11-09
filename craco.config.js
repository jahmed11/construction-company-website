const CracoLessPlugin = require("craco-less");
const CracoAlias = require("craco-alias");
const path = require("path");

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { "@primary-color": "#1d39c4" },
            javascriptEnabled: true,
          },
        },
      },
    },
    {
      plugin: CracoAlias,
      options: {
        source: "options",
        baseUrl: "./",
        aliases: {
          Pages: "./src/pages/",
          
        },
      },
    },
  ],
};
