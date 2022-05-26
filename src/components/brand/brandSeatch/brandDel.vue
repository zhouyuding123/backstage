<template>
  <div>
    <el-button type="danger" @click="oneCompany()">删除</el-button>
  </div>
</template>

<script>
import { postD } from "@/api";
import { brandDelApi } from "@/urls/brandUrl.js";
export default {
  props: ["delBrand"],
  inject: ["BrandListValue"],
  data() {
    return {
      activityDelId: {
        id: "",
      },
    };
  },
  methods: {
    async oneCompany() {
      this.activityDelId.id = this.delBrand.id;
      const oneCompanyList = await this.$confirm(
        "此操作将永久删除, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);
      if (oneCompanyList !== "confirm") {
        return this.$message.info("取消删除");
      }
      if (oneCompanyList === "confirm") {
        postD(brandDelApi(), this.activityDelId).then((res) => {
          if (res.code == "200") {
            this.$message.success("状态修改成功");
            this.BrandListValue();
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