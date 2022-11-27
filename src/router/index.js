//1. 该文件用于创建整个应用的路由器
import VueRouter from "vue-router";

//2. 导入组件
import adduser from '../components/adduser.vue'
// import HelloWorld from '../components/HelloWorld.vue'
import updateuser from '../components/updateuser.vue'

//3. 创建并暴露一个路由器
export default new VueRouter({
	//4.定义多个路由规则
    routes:[
        {
			name:'adduser',
            path:'adduser',
            component:adduser
        },
		{
			name:'updateuser',
		    path:'updateuser',
		    component:updateuser
		}
    ]
});
