<template>
	<view class="adress">
		<!-- 选择收货地址 -->
		<view class="adress-choose" v-if="JSON.stringify(address) === '{}'" @tap="chooseaddress">选择收货地址</view>
		<!-- 收货地址 -->
		<view class="adress-item" v-else @tap="chooseaddress">
			<view class="persnoalinfo">
				<text>收货人: {{address.userName}}</text>
				<view>
					<text>电话: {{address.telNumber}}</text> <uni-icons type="forward" size="20"></uni-icons>
				</view>
			</view>
			<view class="persnoaladress">
				收货地址:{{addstr}}
			</view>
		</view>
		<!-- 底部条纹背景 -->
		<view class="adress-bgpic"></view>
	</view>
</template>

<script>
	import {mapState, mapMutations, mapGetters} from 'vuex'
	export default {
		name:"my-adress",
		data() {
			return {
				// address:{},
			};
		},
		methods: {
			// vuexmutation存储收货地址到本地
			...mapMutations('user',['SaveAdress']),
			// 获取收货地址
			chooseaddress() {
				let that = this
				uni.chooseAddress({
					success(res) {
						// that.address = res
						that.SaveAdress(res)
					}
				})
			}
		},
		computed: {
			// vuex地址
			...mapState('user',['address']),
			// vuex获取详细地址
			...mapGetters('user', ['addstr'])
			// adstr() {
			// 	let {provinceName,cityName,countyName,detailInfo} = this.address
			// 	if(!provinceName) return ''
			// 	return provinceName + cityName + countyName + detailInfo
			// }
		}
	}
</script>

<style lang="scss">
	.adress {
		position: relative;
		width: 100%;
		height: 95px;
		// 选择收货地址按钮
		.adress-choose {
			position: absolute;
			width: 270rpx;
			height: 30px;
			top: 50%;
			left: 50%;
			transform: translate(-50%,-50%);
			line-height: 30px;
			background-color: #1aad19;
			text-align: center;
			color: #fff;
			border-radius: 5px;
		}
		// 收货地址
		.adress-item {
			display: flex;
			flex-direction: column;
			height: 80%;
			justify-content: space-around;
			padding: 16rpx 0;
			font-size: 30rpx;
			.persnoalinfo {
				display: flex;
				justify-content: space-between;
				padding: 0 6px;
			  view {
				  display: flex;
				  align-items: center;
			  }	
			}
			.persnoaladress {
				padding-left: 6px;
			}
		}
		// 底部条纹
		.adress-bgpic {
			position: absolute;
			bottom: 0;
			width: 100%;
			height: 5px;
			background: url('@/static/adress1.png') repeat;
		}
	}
</style>