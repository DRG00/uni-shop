<template>
	<view>
	goods_list--{{query.goods_name}}
	</view>
</template>

<script>
	export default {
		onLoad(option) {
			this.query=option
		},
		data() {
			return {
				query:''
			};
		}
	}
</script>

<style lang="scss">

</style>
