const createExpoWebpackConfigAsync = require("@expo/webpack-config");
const WorkboxWebpackPlugin = require("workbox-webpack-plugin");

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(
    {
      ...env,
      // Passing true will enable the default Workbox + Expo SW configuration.
      offline: false,
    },
    argv
  );
  // Customize the config before returning it.
  return config;
};
