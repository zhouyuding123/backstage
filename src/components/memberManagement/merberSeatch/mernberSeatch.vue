<template>
  <div>
    <div class="contentLift">
      <el-row :gutter="20">
        <el-col :span="1">
          <div class="grid-content bg-purple">
            <div class="divText">关键词搜索:</div>
          </div>
        </el-col>
        <el-col :span="2"
          ><div style="text-align: left">
            <el-input
              v-model="search.keyword"
              placeholder="关键词搜索"
            ></el-input></div
        ></el-col>
        <el-col :span="1"
          ><div>
            <div class="divText">性别:</div>
          </div></el-col
        >
        <el-col :span="3"
          ><div>
            <el-select v-model="search.sex" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select></div
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
                v-for="item in viptions"
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
        <el-col :span="3"
          ><div>
            <el-button type="success" @click="submitSearch">提交</el-button>
            <el-button type="info" @click="submitReset">重置</el-button>
          </div></el-col
        >
      </el-row>
    </div>
  </div>
</template>

<script>
import { postD } from "../../../api/index.js";
export default {
  data() {
    return {
      tableDatas: [],
      url: {
        indexInterface: "Users/index",
      },
      // 搜索
      search: {
        keyword: null,
        sex: null,
        is_vip: null,
        vip_start_time: null,
        vip_end_time: null,
      },
      // 性别
      options: [
        {
          value: "1",
          label: "男",
        },
        {
          value: "2",
          label: "女",
        },
      ],
      // 是否为vip
      viptions: [
        {
          value: "0",
          label: "非VIP",
        },
        {
          value: "1",
          label: "VIP",
        },
      ],
      // 会员日期
      vipGetTime: [],
    };
  },
  methods: {
    getTime(date) {
      this.vipGetTime = date;
      this.search.vip_start_time = this.vipGetTime[0].getTime() / 1000;
      this.search.vip_end_time = this.vipGetTime[1].getTime() / 1000;
    },
    // 重置
    submitReset() {
      this.search.keyword = "";
      this.search.sex = "";
      this.search.is_vip = "";
      this.search.vip_start_time = "";
      this.search.vip_end_time = "";
    },
    submitSearch() {
      postD(this.url.indexInterface, this.search).then((res) => {
        this.tableDatas = res.data;
        this.$emit("mernberSeatch", this.tableDatas);
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