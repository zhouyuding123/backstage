<template>
  <div>
    <el-button @click="detilShow" type="success">详情</el-button>
    <el-dialog title="详情" v-model="dialogVisible" width="30%">
      <el-descriptions direction="vertical" :column="5" border>
        <el-descriptions-item label="id" align="center">{{
          productDetilValue.id
        }}</el-descriptions-item>
        <el-descriptions-item label="类别标题" align="center">{{
          productDetilValue.title
        }}</el-descriptions-item>
        <el-descriptions-item label="类别描述" align="center">{{
          productDetilValue.description
        }}</el-descriptions-item>
        <el-descriptions-item label="排序" align="center">{{
          productDetilValue.sort
        }}</el-descriptions-item>
        <el-descriptions-item label="展示" align="center">
          <div
            :class="{
              green: productDetilValue.status === 1,
              red: productDetilValue.status == 2,
            }"
          >
            {{ filterStatus(productDetilValue.status) }}
          </div>
        </el-descriptions-item>
        <el-descriptions-item label="创建时间" align="center">{{
          productDetilValue.create_time
        }}</el-descriptions-item>
        <el-descriptions-item label="更新时间" align="center">{{
          productDetilValue.update_time
        }}</el-descriptions-item>
      </el-descriptions>
      <span>
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { product_typeShowApi } from "@/urls/product_typeUrl.js";
import { postD } from "@/api";
export default {
  props: ["detilFunction"],
  data() {
    return {
      productTypeDetailsId: {
        id: "",
      },
      dialogVisible: false,
      productDetilValue: [],
    };
  },
  methods: {
    detilShow() {
      this.dialogVisible = true;
      this.productTypeDetailsId.id = this.detilFunction.id;
      postD(product_typeShowApi(), this.productTypeDetailsId).then((res) => {
        this.productDetilValue = res.data;
      });
    },
    filterStatus(val) {
      if (val == 0) {
        return "关闭";
      } else if (val == 1) {
        return "展示";
      }
    },
  },
};
</script>