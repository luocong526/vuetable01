<template>
	<div>
		<h1>{{msg}}</h1>
	</div>
</template>

<script>
	export default{
		name:'axiosVue',
		data(){
			return{
				msg:''
			}
		},
		created(){
			this.loadMsgs()
		},
		methods:{
			loadMsgs(){
			this.$http.get('/userListController.do').then(
					response=>{
						console.log("success.........")
						this.msg=response.data;
					},
					error =>{
						console.log("error........."+error)
						alert(error.message)
					}
				)
			}
		}
	}
</script>

<style>
</style>
