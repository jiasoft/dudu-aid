'use strict';
exports.main = async (event, context) => {
	let  {access_token,openid} = event
	let appid = context.APPID
	if(event.body) {
		const body = JSON.parse(event.body)
		access_token = body.access_token
		openid = body.openid
		appid = body.appid
	}
	const res = await uniCloud.getPhoneNumber({
		appid: appid, // 客户端callFunction时携带的AppId信息
		provider: 'univerify',
		access_token: access_token,
		openid: openid
	})
	console.log(res)
	return {
		code: 0,
		data:res,
		message: '获取成功'
	}
};
