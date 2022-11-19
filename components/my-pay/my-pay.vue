<template>
	<view class="cart-bottom">
		<!-- 全选按钮 -->
		<label class="radio" @tap="changeAll">
			<radio :checked="isallchecked" color="#c00000"/><text>全选</text>
		</label>
		<!-- 合计 -->
		<view class="price-total">
			合计:<text>￥{{allmoney}}</text>
		</view>
		<!-- 结算 -->
		<view class="cart-topay" @tap="settle">
			结算{{allchecked}}
		</view>
	</view>
</template>

<script>
	import { mapState, mapGetters, mapMutations } from 'vuex'
	export default {
		name:"my-pay",
		data() {
			return {
				seconds:3,
				timer: null
			};
		},
		methods: {
			...mapMutations('cart', ['CheckALL']),
			...mapMutations('user', ['UpdateRedirectInfo']),
			// 全选
			changeAll() {
				this.CheckALL(!this.isallchecked)
				// console.log(!this.isallchecked);
			},
			// 结算
			settle() {
				if(!this.addstr) return uni.$showMsg('请选择地址')
				if(!this.allchecked) return uni.$showMsg('请选择商品')
				// if(!this.token) uni.$showMsg('请先登录')
				// 未登录三秒后跳转到登录界面
				if(!this.token) return this.tologin()
				// 结算
				this.toPayOrders()
			},
			// 跳转登录提示
			showTip(s) {
				uni.showToast({
					title: `请先登录后支付! ${s}秒后跳转登录界面`,
					icon: 'none'
				})
			},
			// 提示跳转操作
			tologin() {
				let {seconds, timer} = this
				let that = this
				seconds = 3
				this.showTip(seconds)
				timer = setInterval(() => {
					seconds--
					this.showTip(seconds)
					if(seconds<=0) {
					clearInterval(timer)
				   // 跳转到登录页面
					uni.switchTab({
						url:'/pages/my/my',
						success() {
							that.UpdateRedirectInfo({
								openType: 'switchTab',
								from: '/pages/cart/cart'
							})
						}
					})	
						}
				},1000)
			},
			// 微信支付
			async toPayOrders() {
				// 1、创建订单
				// 创建订单请求参数
				const ordersinfo = {
					// order_price: this.allmoney,//总价
					order_price:0.01,
					consignee_addr: this.addstr,//收货地址
					// 订单列表
					goods: this.cart.filter(x => x.state)
					.map(x => ({goods_id:x.goods_id, goods_number:x.goods_count, goods_price:x.goods_price}))
				}
				// 发起请求创建订单
				let { data:res1 } = await uni.$http.post('/api/public/v1/my/orders/create',ordersinfo)
				if(res1.meta.status!==200) return uni.$showMsg('创建订单失败')
				
				// 2、发起预支付
				// 设置预支付请求参数
				let ordernumber = res1.message.order_number
				let { data:res2 } = await uni.$http.post('/api/public/v1/my/orders/req_unifiedorder',{order_number:ordernumber})
				if(res2.meta.status!==200) return uni.$showMsg('预支付订单生成失败')
				
				// 3 发起微信支付
				// 微信支付参数
				let pay = res2.message.pay
					// pay.provider= 'wxpay'
				// 支付成功的回调
					pay.success = async (res) =>{
						// 查询订单状态
						const { data: res3 } = await uni.$http.post('/api/public/v1/my/orders/chkOrder', { order_number: ordernumber })
						if(res3.meta.status !==200) return uni.$showMsg('支付失败')
						uni.showToast({
							title:'支付成功',
							icon:'success'
						})
					}
					// 支付失败的回调
					pay.fail = (err) =>{
						// console.log('fail',err);
						uni.$showMsg('订单支付失败')
					}
				// 发起微信支付
				let res = await uni.requestPayment(pay)
			}
		},
		computed: {
			...mapState('cart', ['cart']),
			...mapState('user', ['token']),
			...mapGetters('cart',['allchecked','allmoney']),//'total',
			...mapGetters('user',['addstr']),
			//全选状态
			isallchecked() {
				// return this.total === this.allchecked
				return this.cart.length === this.allchecked
			}
		}
	}
</script>

<style lang="scss">
.cart-bottom {
		position: fixed;
		display: flex;
		width: 100%;
		bottom: 0;
		background-color: #fff;
		justify-content: space-between;
		align-items: center;
		font-size: 30rpx;
		// z-index: 999;
		// 合计区域
		.price-total {
			// padding: 0 100rpx;
			text {
				color: #c00000;
			}
		}
		// 结算按钮
		.cart-topay {
			width: 230rpx;
			height: 50px;
			background-color: #c00000;
			color: #fff;
			font-size: 34rpx;
			text-align: center;
			line-height: 50px;
			// align-items: center;
		}
	}
</style>