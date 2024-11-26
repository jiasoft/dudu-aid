<template>
	<view class="flex-column pw-note-view">
		<tl-header custom="true">
			<view class="custom-header">
				<view class="header-title">笔记</view>
				<view class="header-tool">
					<uni-icons type="plusempty"  size="20" @click="()=>openNoteEdit(null)"></uni-icons>
				</view>
			</view>
		</tl-header>
		<scroll-view class="scroll-main-vew" scroll-y="true">
			<view class="scroll-main-content data-list">
				<uni-swipe-action-item  v-for="item in noteList" :key="item.id">
					<view class="item" @click="()=>openNoteEdit(item)">
						<view class="data-header">{{item.title}}</view>
						<view class="data-content" v-html="item.content">
							
						</view>
						<view class="bottom">{{item.date}}</view>
					</view>	
					<template v-slot:right>
						<view class="slot-button cancel" @click="bindClick({position:'right',item,content:{text:'取消'},active:'cancel'})"><text class="slot-button-text">取消</text></view>
						<view class="slot-button delete" @click="bindClick({position:'right',item,content:{text:'删除'},active:'delete'})"><text class="slot-button-text">删除</text></view>
					</template>
				</uni-swipe-action-item>
				
				<view class="item"  v-if="!noteList?.length" @click="()=>openNoteEdit(null)">
					<view class="data-header">标题</view>
					<view class="data-content">
						内容，点击【编辑】。。。
					</view>
					<view class="bottom"></view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import { getDateString } from '@/api'
	import { mapStores, mapActions, mapState } from 'pinia'
	import { useAppStore } from '@/stores/app.js'
	export default {
		data() {
			return {
				readOnly: false,
				formats: {}
			}
		},
		computed:{
			...mapStores(useAppStore),
			...mapState(useAppStore, ['noteList']),
		},
		methods: {
			
			openNoteEdit(item) { 
				const url = '/pages/pw-note-view/pw-node-view-edit' +  (item?'?id='+item.id:'')
				uni.navigateTo({
					url
				})
				
			},
			onStatusChange(){
				
			},
			bindClick(event) {
				
				if(event.active === 'delete') {
					if(!uni.showModal({
						title:'确定删除吗？',
						confirmText: '是的',
						cancelText: '取消'
						
					})) return false
					this.removeNote(event.item.id)
					
				}
			}
		},
		mounted() {
			uni.$on('add-note',() => {
				this.openNoteEdit(null)
			})
		}
	}
</script>

<style scoped>
.pw-note-view {
	flex:1;
	background-color: #f1f1f1;
	display: flex;
	flex-direction: column;
}
.ql-container {
	padding: 10px;
	background-color: #f1f1f1;
	box-sizing: border-box;
	display: flex;
	flex:1;
}
.ql-container :deep .ql-editor{
	background-color: #fff;
}

.data-list .item {
	background-color: #fff;
	padding: 3px 10px;
	box-sizing: border-box;
	box-shadow: 0px 0px 5px rgb(0 0 0 / 10%);
	margin-bottom: 15px;
}
.data-list .item .data-header {
	font-weight: bold;
	padding-bottom: 5px;
}
.data-list .item .bottom {
	color: #ccc;
	display: flex;
	font-size: 12px;
	justify-content: flex-end;
}
.data-content{
	
	overflow: hidden;
	text-overflow: ellipsis;
	-webkit-line-clamp: 2;
	line-height: 1.5;
	max-height: calc(1.5em * 2);
	font-size: 14px;
}
.slot-button {
	display: flex;
	flex:1;
	background-color: #006cff;
	align-items: center;
	color: #fff;
	padding: 0px 10px;
	margin-bottom: 15px;
}
.slot-button.delete {
	background-color: red;
}
</style>
