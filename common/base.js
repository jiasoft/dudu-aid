import { mapState, mapStores, mapActions } from 'pinia'
import { useAppStore } from '@/stores/app.js'
export default {
	name:'base',
	data(){
		return {
		}
	},
	computed: {
		...mapStores(useAppStore)
	},
	methods:{
		
	},
}