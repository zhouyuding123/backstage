<template>
  <div class="backColor">
    <div class="firstColor">
      <div>
        <el-button type="success" @click="returnLe">返回赛事列表</el-button>
      </div>
    </div>
    <seatch @eveSeatch="costPlannedAmountChange" />
    <div class="twons">
      <div class="work_list">
        <div class="work_list1" v-for="item in workValue" :key="item.works_id">
          <div class="work">
            <div class="workimg">
              <el-image :src="imagesValue + item.thumb" alt="" />
            </div>
            <div>
              <div class="worktitle">
                <span>{{ item.title }}</span>
              </div>
              <div class="worksuser">
                <div class="workUser">
                  <el-image
                    :src="imagesValue + item.headimage"
                    alt=""
                    style="width: 100%; height: 100%"
                  />
                </div>
                <div class="worlname">
                  <span>{{ item.nickname }}</span>
                </div>
              </div>
            </div>
            <div class="hs">
              <div
                @click="appropriate(item.accept_id)"
                v-if="item.is_open == 0"
                class="appropriate1"
              >
                <span>合适</span>
              </div>
              <div v-if="item.is_open == 1" class="appropriateStyle">
                <img src="@/assets/imgers/对.png" alt="" />
              </div>
              <div
                @click="noappropriate(item.accept_id)"
                v-if="item.is_open == 0"
                class="appropriate1"
              >
                <span>不合适</span>
              </div>
              <div v-if="item.is_open == 2" class="appropriateStyle2">
                <img src="@/assets/imgers/错.png" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <vxe-pager
        :current-page="page1.offset"
        :page-size="page1.limit"
        :total="page1.totalResult"
        :layouts="[
          'PrevPage',
          'JumpNumber',
          'NextPage',
          'FullJump',
          'Sizes',
          'Total',
        ]"
        @page-change="handlePageChangeActivity"
        align="center"
      ></vxe-pager>
    </div>
    
  </div>
</template>

<script>
import { matchWorksListApi, MatchScreenApi } from "@/urls/matchUrl.js";
import { postD } from "@/api";
import { imgUrl } from "@/assets/js/modifyStyle";
import seatch from "./worksSeatch/seatch.vue";
export default {
  provide() {
    return {
      worksList: this.worksList,
    };
  },
  components: { seatch },
  data() {
    return {
      imagesValue: "",
      worksId: {
        id: "",
      },
      workValue: [],
      appropriateId: {
        accept_id: "",
        is_open: "1",
      },
       page1: {
        offset: 1,
        limit: 10,
        totalResult: 0,
      },
    };
  },
  created() {
    this.worksList();
  },
  methods: {
    returnLe() {
      this.$router.push("/match/listMacth");
    },
    worksList() {
      this.worksId.id = this.$route.params.id;
      postD(matchWorksListApi(), this.worksId).then((res) => {
        this.workValue = res.list;
        this.imagesValue = imgUrl();
        this.page1.totalResult = res.count;
      });
    },
    appropriate(val) {
      this.appropriateId.accept_id = val;
      postD(MatchScreenApi(), this.appropriateId).then((res) => {
        if (res.code == "200") {
          this.$message.success("筛选通过");
          this.worksList();
        } else {
          this.$message.error("参数错误，或暂无数据");
        }
      });
    },
    async costPlannedAmountChange(param1) {
      this.workValue = param1.list;
      this.page1.totalResult = param1.count;
    },
    // 分页
    handlePageChangeActivity({ currentPage, pageSize }) {
      this.page1.offset = currentPage;
      this.page1.limit = pageSize;
      postD(matchWorksListApi(), this.page1).then((res) => {
        this.workValue = res.list;
        this.page1.totalResult= res.count
      });
    },
  },
};
</script>

<style lang="less" scoped>
.work_list {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  .work_list1 {
    width: 300px;
    height: 270px;
    margin-left: 15px;
    background: #ffffff;
    border-radius: 6px 6px 6px 6px;
    margin-top: 60px;

    .workimg {
      width: 300px;
      height: 200px;
      background: #e8e8e8;
      border-radius: 6px 6px 0px 0px;
    }
  }
}
.worktitle {
  width: 282px;
  height: 22px;
  font-size: 16px;
  font-family: PingFang SC-Bold, PingFang SC;
  font-weight: bold;
  color: #06121e;
  overflow: hidden;
  text-align: left;
  padding: 7px 11px;
}
.worksuser {
  display: flex;
}
.workUser {
  margin: 7px 10px;
  width: 24px;
  height: 24px;
  .el-image {
    border-radius: 50%;
  }
}
.worlname {
  margin-top: 11px;
  span {
    font-size: 14px;
    font-family: PingFang SC-Regular, PingFang SC;
    font-weight: 400;
    color: #333333;
  }
}
.work {
  width: 300px;
  height: 320px;
}
.hs {
  padding-top: 20px;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  .appropriate1 {
    width: 120px;
    height: 40px;
    background: #ffffff;
    border-radius: 4px 4px 4px 4px;
    border: 1px solid #dfdfdf;
    cursor: pointer;
    margin-left: 20px;
    span {
      font-size: 14px;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #999999;
      line-height: 40px;
    }
  }
}
.appropriateStyle {
  background-color: #00b567;
  width: 120px;
  height: 40px;
  border-radius: 4px 4px 4px 4px;
  img {
    margin-top: 10px;
  }
}
.appropriateStyle2 {
  background: #ff0000;
  width: 120px;
  height: 40px;
  border-radius: 4px 4px 4px 4px;
  img {
    margin-top: 10px;
  }
}
.twons {
  padding-top: 0;
}
.vxe-pager {
  margin-top:70px;
}
</style>