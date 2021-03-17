<template>
	<view class="container">
		<!-- 详情图片 -->
		<view class="detailImage">
			<image :src="$img + detail.img">
		</view>
		<!-- 详情基本信息 -->
		<view class="detailInfo">
			<view class="detailInfoName">
				<label>{{detail.goodsname}}</label>
			</view>
			<view class="detailInfoPrice">
				<label style="color: red;">￥{{detail.price}}</label>
				<label style="font-size: 24rpx;color: #ccc;">(此价格不与套装优惠同时享受)</label>
			</view>
		</view>

		<!-- 基本信息改变 -->
		<view class="changeInfo">
			<view class="youhui">
				<view>促销：<label class="manjian">满减</label><label class="dazhe">满2件9折；3件8折</label></view>
			</view>
			<!-- 数量加减 -->
			<view class="changeNum">
				<view class="num">购买数量</view>
				<view class="action">
					<label class="jian" @click="sub">-</label>
					<label class="zhi">{{num}}</label>
					<label class="jia" @click="add">+</label>
				</view>
			</view>
			<!-- 商品属性 -->
			<view class="changeState">
				<view class="productStat">
					<label for="">商品属性</label>
				</view>
				<view class="productGuige">
					<label>规格</label>
					<view class="threed3i1">30g</view>
					<view class="threed3i2">5g</view>
				</view>
			</view>
		</view>
		<!-- 商品详情 -->
		<view class="productDetail">
			<view class="productDetailTitle">商品详情</view>
			<!-- 需要处理图片自适应问题 -->
			<!-- <image src="/static/detail/2.jpg" mode="aspectFill"/> -->
			<rich-text :nodes="detail.description"></rich-text>
		</view>

		<view class="productEval">
			<view class="eval">商品评价</view>
			<view>
				<label class="evalUsername">小李白</label>
				<label class="evalUsertitle">效果很好，物流到位，下次继续来</label>
				<view class="evalImage">
					<image src="../../static/detail/pingjia1.jpg" />
					<image src="../../static/detail/pingjia2.jpg" />
					<image src="../../static/detail/pingjia3.jpg" />
				</view>
				<label class="evalTime">2020-01-13</label>
			</view>
		</view>
		<!-- 底部按钮 -->
		<view class="foot">
			<button class="footbtn1" @click="addCart">加入购物车</button>
			<button class="footbtn2">立即购买</button>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				detail: [],
				num: 1
			}
		},
		async onLoad(e) {
			let id = e.id
			let res = await this.$http({
				url: '/api/getgoodsinfo',
				data: {
					id: id
				}
			}).catch(err => console.error(err))
			this.detail = res.data.list[0]
		},
		methods: {
			add() {
				this.num += 1
			},
			sub() {
				this.num -= 1
				if (this.num <= 1) {
					this.num = 1
				}
			},
			async addCart() {
				//获取uid，token
				let {
					uid,
					token
				} = uni.getStorageSync('userInfo')
				let goodsid = this.$mp.query.id
				let num = this.num
				//添加购物车数据
				let res = await this.$http({
					url:'/api/cartadd',
					data:{
						uid,
						goodsid,
						num
					},
					token
				}).catch(err=>console.log(err))
				uni.showToast({
					title:"添加成功"
				})
			}
		},
	}
</script>
<style>
	@import url("../../common/css/details.css");
</style>
