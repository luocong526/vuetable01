//引入vue
import Vue from 'vue'

//引入Vuex
import Vuex from 'vuex'

//引入axios
import axios from 'axios'

//应用vuex插件
Vue.use(Vuex)

//引入nanoid
import {nanoid} from 'nanoid'

//每个options都包含 mutations\state\getters
const sumoptions={
	//此项必填
	namespaced:true,
	mutations:{//准备mutations-用于操作数据state,state的改变或赋值只能在这里
		ADD(state,value){//state 是state中的值，value是页面的值
			state.sum+=value;
		},
		MIN(state,value){
			state.sum-=value;
		}
	},
	state:{//准备state-用于存储数据
		sum:99,
		school:'河南省许昌市',
		uname:'张三'
	},
	getters: {//获取数据加工并渲染
	    bigsum(state){
			return state.sum*10;
		}
	}
}

const personoptions={
	namespaced:true,
	mutations:{//准备mutations-用于操作数据state,state的改变或赋值只能在这里
		ADDUSER(state,personObj){
			state.personList.unshift(personObj)
		}
	},
	state:{//准备state-用于存储数据
		personList:[{
			id:"001",
			uname:'张三'
		},{
			id:"002",
			uname:'李四'
		}]
	},
	actions:{//添加业务逻辑
		adduserw(context,value){
			if(value.uname.indexOf('王')==0){
				context.commit('ADDUSER',value);
			}else{
				alert("不能添加不是姓王的人!")
			}
		},
		adduserserver(context){
			axios.get('https://api.uixsj.cn/hitokoto/get?type=social').then(
				response=>{
					context.commit('ADDUSER',{id:nanoid(),uname:response.data})
				},
				error =>{
					console.log("error.........")
					alert(error.message)
				}
			)
		}
	},
	getters: {//获取数据加工并渲染
	    firstName(state){
			return state.personList[0].uname;
		}
	}
}

export default new Vuex.Store({
	//引入模块
	modules:{
		sumoptions:sumoptions,
		personoptions:personoptions
	}
})

// //创建store 暴露store
// export default new Vuex.Store({
// 	actions:{//准备actions-响应事件中的动作
// 		// add(context,value){
// 		// 	context.commit('ADD',value);
// 		// },
// 		// min(context,value){
// 		// 	context.commit('MIN',value);
// 		// }
// 	},
// 	mutations:{//准备mutations-用于操作数据state,state的改变或赋值只能在这里
// 		ADD(state,value){//state 是state中的值，value是页面的值
// 			state.sum+=value;
// 		},
// 		MIN(state,value){
// 			state.sum-=value;
// 		},
// 		ADDUSER(state,personObj){
// 			state.personList.unshift(personObj)
// 		}
// 	},
// 	state:{//准备state-用于存储数据
// 		sum:99,
// 		school:'河南省许昌市',
// 		uname:'张三',
// 		personList:[{
// 			id:"001",
// 			uname:'张三'
// 		},{
// 			id:"002",
// 			uname:'李四'
// 		}]
// 	},
// 	getters: {//获取数据加工并渲染
// 	    bigsum(state){
// 			return state.sum*10;
// 		}
// 	},
// 	modules: {
	    
// 	}
// })
