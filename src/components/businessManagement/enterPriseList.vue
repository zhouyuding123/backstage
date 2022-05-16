<template>
  <div class="backColor">
    <enter-prise-list-seatch
      v-show="seatchShow"
      @enterProseListSeatch="costPlannedAmountChange"
    />
    <div class="firstColor">
      <div>
        <el-button type="danger" plain @click="enterpriseDeletes"
          >批量删除</el-button
        >
      </div>
      <div class="contentRight">
        <el-button type="info" plain ref="btn1" @click="showCont($event)"
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
        @checkbox-change="checkboxChangeEvent"
        @checkbox-all="checkboxChangeEvent"
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
        <vxe-column
          field="in_code"
          title="邀请码"
          width="70"
          align="center"
        ></vxe-column>
        <vxe-column
          field="username"
          title="用户名"
          width="110"
          align="center"
        ></vxe-column>
        <vxe-column
          field="nickname"
          title="昵称"
          width="120"
          align="center"
        ></vxe-column>
        <vxe-column width="100" align="center">
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
          field="tel"
          title="手机号"
          width="110"
          align="center"
        ></vxe-column>
        <vxe-column field="status" title="状态" width="80" align="center">
          <template v-slot="scoped">
            <el-switch
              v-model="scoped.row.status"
              active-color="#13ce66"
              @change="editStatChange(scoped.row)"
              :active-value="1"
              :inactive-value="0"
            ></el-switch>
          </template>
        </vxe-column>
        <vxe-column
          field="is_vip"
          title="Vip"
          width="100"
          align="center"
        ></vxe-column>
        <vxe-column
          field="create_time"
          title="创建时间"
          width="150"
          align="center"
        ></vxe-column>
        <vxe-column
          field="update_time"
          title="更新时间"
          width="150"
          align="center"
        ></vxe-column>
        <vxe-column
          field="vip_start_time"
          title="vip开始时间"
          width="150"
          align="center"
        ></vxe-column>
        <vxe-column
          field="vip_end_time"
          title="贵宾时间"
          width="150"
          align="center"
        ></vxe-column>
        <vxe-column title="审核状态" width="120" align="center">
          <template v-slot="scoped">
            <div @click="companySetAuth(scoped.row)">
              <div
                class="clickHeader"
                :class="{
                  green: scoped.row.auth === 2,
                  yellow: scoped.row.auth == 1,
                  red: scoped.row.auth === 3,
                  white: scoped.row.auth === null,
                }"
              >
                {{ filterStatus(scoped.row.auth) }}
              </div>
            </div>
          </template>
        </vxe-column>
        <vxe-column title="操作" align="center">
          <template v-slot="scoped">
            <div class="postDyex">
              <div class="Edit">
                <el-button type="primary" @click="companyDetails(scoped.row)">
                  详情
                </el-button>
              </div>
              <div class="postDyexer">
                <el-button type="danger" @click="companyRemoveRow(scoped.row)">
                  删除
                </el-button>
              </div>
            </div>
          </template>
        </vxe-column>
      </vxe-table>
    </div>
    <el-dialog
      title="详情"
      v-model="companyDetailser"
      width="50%"
      :destroy-on-close="true"
    >
      <el-descriptions direction="vertical" :column="4" border>
        <el-descriptions-item label="账号">{{
          authCompanyValue.username
        }}</el-descriptions-item>
        <el-descriptions-item label="id">{{
          authCompanyValue.id
        }}</el-descriptions-item>
        <el-descriptions-item label="企业名称">{{
          authCompanyValue.nickname
        }}</el-descriptions-item>
        <el-descriptions-item label="企业电话">{{
          authCompanyValue.tel
        }}</el-descriptions-item>
        <el-descriptions-item>
          <el-image
            class="heaimageStyle"
            :src="imagesValue + authCompanyValue.headimage"
            alt=""
            :preview-src-list="[imagesValue + authCompanyValue.headimage]"
            style="width: 30px; height: 30px"
          />
        </el-descriptions-item>
        <el-descriptions-item label="企业描述">{{
          authCompanyValue.description
        }}</el-descriptions-item>
        <el-descriptions-item label="省">{{
          authCompanyValue.province
        }}</el-descriptions-item>
        <el-descriptions-item label="市">{{
          authCompanyValue.city
        }}</el-descriptions-item>
        <el-descriptions-item label="区">{{
          authCompanyValue.area
        }}</el-descriptions-item>
        <el-descriptions-item label="详细地址">{{
          authCompanyValue.detail
        }}</el-descriptions-item>
        <el-descriptions-item label="负责人">{{
          authCompanyValue.name
        }}</el-descriptions-item>
        <el-descriptions-item label="负责人电话">{{
          authCompanyValue.tel_f
        }}</el-descriptions-item>
        <el-descriptions-item label="身份证号码">{{
          authCompanyValue.card_no
        }}</el-descriptions-item>
        <el-descriptions-item label="企业标签">{{
          authCompanyValue.label
        }}</el-descriptions-item>
        <el-descriptions-item label="身份证正面照片">
          <el-image
            class="heaimageStyle"
            :src="imagesValue + authCompanyValue.card_z"
            alt=""
            :preview-src-list="[imagesValue + authCompanyValue.card_z]"
            style="width: 30px; height: 30px"
          />
        </el-descriptions-item>
        <el-descriptions-item label="身份证反面照片">
          <el-image
            class="heaimageStyle"
            :src="imagesValue + authCompanyValue.card_f"
            alt=""
            :preview-src-list="[imagesValue + authCompanyValue.card_f]"
            style="width: 30px; height: 30px"
          />
        </el-descriptions-item>
        <el-descriptions-item label="店铺照片">
          <el-image
            class="heaimageStyle"
            :src="imagesValue + authCompanyValue.shop_img"
            alt=""
            :preview-src-list="[imagesValue + authCompanyValue.shop_img]"
            style="width: 30px; height: 30px"
          />
        </el-descriptions-item>
        <el-descriptions-item label="营业执照">
          <el-image
            class="heaimageStyle"
            :src="imagesValue + authCompanyValue.license"
            alt=""
            :preview-src-list="[imagesValue + authCompanyValue.license]"
            style="width: 30px; height: 30px"
          />
        </el-descriptions-item>
        <el-descriptions-item label="账号认证状态">
          <div
            :class="{
              green: authCompanyValue.auth === 2,
              yellow: authCompanyValue.auth == 1,
              red: authCompanyValue.auth === 3,
            }"
          >
            {{ filterStatus(authCompanyValue.auth) }}
          </div>
        </el-descriptions-item>
      </el-descriptions>
      <div class="dialog-footer">
        <span>
          <el-button @click="companyDetailser = false">关闭</el-button>
        </span>
      </div>
    </el-dialog>
    <el-dialog title="审核状态" v-model="SetAuth" width="50%">
              <el-descriptions direction="vertical" :column="3" border>
                <el-descriptions-item label="账号">{{
                  SetAuthValue.username
                }}</el-descriptions-item>
                <el-descriptions-item label="id">{{
                  SetAuthValue.id
                }}</el-descriptions-item>
                <el-descriptions-item label="企业名称">{{
                  SetAuthValue.nickname
                }}</el-descriptions-item>
                <el-descriptions-item label="企业电话">{{
                  SetAuthValue.tel
                }}</el-descriptions-item>
                <el-descriptions-item label="头像">
                  <el-image
                    class="heaimageStyle"
                    :src="imagesValue + SetAuthValue.headimage"
                    alt=""
                    :preview-src-list="[
                      imagesValue + SetAuthValue.headimage,
                    ]"
                    style="width: 30px; height: 30px"
                  />
                </el-descriptions-item>
                <el-descriptions-item label="企业描述">{{
                  SetAuthValue.description
                }}</el-descriptions-item>
                <el-descriptions-item label="省">{{
                  SetAuthValue.province
                }}</el-descriptions-item>
                <el-descriptions-item label="市">{{
                  SetAuthValue.city
                }}</el-descriptions-item>
                <el-descriptions-item label="区">{{
                  SetAuthValue.area
                }}</el-descriptions-item>
                <el-descriptions-item label="详细地址">{{
                  SetAuthValue.detail
                }}</el-descriptions-item>
                <el-descriptions-item label="负责人">{{
                  SetAuthValue.name
                }}</el-descriptions-item>
                <el-descriptions-item label="负责人电话">{{
                  SetAuthValue.tel_f
                }}</el-descriptions-item>
                <el-descriptions-item label="身份证号码">{{
                  SetAuthValue.card_no
                }}</el-descriptions-item>
                <el-descriptions-item label="身份证正面照片">
                  <el-image
                    class="heaimageStyle"
                    :src="imagesValue + SetAuthValue.card_z"
                    alt=""
                    :preview-src-list="[imagesValue + SetAuthValue.card_z]"
                    style="width: 30px; height: 30px"
                  />
                </el-descriptions-item>
                <el-descriptions-item label="身份证反面照片">
                  <el-image
                    class="heaimageStyle"
                    :src="imagesValue + SetAuthValue.card_f"
                    alt=""
                    :preview-src-list="[imagesValue + SetAuthValue.card_f]"
                    style="width: 30px; height: 30px"
                  />
                </el-descriptions-item>
                <el-descriptions-item label="店铺照片">
                  <el-image
                    class="heaimageStyle"
                    :src="imagesValue + SetAuthValue.shop_img"
                    alt=""
                    :preview-src-list="[
                      imagesValue + SetAuthValue.shop_img,
                    ]"
                    style="width: 30px; height: 30px"
                  />
                </el-descriptions-item>
                <el-descriptions-item label="营业执照">
                  <el-image
                    class="heaimageStyle"
                    :src="imagesValue + SetAuthValue.license"
                    alt=""
                    :preview-src-list="[imagesValue + SetAuthValue.license]"
                    style="width: 30px; height: 30px"
                  />
                </el-descriptions-item>
                <el-descriptions-item label="账号认证状态">
                  <div
                    :class="{
                      green: SetAuthValue.auth === 2,
                      yellow: SetAuthValue.auth == 1,
                      red: SetAuthValue.auth === 3,
                    }"
                  >
                    {{ filterStatus(SetAuthValue.auth) }}
                  </div>
                </el-descriptions-item>
              </el-descriptions>
              <div style="padding-top: 15px;">请审核</div>
              <el-radio-group v-model="SetAuthRadio.auth" style="padding-top: 15px;">
                <el-radio :label="1">已认证待审核</el-radio>
                <el-radio :label="2">审核通过</el-radio>
                <el-radio :label="3">审核不通过</el-radio>
              </el-radio-group>
              <div style="padding-top: 15px;">
                <span class="dialog-footer">
                <el-button @click="SetAuth = false">取 消</el-button>
                <el-button type="primary" @click="SetAuthadd">确 定</el-button>
              </span>
              </div>
            </el-dialog>
  </div>
