<template>
	<view class="img-loading-view flex-view">
		<view class="img-loading-center">
			<image  class="img-loading" src="/static/icon/loading.svg"  ></image>
		</view>
	</view>
</template>

<script>
	export default {
		name:"tl-loading-data",
		data() {
			return {
				
			};
		}
	}
</script>

<style scoped>
	
.img-loading-view .img-loading {
	width: 100%;
	height: 100%;
	transform: rotate(0deg);
	animation: rotateAnimation 8s linear infinite;
}
.img-loading-view .img-loading-center {
	width: 100%;
	height: 100%;
}
.img-loading-view.hide {
	opacity: 0;
	transition: opacity 1s;
}
.img-loading-view {
	width: 100%;
	height: 100%;
	position: absolute;
	top:0;
	left: 0;
	z-index: 1;
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