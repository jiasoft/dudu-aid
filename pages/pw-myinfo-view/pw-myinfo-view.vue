<template>
	
	<view class="pw-myinfo-view">
		<tl-header custom="true">
			<view class="custom-header">
			<view class="header-title">我的信息</view>
			
		</view></tl-header>
		<view class="info flex-center">
			<image src="/static/icon/icon-head.svg" mode="aspectFit"></image>
			<view class="item">
				<text class="label">学生：</text><text class="val">李明</text>
			</view>
			<view class="item">
				<text  class="label">学号：</text><text class="val">465465656</text>
			</view>
			<view class="item">
				<text  class="label">手机：</text>
				<text class="val" v-if="appStoreStore.phone">{{appStoreStore.phone}}</text>
				<view class="link" hover-class="is-hover" hover-start-time="50" hover-stay-time="100" v-else @click="login">绑定手机号</view>
			</view>
			<view class="item">
				<text  class="label">学校：</text><text class="val">深圳大学</text>
			</view>
			<view class="item">
				<text  class="label">设备</text><text class="val text-over">{{appStoreStore.deviceId}}</text>
			</view>
		</view>
		<view class="tool" v-if="!appStoreStore.phone">
			<button @click="login">登录绑定手机号</button>
		</view>
	</view>
</template>

<script>
	import { mapStores } from 'pinia'
	import { useAppStore } from '@/stores/app.js'
	export default {
		data() {
			return {
				
			}
		},
		computed:{
			...mapStores(useAppStore)
		},
		methods: {
			login() {
				uni.reLaunch({
					url:'/pages/login/login'
				})
				
			}
		},
		beforeCreate(){
			// console.log(this)
		}
	}
</script>

<style scoped>
.pw-myinfo-view {
	flex:1;
	background-color: aliceblue;
	display: flex;
	flex-direction: column;
}
.pw-myinfo-view .item {
	display: flex;
	margin: 5px 10px;
	border-bottom: 1px solid #eeeeee;
	padding: 5px;
	width: 300px;
}
.pw-myinfo-view .item .val {
	color: #939090;
	flex:1;
}
.pw-myinfo-view .item .label {
	display: inline-flex;
	width: 80px;
}
.pw-myinfo-view .info {
	flex-direction: column;
	padding: 20px;
	
	flex:1;
}
.tool {
	padding: 10px;
}
.text-over {
	text-overflow: ellipsis;
	overflow: hidden;
}
.link {
	color: #3d8eef;
	text-decoration: underline;
}
</style>
