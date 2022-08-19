<template>
  <div class="backColor">
    <seatch v-show="seatchShow" @SeatchAd="costPlannedAmountChange" />
    <div class="firstColor">
      <addlist />
      <div style="padding-left: 10px">
        <el-button type="danger" @click="adDels">批量删除</el-button>
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
        <vxe-column field="id" title="id" align="center"> </vxe-column>
        <vxe-column field="no" title="编码" width="100px" align="center">
        </vxe-column>
        <vxe-column
          field="title"
          title="快递公司名称"
          align="center"

        >
        </vxe-column>
        <vxe-column field="status" title="开关" width="100px" align="center">
          <template v-slot="scoped">
            <div>
              <el-switch
                v-model="scoped.row.status"
                active-color="#13ce66"
                inactive-color="#ff4949"
                @change="statuschange(scoped.row)"
                :active-value="1"
                :inactive-value="0"
              >
              </el-switch>
            </div>
          </template>
        </vxe-column>
        <vxe-column
          field="create_time"
          title="创建时间"
          align="center"
          width="200"
        >
        </vxe-column>
        <vxe-column
          field="update_time"
          title="更新时间"
          align="center"
          width="200"
        >
        </vxe-column>
        <vxe-column field="sort" title="排序" align="center" width="100px">
        </vxe-column>
        <vxe-column title="操作" align="center" width="200px">
          <template v-slot="scoped">
            <div class="postDyex">
              <edit-log :editFunction="scoped.row" class="postDyexer" />
              <el-button type="danger" @click="adDel(scoped.row)"
                >删除</el-button
              >
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
import {
  LogisticsGetListApi,
  LogisticsExitLogisApi,
  LogisticsSelectDelApi
} from "@/urls/logistics.js";
import {
  styleModify,
  styleModifytwo,
  imgUrl,
} from "@/assets/js/modifyStyle.js";
import addlist from "./addlist/addlist.vue";
import seatch from "./addlist/seatch.vue";
import editLog from "./addlist/editLog.vue"
import { postD } from "@/api";
export default {
  provide() {
    return {
      logslist: this.logslist,
    };
  },
  components: { addlist, seatch,editLog },
  data() {
    return {
      tableData: [],
      allAlign: null,
      seatchShow: true,
      ids: [],
      //选中时将对象保存到arrs中
      arrs: [],
      adDelsValues: {
        id: "",
      },
      // 单个删除
      DelId: {
        id: "",
      },
      // 分页
      page1: {
        offset: 1,
        limit: 10,
        totalResult: 0,
      },
    };
  },
  created() {
    this.logslist();
  },
  methods: {
    showCont() {
      this.seatchShow = !this.seatchShow;
      this.$refs.btn1.$el.innerText;
    },
    // 批量删除
    checkboxChangeEvent(data) {
      this.arrs = data.records;
    },
    tableRowStyle() {
      return styleModify();
    },
    tableStyle() {
      return styleModifytwo();
    },
    async costPlannedAmountChange(param1) {
      this.tableData = param1.data;
      this.page1.totalResult = param1.count;
    },
    logslist() {
      postD(LogisticsGetListApi()).then((res) => {
        console.log(res);
        this.tableData = res.data;
        this.page1.totalResult = res.count;
      });
    },
     handlePageChangeActivity({ currentPage, pageSize }) {
      this.page1.offset = currentPage;
      this.page1.limit = pageSize;
      postD(LogisticsGetListApi(), this.page1).then((res) => {
        this.tableData = res.data;
        this.page1.totalResult = res.count;
      });
    },
    statuschange(val) {
      var edit = {
        id: val.id,
        status: val.status,
      };
      postD(LogisticsExitLogisApi(), edit).then((res) => {
        if (res.code == "200") {
          this.$message.success("状态修改成功");
          // this.logslist();
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    async adDels() {
      const adDelsValue = await this.$confirm(
        "此操作将永久删除, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);
      if (adDelsValue !== "confirm") {
        return this.$message.info("取消删除");
      }
      if (adDelsValue === "confirm") {
        this.arrs.forEach((v) => {
          this.ids.push(v.id);
        });
        this.adDelsValues.id = this.ids.toString();
        postD(LogisticsSelectDelApi(), this.adDelsValues).then((res) => {
          if (res.code == "200") {
            this.$message.success("删除成功");
            this.logslist();
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
    async adDel(val) {
      const adDelOne = await this.$confirm(
        "此操作将永久删除, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);
      if (adDelOne !== "confirm") {
        return this.$message.info("取消删除");
      }
      if (adDelOne === "confirm") {
        this.DelId.id = val.id;
        postD(LogisticsSelectDelApi(), this.DelId).then((res) => {
          if (res.code == "200") {
            this.$message.success("删除成功");
            this.logslist();
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
.linker {
  background: #ffffff;
  border-radius: 3px 3px 3px 3px;
  opacity: 1;
  border: 1px solid #b5b2b2;
}
.tp {
  position: relative;
}
.cont {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>