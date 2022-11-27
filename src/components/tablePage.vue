<template>
	<div>
		<div style="float: left;">
			<el-button type="button" @click="dialogFormVisible = true">新增</el-button>
		</div>
		<div style="clear: both;">
			<el-table :data="tableData" style="width: 100%" :stripe="true" size="medium">
			  <el-table-column fixed prop="uid" label="用户ID" width="150" align="center"></el-table-column>
			  <el-table-column prop="upname" label="登录名称" width="150" align="center"></el-table-column>
			  <el-table-column prop="urname" label="用户姓名" width="150" align="center"></el-table-column>
			  <el-table-column prop="uphone" label="联系电话" width="150" align="center"></el-table-column>
			  <el-table-column prop="uaddr" label="通信地址" width="150" align="center"></el-table-column>
				<el-table-column prop="uhobby" label="个人爱好" width="150" align="center"></el-table-column>
				<el-table-column prop="uemail" label="电子邮箱" width="150" align="center"></el-table-column>
			  <el-table-column label="操作" width="200" style="text-align: center;">
				<template slot-scope="scope">
				  <template>
					<el-popconfirm title="这是一段内容确定删除吗？" @confirm="handleClick(scope.row)" >
						<el-button slot="reference">删除</el-button>
					</el-popconfirm>
				  </template>
				 <el-button style="margin-left: 20px;" @click="upuser(scope.row)">修改</el-button>
				</template>
			  </el-table-column>
			</el-table>
			<!-- 新增用户-->
			<el-dialog title="用户信息新增" :visible.sync="dialogFormVisible" >
				<el-form ref="form" :model="form" label-width="100px">
				  <el-form-item label="用户登录名称">
				    <el-input v-model="form.upname"></el-input>
				  </el-form-item>
				  <el-form-item label="用户姓名">
				    <el-input v-model="form.urname"></el-input>
				  </el-form-item>
				  <el-form-item label="登录密码">
				    <el-input type="" v-model="form.upwd"></el-input>
				  </el-form-item>
				  <el-form-item label="确认密码">
				    <el-input v-model="form.upwd2"></el-input>
				  </el-form-item>
				  <el-form-item label="手机号">
				    <el-input v-model="form.uphone"></el-input>
				  </el-form-item>
				  <el-form-item label="地址">
				    <el-input v-model="form.uaddr"></el-input>
				  </el-form-item>
				  <el-form-item label="邮箱">
				    <el-input v-model="form.uemail"></el-input>
				  </el-form-item>
				  <el-form-item label="爱好">
				    <el-checkbox-group v-model="form.uhobby">
				      <el-checkbox label="food" name="uhobby" value="美食"></el-checkbox>
				      <el-checkbox label="party" name="uhobby" value="party"></el-checkbox>
				      <el-checkbox label="online Party" name="uhobby" value="网球"></el-checkbox>
				      <el-checkbox label="hot Gril" name="uhobby" value="辣妹"></el-checkbox>
				    </el-checkbox-group>
				  </el-form-item>
				</el-form>
			  <div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="onSubmit">确 定</el-button>
			  </div>
			</el-dialog>
			
			<!-- 修改用户-->
			<el-dialog title="用户信息修改" :visible.sync="updialogFormVisible" >
				<el-form ref="form" :model="form" label-width="100px">
					<el-input v-model="form.uid" style="display: none;"></el-input>
				  <el-form-item label="用户登录名称">
				    <el-input v-model="form.upname"></el-input>
				  </el-form-item>
				  <el-form-item label="用户姓名">
				    <el-input v-model="form.urname"></el-input>
				  </el-form-item>
				  <el-form-item label="登录密码">
				    <el-input type="" v-model="form.upwd"></el-input>
				  </el-form-item>
				  <el-form-item label="确认密码">
				    <el-input v-model="form.upwd2"></el-input>
				  </el-form-item>
				  <el-form-item label="手机号">
				    <el-input v-model="form.uphone"></el-input>
				  </el-form-item>
				  <el-form-item label="地址">
				    <el-input v-model="form.uaddr"></el-input>
				  </el-form-item>
				  <el-form-item label="邮箱">
				    <el-input v-model="form.uemail"></el-input>
				  </el-form-item>
				  <el-form-item label="爱好">
				    <el-checkbox-group v-model="form.uhobby">
				      <el-checkbox label="food" name="uhobby" value="美食"></el-checkbox>
				      <el-checkbox label="party" name="uhobby" value="party"></el-checkbox>
				      <el-checkbox label="online Party" name="uhobby" value="网球"></el-checkbox>
				      <el-checkbox label="hot Gril" name="uhobby" value="辣妹"></el-checkbox>
				    </el-checkbox-group>
				  </el-form-item>
				</el-form>
			  <div slot="footer" class="dialog-footer">
				<el-button @click="updialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="uponSubmit">确 定</el-button>
			  </div>
			</el-dialog>
		</div>
	</div>
