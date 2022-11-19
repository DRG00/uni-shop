// 收货地址模块
export default {
	namespaced:true,
	state: () => ({
		address: JSON.parse(uni.getStorageSync('address') || '{}'),
		token:uni.getStorageSync('token'),
		// === '0' ? '0' : '	',
		userinfo:JSON.parse(uni.getStorageSync('userinfo') || '{}'),
		// 重定向的 object 对象 { openType, from }
		redirectInfo: null
	}),
	
	mutations: {
		SaveAdress(state,address) {
			state.address = address
			this.commit('user/saveadsToStorage')
		},
		// 更新用户信息
		UpdateUserinfo(state,userinfo) {
			state.userinfo = userinfo
			this.commit('user/saveuserinfo')
		},
		// 更新token
		UpdateToken(state,token) {
			state.token = token
			this.commit('user/savetoken')
		},
		// 获取重定向信息
		UpdateRedirectInfo(state, info) {
			state.redirectInfo = info
		},
		// 收货存储到本地
		saveadsToStorage(state) {
			uni.setStorageSync('address',JSON.stringify(state.address))
		},
		// 存储token到本地
		savetoken(state) {
			uni.setStorageSync('token', state.token)
		},
		// 存储用户信息到本地
		saveuserinfo(state) {
			uni.setStorageSync('userinfo',JSON.stringify(state.userinfo))
		}
	},
	
	getters: {
		addstr(state) {
			let {provinceName,cityName,countyName,detailInfo} = state.address
			if(!provinceName) return ''
			return provinceName + cityName + countyName + detailInfo
		}
	},
}