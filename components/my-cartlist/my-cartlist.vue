<template>
	<view class="cart-goods_list">
		<view class="good-item">
			<!-- 左侧 -->
			<view class="good-item-left">
				<radio :checked="good.goods_state" color="#c00000" @click="radiochange"/>
				<image :src="good.goods_small_logo || ''"></image>
			</view>
			<!-- 右侧 -->
			<view class="good-item-right">
				<view class="good-name">
					{{good.goods_name}}
				</view>
				<view class="item-right-bottom">
					<text>￥{{good.goods_price}}</text>
					<!-- 商品数量按钮 -->
					<view class="numbox">
						<uni-number-box :min="1" :value="good.goods_count" background="#fff" @change="changeval"></uni-number-box>
					</view>
				</view>
			</view>	
		</view>
	</view>
</template>

<script>
	export default {
		name:"my-cartlist",
		props:{
			good:{
				type: Object,
				default: {}
			}
		},

		data() {
			return {
				// 商品勾选状态
				// ischecked:'',
			};
		},
		methods:{
			// 勾选状态修改
			radiochange() {
				// if(good.goods_state == 0){
				// 	good.goods_state = 2
				// 	// this.ischecked = true
				// } else {
				// 	good.goods_state = 0
				// 	// this.ischecked = false
				// }
				this.$emit('radiochange', {
					goods_id: this.good.goods_id,
					goods_state: !this.good.goods_state
				})
			},
			// 数字框按钮
			changeval(val) {				
				this.$emit('numchange',{
					goods_id: this.good.goods_id,
					goods_count: val
				})
			},
		},
		// watch: {
		// 	ischecked(nvl) {
				
		// 	}
		// }
	}
</script>

<style lang="scss">
	.good-item {
		display: flex;
		width: 100%;
		box-sizing: border-box;
		align-items: center;
		border-bottom: 1px solid #e4dddd;
		.good-item-left {
			display: flex;
			width: 270rpx;
			align-items: center;
			padding-left: 6px;
		  image {
				width: 200rpx;
				height: 200rpx;
			}
		}
		.good-item-right {
			display: flex;
			height: 240rpx;
			flex-direction: column;
			justify-content: space-around;
			padding-left: 10px;
			.good-name {
				font-size: 22rpx;
			}
			.item-right-bottom {
				display: flex;
				// position: relative;
				align-items: center;
				justify-content: space-around;
			  text {
					padding-left: 10rpx;
					font-size: 28rpx;
					font-weight: bold;
					color: #c00000;
				}
				.numbox {
					// position: absolute;
					right: 30rpx;
					border: 1px solid #e4dddd;
				}
			}
		}
		
	}
</style>