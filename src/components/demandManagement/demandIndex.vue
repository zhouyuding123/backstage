<template>
  <div class="backColor">
    <demand-seatch
      v-show="seatchShow"
      @demandSeatchValue="costPlannedAmountChange"
    />
    <div class="memberDeleber">
      <el-row>
        <el-col :span="2"
          ><div>
            <el-button type="danger" plain @click="demandIndexDelete"
              >批量删除</el-button
            >
          </div></el-col
        >
        <el-col :span="1"
          ><div class="grid-content bg-purple-light">
            <el-button @click="Refresh">刷新</el-button>
          </div></el-col
        >
        <el-col :span="20"></el-col>
        <el-col :span="1">
          <div class="contentRight">
            <el-button type="info" plain ref="btn1" @click="showCont($event)"
              ><span class="iconfont icon-sousuo"></span></el-button
            >
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="memberTable">
      <vxe-table
        round
        border="true"
        ref="xTable1"
        :align="allAlign"
        :row-config="{ isHover: true }"
        :data="tableData"
        row-id="id"
        @checkbox-change="checkboxChangeEvent"
        @checkbox-all="checkboxChangeEvent"
        :row-style="tableRowStyle"
        :header-row-style="tableStyle"
      >
        <vxe-column
          align="center"
          type="checkbox"
          width="50"
          class="linker"
        ></vxe-column>
        <vxe-column
          type="seq"
          title="序号"
          width="60"
          align="center"
        ></vxe-column>
        <vxe-column
          field="id"
          title="id"
          width="60"
          align="center"
        ></vxe-column>
        <vxe-column field="username" title="账号" align="center"></vxe-column>
        <vxe-column
          field="nickname"
          title="发布者昵称"
          align="center"
        ></vxe-column>
        <vxe-column field="type" title="端口" align="center">
          <template v-slot="scoped">
            <div>
              {{ filterType(scoped.row.type) }}
            </div>
          </template>
        </vxe-column>
        <vxe-column field="style" title="需求" align="center" width="80">
          <template v-slot="scoped">
            <div>
              {{ filterStyle(scoped.row.style) }}
            </div>
          </template>
        </vxe-column>
        <vxe-column field="title" title="需求标题" align="center"></vxe-column>
        <vxe-column field="budget" title="需算" align="center"></vxe-column>
        <vxe-column
          field="description"
          title="需求描述"
          align="center"
        ></vxe-column>
        <vxe-column
          field="status"
          title="需求当前状态"
          align="center"
          width="80"
        >
          <template v-slot="scoped">
            <div>
              {{ filterStatus(scoped.row.status) }}
            </div>
          </template>
        </vxe-column>
        <vxe-column
          field="create_time"
          title="创建时间"
          align="center"
        ></vxe-column>
        <vxe-column title="操作" align="center">
          <template v-slot="scoped">
            <el-button type="danger" @click="demandRemoveRow(scoped.row)">
              删除
            </el-button>
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
        @page-change="handlePageChange"
      >
      </vxe-pager>
    </div>
  </div>
</template>

