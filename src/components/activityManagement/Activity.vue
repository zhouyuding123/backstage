<template>
  <div class="backColor">
    <activity-seatch />
    <div class="firstColor">
      <div>
        <el-button type="success">发布活动</el-button>
      </div>
      <div style="padding-left: 20px">
        <el-button type="danger">批量删除</el-button>
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
          width="120"
          align="center"
        ></vxe-column>
        <vxe-column
          field="title"
          title="标题"
          width="250"
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
            <activity-detil :detialFort = 'scoped.row' />
          </template>
          
        </vxe-column>
      </vxe-table>
    </div>
  </div>
</template>

<script>
import activityDetil from "./activitySeatch/activityDetil.vue";
import activitySeatch from "./activitySeatch/activitySeatch.vue";
import { postD } from "../../api/index.js";
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
  },
  data() {
    return {
      imagesValue: "",
      url: {
        listActivityInterface: "Activity/listActivity",
      },
      allAlign: null,
      tableData: [],
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
      postD(this.url.listActivityInterface).then((res) => {
        this.tableData = res.list;
        this.imagesValue = imgUrl();
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
        return "非投票";
      } else if (val === 1) {
        return "投票";
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
</style>