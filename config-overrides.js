const rewirePostCSS = require("react-app-rewire-postcss");

module.exports = config => {
  config = rewirePostCSS(config, {
    plugins: loader => [require("precss")()]
  });

  config.module.rules.push({
    test: /\.(js|mjs|jsx|ts|tsx)$/,
    use: [
      {
        loader: "astroturf/loader",
        options: { extension: ".module.css" }
      }
    ]
  });

  return config;
};
