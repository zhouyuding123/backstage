<template>
  <div class="backColor">
    <div class="memberDeleber">
      <div class="memberDelebers" v-if="show">
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="grid-content bg-purple">
              <div class="divText">关键词搜索:</div>
              <el-input
                v-model="search.keyword"
                placeholder="关键词搜索"
              ></el-input>
            </div>
          </el-col>
          <el-col :span="8"
            ><div class="grid-content bg-purple">
              <div class="divText">性别:</div>
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
          <el-col :span="8"
            ><div class="grid-content bg-purple">
              <div class="divText">VIP:</div>
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
        </el-row>
        <el-row :gutter="20" style="padding-top: 15px">
          <el-col :span="12"
            ><div class="grid-content bg-purple">
              <div class="block">
                <span class="demonstration">会员开始与结束时间</span>
                <el-date-picker
                  v-model="vipGetTime"
                  type="datetimerange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                >
                </el-date-picker>
              </div></div
          ></el-col>
          <el-col :span="12"
            ><div class="grid-content bg-purple">
              <el-row>
                <el-button type="success" @click="submitSearch">提交</el-button>
                <el-button type="info" @click="submitReset">重置</el-button>
              </el-row>
            </div></el-col
          >
        </el-row>
      </div>
    </div>
    <div class="memberDeleber">
      <el-row>
        <el-col :span="2"
          ><div class="grid-content bg-purple">
            <el-button type="danger" plain @click="vipBatchDelete"
              >批量删除</el-button
            >
          </div></el-col
        >
        <el-col :span="1"
          ><div class="grid-content bg-purple-light">
            <el-button @click="Refresh">刷新</el-button>
          </div></el-col
        >
        <el-col :span="1"
          ><div class="grid-content bg-purple">
            <vxe-button @click="exportSelectEvent">导出选中</vxe-button>
          </div></el-col
        >
        <el-col :span="19"><div class="grid-content bg-purple"></div></el-col>
        <el-col :span="1"
          ><div class="grid-content bg-purple-light">
            <el-button type="info" plain @click="showCont($event)" ref="btn1"
              >查询</el-button
            >
          </div></el-col
        >
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
export default {
  data() {
    return {
      tableData: [],
      allAlign: null,
      url: {
        indexInterface: "Users/index",
        editStatInterface: "Users/editStat",
        selectDelInterface: "Users/selectDel",
        delInterface: "Users/del",
      },
      //   分页
      page1: {
        offset: 1,
        limit: 10,
        totalResult: 0,
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
      value1: [],
      // 搜索展示开启关闭
      show: false,
      // 状态改变
      VipStatus: {
        id: "",
        status: "",
      },
      //批量删除选中的数组
      ids: {
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
  computed: {
    // 监听时间
    vipGetTime: {
      get: function () {
        if (this.search.vip_start_time) {
          return [this.search.vip_start_time, this.search.vip_end_time];
        } else {
          return this.value1;
        }
      },
      set: function (time) {
        this.search.vip_start_time = time[0].getTime() / 1000;
        this.search.vip_end_time = time[1].getTime() / 1000;
      },
    },
  },
  created() {
    // 会员列表
    this.indexValue();
  },
  methods: {
    // 初始会员列表
    indexValue() {
      postD(this.url.indexInterface).then((res) => {
        this.tableData = res.data;
        this.page1.totalResult = res.count;
      });
    },
    handlePageChange({ currentPage, pageSize }) {
      this.page1.offset = currentPage;
      this.page1.limit = pageSize;
      this.indexValue();
    },
    // 状态
    vipUserAuthChaged(status) {
      this.VipStatus.id = status.id;
      this.VipStatus.status = status.status;
      postD(this.url.editStatInterface, this.VipStatus).then((res) => {
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
    submitSearch() {
      this.vip_start_time = this.value1[0];
      this.vip_end_time = this.value1[1];
      postD(this.url.indexInterface, this.search).then((res) => {
        this.tableData = res.data;
      });
    },
    // 重置
    submitReset() {
      this.search.keyword = "";
      this.search.sex = "";
      this.search.is_vip = "";
      this.search.vip_start_time = "";
      this.search.vip_end_time = "";
    },
    // 搜索显示隐藏
    showCont() {
      this.show = !this.show;
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
          this.ids.id = v.id;
        });
        postD(this.url.selectDelInterface, this.ids).then((res) => {
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
        postD(this.url.delInterface, this.vipRemoveRowList).then((res) => {
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
.grid-content {
  float: left;
}
.divText {
  display: inline-block;
  text-align: left;
  font-size: 14px;
}
.el-input {
  width: 71%;
}
.memberTable {
  padding: 0 2.5% 0 2.5%;
}
</style>