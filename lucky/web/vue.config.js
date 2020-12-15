module.exports = {
  devServer: {
    port: 3333,
    proxy: {
      '/lottery': {
        target: 'https://ec-platform.fat.ethancont.com/',
        changeOrigin: true,
      }
    }
  }
}