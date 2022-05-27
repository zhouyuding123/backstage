<template>
  <div>
    <el-button type="success" @click="detailsCompany()">详情</el-button>
    <el-dialog title="提示" v-model="detailsShow" width="50%">
       <el-descriptions direction="vertical" :column="5" border>
           
       </el-descriptions>
      <span>
        <el-button @click="detailsShow = false">取 消</el-button>
        <el-button type="primary" @click="detailsShow = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { postD } from '@/api';
import {BrandShowApi}from "@/urls/brandUrl.js"
export default {
  data() {
    return {
      detailsShow: false,
      
    };
  },
  methods: {
    detailsCompany() {
      this.detailsShow = true;
      postD(BrandShowApi(),this.)
    },
  },
};
</script>

<style lang="less" scoped>
</style>