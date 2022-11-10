<template>
	<view class="search-container">
		<view class="search-box" @tap="searchHandle">
			<uni-icons type="search" size="20"></uni-icons>
			<text>搜索</text>
		</view>
	</view>
</template>

<script>
	export default {
		name:"search",
		data() {
			return {
				
			};
		},
		methods:{
			searchHandle(){
				this.$emit('click')
			}
		}
	}
</script>

<style lang="scss">
.search-container{
	background-color: #003D74;
	height: 50px;
	// padding: 0 10px;
	display: flex; 
	align-items: center;
	justify-content: center;
	.search-box{
		width: 90%;
		height: 36px;
		background-color: #fff;
		border-radius: 20px;
		display: flex;
		align-items: center;
		justify-content: center;
	}
}
</style>