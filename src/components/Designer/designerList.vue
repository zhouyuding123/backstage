<template>
  <div class="backColor">
    <designer-seatch v-show="seatchShow" @designerChange ="costPlannedAmountChange"  />
    <div class="firstColor">
      <div>
        <el-button type="danger" plain @click="designerDelsList">批量删除</el-button>
      </div>
      <div class="contentRight">
        <el-button type="info" plain ref="btn1" @click="showCont($event)"
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
        <vxe-column width="80" align="center">
          <template v-slot="scoped">
            <el-image
              :src="
                'https://weisoutc.oss-cn-shanghai.aliyuncs.com/' +
                scoped.row.headimage
              "
              alt=""
              :preview-src-list="[
                'https://weisoutc.oss-cn-shanghai.aliyuncs.com/' +
                  scoped.row.headimage,
              ]"
              style="width: 40px; height: 40px"
              class="imgStyle"
            />
          </template>
        </vxe-column>
        <vxe-column
          field="name"
          title="名字"
          width="80"
          align="center"
        ></vxe-column>
        <vxe-column
          field="nickname"
          title="昵称"
          width="150"
          align="center"
        ></vxe-column
        ><vxe-column
          field="in_code"
          title="邀请码"
          width="80"
          align="center"
        ></vxe-column
        ><vxe-column
          field="tel"
          title="电话"
          width="150"
          align="center"
        ></vxe-column
        ><vxe-column field="status" title="status" width="80" align="center">
          <template v-slot="scoped">
            <el-switch
              v-model="scoped.row.status"
              active-color="#13ce66"
              @change="editStatChange(scoped.row)"
              :active-value="1"
              :inactive-value="0"
            ></el-switch>
          </template> </vxe-column
        ><vxe-column field="is_vip" title="VIP" width="80" align="center">
          <template v-slot="scoped">
            <div>
              {{ filterStyle(scoped.row.is_vip) }}
            </div>
          </template> </vxe-column
        ><vxe-column
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
                  green: scoped.row.auth === 2,
                  yellow: scoped.row.auth == 1,
                  red: scoped.row.auth === 0,
                }"
              >
                {{ filterStyles(scoped.row.auth) }}
              </div>
            </div>
          </template>
        </vxe-column>
        <vxe-column
          field="vip_start_time"
          title="vip开始时间"
          align="center"
          show-overflow="title"
        ></vxe-column>
        <vxe-column
          field="vip_end_time"
          title="vip结束时间"
          align="center"
          show-overflow="title"
        ></vxe-column>
        <vxe-column
          field="create_time"
          title="创建时间"
          show-overflow="title"
          align="center"
        ></vxe-column>
        <vxe-column title="操作" align="center" width="250">
          <template v-slot="scoped">
            <el-button
              type="primary"
              @click="designerDetails(scoped.row)"
              @close="designerDetailser"
              >详情</el-button
            >
            <el-button type="danger" @click="designerDelOnly(scoped.row)"
              >删除</el-button
            >
          </template>
        </vxe-column>
      </vxe-table>
      <vxe-pager
        :current-page="designerParameter.offset"
        :page-size="designerParameter.limit"
        :total="designerParameter.totalResult"
        :layouts="[
          'PrevPage',
          'JumpNumber',
          'NextPage',
          'FullJump',
          'Sizes',
          'Total',
        ]"
        @page-change="handlePageChange"
      ></vxe-pager>
    </div>
    <el-dialog title="设计师详情" v-model="designerDialog" width="50%">
      <el-descriptions direction="vertical" :column="4" border>
        <el-descriptions-item label="账号">{{
          designerDetailsValue.username
        }}</el-descriptions-item>
        <el-descriptions-item label="id">{{
          designerDetailsValue.id
        }}</el-descriptions-item
        ><el-descriptions-item label="昵称">{{
          designerDetailsValue.nickname
        }}</el-descriptions-item
        ><el-descriptions-item label="电话">{{
          designerDetailsValue.tel
        }}</el-descriptions-item>
        <el-descriptions-item label="头像">
          <el-image
            class="heaimageStyle"
            :src="
              'https://weisoutc.oss-cn-shanghai.aliyuncs.com/' +
              designerDetailsValue.headimage
            "
            alt=""
            :preview-src-list="[
              'https://weisoutc.oss-cn-shanghai.aliyuncs.com/' +
                designerDetailsValue.headimage,
            ]"
            style="width: 30px; height: 30px"
          />
        </el-descriptions-item>

        <el-descriptions-item label="名字">{{
          designerDetailsValue.name
        }}</el-descriptions-item
        ><el-descriptions-item label="简介">{{
          designerDetailsValue.description
        }}</el-descriptions-item
        ><el-descriptions-item label="账号认证状态">
          {{ filterStyles(designerDetailsValue.auth) }} </el-descriptions-item
        ><el-descriptions-item label="性别">
          {{ filterSex(designerDetailsValue.sex) }} </el-descriptions-item
        ><el-descriptions-item label="身份证号码">{{
          designerDetailsValue.card_no
        }}</el-descriptions-item
        ><el-descriptions-item label="身份证正面">
          <el-image
            class="heaimageStyle"
            :src="
              'https://weisoutc.oss-cn-shanghai.aliyuncs.com/' +
              designerDetailsValue.card_z
            "
            alt=""
            :preview-src-list="[
              'https://weisoutc.oss-cn-shanghai.aliyuncs.com/' +
                designerDetailsValue.card_z,
            ]"
            style="width: 30px; height: 30px"
          /> </el-descriptions-item
        ><el-descriptions-item label="身份证反面">
          <el-image
            class="heaimageStyle"
            :src="
              'https://weisoutc.oss-cn-shanghai.aliyuncs.com/' +
              designerDetailsValue.card_f
            "
            alt=""
            :preview-src-list="[
              'https://weisoutc.oss-cn-shanghai.aliyuncs.com/' +
                designerDetailsValue.card_f,
            ]"
            style="width: 30px; height: 30px"
          />
        </el-descriptions-item>
      </el-descriptions>

      <div class="desingnerStyle">
        <span>
          <el-button @click="designerDialog = false">返 回</el-button>
        </span>
      </div>
    </el-dialog>
    <el-dialog title="提示" v-model="SetAuth" width="50%">
      <el-radio-group v-model="SetAuthRadio.auth">
        <el-radio :label="0">待认证</el-radio>
        <el-radio :label="1">已认证审核状态</el-radio>
        <el-radio :label="2">已审核通过</el-radio>
      </el-radio-group>
      <span class="dialog-footer">
        <el-button @click="SetAuth = false">取 消</el-button>
        <el-button type="primary" @click="SetAuthadd">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { postD } from "../../api/index.js";
