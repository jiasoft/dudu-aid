<template>
	<view class="flex-column pw-note-view">
		<tl-header custom="true">
			<view class="custom-header">
				<uni-icons type="left" size="25" @click="goBack"></uni-icons>
				<view class="header-title">添加笔记</view>
				<view class="header-tool" @click="onSave" hover-class="is-hover" hover-start-time="50" hover-stay-time="100">
					<image class="icon" src="../../static/icon/save.svg"></image>
				</view>
			</view>
		</tl-header>
		<editor id="editor" class="ql-container" placeholder="开始输入..." show-img-size show-img-toolbar
			show-img-resize @statuschange="onStatusChange" :read-only="readOnly" @ready="onEditorReady">
		</editor>
		<view class="footer-tool flex-view">
			<button class="btn" @click="goBack">取消</button>
			<button  class="btn save" @click="onSave">保存</button>
		</view>
	</view>
</template>

<script>
	import { mapStores, mapActions, mapState } from 'pinia'
	import { useAppStore } from '@/stores/app.js'
	import { getDateString } from '../../api';
	export default {
		props: ['id'],
		data() {
			return {
				readOnly: false,
				formats: {},
				itemId:''
			}
		},
		onLoad(option) {
			this.itemId = option.id
		},
		computed:{
			...mapStores(useAppStore),
			...mapState(useAppStore, ['noteList']),
		},
		methods: {
			...mapActions(useAppStore, ['addNote','updateDatabaseDataSet']),
			goBack() {
				if(getCurrentPages().length >= 2){
					uni.navigateBack({});
				} else {
					uni.redirectTo({
						url:"/pages/index/index"
					})
				}
			},
			readOnlyChange() {
				this.readOnly = !this.readOnly
			},
			onEditorReady() {
				// #ifdef MP-BAIDU
				this.editorCtx = requireDynamicLib('editorLib').createEditorContext('editor');
				// #endif

				// #ifdef APP-PLUS || MP-WEIXIN || H5
				uni.createSelectorQuery().select('#editor').context((res) => {
					this.editorCtx = res.context
					if(this.itemId){
						const currentItem = this.noteList.find(item => item.id == Number(this.itemId))
						if(currentItem) {
							this.editorCtx.setContents({html:currentItem.content })
						}
						
					}
				}).exec()
				// #endif
			},
			onStatusChange(){
				
			},
			
			onSave(){
				this.editorCtx.getContents({
						success: async (data) => {
							console.log("文本详情：", data)
							if(this.itemId) {
								const currentItem = this.noteList.find(item => item.id == Number(this.itemId))
								currentItem.content = data.html
								currentItem.title =  data.text.split(/[\r\n]/).filter(item=>item)[0],
								currentItem.date = getDateString(new Date(),'YYYY-MM-DD hh:mm:ss')
								await this.updateDatabaseDataSet()
								// eventChannel.emit('close')
								this.goBack()
							} else {
								const newItem = {
									id: new Date().getTime(),
									title: data.text.split(/[\r\n]/).filter(item=>item)[0],
									content : data.html,
									date: getDateString(new Date(),'YYYY-MM-DD hh:mm:ss')
								}
								this.addNote(newItem)
								await this.updateDatabaseDataSet()
								// const eventChannel = this.getOpenerEventChannel();
								// eventChannel.emit('close')
								this.goBack()
							}
						},
						fail: function(A) {}
				})
				
			}
		}
	}
</script>

<style scoped>
.pw-note-view {
	flex:1;
	background-color: #f1f1f1;
	display: flex;
	flex-direction: column;
	height: 100%;
}
.ql-container {
	padding: 10px;
	
	box-sizing: border-box;
	display: flex;
	flex:1;
	
}
.ql-container :deep .ql-editor{
	background-color: #fff;
	border-radius: 0px;
	padding: 5px 10px;
}
.footer-tool {
	padding-bottom: 10px;
}
.footer-tool .btn {
	min-width: 100px;
	margin: 0px 20px;
}
.footer-tool .btn.save {
	background-color: #2670f9;
	color: #fff;
}
</style>
