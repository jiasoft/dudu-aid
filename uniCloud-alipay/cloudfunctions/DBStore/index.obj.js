// 云对象教程: https://uniapp.dcloud.net.cn/uniCloud/cloud-obj
// jsdoc语法提示教程：https://ask.dcloud.net.cn/docs/#//ask.dcloud.net.cn/article/129
const tableName = "dudu-aid"
module.exports = {
	_before: function () { // 通用预处理器

	},
	/**
	 * method1方法描述
	 * @param {string} param1 参数1描述
	 * @returns {object} 返回值描述
	 */
	
	getDataSetList() {
		const db = uniCloud.database()
		return db.collection(tableName).get()
		
	},
	addDataSet(data) {
		const db = uniCloud.database()
		const tbl = db.collection(tableName)
		return tbl.add(data)
		
	},
	updateDataSet(id,data) {
		const db = uniCloud.database()
		const tbl = db.collection(tableName)
		return tbl.where({_id: id}).update(data)
	},
	getDataSetById(id) {
		const db = uniCloud.database()
		const tbl = db.collection(tableName)
		return tbl.where({_id: id}).get()
		
	},
	getDataSetByDeviceId(deviceId) {
		const db = uniCloud.database()
		const tbl = db.collection(tableName)
		return tbl.where({deviceId}).get()
		
	},
	getDataSetByPhone(phoneNumber) {
		const db = uniCloud.database()
		const tbl = db.collection(tableName)
		return tbl.where({phone: phoneNumber}).get()
		
	},
	
}
