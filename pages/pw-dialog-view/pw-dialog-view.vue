<template>
	<view class="flex-column flex-dailog">
		<tl-header custom="true">
			<view class="custom-header">
			<view class="header-title">与AI对话</view>
			
		</view></tl-header>
		<scroll-view class="scroll-view-dailog" :scroll-y="true" show-scrollbar="false" ref="scrollView" :scroll-top="scrollTop">
			<view class="flex-dailog-content">
				<view class="item" v-for="item in appStore.dataList">
					<view class="client" v-if="item.asks && item.asks.length">
						<view class="content-client">
							<view class="ask" v-for="askItem in item.asks">
								<view class="pre-like-view">
								    <text>{{askItem['ask']}}</text>
								  </view>
							</view>
						</view>
						<view class="me flex-view">我</view>
					</view>
					<view class="serve flex-row" v-if="item.answers && item.answers.length">
						<view class="serve-icon"><image class="img" src="../../static/logo.png"></image></view>
						<view class="content-serve">
							<view v-for="(answerItem,i) in item.answers" :key="i">
								<view class="answer pre-like-view" v-if="answerItem.answer">
								
									<text>{{answerItem.writeingAnswer || answerItem.answer}}<template v-if="answerItem.writeing" >|</template></text>
									<view class="tl-loading-data-view" v-if="answerItem.loading">
										<tl-loading-data></tl-loading-data>
									</view>
									<view class="error-data-view flex-view" v-if="answerItem.error">
										<icon type="warn" class="img" size="16"/>
									</view>
								</view>
								<view class="answer-end" v-if="answerItem.is_completion"></view>
							</view>
						</view>
					</view>
				</view>
				<!-- <view style="text-align: right;" v-if="content">我：{{content}}</view>
				<view v-for="item in answers">
					{{item['answer']}}
				</view> -->
			</view>
		</scroll-view>
		<view class="dialog-toolbar flex-row">
			<view class="icon-add flex-row flex-center"  hover-class="is-hover" hover-start-time="50" hover-stay-time="100" @click="addTooolViewVisible=true">
				<uni-icons type="plusempty"  size="12"></uni-icons>
			</view>
			<textarea  class="in-text" v-model="askCtx" confirmType="send" placeholder="" @confirm="onConfirm" />
			<button class="voice flex-view" hover-class="is-hover" hover-start-time="50" hover-stay-time="100" @click="onClick">
				<image class="icon" src="../../static/icon/icon-send.png"></image>
			</button>
		</view>
		<tl-move-top top="70%" v-if="addTooolViewVisible" @close="addTooolViewVisible = false">
			<view class="add-tool-view" >
				<uni-file-picker limit="1" title="可以上传文件"></uni-file-picker>
			</view>
		</tl-move-top>
	</view>
</template>

<script setup>
	import { useAppStore } from '@/stores/app.js'
	import { createBdAiSessionId, queryContent, askContent } from '@/api'
	import { ref, onMounted, nextTick} from 'vue'
	
	const scrollTop = ref(0)
	const addTooolViewVisible = ref(false)
	const appStore = useAppStore()
	const askCtx = ref('')
	const dataList = ref([
		{
			// asks:[{
			// 	ask:'你好吗'
			// }],
			answers:[{
				answer:'我是嘟嘟学习助手，请问需要什么帮忙吗？'
			},
			// {
			// 	answer:'请稍等',
			// 	loading: true
			// }
			]
		}
	])
	// const answers= ref([])
	const onConfirm = async () => {
		if(!askCtx.value) return
		
		const data = {
			asks:[{
				ask: askCtx.value
			}],
			answers:[
				{
					answer:'请稍等',
					loading: true
				}
			]
		}
		appStore.addDataItem(data)
		
		if(!appStore.sessionId) {
			const { conversation_id } = await createBdAiSessionId()
			appStore.setSessionId(conversation_id)
		}console.log(askCtx.value)
		const { answer, conversation_id,is_completion, date } = await askContent(askCtx.value, appStore.sessionId)
		askCtx.value = ''
		if(!conversation_id && conversation_id !== appStore.sessionId) {
			
			data.answers[0].loading = false
			data.answers[0].error = true
			appStore.setLastDataItem(data)
			const errorMsg = '请求出错, 可能欠费，资源不足，请反馈给技术人员：18665378372或jiasoft@163.com';
			appStore.setLastDataItemWord(errorMsg, scrollTop)
			return
		}

		data.answers = [{
			answer:''
		}]
		appStore.setLastDataItem(data)
		appStore.setLastDataItemWord(answer, scrollTop)
		appStore.updateDatabaseDataSet()
	}
	const onClick = () => {
		onConfirm()
	}
	onMounted(() => {
		nextTick(()=>{
			scrollTop.value = 100000
		})
		
	})
</script>

<style>
	.flex-dailog {
		flex:1;
	}
	.dialog-content{
		height: 100%;
	}
	.dialog-toolbar {
		min-height: 38px;
		background-color: #fff;
		margin: 10px;
		border-radius: 20px;
		box-shadow: 0px 0px 10px -8px rgba(0,0,0,0.1);
		align-items: center;
		padding: 0px 10px;
	}
	.dialog-toolbar .icon-add {
		margin-right: 5px;
		border-radius: 22px;
		border: 1px solid #333;
		width: 22px;
		height: 22px;
	}
	.dialog-toolbar .in-text {
		font-size: 14px;
		flex:1;
		height: 40px;
		padding-top: 10px;
		box-sizing: border-box;
		line-height: 20px;
	}
	.dialog-toolbar .icon {
		width: 32px;
		height: 32px;
	}
	.flex-dailog-content{
		padding: 10px;
		flex: 1;
	}
	.client {
		padding-left: 32px;
		padding: 10px;
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
		width: 100%;
		box-sizing: border-box;
	}
	.client .me {
		width: 18px;
		height: 18px;
		border: 1px solid #646464;
		border-radius: 50%;
		font-size: 12px;
		color: #646464;
		margin-left: 5px;
	}
	.client .ask {
		
		background-color: #8282e1;
		color: #fff;
		border-radius: 6px;
		padding: 3px 5px;
		font-size: 14px;
	}
	.serve {
		padding-right: 20px;
	}
	.serve .serve-icon {
		margin-right: 5px;
	}
	.serve .content-serve .answer {
		font-size: 14px;
		background-color: #fff;
		border-radius: 6px;
		padding: 5px;
		display: flex;
	}
	.scroll-view-dailog {
		flex: 1;
		height: 0px;
	}
	.voice {
		width: 32px;
		height: 32px;
		padding: 0px;
		background-color: transparent;
		border: none;
	}
	.voice:after {
		display: none;
	}
	.serve .img{
		width: 25px;
		height: 25px;
	}
	.tl-loading-data-view {
		position: relative;
		width: 25px;
		height: 25px;
	}
	.answer-end{
		margin-bottom: 10px;
	}
	.error-data-view {
		margin-left: 5px;
	}
	.error-data-view .img {
		display: flex;
		align-items: center;
		height: 20px;
	}
	.input-cursor {
		width: 6px;height: 12px;
		align-self: center;
		justify-items: center;
		justify-self: center;
		text-align: center;
		align-items: center;
	}
	.add-tool-view {
		background-color: #fff;
		padding: 30px 20px;
	}
</style>
