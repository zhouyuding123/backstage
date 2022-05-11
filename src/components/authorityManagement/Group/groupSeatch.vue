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
import {postD} from "../../../api/index.js"
export default {
    inject:['groupVaule'],
  data() {
    return {
     
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
</style>