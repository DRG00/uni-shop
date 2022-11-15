// 收货地址模块
export default {
	namespaced:true,
	state: () => ({
		address: JSON.parse(uni.getStorageSync('address') || '{}')
	}),
	
	mutations: {
		SaveAdress(state,address) {
			state.address = address
			this.commit('adress/saveadsToStorage')
		},
		// 收货存储到本地
		saveadsToStorage(state) {
			uni.setStorageSync('address',JSON.stringify(state.address))
		}
	},
	
	getters: {},
}