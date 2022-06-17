<template>
  <div>
    <el-button type="primary" @click="editShow">修改</el-button>
    <el-dialog title="修改" v-model="dialogVisible" width="70%">
      <el-form
        :model="editFrom"
        :rules="editFromRules"
        ref="editFromref"
        label-width="100px"
      >
        <el-form-item label="类别名称:" prop="title">
          <el-input v-model="editFrom.title"></el-input>
        </el-form-item>
        <el-form-item label="描述简介:" prop="description">
          <el-input v-model="editFrom.description"></el-input>
        </el-form-item>
        <el-form-item label="排序:" prop="sort">
          <el-input v-model="editFrom.sort"></el-input>
        </el-form-item>
      </el-form>
      <span>
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editCat">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { AdEditAdTypeApi } from "@/urls/categoryUrl.js";
import { postD } from "@/api";
export default {
  props: ["editFunction"],
  inject: ["categoryListValue"],
  data() {
    return {
      dialogVisible: false,
      editFrom: {
        id: "",
        title: "",
        description: "",
        sort: "",
      },
      editFromRules: {
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
    editShow() {
      this.dialogVisible = true;
      this.editFrom.id = this.editFunction.id;
      this.editFrom.title = this.editFunction.title;
      this.editFrom.description = this.editFunction.description;
      this.editFrom.sort = this.editFunction.sort;
    },
    editCat() {
      postD(AdEditAdTypeApi(), this.editFrom).then((res) => {
        if (res.code == "200") {
          this.$message.success("状态修改成功");
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
    },
  },
};
</script>