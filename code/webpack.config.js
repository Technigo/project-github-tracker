const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const LinkTypePlugin =
  require("html-webpack-link-type-plugin").HtmlWebpackLinkTypePlugin;
module.exports = {
  entry: "./script.js",
  output: { path: path.join(__dirname, "build"), filename: "index.bundle.js" },
  mode: process.env.NODE_ENV || "development",
  resolve: {
    extensions: [".js"],
  },
  // devServer: { contentBase: __dirname },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.css$/,
        exclude: /stylesheets|node_modules/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(jpg|jpeg|png|gif|mp3|svg)$/,
        use: ["file-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "index.html"),
    }),
    new LinkTypePlugin({
      "*.css": "text/css",
    }),
  ],
};
