<template>
	<view class="box">
		<view class="row">
			<text>手机号</text>
			<input type="text" v-model="phone" maxlength="12" />
		</view>
		<view class="row">
			<view class="send">
				<button class="captcha" size="mini" :disabled="!tagCode" @click="sendCode">验证码</button>
				<text>{{num}}</text>
			</view>
			<input type="text" v-model="code" placeholder="- - - -" maxlength="4" />
		</view>
		<view class="row">
			<text style="font-size: 23rpx;">收不到验证码？试试 <text style="color:#00BB00;font-size: 23rpx;"> 语音验证</text></text>
			<!--   -->
			<button :disabled="!tagLogin" type="primary" style="width: 90%;border-radius: 80rpx;margin-top: 50rpx;"
				@click="login">登录</button>
		</view>
		<view class="row">
			<text style="color: #006699;text-align: center;">通过微信授权登录</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				phone: '', //手机号码
				code: '', //验证码
				tagCode: false,
				tagLogin: false,
				num: null
			}
		},
		watch: {
			//监听手机号码输入
			phone: function(newValue) {
				let res = /^1[35789]\d{9}$/.test(newValue)
				this.tagCode = res
			},
			code: function(newValue) {
				if (newValue.length == 4) {
					this.tagLogin = true
				} else {
					this.tagLogin = false
				}
			}
		},
		methods: {
			//点击发送验证码
			async sendCode() {
				//倒计时
				this.num = 59
				this.tagCode = false
				let time = setInterval(() => {
					this.num -= 1
					//倒计时结束，停止
					if (this.num <= 0) {
						clearInterval(time)
						this.num = ''
						this.tagCode = true
					}
				}, 1000)
				// 调取接口
				let result = await this.$http({
					url: '/api/sms',
					data: {
						phone: this.phone
					}
				}).catch(err => console.error(err))
				//获取验证码，存储到缓存
				uni.setStorageSync('code', result.data.list.code)
			},
			//登录
			async login() {
				let localCode = uni.getStorageSync('code') //判断验证是否正确
				if (this.code == localCode) {
					//验证码正确，请求登录接口，获取uid和token
					let result = await this.$http({
						url: '/api/wxlogin',
						data: {
							phone: this.phone
						}
					}).catch(err => console.error(err))
					//把用户信息存储到缓存
					uni.setStorageSync('userInfo', result.data.list)
					uni.showToast({
						title: '登录成功'
					})
					setTimeout(() => {
						//跳转个人中心
						uni.reLaunch({
							url: '/pages/mine/mine'
						})
					}, 1500)
				} else {
					uni.showToast({
						title: '验证码错误',
						icon: 'none'
					})
				}
			}
		}
	}
</script>

<style>
	/* 导入外部的样式文件 */
	/* @import url("../../common/css/index.css"); */
	.box {
		position: relative;
	}

	.row {
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		margin: 40rpx;
	}

	.send {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.send text:nth-of-type(2) {
		color: #00BB00;
	}

	text {
		font-size: 27rpx;
		margin-bottom: 10rpx;
	}

	input {
		border-bottom: 1rpx solid gray;
		height: 65rpx;
	}

	.captcha {
		background: #007cfe;
		color: white;
		padding: 10rpx 20rpx;
		border-radius: 13rpx;
		margin-left: 0;
	}
</style>
