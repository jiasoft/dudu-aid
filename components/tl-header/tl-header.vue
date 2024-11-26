<template>
	<view class="tl-header flex-row flex-center">
		<view v-if="custom" class="tl-title">
			<slot></slot>
		</view>
		<view v-else class="tl-title">嘟嘟学习助手</view>
	</view>
</template>

<script>
	export default {
		name:"tl-header",
		props:['custom'],
		data() {
			return {
				
			};
		}
	}
</script>

<style >
.tl-header .title {
	text-align: center;
}
.tl-header {
	background-color: #fff;
	/* #ifdef APP */
	padding-top: 35px;
	/* #endif */
	height: 45px;
	box-shadow: 0px 10px 10px -10px rgba(0,0,0,0.05);
	position: relative;
	z-index: 1;
}
.tl-title {
	font-weight: bold;
	width: 100%;
}
/* #ifdef H5 */
.tl-header {
	margin-top: 0px;
}
/* #endif */
</style>