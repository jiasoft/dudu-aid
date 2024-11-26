<template>
	<view class="move-top" :class="active?'active':''"
		@touchstart="touchstart"
		@touchend="touchend"
		@touchmove.prevent="touchmove">
		<view class="move-top-bg" @click="onclose"></view>
		<view class="move-top-content" :style="style">
			<slot></slot>
			<view class="close">
				<uni-icons type="closeempty" size="22" v-if="!disableClose" @click="onclose"></uni-icons>
			</view>
		</view>
	</view>
</template>

<script>
	import { getCurrentInstance, ref  } from 'vue'
	
	export default {
		name:"tl-move-top",
		props:{
			disableClose: false,
			top:{
				type: String,
				default: '20%'
			}
		},
		data() {
			return {
				active: false,
				style: {},
				startPosY: 0,
				moveYDistance: 0
			};
		},
		mounted() {
			
			setTimeout(() => {
				this.style.top = `${this.top}`
				this.active = true
			}, 0)
			
		},
		methods:{
			onclose() {
				this.active = false
				this.style.top = `100%`
				setTimeout(() =>{
					this.$emit('close')
				}, 300)
				
			},
			touchstart(e) {
	
				e.stopPropagation();
				if (!e.touches.length) return;
				this.startPosY = e.touches[0].clientY;
			},
			touchmove(e) {
		
				e.stopPropagation();
				if (!e.touches.length) return;
				this.moveYDistance = e.touches[0].clientY - this.startPosY;
				this.style.transition = 'none'
				this.style.top = `calc(${this.top} + ${this.moveYDistance}px)`
			},
			touchend(e) {
				e.stopPropagation();
				if (this.moveYDistance >= 30) {
					this.style.transition = ''
					this.onclose()
				}
			}
		}
	}
</script>

<style scoped>
.move-top {
	position: fixed;
	top:0;
	right: 0;
	bottom: 0;
	left: 0;
	z-index: 10;
}
.move-top-bg {
	position: absolute;
	top:0;
	right: 0;
	bottom: 0;
	left: 0;
	background-color: #000;
	opacity: 0;
	transition: all 0.3s;
}
.move-top-content {
	position: absolute;
	top:100%;
	right: 0;
	bottom: 0;
	left: 0;
	background-color: #fff;
	transition: all 0.3s;
}
.move-top.active > .move-top-bg {
	opacity: 0.6;
	transition: all 0.3s;
}
.move-top.active > .move-top-content {
	top: 30%;
	transition: all 0.3s;
	border-top-right-radius: 15px;
	border-top-left-radius: 15px;
	overflow: hidden;
}
.move-top.active > .move-top-content .close {
	position: absolute;
	right: 10px;
	top: 10px;
	z-index: 0;
}
</style>