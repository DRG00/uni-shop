// 购物车模块
export default {
	// 为当前模块开启命名空间
	// namespace: true,
	namespaced: true,
	
	// 模块的state数据
	state: () => ({
		// 购物车的数组，用来存储购物车中每个商品的信息对象
		// 每个商品的信息对象，都包含如下 6 个属性：
		// { goods_id, goods_name, goods_price, goods_count, goods_small_logo, goods_state }
		cart: JSON.parse(uni.getStorageSync('cart') || '[]')
	}),
	// state:{
	// 	cart: [{
	// 			a:'cnm'
	// 		}],
	// },
	
	mutations:{
		ADDCART(state,goods) {
			// 根据提交的商品id查询购物车是否已有该商品
			// 不存在返回undefined ,否则表示已存在该商品
			let findgood = state.cart.find(	x=> x.goods_id === goods.goods_id)
			
			if(!findgood) {
				state.cart.push(goods)
			} else {
				// 购物车存在则商品数量加一
				findgood.goods_count++
			};
	this.commit('cart/saveStorage')
		},
		// 将数据存储到本地
		saveStorage(state) {
			uni.setStorageSync('cart',JSON.stringify(state.cart))
		},
	},
	getters:{
		total(state) {
			let n = 0
			state.cart.forEach( goods => n += goods.goods_count)
			return n
		}
	}
}