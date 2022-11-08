import App from './App'

// #ifndef VUE3
import Vue from 'vue'
// 导入第三方网络请求包 支持axios（请求响应拦截等功能）
import {$http} from "@escook/request-miniprogram"
// 引入vant
// import { Search } from 'vant';
// Vue.use(Search)
uni.$http = $http
// 配置请求根路径
$http.baseUrl = 'https://api-hmugo-web.itheima.net'
// 添加请求拦截器
$http.beforeRequest = function (option){
	// 添加loading效果
	uni.showLoading({
		title:'数据加载中……',
	})
}
// 响应拦截器
$http.afterRequest = function (){
	uni.hideLoading()
}
// 封装uni.showMsg()显示提示框
uni.$showMsg = function (title='数据加载失败',duration=1500){
	uni.showToast({
		title,
		duration,
		icon:'none'
	})
}


Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif