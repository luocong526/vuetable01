<template>
	<div>
		<h1>列表中第一个人的名字是：{{firstName}}</h1>
		<h1>网络签名：{{firstName}}</h1>
		<input type="text" v-model="uname" />
		<input type="button" value="添加" @click="adduser"/>
		<input type="button" value="添加王姓" @click="adduserw"/>
		<input type="button" value="添加网络签名" @click="adduserserver"/>
		<ul v-for="item in personList" :key="item.id">
			<li>{{item.uname}}</li>
		</ul>
	</div>
</template>

<script>
import {mapState,mapGetters} from 'vuex'
import {nanoid} from 'nanoid'
export default{
	name:'personlist',
	computed:{
		...mapState('personoptions',['personList']),
		...mapGetters('personoptions',['firstName'])
	},
	data(){
		return{
			uname:'',
			qm:''
		}
	},
	methods:{
		adduser(){
			const person ={id:nanoid(),uname:this.uname}
			//指定模块名称进行调用
			this.$store.commit('personoptions/ADDUSER',person)
			this.uname=''
		},
		adduserw(){
			const person ={id:nanoid(),uname:this.uname}
			//指定模块名称进行调用
			this.$store.dispatch('personoptions/adduserw',person)
			this.uname=''
		},
		adduserserver(){
			console.log(this.$store.dispatch('personoptions/adduserserver'))
			this.qm=this.$store.dispatch('personoptions/adduserserver')
		}
	}
}
</script>
<style>
</style>
