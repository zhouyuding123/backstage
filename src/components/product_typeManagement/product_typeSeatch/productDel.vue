<template>
  <div>
    <el-button type="danger" @click="productTypeDel">删除</el-button>
  </div>
</template>

<script>
import { postD } from "@/api/index.js";
import { product_typeDelApi } from "@/urls/product_typeUrl.js";
export default {
  inject: ["productValue"],
  props: ["delFunction"],
  data() {
    return {
      DelId: {
        id: "",
      },
    };
  },
  methods: {
    async productTypeDel() {
      this.DelId.id = this.delFunction.id;
      const productTypeDelList = await this.$confirm(
        "此操作将永久删除, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);
      if (productTypeDelList !== "confirm") {
        return this.$message.info("取消删除");
      }
      if (productTypeDelList === "confirm") {
        postD(product_typeDelApi(), this.DelId).then((res) => {
          if (res.code == "200") {
            this.$message.success("状态修改成功");
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
      }
    },
  },
};
</script>