<template>
  <div class="backColor">
    <activity-seatch
      v-show="seatchShow"
      @activitySeatch="costPlannedAmountChange"
    />
    <div class="firstColor">
      <add-activity />
      <div style="padding-left: 20px">
        <el-button type="danger" @click="activityDels">批量删除</el-button>
      </div>
      <div class="contentRight">
        <el-button type="info" ref="btn1" @click="showCont($event)"
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
          width="110"
          align="center"
        ></vxe-column>
        <vxe-column
          field="title"
          title="标题"
          width="240"
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
            <div @click="companySetStatus(scoped.row)">
              <div
                class="clickHeader"
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
            <div class="postDyex">
              <activity-detil :detialFort="scoped.row" class="postDyexer" />
              <activity-del :delFunction="scoped.row" class="postDyexer" />
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
    <el-dialog title="提示" v-model="SetStatus" width="50%">
      <el-descriptions direction="vertical" :column="5" border>
        <el-descriptions-item label="用户名" align="center">{{
          setDetilValue.username
        }}</el-descriptions-item>
        <el-descriptions-item label="昵称" align="center">{{
          setDetilValue.nickname
        }}</el-descriptions-item>
        <el-descriptions-item label="头像" align="center">
          <el-image
            :src="imagesValue + setDetilValue.headimage"
            :preview-src-list="[imagesValue + setDetilValue.headimage]"
            style="width: 40px; height: 40px"
            class="stylecss"
          />
        </el-descriptions-item>
        <el-descriptions-item label="活动类型" align="center">
          <div
            :class="{
              green: setDetilValue.category === 1,
              yellow: setDetilValue.category == 2,
            }"
          >
            {{ filterCategory(setDetilValue.category) }}
          </div>
        </el-descriptions-item>
        <el-descriptions-item label="活动标题" align="center">{{
          setDetilValue.title
        }}</el-descriptions-item>
        <el-descriptions-item label="开始时间" align="center">{{
          setDetilValue.start_time
        }}</el-descriptions-item>
        <el-descriptions-item label="结束时间" align="center">{{
          setDetilValue.end_time
        }}</el-descriptions-item>
        <el-descriptions-item label="活动内容" align="center">{{
          setDetilValue.content
        }}</el-descriptions-item>
        <el-descriptions-item label="具体规则" align="center">{{
          setDetilValue.rule
        }}</el-descriptions-item>
        <el-descriptions-item label="海报" align="center">
          <el-image
            :src="imagesValue + setDetilValue.poster"
            :preview-src-list="[imagesValue + setDetilValue.poster]"
            style="width: 40px; height: 40px"
            class="stylecss"
          />
        </el-descriptions-item>
        <el-descriptions-item label="封面" align="center">
          <el-image
            :src="imagesValue + setDetilValue.thumb"
            :preview-src-list="[imagesValue + setDetilValue.thumb]"
            style="width: 40px; height: 40px"
            class="stylecss"
          />
        </el-descriptions-item>
        <el-descriptions-item label="奖项" align="center">
          <div v-for="(item, index) in detial" :key="index">
            奖项:{{ item.name }}个数: {{ item.amount }}奖品:{{ item.item }}
          </div>
        </el-descriptions-item>
        <el-descriptions-item label="开关" align="center">
          <div
            :class="{
              green: setDetilValue.is_open === 1,
              red: setDetilValue.is_open == 0,
            }"
          >
            {{ filterIs_open(setDetilValue.is_open) }}
          </div>
        </el-descriptions-item>
        <el-descriptions-item label="单用户的抽奖次数限制" align="center">
          {{ setDetilValue.luck_count }}
        </el-descriptions-item>
        <el-descriptions-item label="单次抽奖消耗积分" align="center">
          {{ setDetilValue.integral }}
        </el-descriptions-item>
        <el-descriptions-item label="浏览量" align="center">
          {{ setDetilValue.browse }}
        </el-descriptions-item>
        <el-descriptions-item label="是否投票活动" align="center">
          <div
            :class="{
              green: setDetilValue.is_voto === 1,
              red: setDetilValue.is_voto == 2,
            }"
          >
            {{ filterIs_voto(setDetilValue.is_voto) }}
          </div>
        </el-descriptions-item>
      </el-descriptions>
      <div style="padding-top: 15px">请选择</div>
      <el-radio-group
        v-model="SetStatusRadio.status"
        class="SetStatusRadioStyle"
      >
        <el-radio :label="0">等待平台审核</el-radio>
        <el-radio :label="1">平台通过，进行中</el-radio>
        <el-radio :label="2">驳回</el-radio>
        <el-radio :label="3">结束</el-radio>
      </el-radio-group>
      <div style="padding-top: 15px">
        <span class="dialog-footer">
          <el-button @click="SetStatus = false">取 消</el-button>
          <el-button type="primary" @click="SetStatusValue">确 定</el-button>
        </span>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import activityDel from "./activitySeatch/activityDel.vue";
