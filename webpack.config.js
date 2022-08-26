const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/app.ts",
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    // The outputed file name
    filename: "bundle.js",
    // Output directroy
    path: path.resolve(__dirname, "dist"),
    // The URL the browser will handle the files in
    publicPath: "/dist",
    // Clean the output directory before emit.
  },
  devServer: {
    static: {
      // directroy defines the area that webpack-dev-server grasps the files in
      directory: path.join(__dirname, "/"),
      // publicPath is the URL the browser grasps the files from.
      // {static.directroy}/{publicPath}
      publicPath: '/',
    },
    // open: {
    //   target: ['index.html'],
    // }
  },
};
