<template>
	<view>
		<!-- 登录组件 -->
		<login v-if="!token"></login>
		<!-- 用户信息组件 -->
		<userinfo v-else></userinfo>
		<!-- <userinfo ></userinfo> -->
	</view>
</template>

<script>
	import badge from '@/mixins/tabbar-badge.js'
	import login from '@/components/my-login/my-login.vue'
	import userinfo from '@/components/my-userinfo/my-userinfo.vue'
	import {mapState} from 'vuex'
	export default {
		mixins:[badge],
		data() {
			return {
				
			}
		},
		methods: {
			
		},
		computed: {
			...mapState('user', ['token'])
		},
		components: {
			login,
			userinfo
		}
	}
</script>

<style>

</style>