</template>

<script>
import { postD } from "../../api/index.js";
import enterPriseListSeatch from "./enterPriseList/enterPriseListSeatch.vue";
import { imgUrl } from "../../assets/js/modifyStyle.js";
import {
  CompanyIndexApi,
  companyAuthCompanyApi,
  companyEditStatApi,
  CompanyDelApi,
  CompanySelectDelApi,
  companySetAuthApi,
} from "@/urls/companyUrl.js";
export default {
  provide() {
    return {
      enterprise: this.enterprise,
    };
  },
  components: { enterPriseListSeatch },
  data() {
    return {
      imagesValue: "",
      seatchShow: true,
      url: {
        setAuthInterface: "company/setAuth",
        authCompanyInterface: "company/authCompany",
      },
      tableData: [],
      allAlign: null,
      //选中的数组
      ids: [],
      idsL: {
        id: "",
      },
      //选中时将对象保存到arrs中
      arrs: [],
      // 状态
      companyStatus: {
        id: "",
        status: "",
      },
      // 单个删除
      companyRemove: {
        id: "",
      },
      // 审核对话框
      SetAuth: false,
      SetAuthRadio: {
        id: "",
        auth: "",
      },
      companyDetailser: false,
      companyDetailsId: {
        id: "",
      },
      authCompanyValue: {
        username: "",
        id: "",
        nickname: "",
        tel: "",
        headimage: "",
        description: "",
        province: "",
        city: "",
        area: "",
        detail: "",
        name: "",
        tel_f: "",
        card_no: "",
        card_z: "",
        card_f: "",
        shop_img: "",
        license: "",
        auth: "",
      },
      SetAuthDetails:{
        id:""
      },
      SetAuthValue: [],
    };
  },
  created() {
    this.enterprise();
  },
  methods: {
    enterprise() {
      postD(CompanyIndexApi()).then((res) => {
        this.tableData = res.data;
        this.imagesValue = imgUrl();
      });
    },
    // 批量删除
    checkboxChangeEvent(data) {
      this.arrs = data.records;
    },
    async enterpriseDeletes() {
      const enterpriseDeletesMore = await this.$confirm(
        "此操作将永久删除管理, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);
      if (enterpriseDeletesMore !== "confirm") {
        return this.$message.info("取消删除");
      }
      if (enterpriseDeletesMore === "confirm") {
        this.arrs.forEach((v) => {
          this.ids.push(v.id);
        });
        this.idsL.id = this.ids.toString();
        postD(CompanySelectDelApi(), this.idsL).then((res) => {
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
          this.enterprise();
        });
      }
    },
    // 状态改变
    editStatChange(data) {
      this.companyStatus.id = data.id;
      this.companyStatus.status = data.status;
      postD(companyEditStatApi(), this.companyStatus).then((res) => {
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
    // 单个删除
    async companyRemoveRow(data) {
      const companyRemoveRows = await this.$confirm(
        "此操作将永久删除管理, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);
      if (companyRemoveRows !== "confirm") {
        return this.$message.info("取消删除");
      }
      if (companyRemoveRows === "confirm") {
        this.companyRemove.id = data.id;
        postD(CompanyDelApi(), this.companyRemove).then((res) => {
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
          this.enterprise();
        });
      }
    },
    companySetAuth(data) {
      this.SetAuth = true;
      this.SetAuthRadio.id = data.id;
      this.SetAuthRadio.auth = data.auth;
      this.SetAuthDetails.id =data.id
      postD(companyAuthCompanyApi(),this.SetAuthDetails).then(res=> {
        this.SetAuthValue = res.data;
      })
    },
    // 提交审核
    SetAuthadd() {
      postD(companySetAuthApi(), this.SetAuthRadio).then((res) => {
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
        this.enterprise();
      });
    },
    filterStatus(val) {
      if (val === 1) {
        return "已认证待审核";
      } else if (val === 2) {
        return "审核通过";
      } else if (val === 3) {
        return "审核不通过";
      } else {
        return "请审核";
      }
    },
    companyDetails(data) {
      this.companyDetailsId.id = data.id;
      this.companyDetailser = true;
      postD(companyAuthCompanyApi(), this.companyDetailsId).then((res) => {
        this.authCompanyValue = res.data;
      });
    },
    tableRowStyle() {
      return "background: #FFFFFF;box-shadow: 0px 2px 5px 1px rgba(0, 0, 0, 0.05);border-radius: 10px 10px 10px 10px;opacity: 1;";
    },
    tableStyle() {
      return "box-shadow: 0px 2px 5px 1px rgba(0, 0, 0, 0.05);border-radius: 10px 10px 10px 10px;opacity: 1;";
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
.backColor {
  background: #f9f9f9;
  width: 100%;
  height: 100%;
  .firstColor {
    padding: 20px 20px 0 20px;
    width: 100%;
    display: flex;
    flex-flow: row;
  }
  .twons {
    padding: 20px;
  }
}
.Enterprise-configuration {
  .bodyser {
    padding-top: 1.5%;
    background-color: white;
    .tableList {
      text-align: center;
      margin: 2% 0 1% 0;
      .textphoto {
        position: absolute;
        top: 0;
        left: 25%;
      }
    }
  }
}
.postDyex {
  display: table;
  width: 100%;
}
.postDyexer {
  width: 100%;
  display: table-cell;
}
.Edit {
  width: 100%;
  display: table-cell;
}
.dialog-footer {
  margin-top: 10px;
}
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
.white {
  color: white;
}
.leftText {
  text-align: left;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.phtotHeight {
  height: 100%;
}
.imgStyle {
  position: absolute;
  border-radius: 50%;
  top: 10%;
  left: 60%;
  background: #ffffff;
  box-shadow: 0px 2px 5px 1px rgba(0, 0, 0, 0.05);
  opacity: 1;
}
.contentRight {
  padding-left: 91.1%;
}
</style>