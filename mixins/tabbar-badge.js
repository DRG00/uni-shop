import { mapGetters } from 'vuex'
	// 导出一个mixin对象
export default {
	computed: {
		...mapGetters('cart',['total'])
	},
	// 页面展示时设置徽标
	onShow() {
		this.setbadge()
	},
	methods: {
		setbadge() {
			uni.setTabBarBadge({
				index:2,
				text:this.total + ''
			})
		}
	}
}