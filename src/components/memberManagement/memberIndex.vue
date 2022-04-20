<template>
  <div>
    <div>1</div>
    <div class="memberDeleber">
      <el-row>
        <el-col :span="6"
          ><div class="grid-content bg-purple">
            <el-button type="danger" plain>批量删除</el-button>
          </div></el-col
        >
        <el-col :span="6"
          ><div class="grid-content bg-purple-light"></div
        ></el-col>
        <el-col :span="10"><div class="grid-content bg-purple"></div></el-col>
        <el-col :span="1"
          ><div class="grid-content bg-purple-light">
            <el-button type="info" plain>查询</el-button>
          </div></el-col
        >
      </el-row>
    </div>
    <div class="memberDeleber">
      <vxe-table
        border
        :align="allAlign"
        :row-config="{ isHover: true }"
        :data="tableData"
        row-id="id"
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
        <vxe-column title="操作"></vxe-column>
      </vxe-table>
      <vxe-pager
        :current-page.sync="page1.offset"
        :page-size.sync="page1.limit"
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
      },
      //   分页
      page1: {
        offset: 1,
        limit: 10,
        totalResult: 0,
      },
    };
  },
  created() {
    // 会员列表
    this.indexValue();
  },
  methods: {
    // 会员列表
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
  },
};
</script>

<style lang="less" scoped>
.memberDeleber {
  text-align: left;
  padding: 2.5%;
}
</style>