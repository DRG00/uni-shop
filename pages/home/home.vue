<template>
	<view>
		<!-- 搜索 -->
		<view class="search-box">
			<my-search @click="tosearch"></my-search>
		</view>
		<!-- 轮播图 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
			<!-- dots:显示小圆点 autoplay:自动播放  interval:间隔3s轮播一次  duration:一次轮播时间为1s circular:衔接轮播 -->
			<swiper-item v-for="(item,index) in swiper" :key="index">
				<navigator class="swiper-item" :url="`/subpkg/goods_detail/goods_detail?goods_id=${item.goods_id}`">
					<image :src="item.image_src" mode=""></image>
				</navigator>
			</swiper-item>
		</swiper>
		<!-- 分类导航 -->
		<view class="nav-list">
			<view class="nav-item" v-for="(item,index) in navlist" :key="index" @tap="tocate(item)"> 
				<image :src="item.image_src" mode=""></image>
			</view>
		</view>
		<!-- 楼层区域 -->
		<view class="floor-list">
			<view class="floor-item" v-for="(item,index) in floorlist" :key="index">
				<image :src="item.floor_title.image_src" class="floor-title"></image>
				<view class="floor-img">
					<navigator class="floor-img-left" :url="item.product_list[0].url">
						<image :src="item.product_list[0].image_src"
						 mode="widthFix"
						 :style="{width:item.product_list[0].image_width+'rpx'}"></image>
					</navigator>
					<view class="floor-img-right">
						<navigator class="right-img" v-for="(img,i) in floorRight[index]" :key="i" :url="img.url">
							<image :src="img.image_src" mode="widthFix" :style="{width:img.image_width+'rpx'}"></image>
						</navigator>
					</view>
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				swiper:[],//轮播图数据
				navlist:[],
				floorlist:[]
			};
		},
		onLoad() {
			this.getSwiperList()// 页面加载时获取轮播图数据
			this.getNavlist()//获取导航数据
			this.getFloordata()//获取楼层数据
		},
		methods:{
			// 获取轮播图数据
			async getSwiperList() {
				const {data:res} = await uni.$http.get('/api/public/v1/home/swiperdata')
				if(res.meta.status!==200) uni.$showMsg()
				// { return uni.showToast({// title:'数据请求失败',// duration:1500,//1.5s后自动隐藏  icon:'none'})}
				this.swiper=res.message
			},
			// 导航菜单
			async getNavlist() {
				const {data:res} = await uni.$http.get('/api/public/v1/home/catitems')
				if(res.meta.status!==200) uni.$showMsg()
				this.navlist = res.message
			},
			// 点击前往分类页面
			async tocate(item) {
				if(item.name === '分类'){
					uni.switchTab({
						url:'/pages/cate/cate'
					})
				}
			},
			// 楼层数据
			async getFloordata() {
				const {data:res} = await uni.$http.get('/api/public/v1/home/floordata')
				if(res.meta.status!==200) uni.$showMsg()
				// 处理url
				res.message.forEach( floor => {
					floor.product_list.forEach( prod => {
						prod.url = '/subpkg/goods_list/goods_list?' + prod.navigator_url.split('?')[1]
					})
				})
				this.floorlist = res.message
			},
			tosearch(){
				uni.navigateTo({
					url:'/subpkg/search/search'
				})
			}
		},
		// 计算属性
		computed:{
			floorRight(){
				let itemlist = []
				let right = []
				for (let i of this.floorlist) { itemlist.push(i.product_list)}
				for  (let z of itemlist) {right.push(JSON.parse(JSON.stringify(z)))}
				for(let x=0;x<right.length;x++){right[x].shift()}
				return right
			}
		}
	}
</script>

<style lang="scss">
	// 搜索
	.search-box{
		position: sticky;
		top: 0;
		z-index: 8;
	}
	// 轮播图
swiper{
	height: 330rpx;
	.swiper-item, image{
			width: 100%;
			height: 100%;
		}
}
// nav 导航栏
.nav-list {
	display: flex;
	justify-content: space-around;
	margin: 14px 0;
	.nav-item image{
		width: 150rpx;
		height: 140rpx;
	}
}
// 楼层floor
.floor-list {
	width: 100%;
	.floor-item{
		// display: flex;
		.floor-title {
			width: 100%;
			height: 60rpx;
		}
		.floor-img{
			display: flex;
			padding-left: 10px;
			.floor-img-right{
				display: flex;
				flex-wrap: wrap;
				justify-content: space-around;
			}
		}
	}
}
</style>
