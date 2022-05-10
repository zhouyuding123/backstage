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
            <div class="divText">是否为VIP:</div>
          </div></el-col
        >
        <el-col :span="3"
          ><div>
            <el-select v-model="search.is_vip" placeholder="请选择">
              <el-option
                v-for="item in is_vipOption"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select></div
        ></el-col>
        <el-col :span="1"
          ><div>
            <div class="divText">会员时间:</div>
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
            <div class="divText">认证状态:</div>
          </div></el-col
        >
        <el-col :span="3"
          ><div>
            <el-select v-model="search.auth" placeholder="请选择">
              <el-option
                v-for="item in authOption"
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
  inject: ["designerListValue"],
  data() {
    return {
      tableDatas: [],
      url: {
        DesignerindexInterface: "Designer/index",
      },
      search: {
        keyword: null,
        is_vip: null,
        vip_start_time: null,
        vip_end_time: null,
        auth:null
      },
      is_vipOption: [
        {
          value: "1",
          label: "是",
        },
        {
          value: "0",
          label: "不是",
        },
      ],
      vipGetTime: [],
      authOption:[
          {
          value: "0",
          label: "待认证",
        },
        {
          value: "1",
          label: "已认证审核",
        },
        {
          value: "2",
          label: "审核通过",
        },
        {
          value: "3",
          label: "审核不通过",
        },
      ]
    };
  },
  methods: {
    submitReset() {
      this.search.keyword = "";
      this.search.is_vip = "";
      this.search.vip_start_time = "";
      this.search.vip_end_time = "";
      this.vipGetTime = ''
      this.search.auth = "";
    },
    getTime(date) {
      this.vipGetTime = date;
      this.search.vip_start_time = this.vipGetTime[0].getTime() / 1000;
      this.search.vip_end_time = this.vipGetTime[1].getTime() / 1000;
    },
    submitSearch() {
      postD(this.url.DesignerindexInterface, this.search).then((res) => {
        this.tableDatas = res.data;
        this.$emit("designerChange", this.tableDatas);
      });
    },
    Refresh() {
      this.designerListValue();
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