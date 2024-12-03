<script>
	const StoreName = 'app-data-store'
	import { getDataSetByDeviceId, addDataSet, getDataSetById } from '@/api'
	import { mapStores } from 'pinia'
	import { useAppStore } from '@/stores/app.js'
	export default {
		computed:{
			...mapStores(useAppStore)
		},
		onLaunch: async function() {
			
			if(!this.appStoreStore.id){
				const info = uni.getSystemInfoSync()
				// console.log(info)
				const {data} = await getDataSetByDeviceId(info.deviceId)
				if(data[0]) {
					this.appStoreStore.setAppDataStore(data[0])
					this.appStoreStore.saveAppDataStore()
				} else {
					const t = new Date().getTime()
					
					const newData = {
						code: t,
						create_at: t,
						update_at: t,
						deviceId: info.deviceId,
						phone: '',
						app_data_store: {
							sessionId :'',
							dataList: [
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
							],
							layoutActive: 0
						}
						
					}
					const {id} = await addDataSet(newData)
					if(id) {
						const {data} = await getDataSetById(id)
						if(data[0]){
							this.appStoreStore.setAppDataStore(data[0])
							this.appStoreStore.saveAppDataStore()
							this.appStoreStore.updateDatabaseDataSet()
							// appDataStore = data[0].app_data_store
	
							// uni.setStorageSync('id', data[0]._id)
							// uni.setStorageSync('deviceId', data[0].deviceId)
							// uni.setStorageSync('code', data[0].code)
							// uni.setStorageSync('create_at', data[0].create_at)
							// uni.setStorageSync(StoreName, appDataStore)
						}
					}
				}
				
			}
			console.log('App Launch')
			
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import url("common/uni.css");
</style>
