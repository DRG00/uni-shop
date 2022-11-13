import Vue from 'vue'
import Vuex from 'vuex'
//2 将Vuex安装为vue插件
Vue.use(Vuex)
import cart from '@/store/cart.js'
// 3创建store实例对象
// const store = new Vuex.Store({
// 	// 挂载store模块
// 	module:{
// 		my_cart,
// 	}
// })

// export default store

export default new Vuex.Store({
		modules:{
			cart
		}
	})