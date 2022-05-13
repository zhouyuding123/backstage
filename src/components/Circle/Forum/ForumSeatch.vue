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
        <el-col :span="1"
          ><div>
            <div class="divText">发布的论坛:</div>
          </div></el-col
        >
        <el-col :span="3"
          ><div>
            <el-select v-model="search.is_circle_forum" placeholder="请选择">
              <el-option
                v-for="item in is_circle_forumOtions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select></div
        ></el-col>
        <el-col :span="1"
          ><div>
            <div class="divText">是否同城:</div>
          </div></el-col
        >
        <el-col :span="2"
          ><div>
            <el-select v-model="search.style" placeholder="请选择">
              <el-option
                v-for="item in styleOption"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select></div
        ></el-col>
        <el-col :span="1"
          ><div>
            <div class="divText">城市:</div>
          </div></el-col
        >
        <el-col :span="2"
          ><div>
            <el-input
              v-model="search.city"
              placeholder="关键词搜索"
            ></el-input></div
        ></el-col>
        <el-col :span="1"
          ><div>
            <div class="divText">经度:</div>
          </div></el-col
        >
        <el-col :span="2"
          ><div>
            <el-input
              v-model="search.lat"
              placeholder="关键词搜索"
            ></el-input></div
        ></el-col>
        <el-col :span="1"
          ><div>
            <div class="divText">纬度:</div>
          </div></el-col
        >
        <el-col :span="2"
          ><div>
            <el-input
              v-model="search.lng"
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
import { postD } from "../../../api/index.js";
import { CircleListForumApi } from "@/urls/circleUrl.js";
export default {
  inject: ["listForumValue"],
  data() {
    return {
      seatchShow: false,
      tableDatas: [],
      search: {
        keyword: null,
        is_circle_forum: null,
        style: null,
        city: null,
        lat: null,
        lng: null,
      },
      is_circle_forumOtions: [
        {
          value: "1",
          label: "圈子发布的论坛",
        },
        {
          value: "2",
          label: "非圈子发布的论坛",
        },
      ],
      styleOption: [
        {
          value: "1",
          label: "同城",
        },
        {
          value: "2",
          label: "全国",
        },
      ],
    };
  },
  methods: {
    submitReset() {
      this.search.keyword = null;
      this.search.is_circle_forum = null;
      this.search.style = null;
      this.search.city = null;
      this.search.lat = null;
      this.search.lng = null;
    },
    submitSearch() {
      postD(CircleListForumApi, this.search).then((res) => {
        this.tableDatas = res.list;
        this.$emit("change", this.tableDatas);
      });
    },
    Refresh() {
      this.listForumValue();
    },
    showCont() {
      this.seatchShow = !this.seatchShow;
      this.$refs.btn1.$el.innerText;
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
.contentRight {
  text-align: right;
  padding-right: 20px;
  padding-top: 20px;
}
</style>