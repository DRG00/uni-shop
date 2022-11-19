<template>
	<view class="login">
		<view class="login-pic">
			<image src="../../static/tab-icon/myfill.png"></image>
		</view>
		<button class="login-btn" type="primary"  @tap="getUserInfo">一键登录</button>
		<!-- open-type="chooseAvatar" @chooseavatar="chooseavatar" open-type="login" @tap="getUserInfo"-->
		<view class="tip-text">
			登录后获取更多权益
		</view>
	</view>
</template>

<script>
	import { mapState, mapMutations} from 'vuex'
	export default {
		name:"my-login",
		data() {
			return {
				
			};
		},
		methods: {
			...mapMutations('user',['UpdateUserinfo', 'UpdateToken', 'UpdateRedirectInfo']),
			getUserInfo() {
				let that = this
				// 基础库版本应在2.27.0以下才可获取数据
				uni.getUserProfile({
					desc:"信息将用于登录",
					lang:"zh_CN",
					success(res) {
						that.UpdateUserinfo(res.userInfo)
						that.gettoken(res)
					},
					fail() {
						uni.$showMsg('已拒绝授权登录')
					}
				})
			},
			async gettoken(info) {
				let that = this
				  // 获取code登录
				uni.login({
					success (ress) {
						// 准备参数对象
						const query = {
						    code: ress.code,
						    encryptedData: info.encryptedData,
						    iv: info.iv,
						    rawData: info.rawData,
						    signature: info.signature
						  }
					 let data =  uni.$http.post('/api/public/v1/users/wxlogin',query)
					 that.UpdateToken('Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo')
					 that.redirect(that)
				    }			
			   })
			},
			// 重定向
			redirect(that) {
				// uni.API里this指向改变
				let { openType, from } = that.redirectInfo
				if(openType == 'switchTab' && from) {
					uni.switchTab({
						url: from,
						complete() {
							// 清空vuex的redirectInfo
							that.UpdateRedirectInfo(null)
						}
					})
				}
			}
		},
		computed: {
			...mapState('user',['token','userinfo','redirectInfo'])
		}
	}
</script>

<style lang="scss">
	.login {
		text-align: center;
		.login-pic {
			width: 170rpx;
			height: 170rpx;
			margin: 36px auto;
			background-color: #c0c0c0;
			border-radius: 50%;
		   image {
			   width: 100%;
			   height: 90%;
		   }
		}
		.login-btn {
			width: 80%;
			border-radius: 40px;
			background-color: #003d74;
			margin-bottom: 20px;
		}
		.tip-text {
			color: #c0c0c0;
			font-size: 20rpx;
		}
	}
</style>