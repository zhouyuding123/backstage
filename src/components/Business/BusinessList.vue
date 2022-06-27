<template>
  <div class="backColor">
    <business-seatch
      v-show="seatchShow"
      @BusinessSeatcher="costPlannedAmountChange"
    />
    <div class="firstColor">
      <div>
        <el-button type="danger" @click="businessDels">批量删除</el-button>
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
          width="200"
          align="center"
        ></vxe-column>
        <vxe-column
          field="in_code"
          title="邀请码"
          width="80"
          align="center"
        ></vxe-column>
        <vxe-column field="description" title="描述" align="center" width="80">
          <template v-slot="scoped">
            <div class="clickHeader" @click="descriptionContent(scoped.row)">
              ...
            </div>
          </template>
        </vxe-column>
        <vxe-column field="is_vip" title="VIP" width="80" align="center">
          <template v-slot="scoped">
            <div
              class="clickHeader"
              :class="{
                green: scoped.row.is_vip === 1,
                red: scoped.row.is_vip == 0,
              }"
            >
              {{ filterIs_vip(scoped.row.is_vip) }}
            </div>
          </template>
        </vxe-column>
        <vxe-column field="status" title="账号状态" align="center">
          <template v-slot="scoped">
            <el-switch
              v-model="scoped.row.status"
              active-color="#13ce66"
              @change="statusChaged(scoped.row)"
              :active-value="1"
              :inactive-value="0"
            ></el-switch>
          </template>
        </vxe-column>
        <vxe-column
          title="审核门店状态"
          width="120"
          align="center"
          show-overflow="ellipsis"
        >
          <template v-slot="scoped">
            <div @click="companySetStatus(scoped.row)">
              <div
                class="clickHeader"
                :class="{
                  green: scoped.row.auth === 2,
                  yellow: scoped.row.auth == 1,
                  red: scoped.row.auth === 3,
                }"
              >
                {{ filterAuth(scoped.row.auth) }}
              </div>
            </div>
          </template>
        </vxe-column>
        <vxe-column
          field="vip_start_time"
          title="会员开始时间"
          align="center"
          show-overflow="title"
        ></vxe-column>
        <vxe-column
          field="vip_end_time"
          title="会员结束时间"
          align="center"
          show-overflow="title"
        ></vxe-column>
        <vxe-column
          field="create_time"
          title="创建时间"
          align="center"
          show-overflow="title"
        ></vxe-column>
        <vxe-column title="操作" align="center" show-overflow="title">
          <template v-slot="scoped">
            <div class="postDyex">
              <business-del class="postDyexer" :delOneSusiness="scoped.row" />
              <business-detils
                class="postDyexer"
                :detilsSusinesser="scoped.row"
              />
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
      >
      </vxe-pager>
    </div>
    <el-dialog v-model="dialogdescriptionContent" width="30%">
      <span>{{ dialogdescriptionContentValue.description }}</span>
      <div style="padding-top: 30px">
        <span>
          <el-button type="primary" @click="dialogdescriptionContent = false"
            >返回</el-button
          >
        </span>
      </div>
    </el-dialog>
    <el-dialog v-model="SetStatus" width="60%">
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
        <el-descriptions-item label="邀请码" align="center">{{
          setDetilValue.in_code
        }}</el-descriptions-item>
        <el-descriptions-item label="VIP" align="center">
          <div
            :class="{
              green: setDetilValue.is_vip === 1,
              red: setDetilValue.is_vip == 0,
            }"
          >
            {{ filterIs_vip(setDetilValue.is_vip) }}
          </div>
        </el-descriptions-item>
        <el-descriptions-item label="门店认证" align="center">
          <div
            :class="{
              green: setDetilValue.auth === 2,
              yellow: setDetilValue.auth == 1,
              red: setDetilValue.auth === 3,
            }"
          >
            {{ filterAuth(setDetilValue.auth) }}
          </div>
        </el-descriptions-item>
        <el-descriptions-item label="创建时间" align="center">{{
          setDetilValue.create_time
        }}</el-descriptions-item>
        <el-descriptions-item label="更新时间" align="center">{{
          setDetilValue.update_time
        }}</el-descriptions-item>
        <el-descriptions-item label="会员开始时间" align="center">{{
          setDetilValue.vip_start_time
        }}</el-descriptions-item>
        <el-descriptions-item label="会员结束时间" align="center">{{
          setDetilValue.vip_end_time
        }}</el-descriptions-item>
      </el-descriptions>

      <div style="padding-top: 15px">请选择</div>
      <el-radio-group v-model="SetStatusRadio.auth" class="SetStatusRadioStyle">
        <el-radio :label="1">已认证待审核</el-radio>
        <el-radio :label="2">审核通过</el-radio>
        <el-radio :label="3">审核不通过</el-radio>
      </el-radio-group>
      <div style="padding-top: 15px">
        <span>
          <el-button @click="SetStatus = false">取 消</el-button>
          <el-button type="primary" @click="SetStatusValue">确 定</el-button>
        </span>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  BusinessIndexApi,
  businessEditStatApi,
  businessSetAuthApi,
  BusinessSelectDelApi,
} from "@/urls/busomessUrl.js";
import {
  styleModify,
  styleModifytwo,
  imgUrl,
} from "@/assets/js/modifyStyle.js";
import { postD } from "@/api";
import BusinessSeatch from "./BusinessSeatch/BusinessSeatch.vue";
import businessDel from "./BusinessSeatch/businessDel.vue";
import BusinessDetils from "./BusinessSeatch/businessDetils.vue";
export default {
  components: { BusinessSeatch, businessDel, BusinessDetils },
  provide() {
    return {
      busomessValue: this.busomessValue,
    };
  },
  data() {
    return {
      imagesValue: "",
      seatchShow: true,
      allAlign: null,
      tableData: [],
      page1: {
        offset: 1,
        limit: 10,
        totalResult: 0,
      },
      dialogdescriptionContent: false,
      dialogdescriptionContentValue: [],
      //   状态
      statusSwitch: {
        id: "",
        status: "",
      },
      //   门店审核认证
      SetStatus: false,
      SetStatusRadio: {
        id: "",
        auth: "",
      },
      setDetilValue: [],
      // 批量删除
      ids: [],
      //选中时将对象保存到arrs中
      arrs: [],
      activityDelsValues: {
        id: "",
      },
    };
  },
  created() {
    this.busomessValue();
  },
  methods: {
    showCont() {
      this.seatchShow = !this.seatchShow;
      this.$refs.btn1.$el.innerText;
    },
    tableRowStyle() {
      return styleModify();
    },
    tableStyle() {
      return styleModifytwo();
    },
    busomessValue() {
      postD(BusinessIndexApi()).then((res) => {
        this.tableData = res.data;
        this.imagesValue = imgUrl();
        this.page1.totalResult = res.count;
      });
    },
    // 分页
    handlePageChangeActivity({ currentPage, pageSize }) {
      this.page1.offset = currentPage;
      this.page1.limit = pageSize;
      postD(BusinessIndexApi(), this.page1).then((res) => {
        this.tableData = res.data;
        this.page1.totalResult = res.count;
      });
    },
    descriptionContent(data) {
      this.dialogdescriptionContent = true;
      this.dialogdescriptionContentValue = data;
    },
    filterIs_vip(val) {
      if (val == 0) {
        return "非Vip";
      } else if (val == 1) {
        return "Vip";
      }
    },
    // 状态
    statusChaged(data) {
      this.statusSwitch.id = data.id;
      this.statusSwitch.status = data.status;
      postD(businessEditStatApi(), this.statusSwitch).then((res) => {
        if (res.code == "200") {
          this.$message.success("状态修改成功");
          this.busomessValue();
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
    // 门店状态
    filterAuth(val) {
      if (val == 1) {
        return "已认证待审核";
      } else if (val == 2) {
        return "审核通过";
      } else if (val == 3) {
        return "审核不通过";
      }
    },
    companySetStatus(data) {
      this.SetStatus = true;
      this.SetStatusRadio.id = data.id;
      this.SetStatusRadio.auth = data.auth;
      this.setDetilValue = data;
    },
    SetStatusValue() {
      postD(businessSetAuthApi(), this.SetStatusRadio).then((res) => {
        if (res.code == "200") {
          this.$message.success("状态修改成功");
          this.SetStatus = false;
          this.busomessValue();
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
    async costPlannedAmountChange(param1) {
      console.log(param1);
      this.tableData = param1;
    },
    // 批量删除
    checkboxChangeEvent(data) {
      this.arrs = data.records;
    },
    async businessDels() {
      const businessDelsId = await this.$confirm(
        "此操作将永久删除管理, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);
      if (businessDelsId !== "confirm") {
        return this.$message.info("取消删除");
      }
      if (businessDelsId === "confirm") {
        this.arrs.forEach((v) => {
          this.ids.push(v.id);
        });
        this.activityDelsValues.id = this.ids.toString();
        postD(BusinessSelectDelApi(), this.activityDelsValues).then((res) => {
          if (res.code == "200") {
            this.$message.success("状态修改成功");
            this.busomessValue();
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
  },
};
</script>

<style lang="less" scoped>
.contentRight {
  padding-left: 90.7%;
}
.linker {
  background: #ffffff;
  border-radius: 3px 3px 3px 3px;
  opacity: 1;
  border: 1px solid #b5b2b2;
}
</style>