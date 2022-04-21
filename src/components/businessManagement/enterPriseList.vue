<template>
  <div class="backgruond">
    <div class="Enterprise-configuration">
      <div class="bodyser">
        <el-row :gutter="20">
          <el-col :span="2"
            ><div class="grid-content bg-purple">
              <el-button type="danger" plain @click="enterpriseDeletes"
                >批量删除</el-button
              >
            </div></el-col
          >
          <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
          <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
          <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
        </el-row>
        <div class="tableList">
        <vxe-table
          ref="xTable1"
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
          <vxe-column type="seq" title="序号" width="60"></vxe-column>
          <vxe-column field="id" title="id"  width="60" align="center"></vxe-column>
          <vxe-column field="username" title="用户名"  width="80" align="center"></vxe-column>
          <vxe-column field="nickname" title="昵称" width="120" align="center"></vxe-column>
          <vxe-column  title="头像" width="120" align="center">
              <template v-slot="scoped">
              <img :src="scoped.row.headimage" alt="" width="100" height="47" class="textphoto">

              </template>
          </vxe-column>
          <vxe-column field="tel" title="手机号" width="110" align="center"></vxe-column>
          <vxe-column field="status" title="状态" width="100" align="center"></vxe-column>
          <vxe-column field="is_vip" title="Vip" width="100" align="center"></vxe-column>
          <vxe-column field="create_time" title="创建时间" width="150" align="center"></vxe-column>
        <vxe-column field="update_time" title="更新时间" width="150" align="center"></vxe-column>
        <vxe-column field="vip_start_time" title="vip开始时间" width="150" align="center"></vxe-column>
        <vxe-column field="vip_end_time" title="贵宾时间" width="150" align="center"></vxe-column>
        </vxe-table>
      </div>
      </div>
      
    </div>
  </div>
</template>

<script>
import { postD } from "../../api/index.js";
export default {
  data() {
    return {
      url: {
        CompanyInterface: "Company/index",
      },
      tableData: [],
      allAlign: null,
    };
  },
  created() {
    this.enterprise();
  },
  methods: {
    enterprise() {
      postD(this.url.CompanyInterface).then((res) => {
        this.tableData = res.data;
      });
    },
    enterpriseDeletes() {
      console.log(123);
    },
  },
};
</script>
<style lang="less" scoped>
.backgruond {
  width: 100%;
  height: 100%;
  background: rgb(241, 244, 246);
  position: relative;
}
.Enterprise-configuration {
  padding: 1% 2.5% 1% 2.5%;
  .bodyser {
    padding-top: 1.5%;
    background-color: white;
    .tableList {
        text-align: center;
      margin: 2% 0 1% 0;
    }
  }
}

</style>