<template>
	<view class="container">
		<!-- s收货地址 -->
		<view class="address">
			<view class="address_info">
				<label for="">收件人:{{receiver.username}}</label>
				<label for="">{{receiver.userphone}}</label>
			</view>
			<view class="address_res">
				收货地址：<label for="">{{receiver.address}}</label>
			</view>
		</view>

		<!-- 商品信息 -->
		<view class="carts">
			<view class="cartsInfo" v-for="(item,idx) in list" :key="item.id">
				<!-- 70px -->
				<view class="carts_detail">
					<view class="carts_image">
						<image :src="$img + item.img" mode=""></image>
					</view>
					<view class="carts_name">
						<view for="" style="font-size: 30rpx;">{{item.goodsname}}</view>
						<view for="" style="font-size: 26rpx; color: #C0C0C0;">规格:300</view>
					</view>
					<view class="carts_price">
						<label for="">￥ {{item.price}}</label>
					</view>
				</view>
				<!-- 50px -->
				<view class="cart_num">
					<view class="">
						购买数量：
					</view>
					<view class="">
						<label for="" class="jian" @click="sub(idx)">-</label>
						<label for="" class="num">{{item.num}}</label>
						<label for="" class="jia" @click="add(idx)">+</label>
					</view>
				</view>
				<!-- 横线 -->
				<view class="xian"></view>
			</view>
			<!-- 50px -->
			<view class="kuaidi">
				<label for="">配送方式</label>
				<label for="">XX快递</label>
			</view>
		</view>

		<!-- 优惠券 -->
		<view class="yhquan">
			<label for="">优惠券</label>
			<label for="" style="margin-right: 40rpx;">无可用</label>
		</view>
		<!-- jifen积分 -->
		<view class="jifen">
			<view class="use">
				<label for="">使用积分</label>
			</view>
			<view class="input" style="margin-right: 40rpx;">
				<input type="text" value="" placeholder="输入积分" />
				<label for="" class="input_use">使用</label>
				<label for="" class="input_keyi">可使用50积分</label>
			</view>
		</view>

		<!-- 具体详细 -->
		<view class="resDetail">
			<view class="">
				<label for="">商品金额</label>
				<label for="" style="margin-right:40rpx;color:red">￥{{allPrice}}</label>
			</view>
			<view class="">
				<label for="">运费</label>
				<label for="" style="margin-right:40rpx;color:red">+￥0.00</label>
			</view>
			<view class="">
				<label for="">优惠券</label>
				<label for="" style="margin-right:40rpx;color:red">-￥0.00</label>
			</view>
			<view class="">
				<label for="">会员优惠</label>
				<label for="" style="margin-right:40rpx;color:red">-￥0.00</label>
			</view>
			<view class="">
				<label for="">积分抵扣</label>
				<label for="" style="margin-right:40rpx;color:red">-￥0.00</label>
			</view>
		</view>
		<!-- 实付金额 -->
		<view class="sfje">
			实付金额：<label for="" style="color:red">￥{{ allPrice }}</label>
		</view>

		<!-- 确认订单按钮 -->
		<view class="btn">
			<!-- 点击提交订单按钮，发起支付请求 -->
			<button type="primary" @click="pay">提交订单</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [],
				receiver: {
					username: "张三丰",
					userphone: "12345678900",
					address: "北京五方桥基地"
				}
			}
		},
		onLoad() {
			let arr = uni.getStorageSync('confirm')
			this.list = arr
		},
		computed: {
			//计算总价
			allPrice() {
				return this.list.reduce((start, item) => {
					return start + item.num * item.price
				}, 0)
			},
			//计算总数量
			totalNum() {
				return this.list.reduce((start, item) => {
					return start + item.num
				}, 0)
			}
		},
		methods: {
			//点击增加num
			add(idx) {
				this.list[idx].num += 1
			},
			//点击减少num
			sub(idx) {
				this.list[idx].num -= 1
				//判断是否小于1
				if (this.list[idx].num <= 1) {
					this.list[idx].num = 1
				}
			},
			//提交订单
			async pay() {
				let {
					uid,
					token
				} = uni.getStorageSync('userInfo')
				let {
					username,
					userphone,
					address
				} = this.receiver
				let countmoney = this.allPrice
				let countnumber = this.totalNum
				let addtime = new Date().getTime()
				//转换成对象
				let params = {
					uid,
					username,
					userphone,
					address,
					countmoney,
					countnumber,
					addtime
				}
				//对象转换成字符串
				params = JSON.stringify(params)
				//获取id
				let arr = this.list.map(item=>{
					return item.id
				})
				//数组转换成字符串
				let idstr = arr.join(',')
				//提交请求
				let result = await this.$http({
					url:'/api/orderadd',
					data:{
						params,
						idstr
					},
					token
				}).catch(err=>console.error(err))
				console.log(result)
			}
		}
	}
</script>
<style>
	@import url("../../common/css/confirm.css");
</style>
