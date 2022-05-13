<template>
  <div class="backColor">
    <activity-seatch
      v-show="seatchShow"
      @activitySeatch="costPlannedAmountChange"
    />
    <div class="firstColor">
      <add-activity />
      <div style="padding-left: 20px">
        <el-button type="danger" @click="activityDels">批量删除</el-button>
      </div>
      <div class="contentRight">
        <el-button type="info" ref="btn1" @click="showCont($event)"
          >查询</el-button
        >
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
        <vxe-column width="60" align="center">
          <template v-slot="scoped">
            <el-image
              :src="imagesValue + scoped.row.headimage"
              alt=""
              :preview-src-list="[imagesValue + scoped.row.headimage]"
              style="width: 40px; height: 40px"
              class="imgStyle"
            />
          </template>
        </vxe-column>
        <vxe-column
          field="username"
          title="用户名"
          width="120"
          align="center"
        ></vxe-column>
        <vxe-column
          field="nickname"
          title="昵称"
          width="110"
          align="center"
        ></vxe-column>
        <vxe-column
          field="title"
          title="标题"
          width="240"
          align="center"
        ></vxe-column>
        <vxe-column width="50" align="center">
          <template v-slot="scoped">
            <el-image
              :src="imagesValue + scoped.row.poster"
              alt=""
              :preview-src-list="[imagesValue + scoped.row.poster]"
              style="width: 40px; height: 40px"
              class="imgStyles"
            />
          </template>
        </vxe-column>
        <vxe-column
          field="category"
          title="活动类别"
          width="120"
          align="center"
          show-overflow="ellipsis"
        >
          <template v-slot="scoped">
            <div
              class="clickHeader"
              :class="{
                green: scoped.row.category === 1,
                yellow: scoped.row.category == 3,
                blue: scoped.row.category === 2,
              }"
            >
              {{ filterCategory(scoped.row.category) }}
            </div>
          </template>
        </vxe-column>
        <vxe-column
          field="style"
          title="可见"
          width="120"
          align="center"
          show-overflow="ellipsis"
        >
          <template v-slot="scoped">
            <div
              class="clickHeader"
              :class="{
                green: scoped.row.style === 1,
                yellow: scoped.row.style == 2,
              }"
            >
              {{ filterStyle(scoped.row.style) }}
            </div>
          </template>
        </vxe-column>

        <vxe-column
          field="is_voto"
          title="投票"
          width="120"
          align="center"
          show-overflow="ellipsis"
        >
          <template v-slot="scoped">
            <div
              class="clickHeader"
              :class="{
                green: scoped.row.is_voto === 1,
                yellow: scoped.row.is_voto == 2,
              }"
            >
              {{ filterIs_voto(scoped.row.is_voto) }}
            </div>
          </template>
        </vxe-column>
        <vxe-column
          title="审核状态"
          width="120"
          align="center"
          show-overflow="ellipsis"
        >
          <template v-slot="scoped">
            <div>
              <div
                :class="{
                  green: scoped.row.status === 1,
                  yellow: scoped.row.status == 0,
                  red: scoped.row.status === 2,
                  blue: scoped.row.status === 3,
                }"
              >
                {{ filterStatus(scoped.row.status) }}
              </div>
            </div>
          </template>
        </vxe-column>
        <vxe-column field="is_open" title="开关" align="center" width="70">
          <template v-slot="scoped">
            <el-switch
              v-model="scoped.row.is_open"
              active-color="#13ce66"
              @change="is_openChaged(scoped.row)"
              :active-value="1"
              :inactive-value="0"
            ></el-switch>
          </template>
        </vxe-column>
        <vxe-column
          field="browse"
          title="浏览量"
          align="center"
          width="75"
        ></vxe-column>
        <vxe-column
          field="start_time"
          title="活动开始时间"
          align="center"
          width="145"
          show-overflow="title"
        ></vxe-column>
        <vxe-column
          field="end_time"
          title="活动结束时间"
          align="center"
          width="145"
          show-overflow="title"
        ></vxe-column>
        <vxe-column title="操作" align="center">
          <template v-slot="scoped">
            <div class="postDyex">
              <activity-detil :detialFort="scoped.row" class="postDyexer" />
              <activity-del :delFunction="scoped.row" class="postDyexer" />
            </div>
          </template>
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
import activityDel from "./activitySeatch/activityDel.vue";
import activityDetil from "./activitySeatch/activityDetil.vue";
import activitySeatch from "./activitySeatch/activitySeatch.vue";
import addActivity from "./activitySeatch/addActivity.vue";
import { postD } from "../../api/index.js";
import {ActivityListActivityApi,ActivitySelectDelApi} from "@/urls/activityUrl.js"
import {
  styleModify,
  styleModifytwo,
  imgUrl,
} from "../../assets/js/modifyStyle.js";
export default {
  provide() {
    return {
      activityListValue: this.activityListValue,
    };
  },
  components: {
    activitySeatch,
    activityDetil,
    addActivity,
    activityDel,
  },
  data() {
    return {
      imagesValue: "",
      allAlign: null,
      tableData: [],
      // 分页
      page1: {
        offset: 1,
        limit: 10,
        totalResult: 0,
      },
      seatchShow: false,
      // 批量删除
      ids: [],
      //选中时将对象保存到arrs中
      arrs: [],
      activityDelsValues: {
        id: "",
      },
    };
  },
  created() {
    this.activityListValue();
  },
  methods: {
    tableRowStyle() {
      return styleModify();
    },
    tableStyle() {
      return styleModifytwo();
    },
    activityListValue() {
      postD(ActivityListActivityApi()).then((res) => {
        this.tableData = res.list;
        this.imagesValue = imgUrl();
        this.page1.totalResult = res.count;
      });
    },
    filterCategory(val) {
      if (val === 1) {
        return "普通活动";
      } else if (val === 2) {
        return "评选活动";
      } else if (val === 3) {
        return "抽奖活动";
      }
    },
    filterStyle(val) {
      if (val === 1) {
        return "同城可见";
      } else if (val === 2) {
        return "全国可见";
      }
    },
    filterIs_voto(val) {
      if (val === 0) {
        return "投票";
      } else if (val === 1) {
        return "非投票";
      }
    },
    filterStatus(val) {
      if (val === 0) {
        return "等待平台审核";
      } else if (val === 1) {
        return "平台通过";
      } else if (val === 2) {
        return "驳回";
      } else if (val === 3) {
        return "结束";
      }
    },
    // 分页
    handlePageChangeActivity({ currentPage, pageSize }) {
      this.page1.offset = currentPage;
      this.page1.limit = pageSize;
      postD(ActivityListActivityApi(), this.page1).then((res) => {
        this.tableData = res.list;
      });
    },
    showCont() {
      this.seatchShow = !this.seatchShow;
      this.$refs.btn1.$el.innerText;
    },
    async costPlannedAmountChange(param1) {
      this.tableData = param1;
    },
    // 批量删除
    checkboxChangeEvent(data) {
      this.arrs = data.records;
    },
    async activityDels() {
      const activityDelsValuesId = await this.$confirm(
        "此操作将永久删除管理, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);
      if (activityDelsValuesId !== "confirm") {
        return this.$message.info("取消删除");
      }
      if (activityDelsValuesId === "confirm") {
        this.arrs.forEach((v) => {
          this.ids.push(v.id);
        });
        this.activityDelsValues.id = this.ids.toString();
        postD(ActivitySelectDelApi(), this.activityDelsValues).then(
          (res) => {
            if (res.code == "200") {
              this.$message.success("状态修改成功");
              this.activityListValue();
            } else if (res.code == "-200") {
              this.$message.error("参数错误，或暂无数据");
            } else if (res.code == "-201") {
              this.$message.error("未登陆");
            } else if (res.code == "-203") {
              this.$message.error("对不起，你没有此操作权限");
            } else {
              this.$message.error("注册失败，账号已存在");
            }
          }
        );
      }
    },
  },
};
</script>

<style lang="less" scoped>
.contentRight {
  padding-left: 85%;
}

.linker {
  background: #ffffff;
  border-radius: 3px 3px 3px 3px;
  opacity: 1;
  border: 1px solid #b5b2b2;
}

.imgStyles {
  position: absolute;
  top: 10%;
  left: 30%;
  background: #ffffff;
  box-shadow: 0px 2px 5px 1px rgba(0, 0, 0, 0.05);
  opacity: 1;
}
/deep/ .el-date-editor {
  position: relative;
  .el-input__prefix {
    display: none;
  }
}
</style>