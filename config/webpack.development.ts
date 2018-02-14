import * as webpack from "webpack"
import * as merge from "webpack-merge"

import commonConfig from "./webpack.common"

const config: webpack.Configuration = {
  devServer: {
    hot: true,
    inline: true,
    progress: true,
  },
}

export default merge(commonConfig, config)
