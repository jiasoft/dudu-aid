<template>
	<view class="img-loading-view flex-view" >
		<view class="img-loading-center" :style="style">
			<image  class="img-loading" src="/static/icon/loading.svg" mode="aspectFit"  ></image>
		</view>
	</view>
</template>

<script>
	export default {
		name:"uni-ly-loading-data",
		props:['width','height'],
		data() {
			return {
				
			};
		},
		computed:{
			style() {
				let syle = []
				if(this.width) syle.push('width:'+ this.width)
				if(this.height) syle.push('height:'+ this.height)
				return syle.join(';')
			}
		}
	}
</script>

<style scoped>
.img-loading-view {
	width: 100%;
	height: 100%;
	position: absolute;
	top:0;
	left: 0;
	z-index: 1;
}
.img-loading-view.hide {
	opacity: 0;
	transition: opacity 1s;
}
.img-loading-view .img-loading-center {
	width: 36px;
	height: 36px;
	border-radius: 50%;
}
.img-loading-view .img-loading-center .img-loading {
	width: 100%;
	height: 100%;
	transform: rotate(0deg);
	animation: rotateAnimation 1s linear infinite;
}


@keyframes rotateAnimation {
	form {
		transform: rotate(0deg);
	}
	
	to {
		transform: rotate(360deg);
	}
}
</style>