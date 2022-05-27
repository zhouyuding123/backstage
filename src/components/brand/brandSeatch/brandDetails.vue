<template>
  <div>
    <el-button type="success" @click="detailsCompany()">详情</el-button>
    <el-dialog title="详情" v-model="detailsShow" width="50%">
      <el-descriptions direction="vertical" :column="5" border>
        <el-descriptions-item label="品牌名称" align="center">{{
          brandDetailValue.title
        }}</el-descriptions-item>
        <el-descriptions-item label="描述" align="center">{{
          brandDetailValue.description
        }}</el-descriptions-item>
        <el-descriptions-item label="LOGO" align="center">
          <el-image
            :src="imagesValue + brandDetailValue.thumb"
            :preview-src-list="[imagesValue + brandDetailValue.thumb]"
            style="width: 40px; height: 40px"
            class="stylecss"
          />
        </el-descriptions-item>
        <el-descriptions-item label="品牌介绍" align="center">{{
          brandDetailValue.content
        }}</el-descriptions-item>
        <el-descriptions-item label="qualification" align="center">
          <el-image
            :src="imagesValue + brandDetailValue.qualification"
            :preview-src-list="[imagesValue + brandDetailValue.qualification]"
            style="width: 40px; height: 40px"
            class="stylecss"
          />
        </el-descriptions-item>
        <el-descriptions-item label="创建时间" align="center">{{
          timestampToTime(brandDetailValue.create_time)
        }}</el-descriptions-item>
        <el-descriptions-item label="更新时间" align="center">{{
          timestampToTime(brandDetailValue.update_time)
        }}</el-descriptions-item>
      </el-descriptions>
      <span>
        <el-button @click="detailsShow = false">返 回</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { postD } from "@/api";
import { imgUrl } from "@/assets/js/modifyStyle";
import { BrandShowApi } from "@/urls/brandUrl.js";
export default {
  props: ["detailsBrand"],
  data() {
    return {
      imagesValue: "",
      detailsShow: false,
      brandDetailValue: [],
      brandId: {
        id: "",
      },
    };
  },
  methods: {
    detailsCompany() {
      this.brandId.id = this.detailsBrand.id;
      this.detailsShow = true;
      postD(BrandShowApi(), this.brandId).then((res) => {
        this.brandDetailValue = res.data;
        this.imagesValue = imgUrl();
      });
    },
    timestampToTime(timestamp) {
      var date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear() + "-";
      var M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      var D = date.getDate() + " ";
      var h = date.getHours() + ":";
      var m = date.getMinutes() + ":";
      var s = date.getSeconds();
      return Y + M + D + h + m + s;
    },
  },
};
</script>

<style lang="less" scoped>
</style>