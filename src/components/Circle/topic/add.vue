<template>
  <div>
    <el-button type="success" @click="addShow">添加话题</el-button>
    <el-dialog title="添加" v-model="dialogVisible" width="50%">
      <el-form
        :model="addForm"
        :rules="addFormRules"
        ref="addFormRef"
        label-width="120px"
      >
        <el-form-item label="类别名称:" prop="title">
          <el-input v-model="addForm.title"></el-input>
        </el-form-item>
        <el-form-item label="热门选择:" prop="is_hot">
          <el-radio v-model="addForm.is_hot" label="0">非热门</el-radio>
          <el-radio v-model="addForm.is_hot" label="1">热门</el-radio>
        </el-form-item>
      </el-form>
      <span>
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addtopic()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { postD } from "@/api";
import { circleAddThemeApi } from "@/urls/circleUrl.js";
export default {
  inject: ["topicList"],
  data() {
    return {
      addForm: {
        title: "",
        is_hot: "",
      },
      addFormRules: {
        title: [
          {
            required: true,
            message: "请输入标题",
            tirgger: "blur",
          },
        ],
        is_hot: [
          {
            required: true,
            message: "请选择",
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
    addtopic() {
      this.$refs.addFormRef.validate((valid) => {
        if (!valid) return;
        postD(circleAddThemeApi(), this.addForm).then((res) => {
          if (res.code == "200") {
            this.$message.success("添加成功");
            this.topicList();
            this.dialogVisible = false;
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