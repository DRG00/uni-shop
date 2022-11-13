<template>
	<view>
		<my-search @click="tosearch"></my-search>
	<view class="scroll-container">
		<!-- 左边scroll一级分类 -->
		<scroll-view scroll-y="true" class="left-scroll" :style="{height:wh +'px'}" >
			<view v-for="(item,i) in catelist" :key="i" :class="['left-item', i===active? 'active':'']" @tap="activechange(i)">
				{{item.cat_name}}
			</view>
		</scroll-view>
		<!-- 右边2.3级分类 -->
		<scroll-view scroll-y="true" class="right-scroll" :style="{height:wh +'px'}" >
			<view class="right-item-list" v-for="(item,i) in cateLv2" :key="i">
				<view class="right-item-title">
					/ {{item.cat_name}}  /
				</view>
				<view class="right-item-box">
					<view class="right-item" v-for="(item2,index) in item.children" :key="index" @tap="togoodsList(item2)">
						 <image class="right-item-icon" :src="item2.cat_icon" ></image>
						 <text>{{item2.cat_name}}</text>
					</view>
				</view>
			</view>
			
		</scroll-view>
	</view>
	</view>
</template>

<script>
	import badge from '@/mixins/tabbar-badge.js'
	export default {
		mixins:[badge],
		data() {
			return {
				wh:'',// scroll高度
				active:0,//左边索引
				catelist:[],
				cateLv2:[]//右边数据
			}
		},
		onLoad() {
			let styinfo = uni.getSystemInfoSync()
			this.wh = styinfo.windowHeight-50
			this.getCatelist()
		},
		methods: {
			async getCatelist() {
				const {data:res} = await uni.$http.get('/api/public/v1/categories')
				if(res.meta.status!==200) uni.$showMsg()
				this.catelist = res.message
				this.cateLv2 = res.message[0].children
			},
			activechange(i) {
				this.active = i
				this.cateLv2 = this.catelist[i].children
			},
			togoodsList(item){
				uni.navigateTo({
					url:'/subpkg/goods_list/goods_list?cid='+item.cat_id
				})
			},
			tosearch(){
				uni.navigateTo({
					url:'/subpkg/search/search'
				})
			}
		}
	}
</script>

<style lang="scss">
	.scroll-container{
		display: flex;
		.left-scroll{
			width: 240rpx;
			background-color: #f7f7f7;
			.left-item {
				height: 120rpx;
				line-height: 120rpx;
				font-size: 30rpx;
				text-align: center;
			&.active{
				background-color: white;
				position: relative;
				&::before{
					content: '';
					display: block;
					position: absolute;
					width: 5px;
					height: 100%;
					left: 0;
					background-color:#003D74;
				}
			}	
			}
		}
		.right-scroll {
			.right-item-title {
				height: 120rpx;
				line-height: 120rpx;
				font-size: 28rpx;
				text-align: center;
			}
			.right-item-box {
				display: flex;
				flex-wrap: wrap;
				.right-item {
					display: flex;
					flex-direction: column;
					align-items: center;
					width: 33.33%;
					height: 160rpx;
					image {
						width: 100%;
						height: 100%;
					}
					text{
						font-size: 24rpx;
					}
				}
			}
		}
	}
</style>
