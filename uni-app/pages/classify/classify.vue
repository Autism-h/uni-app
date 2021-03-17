<template>
	<view class="container">
		<!-- left左侧列表 -->
		<view class="left">
			<!-- 循环遍历的 -->
			<view class="left_list" :class="active == idx ? 'activeList' : ''" v-for="(item,idx) in navList"
				:key='item.id' @click="leftNav(idx)">
				<label for="">{{item.catename}}</label>
			</view>
		</view>
		<!-- right右侧详细分类商品 -->
		<!-- 家用电器 -->
		<view class="right">
			<!-- 每一个小类 -->
			<view class="right_list">
				<!-- 商品 -->
				<view class="bottom" v-if="navList.length > 0">
					<view class="bottom_list" v-for="item in navList[active].children" :key='item.id'>
						<!-- 每个最多显示6个 -->
						<view>
							<image :src="$img + item.img" alt="">
						</view>
						<view class="title">
							<span>{{item.catename}}</span>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				navList: [], //左侧菜单
				active: 0
			}
		},
		async onLoad() {
			let goodsList = await this.$http({
				url: '/api/getcates'
			}).catch(err => console.error(err))
			this.navList = goodsList.data.list
		},
		methods: {
			leftNav(idx) {
				this.active = idx
			}
		}
	}
</script>

<style>
	/* 导入外部的样式文件 */
	@import url("../../common/css/classify.css");

	/* 点击左侧导航，显示动态样式 */
	.activeList {
		border-left: 6rpx solid #f26b11;
		color: #f26b11;
	}
</style>
