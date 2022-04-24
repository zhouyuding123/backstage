<template>
  <div>
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
        <el-col :span="21"></el-col>
      </el-row>
    </div>
    <div class="memberTable">
      <vxe-table
        ref="xTable1"
        border
        :align="allAlign"
        :row-config="{ isHover: true }"
        :data="tableData"
        row-id="id"
        @checkbox-change="checkboxChangeEvent"
        @checkbox-all="checkboxChangeEvent"
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
        <vxe-column field="status" title="需求当前状态" align="center" width="80">
          <template v-slot="scoped">
            <div>
              {{ filterStatus(scoped.row.status) }}
            </div>
          </template>
        </vxe-column>
        <vxe-column
          field="create_time"
          title="创造时间"
          align="center"
        ></vxe-column>
        <vxe-column
          field="update_time"
          title="更新时间"
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
        demandIndexInterface: "Demand/index",
        selectDelInterface: "Demand/selectDel",
        demandDelInterface: "Demand/del",
      },
      // 批量删除
      ids: [],
      idL: {
        id: "",
      },
      //批量删除选中时将对象保存到arrs中
      arrs: [],
      //单个删除
      demandRemoveRowList: {
        id: "",
      },
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
      postD(this.url.demandIndexInterface).then((res) => {
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
        postD(this.url.selectDelInterface, this.idl).then((res) => {
          if (res.code !== 200) return this.$message.error("删除失败");
          this.$message.success("删除成功");
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
        postD(this.url.demandDelInterface, this.demandRemoveRowList).then(
          (res) => {
            if (res.code !== 200) return this.$message.error("删除失败");
            this.$message.success("删除成功");
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
  },
};
</script>

<style lang="less" scoped>
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
