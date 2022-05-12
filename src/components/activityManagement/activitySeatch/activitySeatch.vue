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
        <el-col :span="1"
          ><div>
            <div class="divText">活动类型:</div>
          </div></el-col
        >
        <el-col :span="3"
          ><div>
            <el-select v-model="search.category" placeholder="请选择">
              <el-option
                v-for="item in categoryOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select></div
        ></el-col>
        <el-col :span="1"
          ><div>
            <div class="divText">活动类型:</div>
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
            <div class="divText">是否投票:</div>
          </div></el-col
        >
        <el-col :span="3"
          ><div>
            <el-select v-model="search.is_voto" placeholder="请选择">
              <el-option
                v-for="item in is_votoOptions"
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
export default {
  inject: ["activityListValue"],
  data() {
    return {
      url: {
        listActivityInterface: "Activity/listActivity",
      },
      search: {
        keyword: null,
        start_time: null,
        end_time: null,
        status: null,
        category: null,
        style: null,
        is_voto: null,
      },
      // 时间
      vipGetTime: [],
      tableDatas: [],
      // 平台审核
      statusOptions: [
        {
          value: "0",
          label: "等待平台审核",
        },
        {
          value: "1",
          label: "平台通过",
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
      // 活动类型
      categoryOptions: [
        {
          value: "1",
          label: "普通活动",
        },
        {
          value: "2",
          label: "评选活动",
        },
        {
          value: "3",
          label: "抽奖活动",
        },
      ],
      styleOptions: [
        {
          value: "1",
          label: "同城可见",
        },
        {
          value: "2",
          label: "全国可见",
        },
      ],
      is_votoOptions: [
        {
          value: "0",
          label: "是",
        },
        {
          value: "1",
          label: "不是",
        },
      ],
    };
  },
  methods: {
    Refresh() {
      this.activityListValue();
    },
    submitReset() {
      this.search.keyword = "";
      this.search.vipGetTime = "";
      this.search.status = "";
      this.search.start_time = "";
      this.search.end_time = "";
      this.search.category = "";
      this.search.style = "";
    },
    getTime(date) {
      this.vipGetTime = date;
      this.search.start_time = timestampToTime(this.vipGetTime[0] / 1000);
      this.search.end_time = timestampToTime(this.vipGetTime[1] / 1000);
    },
    submitSearch() {
      console.log(this.search);
      postD(this.url.listActivityInterface, this.search).then((res) => {
        this.tableDatas = res.list;
        this.$emit("activitySeatch", this.tableDatas);
      });
    },
  },
};
</script>