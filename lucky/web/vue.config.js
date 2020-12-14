module.exports = {
  devServer: {
    port: 3000,
    proxy: {
      '/lottery': {
        target: 'https://ec-platform.fat.ethancont.com/',
        changeOrigin: true,
      }
    }
  }
}