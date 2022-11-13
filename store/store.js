import Vue from 'vue'
import Vuex from 'vuex'
import cart from '@/store/cart.js'
//2 将Vuex安装为vue插件
Vue.use(Vuex)

// 3创建store实例对象
const store = new Vuex.Store({
	// 挂载store模块
	module:{
		cart
	}
})