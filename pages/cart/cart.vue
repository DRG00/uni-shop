<template>
	<view class="nothing" v-if="!cart.length">
		<view class="nonepic">
			<image src="../../static/cart.png"></image>
		</view>
		<view class="text">
			什么也没有哦！！！
		</view>
	</view>
	<view v-else>
		<!-- 收货地址 -->
		<myadress></myadress>
	<!-- 购物车标题logo -->
	<view class="cart-title">
			<uni-icons type="shop" size="25"></uni-icons>
			<text>购物车</text>
	</view>
	<!-- 购物车列表 -->
	<view class="cartlist">
		<!-- 自定义组件 -->
		<scroll-view scroll-y="true" :style="{height:wh+'px'}">
			<uni-swipe-action>
				<block v-for="(good,index) in cart" :key="good.goods_id">
				    <uni-swipe-action-item :right-options="options" @click="swipeaction(good)" @change="swipwchange($event,index)">
					<mycartlist :good="good" @radiochange='radiochange' @numchange='numchange'></mycartlist>
					</uni-swipe-action-item>
				</block>
			</uni-swipe-action>
		</scroll-view>
		
	</view>
	<!-- 底部结算 -->
		<mypay></mypay>
	</view>
</template>

<script>
	import badge from '@/mixins/tabbar-badge.js';
	import { mapState, mapMutations } from 'vuex';
	import mycartlist from '../../components/my-cartlist/my-cartlist.vue'
	import mypay from '@/components/my-pay/my-pay.vue'
	import myadress from '@/components/my-adress/my-adress.vue'
	export default {
		mixins:[badge],
		computed: {
			...mapState('cart', ['cart'])
		},
		onLoad() {
			let styinfo = uni.getSystemInfoSync()
			this.wh = styinfo.windowHeight - 190
		},
		data() {
			return {
				wh:'',
				options:[
					{
						text:'删除',
						style:{
							backgroundColor:'#c00000'
						}
					}
				]
			}
		},
		methods: {
			...mapMutations('cart',['ChangeState','ChangeCount','RemoveGood']),
			radiochange(e) {
				this.ChangeState(e)
			},
			numchange(e) {
				this.ChangeCount(e)
			},
			// 滑动
			swipeaction(good) {
				console.log(good);
				this.RemoveGood(good.goods_id)
			},
			swipwchange(e,i) {
				console.log(e);
				console.log(i);
			}
		},
		components :{
			// 注册商品列表组件
			mycartlist,
			mypay,
			myadress
		}
	}
</script>

<style lang="scss">
	// logo
	.cart-title {
		display: flex;
		align-items: center;
		height: 40px;
		font-size: 30rpx;
		border-bottom: 1px solid #c0c0c0;
		text {
			padding-left: 6px;
		}
	}
	.cartlist {
		margin-bottom: 50px;
	}
	// 空屏
	.nothing {
		text-align: center;
		margin-top: 100px;
		.nonepic {
			image {
				width: 300rpx;
				height: 290rpx;
			}
		}
		.text {
			margin-top: 10px;
			margin-left: 10px;
			font-size: 30rpx
		}
		// margin: 100px auto;
		// text-align: center;
		// image {
		// 	width: 300px;
		// 	height: 500px;
		// }
	}

</style>
