]<template>
	<view>
		<uni-search-bar radius="100" bgColor="#ffff"></uni-search-bar>
		<view class="list" v-if="list.length > 0">
			<view class="row" v-for="item in list" :key="item.id">
				<view class="products" v-for="(products,idx) in item.child" :key="idx">
					<view class="imagebox">
						<image :src="$img + products.img" mode="widthFix"></image>
						<text>{{products.goodsname}}</text>
					</view>
				</view>
				<view class="info">
					<text space="nbsp">总计{{item.countnumber}}商品 </text>
					<text>应付金额 ￥{{item.countmoney}}</text>
				</view>
			</view>
		</view>
		<view class="tishi" v-else>
			没有数据亲！
		</view>
	</view>
</template>

<script>
	import uniSearchBar from '@/components/uni-search-bar/uni-search-bar.vue'
	export default {
		data() {
			return {
				list:[]
			}
		},
		components: {
			uniSearchBar
		},
		async onLoad() {
			let {
				uid,
				token
			} = uni.getStorageSync('userInfo')
			let result = await this.$http({
				url:'/api/orders',
				data:{
					uid
				},
				token
			}).catch(err=>console.error(err))
			this.list = result.data.list
		}
	}
</script>
<style>
	.row {
		margin: 10rpx 20rpx;
		/* height: 240rpx; */
		border: 1rpx solid #AAAAAA;
		border-radius: 30rpx;
	}

	.imagebox {
		float: left;
		margin: 10rpx;
	}

	.products {
		overflow: hidden;
	}

	image {
		width: 160rpx;
		margin-left: 10rpx;
	}

	.info {
		/* position: absolute;
		top: 180rpx;
		right: 50rpx; */
		display: flex;
		justify-content: space-between;
		font-size: 25rpx;
		/* width: 340rpx; */
		padding: 20rpx;
		text-align: right;
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
