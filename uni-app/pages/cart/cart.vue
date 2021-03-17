<template>
	<view class="container">
		<view class="top">
			<scroll-view class="scroll-view_H" scroll-x="true" scroll-left="0" v-for="(item,idx) in list"
				:key="item.id">
				<view class="cartInfo" id="demo1">
					<!-- 购物车商品信息 -->
					<view class="cartInfochild">
						<!-- 选择框 -->
						<view class="cartInfo_switch common">
							<!-- 点击当前商品 -->
							<switch type="checkbox" :checked="item.checked" @click="checked(idx)" />
						</view>
						<!-- 图片 -->
						<view class="cartInfo_image common">
							<image :src="$img + item.img" mode=""></image>
						</view>

						<!-- 信息 -->
						<view class="cartInfo_info">
							<label for="" style="font-size: 26rpx;">{{item.goodsname}}</label>
							<label for="" style="font-size: 24rpx; color: #ccc;">规格：黑色</label>
							<label for="" style="color: red;">￥{{item.price}}</label>
						</view>
						<!-- 加减数量 -->
						<view class="cartInfo_num">
							<view class="cartInfo_num_child">
								<label for="" @click="sub(idx)">-</label>
								<label for="">{{item.num}}</label>
								<label for="" @click="add(idx)">+</label>
							</view>
						</view>
					</view>
				</view>
				<view class="cartDel" id="demo2" @click="del(idx)"><label for="">删除</label></view>
			</scroll-view>
		</view>

		<!-- 底部 -->
		<view class="foot">
			<view class="footd1">
				<switch type="checkbox" :checked="isAll" @change="selectAll" />
				<label>全选</label>
			</view>
			<view class="footd2">
				<view class="footd2sp1">
					总计：
					<label style="color: red;">{{totalPrice}}</label>
				</view>
				<label class="footd2sp2">不含运费，已优惠￥0.00</label>
			</view>
			<!-- 跳到提交订单，结算页面 -->
			<view class="footd3">
				<!-- 被选中的商品的个数 -->
				<label @click="toPay">去结算</label>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: []
			}
		},
		onLoad() {
			this.getInfo()
		},
		methods: {
			//结算
			toPay() {
				let arr = this.list.filter(item => {
					return item.checked == true
				})
				uni.setStorageSync('confirm',arr)
				uni.navigateTo({
					url:'/pages/confirm/confirm'
				})
			},
			//删除
			async del(idx) {
				let id = this.list[idx].id //获取id
				let {
					token
				} = uni.getStorageSync('userInfo') //获取token
				//删除购物车
				let res = await this.$http({
					url: '/api/cartdelete',
					data: {
						id
					},
					token
				}).catch(err => console.error(err))
				this.list.splice(idx, 1)
			},
			//点击单选
			checked(idx) {
				this.list[idx].checked = !this.list[idx].checked
			},
			//全选
			selectAll() {
				this.isAll = !this.isAll
			},
			//点击增加num
			add(idx) {
				this.list[idx].num += 1
				this.getTedit(idx)
			},
			//点击减少num
			sub(idx) {
				this.list[idx].num -= 1
				//判断是否小于1
				if (this.list[idx].num <= 1) {
					this.list[idx].num = 1
				}
				this.getTedit(idx)
			},
			//获取修改数据
			async getTedit(idx) {
				//获取token
				let {
					token
				} = uni.getStorageSync('userInfo')
				//获取num
				let num = this.list[idx].num
				//获取id
				let id = this.list[idx].id
				let res = await this.$http({
					url: '/api/cartedit',
					data: {
						id,
						num
					},
					token
				}).catch(err => console.error(err))
			},
			async getInfo() {
				//获取uid，token
				let {
					uid,
					token
				} = uni.getStorageSync('userInfo')
				//获取数据接口
				let res = await this.$http({
					url: '/api/cartlist',
					data: {
						uid
					},
					token
				}).catch(err => console.error(err))
				// 修改checked的值
				let list = res.data.list
				if(list){
					list.forEach(item => {
						item.checked = false
					})
				}
				//渲染
				this.list = res.data.list
			}
		},
		computed: {
			//单选计算价格
			totalPrice: {
				get: function() {
					let result = 0;
					if(this.list){
						this.list.forEach(item => {
							if (item.checked) {
								result += item.price * item.num
							}
						})
						return result
					}
				}
			},
			//是否全选
			isAll: {
				get: function() {
					if(this.list){
						return this.list.every(item => {
							return item.checked == true
						})
					}
				},
				set: function(newValue) {
					this.list.forEach(item => {
						item.checked = newValue
					})
				}
			}
		},
		onShow() {
			this.getInfo()
		}
	}
</script>

<style>
	@import url('../../common/css/cart.css');

	.cartInfo_image_img {
		width: 120rpx;
		height: 120rpx;
	}
</style>