import activityDetil from "./activitySeatch/activityDetil.vue";
import activitySeatch from "./activitySeatch/activitySeatch.vue";
import addActivity from "./activitySeatch/addActivity.vue";
import { postD } from "../../api/index.js";
import {
  ActivityListActivityApi,
  ActivitySelectDelApi,
  activityStateApi,
  activitySetStatusApi,
} from "@/urls/activityUrl.js";
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
    addActivity,
    activityDel,
  },
  data() {
    return {
      SetStatusRadio: {
        id: "",
        status: "",
      },
      SetStatus: false,
      imagesValue: "",
      allAlign: null,
      tableData: [],
      // 分页
      page1: {
        offset: 1,
        limit: 10,
        totalResult: 0,
      },
      seatchShow: true,
      // 批量删除
      ids: [],
      //选中时将对象保存到arrs中
      arrs: [],
      activityDelsValues: {
        id: "",
      },
      // 状态
      companyIsopen: {
        id: "",
        is_open: "",
      },
      setDetilValue: [],
      detial: "",
      votoValue: "",
      voto_configValue: "",
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
      postD(ActivityListActivityApi()).then((res) => {
        this.tableData = res.list;
        this.imagesValue = imgUrl();
        this.page1.totalResult = res.count;
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
        return "投票";
      } else if (val === 1) {
        return "非投票";
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
    // 分页
    handlePageChangeActivity({ currentPage, pageSize }) {
      this.page1.offset = currentPage;
      this.page1.limit = pageSize;
      postD(ActivityListActivityApi(), this.page1).then((res) => {
        this.tableData = res.list;
        this.page1.totalResult= res.count
      });
    },
    showCont() {
      this.seatchShow = !this.seatchShow;
      this.$refs.btn1.$el.innerText;
    },
    async costPlannedAmountChange(param1) {
      this.tableData = param1;
    },
    // 批量删除
    checkboxChangeEvent(data) {
      this.arrs = data.records;
    },
    async activityDels() {
      const activityDelsValuesId = await this.$confirm(
        "此操作将永久删除管理, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);
      if (activityDelsValuesId !== "confirm") {
        return this.$message.info("取消删除");
      }
      if (activityDelsValuesId === "confirm") {
        this.arrs.forEach((v) => {
          this.ids.push(v.id);
        });
        this.activityDelsValues.id = this.ids.toString();
        postD(ActivitySelectDelApi(), this.activityDelsValues).then((res) => {
          if (res.code == "200") {
            this.$message.success("状态修改成功");
            this.activityListValue();
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
    companySetStatus(data) {
      this.SetStatus = true;
      this.SetStatusRadio.id = data.id;
      this.SetStatusRadio.status = data.status;
      this.setDetilValue = data;
      this.detial = data.prize;
      this.votoValue = data.voto;
      this.voto_configValue = data.voto_config;
    },
    is_openChaged(data) {
      this.companyIsopen.id = data.id;
      this.companyIsopen.is_open = data.is_open;
      console.log(this.companyIsopen);
      postD(activityStateApi(), this.companyIsopen).then((res) => {
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
    SetStatusValue() {
      postD(activitySetStatusApi(), this.SetStatusRadio).then((res) => {
        if (res.code == "200") {
          this.$message.success("状态修改成功");
          this.SetStatus = false;
          this.activityListValue();
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
    filterCategory(val) {
      if (val === 1) {
        return "普通活动";
      } else if (val === 2) {
        return "评选活动";
      }
    },
    filterIs_open(val) {
      if (val === 0) {
        return "关闭";
      } else if (val === 1) {
        return "开启";
      }
    },
    filterIs_voto(val) {
      if (val === 0) {
        return "不是";
      } else if (val === 1) {
        return "是";
      }
    },
    filterMethod(val) {
      if (val === 0) {
        return "单选";
      } else if (val === 1) {
        return "最多选两项";
      } else if (val === 2) {
        return "最多选三项";
      } else if (val === 3) {
        return "最多选四项";
      } else if (val === 4) {
        return "最多选五项";
      }
    },
    filterRepeat(val) {
      if (val === 0) {
        return "不允重复";
      } else if (val === 1) {
        return "每天限制次数";
      } else if (val === 2) {
        return "总共限制次数";
      }
    },
    filterIs_detail(val) {
      if (val === 0) {
        return "不限制";
      } else if (val === 1) {
        return "限制";
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
/deep/ .el-date-editor {
  position: relative;
  .el-input__prefix {
    display: none;
  }
}
.SetStatusRadioStyle {
  padding-top: 15px;
}
</style>