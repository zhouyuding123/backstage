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
        <el-col :span="1"
          ><div>
            <div class="divText">类别:</div>
          </div></el-col
        >
        <el-col :span="3"
          ><div style="text-align: left">
            <el-select v-model="search.tid" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.id"
                :label="item.title"
                :value="item.id"
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
import { AdGetListApi } from "@/urls/advertisementUrl.js";
import {AdListAdTypeApi} from "@/urls/categoryUrl.js"
export default {
  inject: ["adListValue"],
  data() {
    return {
      search: {
        keyword: "",
        tid:""
      },
      tableDatas: [],
      options:[]
    };
  },
  created() {
    this.categoryListValue()
  },
  methods: {
    categoryListValue() {
      postD(AdListAdTypeApi()).then((res) => {
        this.options = res.list;
      });
    },
    Refresh() {
      this.adListValue();
    },
    submitReset() {
      this.search.keyword = null;
      this.search.tid = null;
    },
    submitSearch() {
      postD(AdGetListApi(), this.search).then((res) => {
        this.tableDatas = res;
        this.$emit("SeatchAd", this.tableDatas);
      });
    },
  },
};
</script>
