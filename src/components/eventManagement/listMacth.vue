<template>
  <div class="backColor">
    <div class="firstColor">
      <div>
        <el-button type="danger" plain>批量删除</el-button>
      </div>
      <div class="contentRight">
        <el-button type="info" plain ref="btn1">查询</el-button>
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
        <vxe-column width="80" align="center">
          <template v-slot="scoped">
            <el-image
              :src="
                'https://weisoutc.oss-cn-shanghai.aliyuncs.com/' +
                scoped.row.thumb
              "
              alt=""
              :preview-src-list="[
                'https://weisoutc.oss-cn-shanghai.aliyuncs.com/' +
                  scoped.row.thumb,
              ]"
              style="width: 40px; height: 40px"
              class="imgStyle"
            />
          </template>
        </vxe-column>
        <vxe-column
          field="title"
          title="赛事主题"
          width="150"
          align="center"
        ></vxe-column>
        <vxe-column
          field="mechanism"
          title="赛事机构"
          align="center"
        ></vxe-column>
        <vxe-column
          field="description"
          title="赛事简介"
          align="center"
        ></vxe-column>
        <vxe-column
          field="auth"
          title="审核状态"
          width="120"
          align="center"
          show-overflow="ellipsis"
        >
          <template v-slot="scoped">
            <div @click="companySetAuth(scoped.row)">
              <div
                class="clickHeader"
                :class="{
                  green: scoped.row.status === 1,
                  yellow: scoped.row.status == 0,
                  red: scoped.row.status === 2,
                  blue:scoped.row.status === 3
                }"
              >
                {{ filterStatus(scoped.row.status) }}
              </div>
            </div>
          </template>
        </vxe-column>

        <vxe-column
          field="create_time"
          title="创建时间"
          align="center"
          show-overflow="title"
        ></vxe-column>
        <vxe-column
          field="sign_time"
          title="报名时间"
          align="center"
          show-overflow="title"
        ></vxe-column>
        <vxe-column
          field="exh_time"
          title="展示时间"
          align="center"
          show-overflow="title"
        ></vxe-column>
        <vxe-column field="browse" title="浏览量" align="center"></vxe-column>
        <vxe-column title="操作" align="center"></vxe-column>
      </vxe-table>
    </div>
  </div>
</template>

<script>
import { postD } from "../../api/index.js";
import { styleModify, styleModifytwo } from "../../assets/js/modifyStyle.js";
export default {
  data() {
    return {
      allAlign: null,
      tableData: [],
      url: {
        listMacthInterface: "match/listMacth",
      },
    };
  },
  created() {
    this.MacthValue();
  },
  methods: {
    MacthValue() {
      postD(this.url.listMacthInterface).then((res) => {
        this.tableData = res.list;
      });
    },
    filterStatus(val) {
      if (val === 0) {
        return "等待平台审核";
      } else if (val === 1) {
        return "平台通过";
      } else if (val === 2) {
        return "驳回";
      } else if (val == 3) {
        return "结束";
      }
    },
    tableRowStyle() {
      styleModify();
    },
    tableStyle() {
      styleModifytwo();
    },
  },
};
</script>
<style lang="less" scoped>
.contentRight {
  padding-left: 90%;
}
</style>