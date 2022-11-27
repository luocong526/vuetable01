<template>
  <div>
    <el-row>
      <el-button type="primary" @click="(saveView = true), reset()"
        >新增检测方向</el-button
      >
    </el-row>
    <!-- 数据表单 -->
    <el-table
      :data="tableData"
      stripe="true"
      style="width: 100%"
      max-height="100%"
    >
      <el-table-column align="center" type="index" width="45" label="序号">
        <template slot-scope="scope">
          {{ (page.pageNum - 1) * page.pageSize + scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column prop="type" align="center" label="类型">
      </el-table-column>
      <el-table-column prop="description" align="center" label="描述">
      </el-table-column>
      <el-table-column prop="remarks" align="center" label="备注">
      </el-table-column>
      <el-table-column prop="createTime" align="center" label="日期">
      </el-table-column>
      <el-table-column align="center" label="操作" width="200px">
        <template slot-scope="scope">
          <el-button
            type="text"
            @click="(dialogVisible = true), handleClick(scope.row)"
            >编辑</el-button
          >
          <el-button type="text">关键字</el-button>
          <el-button type="text" @click="deleteDict(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="page.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="page.total"
      >
      </el-pagination>
    </div>
    <!-- 新增 -->
    <el-dialog title="新增" :visible.sync="saveView" width="30%">
      <el-form :model="form" :rules="rules">
        <el-form-item label="类型" :label-width="formLabelWidth">
          <el-input v-model="form.type" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="描述" :label-width="formLabelWidth">
          <el-input v-model="form.description" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input v-model="form.remarks" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="saveView = false">取 消</el-button>
        <el-button type="primary" @click="(saveView = false), saveForm(form)"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <!-- 编辑 -->
    <el-dialog title="编辑" :visible.sync="dialogVisible" width="30%">
      <el-form :model="form">
        <el-form-item label="类型" :label-width="formLabelWidth">
          <el-input v-model="form.type" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="描述" :label-width="formLabelWidth">
          <el-input v-model="form.description" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input v-model="form.remarks" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="(dialogVisible = false), updateForm(form)"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  queryWordDictList,
  updateWordDict,
  saveWordDict,
  deleteWordDict,
} from "@/api/assistance/keywords.js";
export default {
  methods: {
    deleteRow(index, rows) {
      rows.splice(index, 1);
    },
  },
  data() {
    return {
	  formLabelWidth:'',
      dialogVisible: false,
      saveView: false,
      tableData: [],
      page: {
        total: 0, // 总条数
        pageNum: 1,
        pageSize: 10, // 每页显示多少条
        type: undefined,
        description: undefined,
      },
      form: {
        id: null,
        type: "",
        description: "",
        remarks: "",
        createTime: "",
      },
      rules: {
        type: [{ required: true, message: "请输入类型", trigger: "blur" }],
      },
    };
  },
  created() {
    this.getList();
  },

  methods: {
    getList() {
      queryWordDictList(this.page).then((res) => {
        this.tableData = res.data.data.records;
        this.page.total = res.data.data.total;
      });
    },
    reset() {
      this.form = {};
    },
    updateForm() {
      updateWordDict(this.form).then((res) => {
        this.$message({
          message: res.data.data,
          type: "success",
        });
        this.form = {};
      });
    },
    saveForm() {
      saveWordDict(this.form).then((res) => {
        this.$message({
          message: res.data.data,
          type: "success",
        });
        this.form = {};
        this.getList();
      });
    },
    //每页条数改变时触发 选择一页显示多少行
    handleSizeChange(val) {
      this.page.pageSize = val;
      this.getList();
    },
    //当前页改变时触发 跳转其他页
    handleCurrentChange(val) {
      this.page.pageNum = val;
      this.getList();
    },
    handleClick(row) {
      this.form = row;
    },
    deleteDict(row) {
      this.$confirm("是否删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteWordDict(row).then((res) => {
            this.$message({
              message: res.data.data,
              type: "success",
            });
            this.getList();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>

