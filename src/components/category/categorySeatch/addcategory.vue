<template>
  <div>
    <el-button type="success" @click="addShow">添加类别</el-button>
    <el-dialog title="添加类别" v-model="dialogVisible" width="50%">
      <el-form
        :model="addForm"
        :rules="addFormRules"
        ref="addFormRef"
        label-width="120px"
      >
        <el-form-item label="类别名称:" prop="title">
          <el-input v-model="addForm.title"></el-input>
        </el-form-item>
        <el-form-item label="描述简介:" prop="description">
          <el-input v-model="addForm.description"></el-input>
        </el-form-item>
        <el-form-item label="排序:" prop="sort">
          <el-input v-model="addForm.sort"></el-input>
        </el-form-item>
      </el-form>
      <div style="padding-top: 15px">
        <span>
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addCategory">确 定</el-button>
        </span>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { AdAddAdApi } from "@/urls/categoryUrl.js";
import { postD } from "@/api";
export default {
  inject: ["categoryListValue"],
  data() {
    return {
      dialogVisible: false,
      addForm: {
        title: "",
        description: "",
        sort: "",
      },
      addFormRules: {
        title: [
          {
            required: true,
            message: "请输入类别名称",
            tirgger: "blur",
          },
        ],
        description: [
          {
            required: true,
            message: "请输入类别描述简介",
            tirgger: "blur",
          },
        ],
        sort: [
          {
            required: true,
            message: "请输入类别排序",
            tirgger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    addShow() {
      this.dialogVisible = true;
    },
    addCategory() {
      this.$refs.addFormRef.validate((valid) => {
        if (!valid) return;
        postD(AdAddAdApi(), this.addForm).then((res) => {
          if (res.code == "200") {
            this.$message.success("添加成功");
            this.dialogVisible = false;
            this.categoryListValue();
          } else if (res.code == "-200") {
            this.$message.error("参数错误，或暂无数据");
          } else if (res.code == "-201") {
            this.$message.error("未登陆");
          } else if (res.code == "-203") {
            this.$message.error("对不起，你没有此操作权限");
          } else {
            this.$message.error("注册失败，账号已存在");
          }
        });
      });
    },
  },
};
</script>