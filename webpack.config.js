/* eslint-disable prettier/prettier */
const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react-ts");
const Dotenv = require("dotenv-webpack");

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "sapiencia",
    projectName: "payroll",
    webpackConfigEnv,
    argv,
  });

  return merge(defaultConfig, {
    module: {
      rules: [
        {
          test: /\.s[ac]ss$/i,
          use: ["style-loader", "css-loader", "sass-loader"],
        },
        {
          test: /\.(eot|ttf|woff|woff2)$/,
          use: {
            loader: "url-loader",
          },
        },
        {
          test: /\.png$/,
          exclude: /public/,
          use: "file-loader",
        },
      ],
    },
    plugins: [new Dotenv()],
  });
};
