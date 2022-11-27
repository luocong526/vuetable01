module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset',
	//1. 加载elementui配置项
	["@babel/preset-env", { "modules": false }]
  ],
  //2. 加载elementui配置项
  plugins: [
      [
        "component",
        {
          "libraryName": "element-ui",
          "styleLibraryName": "theme-chalk"
        }
      ]
    ]
}