</template>

<script>
  export default {
	name:'tablePage',
    methods: {
	  //删除方法 默认传入选中这一行的数据
      handleClick(row) {
		  const uid =row.uid;
		  console.log("row.uid : "+uid)
		  this.$http.get('/userDelController.do',{params:{
			  uid:uid
		  }}).then(
			response=>{
				console.log("success : "+response.data)
				if(response.data=="success"){
					this.loadList()
				}
			},
			error =>{
				alert(error.message)
			}
		  )
       },
	   //加载table列表
	  loadList(){
	  	this.$http.get('/userListController.do').then(
	  		response=>{
	  			this.tableData=response.data;
	  		},
	  		error =>{
	  			alert(error.message)
	  		}
	  	)
	  },
	  //新增的提交方法
	  onSubmit() {
		const uhobbys=this.form.uhobby;
		var hobby='';
		uhobbys.forEach(function(item){
			hobby+=item+',';
		})
		hobby=hobby.substring(0,hobby.length-1);
		console.log(hobby);
		this.$http.get('/userInsertController.do',{params:{
			upname:this.form.upname,
			urname:this.form.urname,
			upwd:this.form.upwd,
			uphone:this.form.uphone,
			uaddr:this.form.uaddr,
			uhobby:hobby,
			uemail:this.form.uemail
		}}).then(
			response=>{
				console.log("success : "+response.data)
				if(response.data=="success"){
					this.dialogFormVisible=false;
					this.loadList()
				}
			},
			error =>{
				alert(error.message)
			}
		)
	  },
	  //用户修改弹窗 回显用户信息
	  upuser(row){
		  this.updialogFormVisible = true
		  var arr=row.uhobby.split(',');
		  console.log(arr)
		  const userinfo={
			  uid:row.uid,
			  upname:row.upname,
			  urname:row.urname,
			  upwd:row.upwd,
			  upwd2:row.upwd,
			  uphone:row.uphone,
			  uaddr:row.uaddr,
			  uhobby:arr,
			  uemail:row.uemail
		  }
		  this.form=userinfo;
		  
	  },
	  //用户修改提交后台数据
	  uponSubmit(){
		  const uhobbys=this.form.uhobby;
		  var hobby='';
		  uhobbys.forEach(function(item){
		  	hobby+=item+',';
		  })
		  hobby=hobby.substring(0,hobby.length-1);
		  console.log(hobby);
		  this.$http.get('/userUpdateController.do',{params:{
			uid:this.form.uid,
		  	upname:this.form.upname,
		  	urname:this.form.urname,
		  	upwd:this.form.upwd,
		  	uphone:this.form.uphone,
		  	uaddr:this.form.uaddr,
		  	uhobby:hobby,
		  	uemail:this.form.uemail
		  }}).then(
		  	response=>{
		  		console.log("success : "+response.data)
		  		if(response.data=="success"){
		  			this.updialogFormVisible=false;
		  			this.loadList()
		  		}
		  	},
		  	error =>{
		  		alert(error.message)
		  	}
		  )
	  }
    },
	//定义页面渲染数据
    data() {
      return {
		//渲染table的数据
        tableData: [],
		dialogTableVisible: false,//新增dailog弹框是否打开
		dialogFormVisible: false,//新增dailog弹框是否打开
		updialogFormVisible:false,//修改dailog弹框是否打开
		form: {//渲染form的数据
			upname:'',
			urname:'',
			name:'',
			upwd:'',
			uphone:'',
			uaddr:'',
			uhobby:[]
		},
		formLabelWidth: '120px'
      }
    },
	mounted(){
		this.loadList()//在加载时调用渲染table的方法
	},
	components:{
		// confirm
	}
  }
</script>
