<template>
	<view class="user">		
	<view ref="logo" class="user-logo">
		<view class="user-logo-pic">
			<image :src="userinfo.avatarUrl"></image>
		</view>
		<view class="user-name">
			{{userinfo.nickName}}
		</view>
	</view>
	<view class="userinfo">
		<!-- 购物信息区域 -->
		<view class="user-shop">
			<view class="shop-item">
				<span>8</span>
				<span>收藏的店铺</span>
			</view>
			<view class="shop-item">
				<span>8</span>
				<span>收藏的店铺</span>
			</view><view class="shop-item">
				<span>8</span>
				<span>收藏的店铺</span>
			</view><view class="shop-item">
				<span>8</span>
				<span>收藏的店铺</span>
			</view>
		</view>
		<!-- 订单区域 -->
		<view class="user-orders">
			<view class="orders">
				我的订单
			</view>
			<view class="order-info">
				<view class="order-detail">
					<image src="../../static/tab-icon/daijiesuan.png"></image>
					<view class="order-text">
						待付款
					</view>
				</view>
				<view class="order-detail">
					<image src="../../static/tab-icon/cart_1.png"></image>
					<view class="order-text">
						待收货
					</view>
				</view><view class="order-detail">
					<image src="../../static/tab-icon/note.png"></image>
					<view class="order-text">
						全部订单
					</view>
				</view><view class="order-detail">
					<image src="../../static/tab-icon/pay_collect.png"></image>
					<view class="order-text">
						退款
					</view>
				</view>
			</view>
		</view>
		<!-- 设置区域 -->
		<view class="my-set">
			<ul>
				<li><span>收货地址</span><uni-icons type="forward"></uni-icons></li> 
				<li><span>联系客服</span><uni-icons type="forward"></uni-icons></li> 
				<li @tap="open('warn')"><span>退出登录</span><uni-icons type="forward"></uni-icons></li> 
			</ul>
		</view>
	</view>
		<!-- 弹出框 -->
			<!-- <uni-popup ref="popup" type="dialog">
				<uni-popup-dialog mode="input" message="成功消息" :duration="2000" :before-close="true" @close="close" @confirm="confirm"></uni-popup-dialog>
			</uni-popup> -->
			<uni-popup ref="alertDialog" type="dialog">
				<uni-popup-dialog :type="msgType" cancelText="关闭" confirmText="同意" title="通知" content="确认退出登录"
				 @confirm="dialogConfirm" ></uni-popup-dialog>
			</uni-popup>
	</view>
</template>

<script>
	import { mapState, mapMutations} from 'vuex'
	export default {
		name:"my-userinfo",
		// mounted() {
		// 	// this.userinfo = uni.$store.state.user.userinfo
		// },
		data() {
			return {
				// userinfo:''
				type: 'center',
				msgType: 'success',
			};
		},
		methods: {
			...mapMutations('user', ['UpdateUserinfo', 'UpdateToken', 'SaveAdress']),
			open(type) {
						this.msgType = type
						this.$refs.alertDialog.open()
					},
			dialogConfirm() {
				// token设为0退出
				this.SaveAdress({}) 
				this.UpdateUserinfo({}) 
				this.UpdateToken('') 
			}
				
		},
		computed: {
			...mapState('user', ['userinfo'])
		}
	}
</script>

<style lang="scss">
	.user {
		background-color: #f4f4f4;
		height: 100vh;
	// 头像
	.user-logo {
		width: 100%;
		height: 250px;
		background-color: #003d74;
		text-align: center;
		overflow: hidden;//将父元素转化为BFC,不受其他元素影响
		.user-logo-pic {
			width: 174rpx;
			height: 174rpx;
			margin: 0 auto;
			margin-top: 100rpx;
			background-color: #fff;
			border-radius: 50%;
			overflow: hidden;
		   image {
			   width: 100%;
			   height: 100%;
		   }
		}
		.user-name {
			font-size: 34rpx;
			margin-top: 30rpx;
			color: #fff;
		}
	}
	.userinfo {
		width: 100%;
		margin-top: -30px;
		view{
			width: 90%;
			background-color: #fff;
		}
		// 收藏店铺
		.user-shop {
			display: flex;
			height: 70px;
			margin: 10px auto;
			justify-content: space-around;
			align-items: center;
			.shop-item {
				display: flex;
				width: 145px;
				flex-direction: column;
				text-align: center;	
				font-size: 30rpx;
			}
		}
		// 我的订单
		.user-orders {
			display: flex;
			flex-direction: column;
			margin: 10px auto;
			.orders {
				height: 60px;
				line-height: 60px;
				padding-left: 10px;
				font-size: 36rpx;
			}
			.order-info {
				display: flex;
				width: 100%;
				justify-content: space-around;
				border-top: 1px solid #c0c0c0;
				.order-detail {
					width: 25%;
					height: 100px;
					margin: 0 0;
					box-sizing: border-box;
					text-align: center;
					padding: 10px 0;
					image {
						width: 100rpx;
						height: 100rpx;
					}
					.order-text {
						text-align: center;
						font-size: 20rpx;
					}
				}
			}
		}
		// 设置列表
		.my-set {
			margin: 10px auto;
			ul {
				padding: 0 0 0 40rpx;
			li {
				display: flex;
				width: 100%;
				justify-content: space-between;
				list-style: none;
				height: 60px;
				line-height: 60px;
				font-size: 32rpx;
			   }
			}
			
			
		}
	}
	}
</style>