// 云对象教程: https://uniapp.dcloud.net.cn/uniCloud/cloud-obj
// jsdoc语法提示教程：https://ask.dcloud.net.cn/docs/#//ask.dcloud.net.cn/article/129
// const  request require('request'
const host = "https://qianfan.baidubce.com";
const app_id = "9b24886b-bf87-41c4-a7e0-0088b2ce810f";//"095dcfb0-04d5-47a2-a4fb-278b59af437e"; //"675a9902-b12a-4d18-a492-6e4e3b44449c";
const secret_key = "Bearer bce-v3/ALTAK-AxNAd2TOXy8KA6n8SYRPv/0838931b8193d528f407b7246d51a8104909eba1"// "Bearer bce-v3/ALTAK-jud8gAdIhkMuclt5A73TM/c291db52821c523d7e3cc9e7e3156bc97267ef8a";
const crypto = require('crypto');
const request = require('request');

function randomUUID() {
	return crypto.randomUUID()
}

function getHeaders(length) {
	const traceId = randomUUID().replace(/\-/g, "");
	const appRequestId = randomUUID();
	const bceRequestId = randomUUID();

	const option = {
		"Bfe-Trace-Id": traceId,
		// "Content-Length": length,
		"Content-Type": "application/json",
		Date: new Date().toGMTString(),
		"X-Appbuilder-Request-Id": appRequestId,
		"X-Bce-Gateway-Region": "BJ",
		"X-Bce-Request-Id": bceRequestId,
		"X-Appbuilder-Authorization": secret_key,
	}
	if (length) {
		option["Content-Length"] = length
	}
	return option;
}

function createSession() {
	const body = JSON.stringify({
		app_id
	});
	const headers = getHeaders(body.length)

	return fetch(
			`${host}/v2/app/conversation`, {
				method: "post",
				headers,
				body: body,
			})
		.then((response) => {
			
			if (response.status === 200 && response.ok)
				return response.json();
			else
				return response.text();
		})
		.then((data) => {
			// console.log(data)
			return data;
		})
		.catch((err) => {
			console.log(err);
			return err;
		});
}

function askContent(query, conversation_id) {
	
	const body = JSON.stringify({
		app_id,
		query,
		stream: false,
		conversation_id,
	});
	const headers = getHeaders()
	return fetch(`${host}/v2/app/conversation/runs`, {
			method: "post",
			headers,
			body,
		})
		.then((response) => {
			if (response.status === 200 && response.ok) {
				return response.json();
			} else {
				return response.text();
			}

		})
		.then((data) => {
			
			return data;
		})
		.catch((err) => {
			console.log(err);
			return err;
		});

}

function queryContent(query, conversation_id) {
	return new Promise((resolve, reject) => {
		const body = JSON.stringify({
			app_id,
			query,
			stream: true,
			conversation_id,
		});
		const headers = getHeaders()

		const options = {
			method: 'POST',
			url: `${host}/v2/app/conversation/runs`,
			headers,
			body
		}
		request(options, function(err, response) {
			if (err) {
				console.error(err)
				reject(err)
			} else {
				
				const list = response.body.split(/data:/).filter(item => item).map(item => JSON.parse(
					item.replace(/\s+/, '').replace(/\n+$/, '')))
				resolve({
					list
				})
			}

		})
	})
}
module.exports = {
	_before: function() { // 通用预处理器
		console.log("_before")
	},
	/**
	 * createSessionId方法创建千帐会话ID
	 * @returns {object} 返回值描述
	 */

	async createSessionId() {
		return await createSession()
	},
	async queryContent(query, sessionId) {
		return await queryContent(query, sessionId)
	},
	askContent(query, sessionId) {
		return askContent(query, sessionId)
	}
}