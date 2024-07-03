const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const isDevserver = process.env.NODE_LIVE;

module.exports = {
  entry: "./src/index.js",

  output: {
    filename: "bundle.[contenthash].js",
    path: path.resolve(__dirname, "dist"),
    clean: !isDevserver,
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: "PAGE TITLE",
      template: path.resolve(__dirname, "src/index.html"),
    }),
  ],

  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },

      {
        test: /\.html$/,
        use: ["html-loader"],
      },

      {
        test: /\.(png|svg|jpg|jpeg|gif)$/,
        type: "asset/resource",
      },
    ],
  },
};
