<template>
	<view>
		<view class="goods-list">
			<view class="goods-list-item" v-for="(item,index) in goodsList" :key="index" @tap="todetail(item)">
				<!-- 左侧图片 -->
				<view class="goods-img">
					<image :src="item.goods_small_logo || defaultpic"></image>
				</view>
				<!-- 右侧商品信息 -->
				<view class="goods-info">
					<view class="goods-name">
						{{item.goods_name}}
					</view>
					<view class="goods-price">
						￥{{item.goods_price}}
					</view>
				</view>
			</view>
		</view>
		<!-- 无更多数据 -->
		<view class="nogoods" v-if="isgoods">
			<text>没有更多了</text>
		</view>
	</view>
</template>

<script>
	export default {
		onLoad(option) {
			this.queryObj.query=option.goods_name || ''
			this.queryObj.cid = option.cid || ''
			this.getgoodList()
		},
		data() {
			return {
				// query:'',
				goodsList:[],//商品列表
				queryObj:{
					query:'',//关键字
					cid:'',//分类id
					pagenum:1,//页码
					pagesize:10,//页容量
				},
				total:0,//总数据量
				isgoods:false,//是否还有数据
				// 无图片时显示默认图片
				defaultpic:'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png',
			};
		},
		methods:{
			// 获取商品列表数据
		 	async getgoodList(){
				const { data: res } = await uni.$http.get('/api/public/v1/goods/search',this.queryObj)
				if(res.meta.status!==200) uni.$showMsg()
				this.goodsList = [...this.goodsList,...res.message.goods]
				this.total = res.message.total
				if(this.total<10) this.isgoods=true
			},
			// 跳转商品详情页
			todetail(item){
				// console.log(item.goods_id);
				let id = item.goods_id
				uni.navigateTo({
					url:'/subpkg/goods_detail/goods_detail?goodId='+id
				})
			}
		},
		// 触底事件
		onReachBottom(){
		this.queryObj.pagenum+=1
		// 计算剩余数据数量
		let num = this.total - (this.queryObj.pagenum*10)
		if(num <=0) {
			this.isgoods = true
		} else {
			this.getgoodList()
		}
		}
	}
</script>

<style lang="scss">
	// 商品列表
 .goods-list-item{
	 display: flex;
	 padding: 10px 0;
	 border-bottom: 1px solid #efefef;
	 // 商品图片
	 .goods-img{
		 margin-right: 5px;
		 image {
			 width: 200rpx;
			 height: 200rpx;
		 }
	 }
	 // 商品信息
	 .goods-info{
		 display: flex;
		 padding-left: 4px;
		 flex-direction: column;
		 justify-content: space-between;
		 font-size: 30rpx;
		 .goods-price{
			 color: #c00000;
			 font-weight: bold;
		 }
	 }
 }
 .nogoods{
	 height: 40px;
	 line-height: 40px;
	 text-align: center;
	 color: #c0c0c0;
 }
</style>
