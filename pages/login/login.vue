<template>
	<view class="flex-column pw-login-view">
		<uni-icons class="close" type="closeempty" size="25" @click="onClose"></uni-icons>	
		<uni-ly-loading-data></uni-ly-loading-data>
	</view>
</template>

<script>
const univerifyStyle = {
	"fullScreen": true, // 是否全屏显示，默认值： false  
	"backgroundColor": "#ffffff", // 授权页面背景颜色，默认值：#ffffff  
	"backgroundImage": "", // 全屏显示的背景图片，默认值："" （仅支持本地图片，只有全屏显示时支持）    
	"icon": {
		"width": 300,
		"height": 60,
		"path": "/static/logo.png" // 自定义显示在授权框中的logo，仅支持本地图片 默认显示App logo     
	},
	"closeIcon": {
		"path": "/static/icon/icon-close.svg", // 自定义显示在授权框中的logo，仅支持本地图片 默认显示App logo
		"width": "60px", //图标宽度 默认值：60px (HBuilderX 4.0支持)
		"height": "60px" //图标高度 默认值：60px (HBuilderX 4.0支持)
	},
	"phoneNum": {
		"color": "#c8c8c8" // 手机号文字颜色 默认值：#202020    
	},
	"slogan": {
		"color": "#525252" //  slogan 字体颜色 默认值：#BBBBBB    
	},
	"authButton": {
		"normalColor": "#3479f5", // 授权按钮正常状态背景颜色 默认值：#3479f5    
		"highlightColor": "#2861c5", // 授权按钮按下状态背景颜色 默认值：#2861c5（仅ios支持）    
		"disabledColor": "#73aaf5", // 授权按钮不可点击时背景颜色 默认值：#73aaf5（仅ios支持）    
		"textColor": "#ffffff", // 授权按钮文字颜色 默认值：#ffffff    
		"title": "本机号码一键登录", // 授权按钮文案 默认值：“本机号码一键登录”    
		"borderRadius": "24px" // 授权按钮圆角 默认值："24px" （按钮高度的一半）  
	},
	"otherLoginButton": {
		"visible": true, // 是否显示其他登录按钮，默认值：true    
		"normalColor": "", // 其他登录按钮正常状态背景颜色 默认值：透明   
		"highlightColor": "", // 其他登录按钮按下状态背景颜色 默认值：透明   
		"textColor": "#c8c8c8", // 其他登录按钮文字颜色 默认值：#656565    
		"title": "其他登录方式", // 其他登录方式按钮文字 默认值：“其他登录方式”    
		"borderColor": "#8b8b8bf1", //边框颜色 默认值：透明（仅iOS支持）    
		"borderRadius": "5px" // 其他登录按钮圆角 默认值："0px"   
	},
	"privacyTerms": {
		"defaultCheckBoxState": true, // 条款勾选框初始状态 默认值： true  
		"uncheckedImage": "", // 可选 条款勾选框未选中状态图片（仅支持本地图片 建议尺寸 24x24px）(3.2.0+ 版本支持)   
		"checkedImage": "", // 可选 条款勾选框选中状态图片（仅支持本地图片 建议尺寸24x24px）(3.2.0+ 版本支持)     
		"textColor": "#BBBBBB", // 文字颜色 默认值：#BBBBBB    
		"termsColor": "#5496E3", //  协议文字颜色 默认值： #5496E3    
		"prefix": "我已阅读并同意", // 条款前的文案 默认值：“我已阅读并同意”    
		"suffix": "并使用本机号码登录", // 条款后的文案 默认值：“并使用本机号码登录”    
		"privacyItems": [
			// 自定义协议条款，最大支持2个，需要同时设置url和title. 否则不生效    
			{
				"url": "https://", // 点击跳转的协议详情页面    
				"title": "用户服务协议" // 协议名称    
			}
		]
	},
	"buttons": { // 仅全屏模式生效，配置页面下方按钮  （3.1.14+ 版本支持）  
		"iconWidth": "45px", // 图标宽度（高度等比例缩放） 默认值：45px  
		"list": [
			// {
			// 	"provider": "apple",
			// 	"iconPath": "/static/icon/icon_apple_bk.png" // 图标路径仅支持本地图片
			// },
			// {
			// 	"provider": "weixin",
			// 	"iconPath": "/static/icon/icon_wx_bk.png" // 图标路径仅支持本地图片
			// },
			// {
			// 	"provider": "authcode",
			// 	"iconPath": "/static/icon/icon_phone_bk.png" // 图标路径仅支持本地图片
			// }
		]
	}
}

import { getPhone } from '@/api' 
import { mapActions } from 'pinia'
import { useAppStore } from '@/stores/app.js'
export default {
	
	data() {
		return {
			
		}
	},
	beforeMount() {
		
	},
	methods: {
		...mapActions(useAppStore,['setPhone','updateDatabaseDataSet']),
		onClose() {
			
			uni.reLaunch({
				url:"/pages/index/index"
			})
			
		}
	},
	mounted() {
		uni.getProvider({
		  service: 'oauth',
		  success:  (res) => {
		   
			if(res.provider?.includes('univerify')){
				uni.login({
					provider: 'univerify',
					univerifyStyle: univerifyStyle,
					success:(res) => { // 登录成功
						// console.log(res.authResult); // {openid:'登录授权唯一标识',access_token:'接口返回的 token'}
						getPhone(res.authResult).then(async ({result}) => {
							const {code , phoneNumber} = result?.res
							console.log({code , phoneNumber})
							
							if(code !== 0) {
								uni.showToast({
									icon:'error',
									title: '登录失败'
								})
								return
							}
							console.log(this,this.setPhone)
							this.setPhone(phoneNumber)
							await this.updateDatabaseDataSet()
							uni.closeAuthView()
							uni.reLaunch({
								url:"/pages/index/index"
							})
						})
					},
					fail(res) { // 登录失败
						console.error(res)
						if([30003,30002,30006].includes(res.code)){
							uni.reLaunch({
								url:"/pages/index/index"
							})
						}
						
					},
					complete(res){
						console.log('univerify complete')
					}
				})
			}
		  }
		});
		
	}
}

</script>

<style scoped>
	.pw-calendar-view {
		flex:1;
		background-color: #f1f1f1;
		display: flex;
		flex-direction: column;
	}
	.tl-header {
		box-shadow: none;
	}
	.close {
		position: absolute;
		left: 10px;
		top: 10px;
		/* #ifdef APP */
		top: 30px;
		/* #endif */
		z-index: 2;
	}
</style>
