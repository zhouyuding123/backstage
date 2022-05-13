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
              v-model="search.keyword"
              placeholder="关键词搜索"
            ></el-input></div
        ></el-col>
        <el-col :span="1"
          ><div>
            <div class="divText">审核状态:</div>
          </div></el-col
        >
        <el-col :span="3"
          ><div>
            <el-select v-model="search.status" placeholder="请选择">
              <el-option
                v-for="item in statusOtions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select></div
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
import { postD } from "../../../api/index.js";
import { CircleGetListApi } from "@/urls/circleUrl.js";
export default {
  inject: ["circleValue"],
  data() {
    return {
      tableDatas: [],
      search: {
        keyword: null,
        status: null,
      },
      statusOtions: [
        {
          value: "0",
          label: "审核中",
        },
        {
          value: "1",
          label: "开启",
        },
        {
          value: "2",
          label: "关闭",
        },
      ],
    };
  },
  methods: {
    submitReset() {
      this.search.keyword = null;
      this.search.status = null;
    },
    Refresh() {
      this.circleValue();
    },
    submitSearch() {
      postD(CircleGetListApi(), this.search).then((res) => {
        this.tableDatas = res.list;
        this.$emit("circleSeatch", this.tableDatas);
      });
    },
  },
};
</script>

<style lang="less" scoped>
.contentLift {
  text-align: left;
  padding: 20px;
  .divText {
    width: 65px;
    display: inline-block;
    font-size: 9px;
    line-height: 36px;
  }
}
</style>