<template>
	<view>
		<view class="search">
			<icon type="search" color="white" size="10"></icon>
			<input type="text" :value="keywords" @focus="search" placeholder="搜索商品" placeholder-class="placeholder" />
		</view>
		<view class="list" v-if="productList.length > 0">
			<view class="row" v-for="item in productList" :key='item.id' @click="toDetail(item.id)">
				<image :src="$img + item.img" mode="widthFix"></image>
				<view class="info">
					<text>{{item.goodsname}}</text>
					<text>￥{{item.price}}</text>
					<text>3565评论</text>
				</view>
			</view>
		</view>
		<view class="tishi" v-else>
			暂无数据亲！！！！
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				productList: [], //商品列表
				keywords: ''
			}
		},
		async onLoad(e) {
			let id = e.fid
			let res = await this.$http({
				url: '/api/getcategoods',
				data: {
					fid: id
				}
			}).catch(err => console.error(err))
			this.productList = res.data.list ? res.data.list : []
		},
		methods: {
			//跳转详情页
			toDetail(id){
				uni.navigateTo({
					url:'/pages/details/details?id='+id
				})
			}
			// async search() {
			// 	let res = await this.$http({
			// 		url: '/api/search',
			// 		data: {
			// 			keywords: this.keyword
			// 		}
			// 	}).catch(err => console.error(err))
			// 	console.log(res)
			// }
		}
	}
</script>

<style>
	.search {
		margin: 50rpx;
		height: 80rpx;
		background-color: #f26b11;
		border-radius: 80rpx;
		color: white;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	icon {
		margin: 0 10rpx 0 250rpx;
	}

	.placeholder {
		color: white;
		font-size: 25rpx;
	}

	.row {
		position: relative;
		margin: 10rpx 20rpx;
		height: 330rpx;
		border-bottom: 1rpx solid #AAAAAA;
	}

	image {
		position: absolute;
		top: 0;
		left: 10rpx;
		width: 160rpx;
	}

	.info {
		height: 85%;
		width: 65%;
		position: absolute;
		top: 0;
		left: 200rpx;
		display: flex;
		justify-content: space-around;
		flex-direction: column;
		font-size: 25rpx;
	}

	.info text:nth-of-type(2) {
		color: red;
	}

	.info text:nth-of-type(3) {
		font-size: 20rpx;
		color: #AAAAAA;
	}

	.tishi {
		line-height: 200rpx;
		text-align: center;
		font-size: 40rpx;
		color: #006699;
	}
</style>
