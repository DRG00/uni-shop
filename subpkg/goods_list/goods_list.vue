<template>
	<view>
	goods_list--{{query}}
	</view>
</template>

<script>
	export default {
		onLoad(option) {
			this.query=option.query
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
