<template>
	<view class="flex-column pw-calendar-view">
		<!-- <tl-header custom="true"></tl-header> -->
		<tl-header custom="true">
			<view class="custom-header">
			<view class="header-title">日历</view>
			
		</view></tl-header>
		<scroll-view class="calendar" scroll-y="true">
			<uni-calendar class="uni-calendar--hook" v-if="showCalendar" :date="currentDate" :selected="info.selected" :showMonth="false" @change="change" @monthSwitch="monthSwitch" />
			<view class="tool-view">
				<button class="btn" @click="todayIn">今日签到</button>
				<button class="btn" @click="showEvent">添加事件</button>
			</view>
			<view class="event-list" v-if="currentEvents?.length">
				<view class="item" v-for="(item,i) in currentEvents" :key="i">
					<text>{{i+1}}. </text>
					<text>{{item.content}}</text>
				</view>
				
			</view>
		</scroll-view>
		<tl-move-top top="60%" ref="refMoveTop" v-if="inputContentVisible" @close="inputContentVisible=false">
			<view class="event-view-edit">
				<textarea class="edit" placeholder="输入事件内容..." v-model="inputContent"></textarea>
				<view class="tool flex-view">
					<button @click="closeEvent" class="btn">取消</button>
					<button @click="addEvent" class="btn submit">确定</button>
				</view>
			</view>
		</tl-move-top>
	</view>
	
</template>

<script>
import { getDateString } from '@/api'
import { mapStores, mapActions, mapState } from 'pinia'
import { useAppStore } from '@/stores/app.js'

export default {
	data() {
		
		return {
			inputContentVisible: false,
			inputContent: '',
			showCalendar: false,
			currentDate: getDateString(new Date(),'YYYY-MM-DD')
		}
	},
	computed: {
		...mapStores(useAppStore),
		...mapState(useAppStore, ['calendarEvents']),
		info() {
			return {
				lunar: true,
				range: true,
				insert: false,
				
				selected: this.calendarEvents || []
			}
		},
		currentEvents() {
			const event =  this.calendarEvents.find(item => item.date === this.currentDate)
			if(!event) return []
			return event.data?.dataList || []
		}
	},
	methods: {
		...mapActions(useAppStore, ['updateDatabaseDataSet', 'addCalendarEvent']),
		change(e){
			console.log(e)
			this.currentDate = e.fulldate
		},
		monthSwitch(e){
			console.log(e)
		},
		async todayIn(e) {
			const tody = getDateString(new Date(),'YYYY-MM-DD')
			if(this.calendarEvents.find(item => item.date === tody)){
				uni.showToast({
					icon:'error',
					title: '已经签过'
				})
				return
			}
			this.addCalendarEvent({
				date: tody,
				info:'打卡',
				data:{
						custom: '',
						name: ''
					}
			})
			this.showCalendar = false 
			this.$nextTick(() => {
				this.showCalendar = true
			})
			await this.updateDatabaseDataSet()
		},
		showEvent() {
			this.inputContentVisible = true
		},
		closeEvent() {
			this.$refs.refMoveTop.onclose()
			// this.inputContentVisible = false
		},
		async addEvent(e){
			let event = this.calendarEvents.find(item => item.date === this.currentDate)
			if(event) {
				event.data.dataList = event.data.dataList || []
				event.data.dataList.push({
					id: new Date().getTime(),
					content: this.inputContent
				})
				event.info = '事件(' + event.data.dataList.length + ')'
			} else {
				event = {date: this.currentDate}
				event.info = '事件'
				event.data = {}
				event.data.name = '事件'

				event.data.dataList = [{
					id: new Date().getTime(),
					content: this.inputContent
				}]
				
				this.addCalendarEvent(event)
				console.log(event)
				this.showCalendar = false 
				this.$nextTick(() => {
					this.showCalendar = true
				})
				
			}
			await this.updateDatabaseDataSet()
			this.closeEvent()
			this.inputContent = ''
		}
	},
	async mounted() {
		this.showCalendar = true
		uni.$on('add-events',() => {
			this.showEvent()
		})
	}
}

</script>

<style>
	.pw-calendar-view {
		flex:1;
		background-color: #f1f1f1;
		display: flex;
		flex-direction: column;
	}
	.calendar {
		margin: 10px;
		flex: 1;
		height: 0px;
	}
	
	.event-view-edit {
		padding: 50px 20px 10px 20px;	
		height: 100%;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
	}
	.event-view-edit .edit {
		background-color: #f1f1f1;
		width: 100%;
		flex:1;
		height: 0;
		border-radius: 3px;
		padding: 10px;
		box-sizing: border-box;
	}
	.tool-view{ }
	.tool-view .btn {
		margin: 10px 0px
	}
	.tool {
		margin-top: 10px;
		
	}
	.tool .btn {
		margin: 0px 20px;
		min-width: 100px;
	}
	.tool .submit {
		background-color: #2670f9;
		color: #fff;
	}
	.event-list {
		padding: 10px;
		background-color: #fff;
	}
	.event-list .item {
		border-bottom: 1px solid #dbdbdb;
		padding: 10px 2px;
	}
	.event-list .item:last-child {
		border-bottom: none;
	}
</style>
