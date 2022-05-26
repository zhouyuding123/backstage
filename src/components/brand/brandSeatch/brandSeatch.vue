<template>
  <div>
    <div class="contentLift">
      <el-row :gutter="20">
        <el-col :span="1"
          ><div>
            <div class="divText">关键词搜索:</div>
          </div></el-col
        >
        <el-col :span="2"
          ><div style="text-align: left">
            <el-input
              placeholder="关键词搜索"
              v-model="search.keyword"
            ></el-input></div
        ></el-col>
        <el-col :span="3"
          ><div>
            <el-button type="success" @click="submitSearch">搜索</el-button>
            <el-button type="info" @click="submitReset">重置</el-button>
          </div></el-col
        >
        <el-col :span="1"
          ><div>
            <el-button @click="Refresh">刷新</el-button>
          </div></el-col
        >
      </el-row>
    </div>
  </div>
</template>

<script>
import { BrandGetListApi } from "@/urls/brandUrl.js";
import { postD } from "@/api";
export default {
  inject: ["BrandListValue"],
  data() {
    return {
      search: {
        keyword: null,
      },
      tableDatas: [],
    };
  },
  methods: {
    Refresh() {
        this.BrandListValue();
    },
    submitReset() {
      this.search.keyword = null;
    },
    submitSearch() {
      postD(BrandGetListApi(), this.search).then((res) => {
        this.tableDatas = res.list;
        this.$emit("brandsSeatch", this.tableDatas);
      });
    },
  },
};
</script>