import designerSeatch from "./designerSeatch/designerSeatch.vue"
export default {
  provide() {
    return {
      designerListValue: this.designerListValue,
    };
  },
  components: {
    designerSeatch
  },
  data() {
    return {
      url: {
        DesignerindexInterface: "Designer/index",
        setAuthInterface: "designer/setAuth",
        selectDelInterface: "Designer/selectDel",
        delInterface: "designer/del",
        editStatInterface: "designer/editStat",
        authDesignerInterface: "designer/authDesigner",
      },
      tableData: [],
      allAlign: null,
      //   分頁
      designerParameter: {
        offset: 1,
        limit: 10,
        totalResult: 0,
      },
      // 审核认证
      SetAuth: false,
      SetAuthRadio: {
        id: "",
        auth: "",
      },
      //选中的数组  批量删除 选中时将对象保存到arrs中
      ids: [],
      arrs: [],
      designerDelsValue: {
        id: "",
      },
      //   单个删除
      designerDelOnlys: {
        id: "",
      },
      //   状态修改
      designerStatus: {
        id: "",
        status: "",
      },
      //   详情
      designerDetailsId: {
        id: "",
      },
      designerDetailsValue: {
        username: "",
        id: "",
        nickname: "",
        tel: "",
        headimage: "",
        name: "",
        description: "",
        auth: "",
        sex: "",
        card_no: "",
        card_z: "",
        card_f: "",
      },
      designerDialog: false,
      seatchShow:false
    };
  },
  created() {
    this.designerListValue();
  },
  methods: {
    designerListValue() {
      postD(this.url.DesignerindexInterface, this.designerParameter).then(
        (res) => {
          this.tableData = res.data;
          this.designerParameter.totalResult = res.count;
        }
      );
    },
    // 分頁
    handlePageChange({ currentPage, pageSize }) {
      this.designerParameter.offset = currentPage;
      this.designerParameter.limit = pageSize;
      this.designerListValue();
    },
    // 是否為vip
    filterStyle(val) {
      if (val === 1) {
        return "是";
      } else if (val === 0) {
        return "不是";
      }
    },
    // 账号认证状态
    filterStyles(val) {
      if (val === 0) {
        return "待认证 ";
      } else if (val === 1) {
        return "已认证审核状态";
      } else {
        return "已审核通过";
      }
    },
    // 性别
    filterSex(val) {
      if (val === 1) {
        return "男 ";
      } else if (val === 2) {
        return "女";
      } else {
        return "性别不对";
      }
    },
    companySetAuth(data) {
      this.SetAuth = true;
      this.SetAuthRadio.id = data.id;
      this.SetAuthRadio.auth = data.auth;
    },
    SetAuthadd() {
      postD(this.url.setAuthInterface, this.SetAuthRadio).then((res) => {
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
        this.SetAuth = false;
        this.designerListValue();
      });
    },
    // 修改样式
    tableRowStyle() {
      return "background: #FFFFFF;box-shadow: 0px 2px 5px 1px rgba(0, 0, 0, 0.05);border-radius: 10px 10px 10px 10px;opacity: 1;";
    },
    tableStyle() {
      return "box-shadow: 0px 2px 5px 1px rgba(0, 0, 0, 0.05);border-radius: 10px 10px 10px 10px;opacity: 1;";
    },
    // 批量删除
    checkboxChangeEvent(data) {
      this.arrs = data.records;
    },
    async designerDelsList() {
      const designerDelsListValue = await this.$confirm(
        "此操作将永久删除管理, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);
      if (designerDelsListValue !== "confirm") {
        return this.$message.info("取消删除");
      }
      if (designerDelsListValue === "confirm") {
        this.arrs.forEach((v) => {
          this.ids.push(v.id);
        });
        this.designerDelsValue.id = this.ids.toString();
        postD(this.url.selectDelInterface, this.designerDelsValue).then(
          (res) => {
            if (res.code == "200") {
              this.$message.success("状态修改成功");
              this.designerListValue();
            } else if (res.code == "-200") {
              this.$message.error("参数错误，或暂无数据");
            } else if (res.code == "-201") {
              this.$message.error("未登陆");
            } else if (res.code == "-203") {
              this.$message.error("对不起，你没有此操作权限");
            } else {
              this.$message.error("注册失败，账号已存在");
            }
          }
        );
      }
    },
    // 单个删除
    async designerDelOnly(data) {
      const designerDelOnlyser = await this.$confirm(
        "此操作将永久删除管理, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);
      if (designerDelOnlyser !== "confirm") {
        return this.$message.info("取消删除");
      }
      if (designerDelOnlyser === "confirm") {
        this.designerDelOnlys.id = data.id;
        postD(this.url.delInterface, this.designerDelOnlys).then((res) => {
          if (res.code == "200") {
            this.$message.success("状态修改成功");
            this.designerListValue();
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
    // 状态改变
    editStatChange(data) {
      this.designerStatus.id = data.id;
      this.designerStatus.status = data.status;
      postD(this.url.editStatInterface, this.designerStatus).then((res) => {
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
    designerDetails(data) {
      this.designerDialog = true;
      this.designerDetailsId.id = data.id;
      postD(this.url.authDesignerInterface, this.designerDetailsId).then(
        (res) => {
          this.designerDetailsValue = res.data;
        }
      );
    },
    designerDetailser() {
      this.designerDetailsId = [];
    },
    showCont() {
      this.seatchShow = !this.seatchShow;
      this.$refs.btn1.$el.innerText;
    },
    async costPlannedAmountChange(param1) {
      this.tableData = param1;
    },
  },
};
</script>
<style lang="less" scoped>
.clickHeader {
  cursor: pointer;
}
.green {
  color: #39b54a;
}
.yellow {
  color: #f29124;
}
.red {
  color: #e6432d;
}

.heaimageStyle {
  width: 500px;
  border-radius: 50%;
  background: #ffffff;
  box-shadow: 0px 2px 5px 1px rgba(0, 0, 0, 0.05);
  opacity: 1;
}
.desingnerStyle {
  margin-top: 10px;
}
.contentRight {
  padding-left: 90%;
}
</style>