<template>
  <div>
    <el-button type="success" @click="addProduct">添加名次</el-button>
    <el-dialog title="提示" v-model="addProductShow" width="70%">
      <el-form
        :model="addForm"
        :rules="addFormRules"
        ref="addFormRef"
        label-width="120px"
      >
        <el-form-item label="名次:" prop="title">
          <el-input v-model="addForm.title"></el-input>
        </el-form-item>
        <el-form-item label="描述:" prop="title">
          <el-input v-model="addForm.description"></el-input>
        </el-form-item>
        <el-form-item label="排序:" prop="sort">
          <el-input v-model="addForm.sort"></el-input>
        </el-form-item>
      </el-form>
      <span>
        <el-button @click="addProductShow = false">取 消</el-button>
        <el-button type="primary" @click="addProductValue">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { postD } from "@/api/index.js";
import { prizeReleaseApi } from "@/urls/product_typeUrl.js";
export default {
  inject: ["productValue"],
  data() {
    var checkSort = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("排序不能为空"));
      }
      setTimeout(() => {
        if (!Number(value)) {
          callback(new Error("请输入数字"));
        } else {
          callback();
        }
      }, 1000);
    };
    return {
      addProductShow: false,
      addForm: {
        title: "",
        description: "",
        sort: "",
      },
      addFormRules: {
        title: [
          {
            required: true,
            message: "请输入商品标题",
            tirgger: "blur",
          },
        ],
        description: [
          {
            required: true,
            message: "请输入商品标题",
            tirgger: "blur",
          },
        ],
        sort: [
          {
            validator: checkSort,
            tirgger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    addProduct() {
      this.addProductShow = true;
    },
    addProductValue() {
      this.$refs.addFormRef.validate((valid) => {
        if (!valid) return;
        this.sort = postD(prizeReleaseApi(), this.addForm).then(
          (res) => {
            if (res.code == "200") {
              this.$message.success("状态修改成功");
              this.addProductShow = false;
              this.productValue();
            } else if (res.code == "-200") {
              this.$message.error("参数错误，或暂无数据");
            } else if (res.code == "-201") {
              this.$message.error("未登陆");
            } else if (res.code == "-203") {
              this.$message.error("对不起，你没有此操作权限");
            } else {
              this.$message.error("注册失败，账号已存在");
            }
          }
        );
      });
    },
  },
};
</script>
