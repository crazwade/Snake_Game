module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? './'
    : './',
  outputDir: './dist',
  configureWebpack: {
    optimization: {
      splitChunks: false,
    },
  },
};
