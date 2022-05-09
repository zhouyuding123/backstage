<template>
  <div>
    <div class="contentLift" v-show="seatchShow">
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
    <div class="contentRight">
      <el-button type="info" plain @click="showCont($event)" ref="btn1"
        >查询</el-button
      >
    </div>
  </div>
</template>

<script>
import {postD} from "../../../api/index.js"
export default {
    inject:['groupVaule'],
  data() {
    return {
      seatchShow: false,
      search: {
        keyword: null,
      },
      url: {
        adminGroupInterface: "Auth/adminGroup",
      },
      tableDatas:[]
    };
  },
  methods: {
    Refresh() {
      this.groupVaule();
    },
    showCont() {
      this.seatchShow = !this.seatchShow;
      this.$refs.btn1.$el.innerText;
    },
    submitReset() {
      this.search.keyword = "";
    },
    submitSearch() {
      postD(this.url.adminGroupInterface, this.search).then((res) => {
        this.tableDatas = res.list;
        this.$emit("changes", this.tableDatas);
      });
    },
  },
};
</script>
<style lang="less" scoped>
.contentLift {
  text-align: left;
  padding: 20px;
  margin-left: 30px;
  .divText {
    width: 65px;
    display: inline-block;
    font-size: 9px;
    line-height: 36px;
  }
}
.contentRight {
  text-align: right;
  padding-right: 20px;
  padding-top: 20px;
}
</style>