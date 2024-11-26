<template>
	<view class="main-view flex-column">
		
		<view class="main-content" :style="style">
			<pwDialogView class="content-view"></pwDialogView>
			<pwCalendarView class="content-view"></pwCalendarView>
			<pwNoteView class="content-view"></pwNoteView>
			<pwMyinfoView class="content-view"></pwMyinfoView>
		</view>
		<tl-toobar />
	</view>
</template>

<script>
	// import { state, setLayoutActive } from '@/stores/app.js'
	import pwCalendarView from '../pw-calendar-view/pw-calendar-view.vue'
	import pwDialogView from '../pw-dialog-view/pw-dialog-view.vue'
	import pwNoteView from '../pw-note-view/pw-note-view.vue'
	import pwMyinfoView from '../pw-myinfo-view/pw-myinfo-view.vue'
	import base from '@/common/base.js'

	export default {
		mixins:[base],
		components:{
			pwDialogView,
			pwCalendarView,
			pwNoteView,
			pwMyinfoView
		},
		data() {
			
		},
		onLoad() {
			// console.log(this.appStoreStore.layoutActive)
		},
		computed:{
			style() {
				return {left: (-this.appStoreStore.layoutActive*100) +'%'}
			}
		},
		methods: {

		},
		async mounted() {
			
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
	.main-view {
		background-color: #f1f1f1;
		height: 100%;
	}
</style>
