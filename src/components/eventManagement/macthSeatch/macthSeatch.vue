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
            <div class="divText">时间范围:</div>
          </div></el-col
        >
        <el-col :span="6"
          ><div>
            <div>
              <el-date-picker
                v-model="vipGetTime"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                @change="getTime"
              >
              </el-date-picker>
            </div></div
        ></el-col>
        <el-col :span="1"
          ><div>
            <div class="divText">是否开启:</div>
          </div></el-col
        >
        <el-col :span="3"
          ><div>
            <el-select v-model="search.is_open" placeholder="请选择">
              <el-option
                v-for="item in is_openOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select></div
        ></el-col>
        <el-col :span="1"
          ><div>
            <div class="divText">平台审核:</div>
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
import { timestampToTime } from "../../../assets/js/time.js";
import { matchListMacthApi } from "@/urls/matchUrl.js";
export default {
  inject: ["MacthValue"],
  data() {
    return {
      search: {
        keyword: null,
        sign_time: null,
        exh_time: null,
        is_open: null,
        status: null,
      },
      vipGetTime: [],
      is_openOptions: [
        {
          value: "1",
          label: "开启",
        },
        {
          value: "0",
          label: "关闭",
        },
      ],
      statusOptions: [
        {
          value: "0",
          label: "等待平台审核",
        },
        {
          value: "1",
          label: "平台通过,进行中",
        },
        {
          value: "2",
          label: "驳回",
        },
        {
          value: "3",
          label: "结束",
        },
      ],
    };
  },
  methods: {
    Refresh() {
      this.MacthValue();
    },
    submitReset() {
      this.search.keyword = "";
      this.search.sign_time = "";
      this.search.exh_time = "";
      this.search.is_open = "";
      this.search.status = "";
      this.vipGetTime = "";
    },
    getTime(date) {
      this.vipGetTime = date;
      this.search.sign_time = timestampToTime(this.vipGetTime[0] / 1000);
      this.search.exh_time = timestampToTime(this.vipGetTime[1] / 1000);
    },
    submitSearch() {
      postD(matchListMacthApi(), this.search).then((res) => {
        this.tableDatas = res.list;
        this.$emit("macthSeatch", this.tableDatas);
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