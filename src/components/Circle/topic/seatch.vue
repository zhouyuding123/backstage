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
            <div class="divText">热门选择:</div>
          </div></el-col
        >
        <el-col :span="3"
          ><div style="text-align: left">
            <el-select v-model="search.is_hot" placeholder="请选择">
              <el-option
                v-for="item in options"
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
import { postD } from "@/api/index.js";
import { CircleListThemeApi } from "@/urls/circleUrl.js";
export default {
  inject: ["topicList"],
  data() {
    return {
      search: {
        keyword: "",
        is_hot: "",
      },
      tableDatas: [],
      options: [
        {
          value: "0",
          label: "非热门",
        },
        {
          value: "1",
          label: "热门",
        }
      ],
    };
  },
  methods: {
    Refresh() {
      this.topicList();
    },
    submitReset() {
      this.search.keyword = null;
      this.search.is_hot = null;
    },
    submitSearch() {
      postD(CircleListThemeApi(), this.search).then((res) => {
        this.tableDatas = res;
        this.$emit("SeatchTopic", this.tableDatas);
      });
    },
  },
};
</script>
