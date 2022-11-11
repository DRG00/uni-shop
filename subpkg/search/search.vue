<template>
	<view>
		<!-- 搜索框 -->
		<view class="search-input-box">
			<uni-search-bar placeholder="请输入搜索内容" radius="100" :focus="true" @confirm="search" @input="input" @clear="clear('s')" cancelButton="none"/>
		</view>
		<!-- 搜索建议 -->
		<view class="search-advice-box" v-if="searchadvice.length">
			<view class="advice-item" v-for="(item,i) in searchadvice" :key="i" @tap="gotodetail(item.goods_id)">
				<view class="advice-text">
					{{item.goods_name}}
				</view>
				<uni-icons type="forward"></uni-icons>
			</view>
		</view>
		<!-- 搜索历史 -->
		<view class="search-hstory" v-if="!searchadvice.length">
			<view class="history-title">
				搜索历史
				<view class="history-clear" @tap="clear('h')">
					<uni-icons type="trash" size="25"></uni-icons>
				</view>
			</view>
			<!-- 历史框 -->
			<view class="history-text">
				<span class="text-item" v-for="(item,index) in history" :key="index" @tap="gotoList(item)" >
				{{item}}</span>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		onLoad() {
			this.searchhistory = JSON.parse(uni.getStorageSync("history") || [])
		},
		data() {
			return {
			timer:null,// 计时器，防抖
			keyword:'',//搜索关键字
			searchadvice:[],//搜索建议
			searchhistory:[]//搜索历史
			};
		},
		methods:{
			async search(){
				// 去重
				  const set = new Set(this.searchhistory)// 1. 将 Array 数组转化为 Set 对象
				  set.delete(this.keyword)// 2. 调用 Set 对象的 delete 方法，移除对应的元素
				  set.add(this.keyword)// 3. 调用 Set 对象的 add 方法，向 Set 中添加元素
				  this.searchhistory = Array.from(set)// 4. 将 Set 对象转化为 Array 数组
				// 将搜索历史存到本地
				uni.setStorageSync('history',JSON.stringify(this.searchhistory))
				// 搜索
				// const {data:res} = await uni.$http.get('')
				this.gotoList(this.keyword)
			},
			// 防抖处理
		 	async input(e){//e->输入的内容
			 if(e.trim()){
				clearTimeout(this.timer)
				this.timer=setTimeout(()=>{
					this.keyword=e
				},500)
				// 搜索建议
				let {data:res} = await uni.$http.get('/api/public/v1/goods/search',{query:e})
				if(res.meta.status!==200) uni.$showMsg()
				this.searchadvice = res.message.goods
			 } else {
				 this.clear('s')
			 }
		    },
			// 前往商品详情
			gotodetail(id){
				uni.navigateTo({
					url:'/subpkg/goods_detail/goods_detail?goods_id='+id
				})
			},
			// 前往商品列表
			gotoList(name){
				uni.navigateTo({
					url:'/subpkg/goods_list/goods_list?goods_name='+name
				})
			},
			// 清除按钮
			clear(t){
				// 清除建议
				if(t=='s'){
					this.searchadvice=[]
				} else if(t=='h'){//清除历史
					this.searchhistory=[]
					uni.removeStorageSync('history')
				}
			}
		},
		computed:{
			history(){
				return this.searchhistory.reverse()
			}
		}
	}
</script>

<style lang="scss">
	.search-input-box{
		position: sticky;	
		top: 0;
		z-index: 999;
		background-color: #003d74;
	}
	// 搜索建议
	.search-advice-box{
		.advice-item{
			display: flex;
			margin: 0 4px;
			justify-content: space-between;
			padding: 30rpx 0;
			font-size: 22rpx;
			border-bottom: 1px solid #efefef;
			.advice-text{
				width: 90%;
				padding-left: 10px;
				overflow:hidden; 
				white-space: nowrap;
				text-overflow: ellipsis;
			}
		}
	}
	// 搜索历史
	.search-hstory{
		.history-title{
			display: flex;
			justify-content: space-between;
			width: 100%;
			padding: 10px 0 10px 10px;
			font-size: 30rpx;
			.history-clear{
				margin-right: 20px;
			}
		}
		.history-text{
			.text-item{
				display: inline-block;
				padding: 4px 4px;
				margin-left: 6px;
				font-size: 28rpx;
				color: #000;
				background-color: #e8eaea;
				border-radius: 6px;
			}
		}
	}
</style>
