<template>
	<view>
		goods_detail--{{id}}
	</view>
</template>

<script>
	export default {
		onLoad(option) {
			console.log(option);
			this.id=option.goods_id
		},
		data() {
			return {
				id:''
			};
		}
	}
</script>

<style lang="scss">

</style>
