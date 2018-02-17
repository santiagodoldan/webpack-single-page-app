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
    "./app/index.js",
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
      { test: /\.tsx?$/, loader: "awesome-typescript-loader" },
      { test: /\.less$/, use: "less-loader" },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ["css-loader", "sass-loader"],
          publicPath: "/",
        }),
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "url-loader?limit=10000&mimetype=application/font-woff",
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "file-loader",
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
