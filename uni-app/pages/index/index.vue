<template>
	<view class="">
		<!-- 顶部信息 -->
		<view class="HomeTop">
			<view class="logoView">
				<!-- logo -->
				<view class="logo">
					小U商城
				</view>
			</view>
			<view class="inputView">
				<input class="textinput" style="center" type="text" placeholder="寻找商品" />
			</view>
		</view>

		<!-- 顶部导航  scroll-view -->
		<view class="tabs">
			<scroll-view id="tab-bar" class="scroll-h" :scroll-x="true" :show-scrollbar="false">
				<view class="uni-tab-item" data-current="0" v-for="(item,idx) in navList" :key='item.id'
					@click="Nav(idx,item.id)">
					<text class="uni-tab-item-title" :class="active == idx ? 'uni-tab-item-title-active' : '' ">
						{{item.catename}}
					</text>
				</view>
			</scroll-view>
		</view>
		<!-- 推荐轮播图 -->
		<view class="">
			<swiper :indicator-dots="true" :autoplay="true" :interval="2000" :duration="1000">
				<swiper-item v-for="item in bannerList" :key='item.id'>
					<view class="swiper-item">
						<image :src="$img + item.img" mode=""></image>
					</view>
				</swiper-item>
			</swiper>
		</view>

		<!-- 功能导航开始 -->
		<!-- 功能导航 -->
		<view class="FunctNavCon">
			<view class="FunctNavLi">
				<image src="../../static/index/xiaohuoban.png" alt class="FunImg" />
				<p>限时抢购</p>
			</view>
			<view class="FunctNavLi">
				<image src="../../static/index/jifentixicopy.png" alt class="FunImg" />
				<p>积分商城</p>
			</view>
			<view class="FunctNavLi">
				<image src="../../static/index/lianxiwomen.png" alt class="FunImg" />
				<p>联系我们</p>
			</view>
			<view class="FunctNavLi" @click="toClassify">
				<image src="../../static/index/-shangpinfenlei-gai.png" alt class="FunImg" />
				<p>商品分类</p>
			</view>
		</view>

		<!-- 推荐部分 未写 -->
		<view class="HotGoods">
			<!-- 热推左侧 -->
			<view class="HotLeft">
				<view class="LimitedContent">
					<image class="LimitedImg" src="../../static/index/xianshi.jpg" alt />
					<label class="Limited">限时秒杀</label>
				</view>
				<p class="LimitedTitle">每天零点场，好货秒不停</p>
				<!-- 倒计时 -->
				<view class="LimitTimeAll">
					<label class="LimitTime">{{time.s}}</label>
					<view class="maohao">:</view>
					<label class="LimitTime">{{time.f}}</label>
					<view class="maohao">:</view>
					<label class="LimitTime">{{time.m}}</label>
					<label class="Seckill">秒杀</label>
				</view>
				<image src="../../static/index/goods2.jpg" class="LimitedgoodsImg" alt="">
			</view>

			<!-- 热推右侧 -->
			<view class="HotRight">
				<!-- 右侧顶部部分 -->
				<view class="HotTop">
					<view class="HomeTopInfo">
						<view class="HomeTopInfoOne">
							<label class="BrandNew">品牌上新</label>
							<label class="Discount">折</label>
						</view>
						<view class="HomeTopRobbig">
							<label>每日九点，抢大牌</label>
						</view>
					</view>
					<!-- <div> -->
					<view class="Cloth">
						<image src="../../static/index/goods1.jpg" alt="">
					</view>

					<!-- </div> -->
				</view>
				<!-- 右侧底部 -->
				<view class="HotBottom">
					<view class="HotBottomLeft">
						<view class="HotBottomLeftInfo">
							<label class="HotBottomLeftInfoTitle">每日十件</label>
							<label class="HotBottomLeftInfoDetail">只为你选好货</label>
						</view>
						<view class="HotBottomLeftImage">
							<image src="../../static/index/goods1.jpg" mode=""></image>
						</view>
					</view>
					<view class="HotBottomRight">
						<view class="HotBottomRightInfo">
							<label class="HotBottomRightInfoTitle">每日十件</label>
							<label class="HotBottomRightInfoDetail">只为你选好货</label>
						</view>
						<view class="HotBottomRightImage">
							<image src="../../static/index/goods1.jpg" mode=""></image>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 轮播图2 -->
		<div class="Swiper2">
			<image class="Swiper2Img" src="../../static/index/swiper1.jpg" alt />
		</div>

		<!-- 底部商品列表 -->
		<view class="products">
			<!-- 商品标签 -->
			<view class="tags">
				<view class="tag_list" @click="goodsNav(0)" :class="activeIndex == 0 ? 'active_tag_list' : ''">
					<label for="">热门推荐</label>
				</view>
				<view class="tag_list" @click="goodsNav(1)" :class="activeIndex == 1 ? 'active_tag_list' : ''">
					<label for="">发现好货</label>
				</view>
				<view class="tag_list" @click="goodsNav(2)" :class="activeIndex == 2 ? 'active_tag_list' : ''">
					<label for="">只看专场</label>
				</view>
			</view>
			<!-- 标签对应的商品 -->
			<view class="tags_product" v-if="activeIndex == 0">
				<view class="product" v-for="(item,idx) in hotList" :key='item.id' @click="toDetail(item.id)">
					<view class="GoodsLeft">
						<image class="GoodsImg" :src="$img + item.img" alt />
					</view>
					<view class="GoodsCont">
						<view class="GoodConTit">{{item.goodsname}}</view>
						<view class="GoodsPrice">￥{{item.price}}</view>
						<view class="yimai">已售8000件</view>
						<view class="Immed">立即抢购</view>
					</view>
				</view>
			</view>
			<view class="tags_product" v-if="activeIndex == 1">
				<view class="product" v-for="(item,idx) in foundList" :key='item.id' @click="toDetail(item.id)">
					<view class="GoodsLeft">
						<image class="GoodsImg" :src="$img + item.img" alt />
					</view>
					<view class="GoodsCont">
						<view class="GoodConTit">{{item.goodsname}}</view>
						<view class="GoodsPrice">￥{{item.price}}</view>
						<view class="yimai">已售8000件</view>
						<view class="Immed">立即抢购</view>
					</view>
				</view>
			</view>
			<view class="tags_product" v-if="activeIndex == 2">
				<view class="product" v-for="(item,idx) in specialList" :key='item.id' @click="toDetail(item.id)">
					<view class="GoodsLeft">
						<image class="GoodsImg" :src="$img + item.img" alt />
					</view>
					<view class="GoodsCont">
						<view class="GoodConTit">{{item.goodsname}}</view>
						<view class="GoodsPrice">￥{{item.price}}</view>
						<view class="yimai">已售8000件</view>
						<view class="Immed">立即抢购</view>
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
				navList: [], //导航列表
				active: 0,
				bannerList: [], //banner
				hotList: [], //热门推荐
				foundList: [], //发现好货
				specialList: [], //只看专场
				activeIndex: 0,
				time: {
					s: '00',
					m: '00',
					f: '00'
				} //限时秒杀
			}
		},
		async onLoad() {
			//导航
			let nav = await this.$http({
				url: '/api/getcate'
			}).catch(err => console.error(err))
			this.navList = nav.data.list
			//banner
			let banner = await this.$http({
				url: '/api/getbanner'
			}).catch(err => console.error(err))
			this.bannerList = banner.data.list
			//商品列表
			let goods = await this.$http({
				url: '/api/getindexgoods'
			}).catch(err => console.log(err))
			this.hotList = goods.data.list[0].content //热门推荐
			this.foundList = goods.data.list[1].content //发现好货
			this.specialList = goods.data.list[2].content //只看专场
			//获取秒杀
			let seckill = await this.$http({
				url: '/api/getseckill'
			}).catch(err => console.error(err))
			if (seckill.data.list != null) {
				let endtime = seckill.data.list[0].endtime //获取结束时间
				//获取时分秒
				this.getTime(endtime)
				//倒计时结束 停止
				let timeid = setInterval(() => {
					this.getTime(endtime)
					if (this.time.m <= '00' || this.time.s <= '00' || this.time.f <= '00') {
						clearInterval(timeid)
						this.time.m = '00'
						this.time.s = '00'
						this.time.f = '00'
					}
				}, 1000)
			}
		},
		methods: {
			getTime(endtime) {
				//获取当前时间
				let nowtime = new Date().getTime()
				let duration = Math.floor((endtime - nowtime) / 1000)
				//获取小时
				let Time = Math.floor(duration / 3600)
				let s = Time >= 10 ? Time : '0' + Time
				//获取分钟
				let branch = Math.floor(duration % 3600 / 60)
				let f = branch >= 10 ? branch : '0' + branch
				//获取秒
				let second = duration % 60
				let m = second >= 10 ? second : '0' + second
				//渲染
				this.time = {
					s,
					f,
					m
				}
			},
			//导航
			async Nav(idx, id) {
				this.active = idx
				uni.navigateTo({
					url: '/pages/product/product?fid=' + id
				})
			},
			//跳转商品所有分类
			toClassify() {
				uni.navigateTo({
					url: '/pages/classify/classify'
				})
			},
			//商品列表菜单
			goodsNav(i) {
				this.activeIndex = i
			},
			//跳转详情页
			toDetail(id) {
				uni.navigateTo({
					url: '/pages/details/details?id=' + id
				})
			}
		}
	}
</script>

<style>
	/* 导入外部的样式文件 */
	@import url("../../common/css/index.css");

	.GoodConTit {
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}
</style>
