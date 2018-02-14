require("ts-node").register({
  project: "./tsconfig.json"
})

const env = process.env.NODE_ENV || "development"

module.exports = require(`./config/webpack.${env}.ts`)
