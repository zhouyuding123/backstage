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
            <div class="divText">关键词搜索:</div>
          </div></el-col
        >
        <el-col :span="3"
          ><div>
            <el-select v-model="search.style" placeholder="请选择">
              <el-option
                v-for="item in styleOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select></div
        ></el-col>
        <el-col :span="1"
          ><div>
            <div class="divText">需求状态:</div>
          </div></el-col
        >
        <el-col :span="3"
          ><div>
            <el-select v-model="search.status" placeholder="请选择">
              <el-option
                v-for="item in statusOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select></div
        ></el-col>
         <el-col :span="1"
          ><div>
            <div class="divText">账号类型:</div>
          </div></el-col
        >
        <el-col :span="3"
          ><div>
            <el-select v-model="search.type" placeholder="请选择">
              <el-option
                v-for="item in typeOptions"
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
export default {
  inject: ["demandIndexValue"],
  data() {
    return {
      tableDatas: [],
      url: {
        demandIndexInterface: "Demand/index",
      },
      search: {
        keyword: null,
        style: null,
        status: null,
        type: null,
      },
      styleOptions: [
        {
          value: "1",
          label: "设计需求",
        },
        {
          value: "2",
          label: "代理需求",
        },
      ],
      statusOptions: [
        {
          value: "0",
          label: "待匹配",
        },
        {
          value: "1",
          label: "处理中",
        },
        {
          value: "2",
          label: "已完成",
        },
      ],
      typeOptions:[
          {
          value: "1",
          label: "用户端",
        },
        {
          value: "2",
          label: "设计师端",
        },
        {
          value: "3",
          label: "终端门店",
        },
        {
          value: "4",
          label: "批发代理商端",
        },
        {
          value: "5",
          label: "骑手端",
        },
        {
          value: "6",
          label: "原材料供应商",
        },
        {
          value: "7",
          label: "企业端 ",
        },
        {
          value: "8",
          label: "代工厂端",
        },
      ]
    };
  },
  methods: {
    Refresh() {
      this.demandIndexValue();
    },
    submitReset() {
      this.search.keyword = "";
      this.search.style = "";
      this.search.status = "";
      this.search.type = "";
    },
    submitSearch() {
      postD(this.url.demandIndexInterface, this.search).then((res) => {
        this.tableDatas = res.data;
        this.$emit("demandSeatchValue", this.tableDatas);
      });
    },
  },
};
</script>
<style lang="less" scoped>
.contentLift {
  text-align: left;
  padding: 20px 20px 20px 50px;
  .divText {
    width: 65px;
    display: inline-block;
    font-size: 9px;
    line-height: 36px;
  }
}
</style>
