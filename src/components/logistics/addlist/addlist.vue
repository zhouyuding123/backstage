<template>
  <div>
    <el-button type="success" @click="addShow">添加物流</el-button>
    <div>
      <el-dialog
        title="添加类别"
        v-model="dialogVisible"
        width="50%"
        append-to-body
      >
        <el-form
          :model="addForm"
          :rules="addFormRules"
          ref="addFormRef"
          label-width="120px"
        >
          <el-form-item label="快递公司名称:" prop="title">
            <el-input v-model="addForm.title"></el-input>
          </el-form-item>
          <el-form-item label="编码:" prop="no">
            <el-input v-model="addForm.no"></el-input>
          </el-form-item>
          <el-form-item label="排序:" prop="sort">
            <el-input v-model="addForm.sort"></el-input>
          </el-form-item>
        </el-form>
        <div style="padding-top: 15px; text-align: center">
          <span>
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="addCategory">确 定</el-button>
          </span>
        </div>
      </el-dialog>
    </div>
  </div>
</template>


<script>
import { LogisticsAddApi } from "@/urls/logistics.js";
import { postD } from "@/api";
export default {
  inject: ["logslist"],
  data() {
    return {
      addForm: {
        title: "",
        no: "",
        sort: "",
      },
      addFormRules: {
        title: [
          {
            required: true,
            message: "请输入快递公司名称",
            tirgger: "blur",
          },
        ],
        sort: [
          {
            required: true,
            message: "请输入排序",
            tirgger: "blur",
          },
        ],
        no: [
          {
            required: true,
            message: "请输入编号",
            tirgger: "blur",
          },
        ],
      },
      dialogVisible: false,
    };
  },
  methods: {
    addShow() {
      this.dialogVisible = true;
    },
    addCategory() {
      postD(LogisticsAddApi(), this.addForm).then((res) => {
        if (res.code == "200") {
          this.dialogVisible = false;
          this.$message.success("添加成功");
          this.logslist();
        } else {
          this.$message.error(res.msg);
        }
      });
    },
  },
};
</script>