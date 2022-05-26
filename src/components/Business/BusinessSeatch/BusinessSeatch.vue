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
            <div class="divText">VIP:</div>
          </div></el-col
        >
        <el-col :span="3"
          ><div>
            <el-select v-model="search.is_vip" placeholder="请选择">
              <el-option
                v-for="item in is_vipOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select></div
        ></el-col>
        <el-col :span="1"
          ><div>
            <div class="divText">认证状态:</div>
          </div></el-col
        >
        <el-col :span="3"
          ><div>
            <el-select v-model="search.auth" placeholder="请选择">
              <el-option
                v-for="item in authOptions"
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
import { BusinessIndexApi } from "@/urls/busomessUrl.js";
import { postD } from "@/api";
import { timestampToTime } from "@/assets/js/time.js";
export default {
  inject: ["busomessValue"],
  data() {
    return {
      search: {
        keyword: null,
        vip_start_time: null,
        vip_end_time: null,
        is_vip: null,
        auth: null,
      },
      tableDatas: [],
      vipGetTime: [],
      is_vipOptions: [
        {
          value: "0",
          label: "不是",
        },
        {
          value: "1",
          label: "是",
        },
      ],
      authOptions: [
        {
          value: "0",
          label: "待认证",
        },
        {
          value: "1",
          label: "已认证审核状态",
        },
        {
          value: "2",
          label: "已审核通过",
        },
        {
          value: "3",
          label: "审核不通过",
        },
      ],
    };
  },
  methods: {
    Refresh() {
      this.busomessValue();
    },
    getTime(date) {
      this.vipGetTime = date;
      this.search.vip_start_time = timestampToTime(this.vipGetTime[0] / 1000);
      this.search.vip_end_time = timestampToTime(this.vipGetTime[1] / 1000);
    },
    submitReset() {
      this.search.keyword = null;
      this.vipGetTime = null;
      this.search.vip_start_time = null;
      this.search.vip_end_time = null;
      this.search.is_vip = null;
      this.search.auth = null;
    },
    submitSearch() {
      postD(BusinessIndexApi(), this.search).then((res) => {
        console.log(res);
        this.tableDatas = res.data;
        this.$emit("BusinessSeatcher", this.tableDatas);
      });
    },
  },
};
</script>