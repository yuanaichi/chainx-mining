
// ref: https://umijs.org/config/
export default {
  publicPath: './',
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      // dynamicImport: {
      //   loadingComponent: './components/PageLoading/index',
      // },
      dynamicImport: false,
      title: 'Chainx mining',
      dll: false,
      hardSource: false,
      routes: {
        exclude: [
          /components/,
        ],
      },
      locale: {
        enable: true, // default false
        default: 'en-US', //默认语言 zh-CN
        baseNavigator: true, // 为true时，用navigator.language的值作为默认语言
      },
    }],
  ],
  proxy: {
    "/api": {
      target: "https://api.chainx.org/",
      changeOrigin: true
    }
  }
}
