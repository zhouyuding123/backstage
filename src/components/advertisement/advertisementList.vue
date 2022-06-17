<template>
  <div class="backColor">
    <div class="firstColor">
      <addcategory />
      <div style="padding-left: 10px">
        <el-button type="danger" @click="catDels">批量删除</el-button>
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
      >
      </vxe-table>
    </div>
  </div>
</template>

<script>
import {AdGetListApi} from "@/urls/advertisementUrl.js"
import {
  styleModify,
  styleModifytwo,
} from "@/assets/js/modifyStyle.js";
import { postD } from '@/api';
export default {
  data() {
    return {
        tableData:[],
        allAlign:null
    };
  },
  created() {
      this.adListValue()
  },
  methods: {
    tableRowStyle() {
      return styleModify();
    },
    tableStyle() {
      return styleModifytwo();
    },
    adListValue() {
        postD(AdGetListApi()).then(res=> {
            console.log(res);
            this.tableData = res.list
        })
    }
  },
};
</script>

<style lang="less" scoped>
.contentRight {
  padding-left: 90.5%;
}
.linker {
  background: #ffffff;
  border-radius: 3px 3px 3px 3px;
  opacity: 1;
  border: 1px solid #b5b2b2;
}
</style>