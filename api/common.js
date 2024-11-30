const BaiduAI = uniCloud.importObject('BaiduAI', {customUI: true})
const DBStore = uniCloud.importObject("DBStore",{customUI: true})
export async function createBdAiSessionId(){
	// const BaiduAI = uniCloud.importObject('BaiduAI')
	return await BaiduAI.createSessionId()
}

export async function queryContent(query, sessionId){
	
	return await BaiduAI.queryContent(query, sessionId)
}
export async function askContent(query, sessionId){
	// const BaiduAI = uniCloud.importObject('BaiduAI')
	return await BaiduAI.askContent(query, sessionId)
}

export async function getDataSetList() {
	// const DBStore = uniCloud.importObject("DBStore")
	return await DBStore.getDataSetList()
}
export async function addDataSet(data) {
	// const DBStore = uniCloud.importObject("DBStore")
	return await DBStore.addDataSet(data)
}
export async function updateDataSet(id,data) {
	// const DBStore = uniCloud.importObject("DBStore")
	return await DBStore.updateDataSet(id, data)
}
export async function getDataSetByDeviceId(id) {
	
	// const DBStore = uniCloud.importObject("DBStore")
	return await DBStore.getDataSetByDeviceId(id)
}
export async function getDataSetById(id) {
	
	// const DBStore = uniCloud.importObject("DBStore")
	return await DBStore.getDataSetById(id)
}
export async function getPhone(data) {
	return await uniCloud.callFunction({
		name:'univerify',
		data
	})
}

/**
 * 时间
 * @returns YYYYMMDDHHMMSS
 */
export function getDateString(date, format) {
	const n = date || new Date();
	const y = n.getFullYear();
	const m = n.getMonth() + 1;
	const d = n.getDate();
	const h = n.getHours();
	const minu = n.getMinutes();
	const s = n.getSeconds();
	const yy = y.toString()
	const mm = m.toString().padStart(2, '0')
	const dd = d.toString().padStart(2, '0')
	const hh = h.toString().padStart(2, '0')
	const minu2 = minu.toString().padStart(2, '0')
	const ss = s.toString().padStart(2, '0')
	return format ? 
		format.replace('YYYY', yy).replace('MM', mm).
			replace('DD', dd).replace('hh', hh).replace('mm',minu2).replace('ss', ss) 
			:
			yy + mm + dd + hh + minu2 + ss;
}