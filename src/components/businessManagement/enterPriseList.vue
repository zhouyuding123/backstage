<template>
  <div class="backgruond">
    <div class="Enterprise-configuration">
      <div class="bodyser">
        <el-row :gutter="20">
          <el-col :span="2"
            ><div>
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
            <vxe-column title="头像" width="100" align="center">
              <template v-slot="scoped">
                <el-image
                  :src="scoped.row.headimage?scoped.row.headimage:image"
                  alt=""
                  :preview-src-list="[scoped.row.headimage]?[scoped.row.headimage] : [image]"
                  style="width: 50px; height: 50px"
                  class="textphoto"
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
                <el-dialog title="提示" v-model="SetAuth" width="50%">
                  <el-radio-group v-model="SetAuthRadio.auth">
                    <el-radio :label="1">已认证待审核</el-radio>
                    <el-radio :label="2">审核通过</el-radio>
                    <el-radio :label="3">审核不通过</el-radio>
                  </el-radio-group>
                  <span slot="footer" class="dialog-footer">
                    <el-button @click="SetAuth = false">取 消</el-button>
                    <el-button type="primary" @click="SetAuthadd"
                      >确 定</el-button
                    >
                  </span>
                </el-dialog>
              </template>
            </vxe-column>
            <vxe-column title="操作" align="center">
              <template v-slot="scoped">
                <div class="postDyex">
                  <div class="Edit">
                    <el-button
                      type="primary"
                      @click="companyDetails(scoped.row)"
                    >
                      详情
                    </el-button>
                    <el-dialog
                      title="详情"
                      v-model="companyDetailser"
                      width="50%"
                    >
                      <el-row class="leftText">
                        <el-col :span="12"
                          ><div class="bg-purple">账号</div></el-col
                        >
                        <el-col :span="12"
                          ><div class="bg-purple">
                            {{ authCompanyValue.username }}
                          </div></el-col
                        >
                      </el-row>
                      <el-row class="leftText">
                        <el-col :span="12"
                          ><div class="bg-purple-light">id</div></el-col
                        >
                        <el-col :span="12"
                          ><div class="bg-purple-light">
                            {{ authCompanyValue.id }}
                          </div></el-col
                        >
                      </el-row>
                      <el-row class="leftText">
                        <el-col :span="12"
                          ><div class="bg-purple">企业名称</div></el-col
                        >
                        <el-col :span="12"
                          ><div class="bg-purple">
                            {{ authCompanyValue.nickname }}
                          </div></el-col
                        >
                      </el-row>
                      <el-row class="leftText">
                        <el-col :span="12"
                          ><div class="bg-purple-light">企业电话</div></el-col
                        >
                        <el-col :span="12"
                          ><div class="bg-purple-light">
                            {{ authCompanyValue.tel }}
                          </div></el-col
                        >
                      </el-row>
                      <el-row class="leftText">
                        <el-col :span="12"
                          ><div class="phtotHeight bg-purple">头像</div></el-col
                        >
                        <el-col :span="12"
                          ><div class="bg-purple phtotHeight">
                            <el-image
                              :src="authCompanyValue.headimage?authCompanyValue.headimage:image"
                              alt=""
                              :preview-src-list="[authCompanyValue.headimage]?[authCompanyValue.headimage]:[iamge]"
                              style="width: 50px; height: 50px"
                            /></div
                        ></el-col>
                      </el-row>
                      <el-row class="leftText">
                        <el-col :span="12"
                          ><div class="bg-purple-light">企业描述</div></el-col
                        >
                        <el-col :span="12"
                          ><div class="bg-purple-light">
                            {{ authCompanyValue.description }}
                          </div></el-col
                        >
                      </el-row>
                      <el-row class="leftText">
                        <el-col :span="12"
                          ><div class="bg-purple">省</div></el-col
                        >
                        <el-col :span="12"
                          ><div class="bg-purple">
                            {{ authCompanyValue.province }}
                          </div></el-col
                        >
                      </el-row>
                      <el-row class="leftText">
                        <el-col :span="12"
                          ><div class="bg-purple-light">市</div></el-col
                        >
                        <el-col :span="12"
                          ><div class="bg-purple-light">
                            {{ authCompanyValue.city }}
                          </div></el-col
                        >
                      </el-row>
                      <el-row class="leftText">
                        <el-col :span="12"
                          ><div class="bg-purple">区</div></el-col
                        >
                        <el-col :span="12"
                          ><div class="bg-purple">
                            {{ authCompanyValue.area }}
                          </div></el-col
                        >
                      </el-row>
                      <el-row class="leftText">
                        <el-col :span="12"
                          ><div class="bg-purple-light">详细地址</div></el-col
                        >
                        <el-col :span="12"
                          ><div class="bg-purple-light">
                            {{ authCompanyValue.detail }}
                          </div></el-col
                        >
                      </el-row>
                      <el-row class="leftText">
                        <el-col :span="12"
                          ><div class="bg-purple">经纬度</div></el-col
                        >
                        <el-col :span="12"
                          ><div class="bg-purple">
                            经度:{{ authCompanyValue.lon }}纬度:{{
                              authCompanyValue.lat
                            }}
                          </div></el-col
                        >
                      </el-row>
                      <el-row class="leftText">
                        <el-col :span="12"
                          ><div class="bg-purple-light">负责人</div></el-col
                        >
                        <el-col :span="12"
                          ><div class="bg-purple-light">
                            {{ authCompanyValue.name }}
                          </div></el-col
                        >
                      </el-row>
                      <el-row class="leftText">
                        <el-col :span="12"
                          ><div class="bg-purple">负责人电话</div></el-col
                        >
                        <el-col :span="12"
                          ><div class="bg-purple">
                            {{ authCompanyValue.tel_f }}
                          </div></el-col
                        >
                      </el-row>
                      <el-row class="leftText">
                        <el-col :span="12"
                          ><div class="bg-purple-light">身份证号码</div></el-col
                        >
                        <el-col :span="12"
                          ><div class="bg-purple-light">
                            {{ authCompanyValue.card_no }}
                          </div></el-col
                        >
                      </el-row>
                      <el-row class="leftText">
                        <el-col :span="12"
                          ><div class="bg-purple phtotHeight">
                            身份证正面照片
                          </div></el-col
                        >
                        <el-col :span="12"
                          ><div class="bg-purple">
                            <el-image
                              :src="authCompanyValue.card_z"
                              alt=""
                              :preview-src-list="[authCompanyValue.card_z]"
                              style="width: 50px; height: 50px"
                            /></div
                        ></el-col>
                      </el-row>
                      <el-row class="leftText">
                        <el-col :span="12"
                          ><div class="phtotHeight bg-purple-light">
                            身份证反面照片
                          </div></el-col
                        >
                        <el-col :span="12"
                          ><div class="bg-purple-light">
                            <el-image
                              :src="authCompanyValue.card_f"
                              alt=""
                              :preview-src-list="[authCompanyValue.card_f]"
                              style="width: 50px; height: 50px"
                            /></div
                        ></el-col>
                      </el-row>
                      <el-row class="leftText">
                        <el-col :span="12"
                          ><div class="phtotHeight bg-purple">
                            店铺照片
                          </div></el-col
                        >
                        <el-col :span="12"
                          ><div class="bg-purple">
                            <el-image
                              :src="authCompanyValue.shop_img"
                              alt=""
                              :preview-src-list="[authCompanyValue.shop_img]"
                              style="width: 50px; height: 50px"
                            /></div
                        ></el-col>
                      </el-row>
                      <el-row class="leftText">
                        <el-col :span="12"
                          ><div class="bg-purple-light phtotHeight">
                            营业执照
                          </div></el-col
                        >
                        <el-col :span="12"
                          ><div class="bg-purple-light">
                            <el-image
                              :src="authCompanyValue.license"
                              alt=""
                              :preview-src-list="[authCompanyValue.license]"
                              style="width: 50px; height: 50px"
                            /></div
                        ></el-col>
                      </el-row>
                      <el-row class="leftText">
                        <el-col :span="12"
                          ><div class="bg-purple">账号认证状态</div></el-col
                        >
                        <el-col :span="12"
                          ><div
                            class="bg-purple"
                            :class="{
                              green: scoped.row.auth === 2,
                              yellow: scoped.row.auth == 1,
                              red: scoped.row.auth === 3,
                              white: scoped.row.auth === null,
                            }"
                          >
                            {{ filterStatus(authCompanyValue.auth) }}
                          </div></el-col
                        >
                      </el-row>

                      <span slot="footer" class="dialog-footer">
                        <el-button @click="companyDetailser = false"
                          >关闭</el-button
                        >
                      </span>
                    </el-dialog>
                  </div>
                  <div class="postDyexer">
                    <el-button
                      type="danger"
                      @click="companyRemoveRow(scoped.row)"
                    >
                      删除
                    </el-button>
                  </div>
                </div>
              </template>
            </vxe-column>
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
      image:"https://weisoutc.oss-cn-shanghai.aliyuncs.com/images/20220424/16507638688738b6a48da424a60d9d99b2c1b20804.png",
      url: {
        CompanyInterface: "Company/index",
        selectDelInterface: "Company/selectDel",
        editStatInterface: "company/editStat",
        delInterface: "Company/del",
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
      authCompanyValue: "",
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
        postD(this.url.selectDelInterface, this.idsL).then((res) => {
          if (res.code !== 200) return this.$message.error("删除失败");
          this.$message.success("删除成功");
          this.enterprise();
        });
      }
    },
    // 状态改变
    editStatChange(data) {
      this.companyStatus.id = data.id;
      this.companyStatus.status = data.status;
      postD(this.url.editStatInterface, this.companyStatus).then((res) => {
        if (res.code !== 200) return this.$message.error("修改失败");
        this.$message.success("状态修改成功");
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
        postD(this.url.delInterface, this.companyRemove).then((res) => {
          if (res.code !== 200) return this.$message.error("删除失败");
          this.$message.success("删除成功");
          this.enterprise();
        });
      }
    },
    companySetAuth(data) {
      console.log(data);
      this.SetAuth = true;
      this.SetAuthRadio.id = data.id;
      this.SetAuthRadio.auth = data.auth;
    },
    // 提交审核
    SetAuthadd() {
      postD(this.url.setAuthInterface, this.SetAuthRadio).then((res) => {
        if (res.code !== 200) return this.$message.error("查看审核失败");
        this.$message.success("审核修改成功");
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
      postD(this.url.authCompanyInterface, this.companyDetailsId).then(
        (res) => {
          this.authCompanyValue = res.data;
        }
      );
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
  padding-left: 1%;
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
</style>