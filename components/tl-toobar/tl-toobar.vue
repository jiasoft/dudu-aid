<template>
	<view class="tl-toobar flex-row">
		<view class="item flex-center">
			<view class="btn" :class="currentActive == 0?'active':''" hover-class="is-hover" hover-stay-time="100"
				hover-start-time="50" @click="()=>setActive(0)">
				<view class="img">
					<image class="icon" src="../../static/icon/icon-dialog.png" mode="aspectFit"></image>
				</view>
				<text class="text">对话</text>
			</view>
		</view>
		<view class="item flex-center">
			<view class="btn flex-view" :class="currentActive == 1 ? 'active':''" hover-class="is-hover" hover-stay-time="100"
				hover-start-time="50" @click="()=>setActive(1)">
				<view class="img flex-view">
					<image class="icon" src="../../static/icon/icon-discover.png" mode="aspectFit"></image>
				</view>
				<text class="text">日历</text>
			</view>
		</view>
		<view class="item flex-center">
			<view class="btn main" @click="openMainPop"  hover-class="is-hover" hover-stay-time="100"
				hover-start-time="50" >
				<view class="img flex-view">
					<image class="icon" src="../../static/icon/icon-add.png" mode="aspectFit"></image>
				</view>
				<text class="text"></text>
			</view>
		</view>
		<view class="item flex-center">
			<view class="btn flex-view" :class="currentActive == 2?'active':''" hover-class="is-hover" hover-stay-time="100"
				hover-start-time="50" @click="()=>setActive(2)">
				<view class="img flex-view">
					<image class="icon" src="../../static/icon/icon-help.png" mode="aspectFit"></image>
				</view>
				<text class="text">笔记</text>
			</view>
		</view>
		<view class="item flex-center">
			<view class="btn flex-view" :class="currentActive == 3 ?'active':''" hover-class="is-hover" hover-stay-time="100"
				hover-start-time="50" @click="()=>setActive(3)">
				<view class="img flex-view">
					<image class="icon" src="../../static/icon/icon-my.png" mode="aspectFit"></image>
				</view>
				<text class="text">我的</text>
			</view>
		</view>
	</view>
	<tl-move-top ref="refMoveTop" v-if="showMainPop" :disableClose="true" :top="'70%'" @close="showMainPop = false">
		<view class="main-popup-box" >
			<view class="flex-row">
				<view class="btn flex-center" hover-class="is-hover" hover-start-time="50" hover-stay-time="100" @click="addEvents">添加事件</view>
				<view class="btn flex-center" hover-class="is-hover" hover-start-time="50" hover-stay-time="100" @click="addNote">添加笔记</view>
			</view>
			<view class="flex-view tool">
				<view class="btn cancle flex-center" hover-class="is-hover" hover-start-time="50" hover-stay-time="100" @click="closeMainPop">取消</view>
			</view>
		</view>
	</tl-move-top>
	
</template>

<script>

	// import { useAppStore } from '@/stores/app.js'
	import base from '@/common/base.js'
	export default {
		name: "tl-toobar",
		mixins:[base],
		data() {
			return {
				showMainPop: false
			};
		},
		computed: {
			currentActive() { 
				return this.appStoreStore.layoutActive
			}
		},
		methods: {
			addEvents() {
				this.closeMainPop()
				this.setActive(1);
				uni.$emit('add-events')
			},
			addNote() {
				this.closeMainPop()
				this.setActive(2);
				uni.$emit('add-note')
			},
			setActive(active) {
				// setLayoutActive(active)
				this.appStoreStore.setLayoutActive(active)
			},
			openMainPop() {
				this.showMainPop = true
			},
			closeMainPop() {
				// this.showMainPop = false
				this.$refs.refMoveTop.onclose()
			}
		},
		mounted(){
			
		}
	}
</script>

<style>
	.tl-toobar {
		height: 54px;
		box-shadow: 0px 0px 15px -13px #000;
		background-color: #fff;
		position: relative;
	}

	.tl-toobar .icon {
		width: 22px;
		height: 22px;
	}

	.tl-toobar .item {
		flex: 1;
	}

	.tl-toobar .text {
		font-size: 12px;
		text-align: center;
	}
	.tl-toobar .btn {
		padding: 5px 10px;
		border-radius: 5px;
		display: flex;
		flex-direction: column;
	}
	
	.tl-toobar .main {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		top: 0px
	}

	.tl-toobar .btn.main .icon {
		width: 38px;
		height: 38px;
	}

	.tl-toobar .btn.active {
		color:#262626;
		font-weight: bold;
	}
	
	.main-popup-box {
		
		height: 100%;
		padding: 20px 10px 5px 10px;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
	}
	.main-popup-box .flex-row {
		flex:1;
	}
	
	.main-popup-box .btn {
		width: 100px;
		height: 100%;
		margin: 0px 10px;
		flex: 1;
		border-radius: 10px;
		text-align: center;
		background-color: #f1f1f1;
		border: 1px solid #dbdbdb;
		font-size: 18px;
		
	}
	.main-popup-box .tool {
		height: 60px;
		padding-top: 20px;
		padding-bottom: 15px;
		
	}
</style>