<script>
import demandSeatch from "./demandSeatch/demandSeatch.vue";
import { postD } from "../../api/index.js";
import {
  DemandIndexApi,
  DemandDelApi,
  DemandSelectDelApi,
} from "@/urls/demandUrl.js";
export default {
  provide() {
    return {
      demandIndexValue: this.demandIndexValue,
    };
  },
  components: {
    demandSeatch,
  },
  data() {
    return {
      tableData: [],
      allAlign: null,
      // 批量删除
      ids: [],
      BatchDeletedContent: {
        id: "",
      },
      //批量删除选中时将对象保存到arrs中
      arrs: [],
      //单个删除
      demandRemoveRowList: {
        id: "",
      },
      // 分页
      page1: {
        offset: 1,
        limit: 10,
        totalResult: 0,
      },
      seatchShow: true,
    };
  },
  created() {
    this.demandIndexValue();
  },
  methods: {
    // 刷新键
    Refresh() {
      this.demandIndexValue();
    },
    // 获取列表
    demandIndexValue() {
      postD(DemandIndexApi()).then((res) => {
        this.tableData = res.data;
        this.page1.totalResult = res.count;
      });
    },
    handlePageChange({ currentPage, pageSize }) {
      this.page1.offset = currentPage;
      this.page1.limit = pageSize;
      postD(DemandIndexApi(),this.page1).then((res) => {
        this.tableData = res.data;
      });
    },
    // 批量删除
    checkboxChangeEvent(data) {
      this.arrs = data.records;
    },
    async demandIndexDelete() {
      const demandIndexDeletes = await this.$confirm(
        "此操作将永久删除管理, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);
      if (demandIndexDeletes !== "confirm") {
        return this.$message.info("取消删除");
      }
      if (demandIndexDeletes === "confirm") {
        this.arrs.forEach((v) => {
          this.ids.push(v.id);
        });
        this.BatchDeletedContent.id = this.ids.toString();
        postD(DemandSelectDelApi(), this.BatchDeletedContent).then((res) => {
          if (res.code == "200") {
            this.$message.success("状态修改成功");
          } else if (res.code == "-200") {
            this.$message.error("参数错误，或暂无数据");
          } else if (res.code == "-201") {
            this.$message.error("未登陆");
          } else if (res.code == "-203") {
            this.$message.error("对不起，你没有此操作权限");
          } else {
            this.$message.error("注册失败，账号已存在");
          }
          this.demandIndexValue();
        });
      }
    },
    async demandRemoveRow(data) {
      const demandRemoveRows = await this.$confirm(
        "此操作将永久删除, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);
      if (demandRemoveRows !== "confirm") {
        return this.$message.info("取消删除");
      }
      if (demandRemoveRows === "confirm") {
        this.demandRemoveRowList.id = data.id;
        postD(DemandDelApi(), this.demandRemoveRowList).then(
          (res) => {
            if (res.code == "200") {
              this.$message.success("状态修改成功");
            } else if (res.code == "-200") {
              this.$message.error("参数错误，或暂无数据");
            } else if (res.code == "-201") {
              this.$message.error("未登陆");
            } else if (res.code == "-203") {
              this.$message.error("对不起，你没有此操作权限");
            } else {
              this.$message.error("注册失败，账号已存在");
            }
            this.demandIndexValue();
          }
        );
      }
    },
    // 端口渲染
    filterType(val) {
      if (val === 1) {
        return "用户端账号 ";
      } else if (val === 2) {
        return "设计师端账号";
      } else if (val === 3) {
        return "终端门店端账号";
      } else if (val === 4) {
        return "批发代理商端";
      } else if (val === 5) {
        return "骑手端";
      } else if (val === 6) {
        return "原材料供应商";
      } else if (val === 7) {
        return "企业端";
      } else if (val === 8) {
        return "代工厂端账号";
      }
    },
    filterStyle(val) {
      if (val === 1) {
        return "设计需求 ";
      } else if (val === 2) {
        return "代工需求";
      }
    },
    filterStatus(val) {
      if (val === 1) {
        return "已匹配 ";
      } else if (val === 2) {
        return "处理中";
      } else if (val === 3) {
        return "已完成";
      } else {
        return "待匹配";
      }
    },
    tableRowStyle() {
      return "background: #FFFFFF;box-shadow: 0px 2px 5px 1px rgba(0, 0, 0, 0.05);border-radius: 10px 10px 10px 10px;opacity: 1;";
    },
    tableStyle() {
      return "box-shadow: 0px 2px 5px 1px rgba(0, 0, 0, 0.05);border-radius: 10px 10px 10px 10px;opacity: 1;";
    },
    showCont() {
      this.seatchShow = !this.seatchShow;
      this.$refs.btn1.$el.innerText;
    },
    async costPlannedAmountChange(param1) {
      this.tableData = param1;
    },
  },
};
</script>

<style lang="less" scoped>
.backColor {
  background: #f9f9f9;
  width: 100%;
  height: 100%;
}
.memberDeleber {
  text-align: left;
  padding: 1% 2.5% 1% 2.5%;
}
.memberDelebers {
  text-align: left;
  padding: 0 5% 0 5%;
}
.memberTable {
  padding: 0 2.5% 0 2.5%;
}
</style>
