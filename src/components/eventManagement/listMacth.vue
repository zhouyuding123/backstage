<template>
  <div class="backColor">
    <macth-seatch v-show="seatchShow" @macthSeatch="costPlannedAmountChange" />
    <div class="firstColor">
      <div>
        <el-button type="success">添加</el-button>
      </div>
      <div style="padding-left: 20px">
        <el-button type="danger" plain @click="macthDels">批量删除</el-button>
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
        <vxe-column width="50" align="center">
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
          align="center"
        ></vxe-column>
        <vxe-column
          field="category"
          title="征集类别" 
          width="100"
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
          width="100"
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
                  blue: scoped.row.status === 3,
                }"
              >
                {{ filterStatus(scoped.row.status) }}
              </div>
            </div>
          </template>
        </vxe-column>
        <vxe-column field="is_open" title="is_open" align="center" width="70">
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
          field="create_time"
          title="创建时间"
          align="center"
          width="145"
          show-overflow="title"
        ></vxe-column>
        <vxe-column
          field="sign_time"
          title="报名时间"
          align="center"
          width="145"
          show-overflow="title"
        ></vxe-column>
        <vxe-column
          field="exh_time"
          title="展示时间"
          align="center"
          width="145"
          show-overflow="title"
        ></vxe-column>
        <vxe-column
          field="browse"
          title="浏览量"
          align="center"
          width="75"
        ></vxe-column>
        <vxe-column title="操作" align="center">
          <template v-slot="scoped">
            <div class="postDyex">
              <div class="postDyexer">
                <el-button type="success" @click="detailsValue(scoped.row)"
                  >详情</el-button
                >
              </div>
              <div class="postDyexer">
                <el-button type="primary" @click="showEditAddmodify(scoped.row)"
                  >修改</el-button
                >
              </div>
              <div class="postDyexer">
                <el-button type="danger" @click="oneCompany(scoped.row)"
                  >删除</el-button
                >
              </div>
            </div>
          </template>
        </vxe-column>
      </vxe-table>
    </div>
  </div>
</template>

<script>
import macthSeatch from "./macthSeatch/macthSeatch.vue";
import { postD } from "../../api/index.js";
import { styleModify, styleModifytwo } from "../../assets/js/modifyStyle.js";
export default {
  provide() {
    return {
      MacthValue: this.MacthValue,
    };
  },
  components: {
    macthSeatch,
  },
  data() {
    return {
      seatchShow: false,
      allAlign: null,
      tableData: [],
      url: {
        listMacthInterface: "match/listMacth",
        adminSelectDelMatchInterface: "Match/adminSelectDelMatch",
        delMatchInterface: "Match/delMatch",
      },
      listMacth: {
        id: "",
        is_open: "",
      },
      // 批量删除
      ids: [],
      //选中时将对象保存到arrs中
      arrs: [],
      macthDelsValues: {
        id: "",
      },
      // 单个删除
      oneCompanyvalue: {
        id: "",
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
    // 开关
    is_openChaged(data) {
      this.listMacth.is_open = data.is_open;
      this.listMacth.id = data.id;
      postD(this.url.listMacthInterface, this.listMacth).then((res) => {
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
    // 批量删除
    checkboxChangeEvent(data) {
      this.arrs = data.records;
    },
    async macthDels() {
      const macthDelsValue = await this.$confirm(
        "此操作将永久删除管理, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);
      if (macthDelsValue !== "confirm") {
        return this.$message.info("取消删除");
      }
      if (selectDelValue === "confirm") {
        this.arrs.forEach((v) => {
          this.ids.push(v.id);
        });
        this.macthDelsValues.id = this.ids.toString();
        postD(this.url.adminSelectDelMatchInterface, this.macthDelsValues).then(
          (res) => {
            if (res.code == "200") {
              this.$message.success("状态修改成功");
              this.MacthValue();
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
    async oneCompany(data) {
      const oneCompanyList = await this.$confirm(
        "此操作将永久删除, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);
      if (oneCompanyList !== "confirm") {
        return this.$message.info("取消删除");
      }
      if (oneCompanyList === "confirm") {
        this.oneCompanyvalue.id = data.id;
        postD(this.url.delMatchInterface, this.oneCompanyvalue).then((res) => {
          if (res.code == "200") {
            this.$message.success("状态修改成功");
            this.MacthValue();
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
    tableRowStyle() {
      styleModify();
    },
    tableStyle() {
      styleModifytwo();
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
.contentRight {
  padding-left: 86.5%;
}
.postDyex {
  display: flex;
  justify-content: center;
  align-items: flex-end;
}
.postDyexer {
  padding: 0 5px;
}
</style>