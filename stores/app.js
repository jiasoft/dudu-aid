import {
	defineStore
} from 'pinia';
import {
	addDataSet,
	getDataSetByDeviceId,
	getDataSetById,
	updateDataSet
} from '../api';
const StoreName = 'global-app-data-store'
export const useAppStore = defineStore('appStore', {
	state: () => {
		let appDataStore = uni.getStorageSync(StoreName) || {
			app_data_store: {}
		}

		const deviceId = appDataStore.deviceId
		const code = appDataStore.code
		const create_at = appDataStore.create_at
		const id = appDataStore.id
		const phone = appDataStore.phone
		const app_data_store = appDataStore.app_data_store || {}
		const sessionId = app_data_store.sessionId
		const dataList = app_data_store.dataList
		const layoutActive = app_data_store.layoutActive
		const calendarEvents = app_data_store.calendarEvents || []
		const noteList = app_data_store.noteList || []
		return {
			id,
			deviceId,
			code,
			create_at,
			phone,
			/**app_data_store**/
			layoutActive,
			sessionId,
			dataList,
			calendarEvents,
			noteList
			/*****/
		};
	},
	actions: {
		setAppDataStore(data) {
			this.phone = data.phone
			this.id = data.id || data._id
			this.deviceId = data.deviceId
			this.code = data.code
			this.create_at = data.create_at
			this.update_at = data.update_at
			this.layoutActive = data.app_data_store?.layoutActive || 0
			this.sessionId = data.app_data_store?.sessionId || ''
			this.dataList = data.app_data_store?.dataList || []
			this.calendarEvents = data.app_data_store?.calendarEvents || []
			this.noteList = data.app_data_store?.noteList || []
		},
		saveAppDataStore() {
			const appDataStore = uni.getStorageSync(StoreName) || {
				app_data_store: {}
			}

			appDataStore.id = this.id
			appDataStore.code = this.code
			appDataStore.create_at = this.create_at
			appDataStore.update_at = this.update_at
			appDataStore.phone = this.phone
			appDataStore.deviceId = this.deviceId

			appDataStore.app_data_store.layoutActive = this.layoutActive
			appDataStore.app_data_store.sessionId = this.sessionId
			appDataStore.app_data_store.dataList = this.dataList
			appDataStore.app_data_store.calendarEvents = this.calendarEvents || []
			appDataStore.app_data_store.noteList = this.noteList || []
			uni.setStorageSync(StoreName, appDataStore)
			// this.updateDatabaseDataSet()
		},
		async updateDatabaseDataSet() {
			// debugger
			// const appDataStore =uni.getStorageSync(StoreName)
			const {
				id,
				deviceId,
				code,
				create_at,
				phone,
				app_data_store
			} = this
			if (!id) return
			const update_at = new Date().getTime()
			const {
				updated
			} = await updateDataSet(id, {
				id,
				deviceId,
				code,
				create_at,
				update_at,
				phone,
				app_data_store
			})
			console.log('updated：' + updated)
			return updated
			
		},
		setLayoutActive(act) {
			this.layoutActive = act
			this.saveAppDataStore()
		},
		setSessionId(id) {
			this.sessionId = id
			this.saveAppDataStore()
		},
		setDataList(list) {
			this.dataList = list
			this.saveAppDataStore()
		},
		getDataListLastIndex() {
			if (this.dataList.length) return this.dataList.length - 1
			return 0
		},
		setPhone(phone) {
			this.phone = phone
			this.saveAppDataStore()
		},
		addDataItem(item) {
			this.dataList.push({
				...item
			})
			this.saveAppDataStore()
		},
		setDataItem(item, index) {
			this.dataList[index] = {
				...item
			}
			this.saveAppDataStore()
		},
		setLastDataItem(item) {
			const index = this.getDataListLastIndex()
			this.dataList[index] = {
				...item
			}
			this.saveAppDataStore()
		},
		setLastDataItemWord(word, scrollTop, callback) {
			const index = this.getDataListLastIndex()
			const answers = this.dataList[index].answers
			const answerItem = answers[answers.length - 1]
			answerItem.answer = word
			this.saveAppDataStore()
			const _this = this
			let i = 0;
			(function setWord() {
				i++
				if (i <= word.length) {
					// console.log(word.substr(0, i))
					answerItem.writeingAnswer = word.substr(0, i)
					answerItem.writeing = true
					setTimeout(setWord, 100)
					scrollTop.value = 100000 - 0.1
					requestAnimationFrame(() => {
						scrollTop.value = 100000
					})
				} else {
					answerItem.writeing = false
					answerItem.writeingAnswer = ''

				}
			})()
			// setWord()
		},
		addCalendarEvent(item) {
			this.calendarEvents.push(item)
			this.saveAppDataStore()
		},
		removeCalendarEvent(date) {
			this.calendarEvents = this.calendarEvents.filter(item => item.date != date )
			this.saveAppDataStore()
		},
		addNote(item) {
			this.noteList.push(item)
			this.saveAppDataStore()
		},
		removeNote(id){
			this.noteList = this.noteList.filter(item => item.id !== id)
			this.saveAppDataStore()
		}
	},
});