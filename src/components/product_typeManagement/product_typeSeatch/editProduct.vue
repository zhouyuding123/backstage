<template>
  <div>
    <el-button type="primary" @click="editValue()">修改</el-button>
    <el-dialog title="提示" v-model="dialogVisible" width="70%">
      <el-form
        :model="editFrom"
        :rules="editFromRules"
        ref="editFromref"
        label-width="100px"
      >
        <el-form-item label="商品标题:" prop="title">
          <el-input v-model="editFrom.title"></el-input>
        </el-form-item>
        <el-form-item label="商品描述:" prop="title">
          <el-input v-model="editFrom.description"></el-input>
        </el-form-item>
        <el-form-item label="排序:" prop="sort">
          <el-input v-model="editFrom.sort"></el-input>
        </el-form-item>
      </el-form>
      <span>
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addEditValue">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { postD } from "@/api/index.js";
import { product_typeEditApi, product_typeShowApi } from "@/urls/product_typeUrl.js";
export default {
  inject: ["productValue"],
  props: ["editFunction"],
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
      editId: {
        id: "",
      },
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
    editValue() {
      this.dialogVisible = true;
      this.editId.id = this.editFunction.id;
      postD(product_typeShowApi(), this.editId).then((res) => {
        this.editFrom.id = res.data.id;
        this.editFrom.title = res.data.title;
        this.editFrom.description = res.data.description;
        this.editFrom.sort = res.data.sort;
      });
    },
    addEditValue() {
      this.$refs.editFromref.validate((valid) => {
        if (!valid) return;
        postD(product_typeEditApi(), this.editFrom).then((res) => {
          if (res.code == "200") {
            this.$message.success("状态修改成功");
            this.dialogVisible = false;
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
        });
      });
    },
  },
};
</script>
