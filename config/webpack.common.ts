import * as path from "path"
import * as webpack from "webpack"

import * as ExtractTextPlugin from "extract-text-webpack-plugin"
import * as HtmlWebpackPlugin from "html-webpack-plugin"

const ROOT_PATH  = path.resolve(__dirname, "..")
const APP_PATH   = path.resolve(ROOT_PATH, "app")
const BUILD_PATH = path.resolve(ROOT_PATH, "dist")

const config: webpack.Configuration = {
  entry: [
    "./app/scss/main.scss",
  ],
  output: {
    path: BUILD_PATH,
    publicPath: "/",
    filename: "[hash].bundle.js",
  },
  resolve: {
    extensions: [".ts", ".js", ".json"],
  },
  module: {
    rules: [
      { test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ["css-loader", "sass-loader"],
          publicPath: "/",
        }),
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin({
      filename: "[hash].style.css",
      allChunks: true,
    }),
    new HtmlWebpackPlugin({
      title: "Webpack vanilla single-page app",
      template: "./app/index.html",
    }),
  ],
}

export default config
