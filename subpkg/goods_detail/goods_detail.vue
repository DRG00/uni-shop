<template>
	<view>
		<!-- 轮播图 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
			<swiper-item v-for="(item,index) in gooddetail.pics" :key="index">
				<view class="swiper-item" @tap="preview(index)">
					<image :src="item.pics_big" mode=""></image>
				</view>
			</swiper-item>
		</swiper>
		<!-- 商品信息 -->
		<view class="goodinfo">
			<view> ￥{{gooddetail.goods_price}} </view>
			<view> {{gooddetail.goods_name}} 
				<view class="goodlike">
					<uni-icons type="star" size="30"></uni-icons>
					<text>收藏</text>
				</view>
			 </view>
			<view>快递： 免运费</view>
		</view>
		<!-- 商品详情图片 -->
		<rich-text :nodes="gooddetail.goods_introduce"></rich-text>
		<!-- 底部导航 -->
		<!-- <uni-goods-nav :fill="" :options="options" :button-group="" @click="" @buttonClick="" /> -->
		<view class="good-nav">
			<uni-goods-nav :fill="true":options="options" :button-group="btnGroup" @click="onClick" @buttonClick="btnClick" />
		</view>
	</view>
	</view>
</template>

<script>
	// 从 vuex 中按需导出辅助方法
	import { mapState, mapMutations, mapGetters } from 'vuex';
	// import store from '@/store/store.js';
	export default {
		onLoad(option) {
			console.log(option);
			this.id= option.goodId || option.goods_id,
			this.getgoodDetail()
		},
			// ...mapState('模块的名称', ['要映射的数据名称1', '要映射的数据名称2'])
			    computed: {
					...mapState('cart',['cart']),//前面加模块名可直接获取state中的数据
					...mapGetters('cart',['total'])
				},
		data() {
			return {
				id:0,//商品id
				gooddetail:{},//商品数据
				// 底部导航按钮
				options:[{
						icon:'shop',
						text:'店铺'
					},
					{
						icon:'cart',
						text:'购物车',
						info:'',
						infoBackgroundColor:'#c00000'
					}],
				btnGroup:[{
						text: '加入购物车',
						backgroundColor: '#ff0000',
						color: '#fff'
					},
					{
						text: '立即购买',
						backgroundColor: '#ffa200',
						color: '#fff'
					}]
			};
		},
		methods:{
			// vuex
			...mapMutations('cart',['ADDCART']),
			// 获取详情页信息
			async getgoodDetail() {
				const { data:result } = await uni.$http.get('/api/public/v1/goods/detail',{ goods_id:this.id })
				if(result.meta.status!==200) uni.$showMsg()
				// 使用字符串的 replace() 方法，将 webp 的后缀名替换为 jpg 的后缀名 正则 /g表示全部替换
				result.message.goods_introduce = result.message.goods_introduce.replace(/<img/g , '<img style="display:block;" ')
				.replace(/.webp/g , '.jpg')//适应ios 不显示webp
				this.gooddetail = result.message
			},
			// 点击轮播图放大预览图片
			preview(i) {
				console.log(i);
			uni.previewImage({
				current:i,
				urls:this.gooddetail.pics.map(x => x.pics_big),
				// indicator:"number"
			})
			},
			//左边导航按钮
			onClick(e){
				if(e.content.text == '购物车') {
					// console.log('gwc');
					uni.switchTab({
						url:'/pages/cart/cart'
					})
				}
			},
			// 右边导航按钮
			btnClick(e) {
				// 点击加入购物车
				if(e.content.text === '加入购物车') {
				// 商品信息
					const goods = {
						goods_id: this.gooddetail.cat_id,	
						goods_name: this.gooddetail.goods_name,	
						goods_price: this.gooddetail.goods_price,
						goods_count: 1, //商品的数量
						goods_small_logo: this.gooddetail.goods_small_logo,	//商品的图片
						goods_state: this.gooddetail.goods_state //商品的勾选状态
					}
					// 将商品信息存储到购物车
					this.ADDCART(goods)
				}
			}
		},
		watch: {
			// total(nvl) {
			// 	let result = this.options.find( x => x.text=== '购物车')
				// if(result) {
				// 	result.info = nvl
				// }
			total:{
				handler(nvl) {
					let result = this.options.find( x => x.text=== '购物车')
						if(result) {
							result.info = nvl
						}
				},
				// 首次加载立即调用
				immediate:true
			}
		}
	}
</script>

<style lang="scss">
	// 轮播图
	swiper {
		height: 750rpx;
		text-align: center;
		image {
			width: 750rpx;
			height: 750rpx;
		}
	}
	// 商品信息
	.goodinfo {
		view {
			margin: 5px 10px;
			&:nth-child(1) {
			padding-top: 5px;
			// padding-bottom: -6px;
				font-size: 40rpx;
				font-weight: bold;
				color: #c00000;
			}
			&:nth-child(2) {
				display: flex;
				height: 80rpx;
				justify-content: space-around;
				font-size: 24rpx;
				align-items: center;
				.goodlike {
					padding-left: 30rpx;
					font-size: 24rpx;
					color: #c0c0c0;
					font-weight: normal;
					text-align: center;
					border-left: 1px solid #c0c0c0;
					text {
						display: block;
					}
				}
			}
			&:nth-child(3) {
				font-size: 20rpx;
				color: #c0c0c0;
			}
		}
	}
	.good-nav {
		position: fixed;
		bottom: 0;
		width: 100%;
	}
</style>
