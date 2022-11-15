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
		<view class="cart-topay">
			结算{{allchecked}}
		</view>
	</view>
</template>

<script>
	import { mapState, mapGetters, mapMutations } from 'vuex'
	export default {
		name:"my-pay",
		mounted() {
			console.log(this.isallchecked);
		},
		data() {
			return {
				
			};
		},
		methods: {
			...mapMutations('cart', ['CheckALL']),
			// 全选
			changeAll() {
				this.CheckALL(!this.isallchecked)
				// console.log(!this.isallchecked);
			}
		},
		computed: {
			...mapState('cart', ['cart']),
			...mapGetters('cart',['allchecked','allmoney']),//'total',
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