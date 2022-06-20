<template>
  <div class="backColor">
    <seatch v-show="seatchShow" @SeatchTopic="costPlannedAmountChange" />
    <div class="firstColor">
      <add />
      <div style="padding-left: 10px">
        <el-button type="danger" @click="topicDels">批量删除</el-button>
      </div>
      <div class="contentRight">
        <el-button type="info" ref="btn1" @click="showCont($event)"
          ><span class="iconfont icon-sousuo"></span
        ></el-button>
      </div>
    </div>
    <div class="twons">
      <vxe-table
        round
        border="true"
        ref="xTable1"
        :align="allAlign"
        :row-config="{ isHover: true }"
        :data="tableData"
        row-id="id"
        :row-style="tableRowStyle"
        :header-row-style="tableStyle"
        @checkbox-change="checkboxChangeEvent"
        @checkbox-all="checkboxChangeEvent"
      >
        <vxe-column
          align="center"
          type="checkbox"
          width="50"
          class="linker"
        ></vxe-column>
        <vxe-column field="title" title="标题" align="center"> </vxe-column>
        <vxe-column field="count" title="有关话题量" align="center">
        </vxe-column>
        <vxe-column title="热门开关" align="center">
          <template v-slot="scoped">
            <div>
              <el-switch
                v-model="scoped.row.is_hot"
                active-color="#13ce66"
                inactive-color="#ff4949"
                :active-value="1"
                :inactive-value="0"
                @change="changeHot(scoped.row)"
              >
              </el-switch>
            </div>
          </template>
        </vxe-column>
        <vxe-column field="browse" title="浏览量" align="center"> </vxe-column>
        <vxe-column title="操作" align="center">
          <template v-slot="scoped"
            ><el-button type="danger" @click="topicDel(scoped.row)"
              >删除</el-button
            ></template
          >
        </vxe-column>
      </vxe-table>
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
      ></vxe-pager>
    </div>
  </div>
</template>

<script>
import {
  CircleListThemeApi,
  CircleSetThemeApi,
  CircleDelThemeApi,
} from "@/urls/circleUrl.js";
import {
  styleModify,
  styleModifytwo,
  imgUrl,
} from "@/assets/js/modifyStyle.js";
import seatch from "./topic/seatch.vue";
import add from "./topic/add.vue";
import { postD } from "@/api";
export default {
  components: { seatch, add },
  provide() {
    return {
      topicList: this.topicList,
    };
  },
  data() {
    return {
      seatchShow: true,
      allAlign: null,
      tableData: [],
      // 分页
      page1: {
        offset: 1,
        limit: 10,
        totalResult: 0,
      },
      ids: [],
      //选中时将对象保存到arrs中
      arrs: [],
      topocDelsValues: {
        id: "",
      },
      isHot: {
        id: "",
        is_hot: "",
      },
      // 单个删除
      DelId: {
        id: "",
      },
    };
  },
  created() {
    this.topicList();
  },
  methods: {
    showCont() {
      this.seatchShow = !this.seatchShow;
      this.$refs.btn1.$el.innerText;
    },
    tableRowStyle() {
      return styleModify();
    },
    tableStyle() {
      return styleModifytwo();
    },
    topicList() {
      postD(CircleListThemeApi()).then((res) => {
        this.tableData = res.list;
        this.page1.totalResult = res.count;
      });
    },
    // 热门开关
    changeHot(val) {
      this.isHot.id = val.id;
      this.isHot.is_hot = val.is_hot;
      postD(CircleSetThemeApi(), this.isHot).then((res) => {
        if (res.code == "200") {
          this.$message.success("状态修改成功");
          this.topicList();
        } else if (res.code == "-200") {
          this.$message.error("参数错误，或暂无数据");
        } else if (res.code == "-201") {
          this.$message.error("未登陆");
        } else if (res.code == "-203") {
          this.$message.error("对不起，你没有此操作权限");
        } else {
          this.$message.error("注册失败，账号已存在");
        }
      });
    },
    async costPlannedAmountChange(param1) {
      this.tableData = param1.list;
      this.page1.totalResult = param1.count;
    },
    // 分页
    handlePageChangeActivity({ currentPage, pageSize }) {
      this.page1.offset = currentPage;
      this.page1.limit = pageSize;
      postD(CircleListThemeApi(), this.page1).then((res) => {
        this.tableData = res.list;
        this.page1.totalResult = res.count;
      });
    },
    // 批量删除
    checkboxChangeEvent(data) {
      this.arrs = data.records;
    },
    async topicDels() {
      const topicDelsValue = await this.$confirm(
        "此操作将永久删除, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);
      if (topicDelsValue !== "confirm") {
        return this.$message.info("取消删除");
      }
      if (topicDelsValue === "confirm") {
        this.arrs.forEach((v) => {
          this.ids.push(v.id);
        });
        this.topocDelsValues.id = this.ids.toString();
        postD(CircleDelThemeApi(), this.topocDelsValues).then((res) => {
          if (res.code == "200") {
            this.$message.success("删除成功");
            this.topicList();
          } else if (res.code == "-200") {
            this.$message.error("参数错误，或暂无数据");
          } else if (res.code == "-201") {
            this.$message.error("未登陆");
          } else if (res.code == "-203") {
            this.$message.error("对不起，你没有此操作权限");
          } else {
            this.$message.error("注册失败，账号已存在");
          }
        });
      }
    },
    async topicDel(val) {
      const topicDelOne = await this.$confirm(
        "此操作将永久删除, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);
      if (topicDelOne !== "confirm") {
        return this.$message.info("取消删除");
      }
      if (topicDelOne === "confirm") {
        this.DelId.id = val.id;
         console.log(123);
        postD(CircleDelThemeApi(), this.DelId).then((res) => {
          if (res.code == "200") {
            this.$message.success("删除成功");
            this.topicList();
          } else if (res.code == "-200") {
            this.$message.error("参数错误，或暂无数据");
          } else if (res.code == "-201") {
            this.$message.error("未登陆");
          } else if (res.code == "-203") {
            this.$message.error("对不起，你没有此操作权限");
          } else {
            this.$message.error("注册失败，账号已存在");
          }
        });
      }
    },
  },
};
</script>

<style lang="less" scoped>
.contentRight {
  padding-left: 86.2%;
}
</style>