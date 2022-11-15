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
		// 修改购物车商品勾选状态
		ChangeState(state,goods) {
			let findgood = state.cart.find(	x=> x.goods_id === goods.goods_id)
			if(findgood) {
				findgood.goods_state = goods.goods_state
				this.commit('cart/saveStorage')
			}
		},
		// 修改商品数量
		ChangeCount(state,good) {
			let findgood = state.cart.find( x => x.goods_id === good.goods_id)
			if(findgood) {
				findgood.goods_count = good.goods_count
				this.commit('cart/saveStorage')
			}
		},
		// 删除商品
		RemoveGood(state,goods_id) {
			// 过滤id不同的商品
			state.cart = state.cart.filter( x => x.goods_id !== goods_id)
			this.commit('cart/saveStorage')
		},
		// 全选/反选
		CheckALL(state,checked) {
			state.cart.forEach( x => x.goods_state = checked)
			this.commit('cart/saveStorage')
		}
	},
	getters:{
		// 商品数量
		total(state) {
			return state.cart.length
		},
		// total(state) {
		// 	let n = 0
		// 	state.cart.forEach( goods => n += goods.goods_count)
		// 	return n
		// },
		// 勾选商品的总数量
		allchecked(state) {
			// return state.cart.filter( x => x.goods_state).reduce((all,item) => all += item.goods_count, 0 )
			return state.cart.filter( x => x.goods_state).length
		},
		allmoney(state) {
			return state.cart.filter( x => x.goods_state)
					.reduce((all,item) => all += item.goods_count * item.goods_price, 0).toFixed(2)//小数点后两位
		}
	}
}