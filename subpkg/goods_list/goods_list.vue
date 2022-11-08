<template>
	<view>
	goods_list--{{query.query}}--{{query.cid}}
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
