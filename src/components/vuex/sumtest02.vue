<template>
	<div>
		<h1>原来的值2：{{sum}}</h1>
		<h1>扩大十倍的值：{{bigsum}}</h1>
		<h1>学校：{{school}}</h1>
		<h1>姓名：{{uname}}</h1>
		<input type="button" value="点我++" @click="add"/><br />
		<input type="button" value="点我--" @click="min"/>
	</div>
</template>

<script>
import {mapState,mapGetters,mapMutations} from 'vuex'
export default{
	name:'sumtest02',
	data(){
		return {
			n:1
		}
	},
	methods:{
		// add(){
		// 	this.$store.dispatch('add',this.n);
		// },
		// min(){
		// 	this.$store.dispatch('min',this.n);
		// }
		//调用mapMutations，传入当前页面的n，利用mapMutations生成方法
		...mapMutations('sumoptions',{add:'ADD',min:'MIN'})
	},
	computed:{
		//调用mapState取state中的值
		...mapState('sumoptions',['sum','school','uname']),
		//调用mapGetters取getters方法中的值
		...mapGetters('sumoptions',['bigsum'])
	}
}
</script>

<style>
</style>
