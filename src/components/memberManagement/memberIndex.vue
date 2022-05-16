<template>
  <div class="backColor">
    <mernber-seatch
      v-show="seatchShow"
      @mernberSeatch="costPlannedAmountChange"
    />
    <div class="firstColor">
      <div>
        <el-button type="danger" plain @click="vipBatchDelete"
          >批量删除</el-button
        >
      </div>
      <div style="padding-left: 20px">
        <el-button @click="Refresh">刷新</el-button>
      </div>
      <div style="padding-left: 20px">
        <vxe-button @click="exportSelectEvent">导出选中</vxe-button>
      </div>
      <div class="contentRight">
        <el-button type="info" plain @click="showCont($event)" ref="btn1"
          ><span class="iconfont icon-sousuo"></span></el-button
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
        @checkbox-change="checkboxChangeEvent"
        @checkbox-all="checkboxChangeEvent"
        :row-style="tableRowStyle"
        :header-row-style="tableStyle"
      >
        <vxe-column
          align="center"
          type="checkbox"
          width="80"
          class="linker"
        ></vxe-column>
        <vxe-column type="seq" title="id" width="60"></vxe-column>
        <vxe-column field="username" title="用户名"></vxe-column>
        <vxe-column field="nickname" title="昵称"></vxe-column>
        <vxe-column field="tel" title="手机号"></vxe-column>
        <vxe-column field="is_vip" title="vip"></vxe-column>
        <vxe-column field="auth_open" title="状态" width="80" align="center">
          <template v-slot="scoped">
            <el-switch
              v-model="scoped.row.status"
              active-color="#13ce66"
              @change="vipUserAuthChaged(scoped.row)"
              :active-value="1"
              :inactive-value="0"
            ></el-switch>
          </template>
        </vxe-column>
        <vxe-column field="create_time" title="创建时间"></vxe-column>
        <vxe-column field="update_time" title="更新时间"></vxe-column>
        <vxe-column field="vip_start_time" title="vip开始时间"></vxe-column>
        <vxe-column field="vip_end_time" title="贵宾时间"></vxe-column>
        <vxe-column
          field="status"
          title="地位"
          width="80"
          align="center"
        ></vxe-column>
        <vxe-column title="操作">
          <template v-slot="scoped">
            <el-button type="danger" @click="vipRemoveRow(scoped.row)">
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
import { postD } from "../../api/index.js";
import mernberSeatch from "./merberSeatch/mernberSeatch.vue";
import {
  UsersIndexApi,
  UsersEditStatApi,
  UsersSelectDelApi,
  UsersDelApi,
} from "@/urls/usersUrl.js";
export default {
  components: {
    mernberSeatch,
  },
  data() {
    return {
      tableData: [],
      allAlign: null,
      //   分页
      page1: {
        offset: 1,
        limit: 10,
        totalResult: 0,
      },
      // 搜索展示开启关闭
      seatchShow: true,
      // 状态改变
      VipStatus: {
        id: "",
        status: "",
      },
      //批量删除选中的数组
      ids: [],
      selectDelValue: {
        id: "",
      },
      //批量删除选中时将对象保存到arrs中
      arrs: [],
      // 单个删除
      vipRemoveRowList: {
        id: "",
      },
    };
  },
  created() {
    // 会员列表
    this.indexValue();
  },
  methods: {
    // 初始会员列表
    indexValue() {
      postD(UsersIndexApi()).then((res) => {
        this.tableData = res.data;
        this.page1.totalResult = res.count;
      });
    },
    handlePageChange({ currentPage, pageSize }) {
      this.page1.offset = currentPage;
      this.page1.limit = pageSize;
      postD(UsersIndexApi(), this.page1).then((res) => {
        this.tableData = res.data;
      });
    },
    // 状态
    vipUserAuthChaged(status) {
      this.VipStatus.id = status.id;
      this.VipStatus.status = status.status;
      postD(UsersEditStatApi(), this.VipStatus).then((res) => {
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
      });
    },

    // 搜索显示隐藏
    showCont() {
      this.seatchShow = !this.seatchShow;
      this.$refs.btn1.$el.innerText;
    },
    // 批量删除
    checkboxChangeEvent(data) {
      this.arrs = data.records;
    },
    async vipBatchDelete() {
      const vipBatchDeletes = await this.$confirm(
        "此操作将永久删除管理, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);
      if (vipBatchDeletes !== "confirm") {
        return this.$message.info("取消删除");
      }
      if (vipBatchDeletes === "confirm") {
        this.arrs.forEach((v) => {
          this.ids.push(v.id);
        });
        this.selectDelValue.id = this.ids.toString();
        postD(UsersSelectDelApi(), this.selectDelValue).then((res) => {
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
          this.indexValue();
        });
      }
    },
    async vipRemoveRow(ider) {
      const vipRemoveRows = await this.$confirm(
        "此操作将永久删除, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);
      if (vipRemoveRows !== "confirm") {
        return this.$message.info("取消删除");
      }
      if (vipRemoveRows === "confirm") {
        this.vipRemoveRowList.id = ider.id;
        postD(UsersDelApi(), this.vipRemoveRowList).then((res) => {
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
          this.indexValue();
        });
      }
    },
    Refresh() {
      this.indexValue();
    },
    exportSelectEvent() {
      this.$refs.xTable1.exportData({
        data: this.$refs.xTable1.getCheckboxRecords(),
      });
    },
    tableRowStyle() {
      return "background: #FFFFFF;box-shadow: 0px 2px 5px 1px rgba(0, 0, 0, 0.05);border-radius: 10px 10px 10px 10px;opacity: 1;";
    },
    tableStyle() {
      return "box-shadow: 0px 2px 5px 1px rgba(0, 0, 0, 0.05);border-radius: 10px 10px 10px 10px;opacity: 1;";
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
  .firstColor {
    padding: 20px 20px 0 20px;
    width: 100%;
    display: flex;
    flex-flow: row;
    .buttonStyle {
      line-height: 48px;
      width: 170px;
      height: 48px;
      background: red;
      box-shadow: 2px 5px 20px 1px rgba(58, 203, 233, 0.15);
      border-radius: 10px 10px 10px 10px;
      opacity: 1;
      cursor: pointer;
      p {
        font-size: 14px;
        font-weight: 500;
        color: #ffffff;
      }
    }
  }
  .twons {
    padding: 20px;
  }
}
.contentRight {
  padding-left: 80.3%;
}
</style>