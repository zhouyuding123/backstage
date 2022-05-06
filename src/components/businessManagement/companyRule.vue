<template>
  <div class="backColor">
    <div class="firstColor">
      <div class="buttonStyles">
        <p @click="addEnterprise">添加</p>
      </div>
      <div class="buttonStyle">
        <p @click="selectDel">批量删除</p>
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
        :tree-config="{
          transform: true,
          rowField: 'id',
          parentField: 'pid',
          lazy: true,
          hasChild: 'hasChild',
        }"
        :row-style="tableRowStyle"
        :header-row-style="tableStyle"
        @checkbox-change="checkboxChangeEvent"
        @checkbox-all="checkboxChangeEvent"
      >
        <vxe-column
          align="center"
          type="checkbox"
          width="80"
          class="linker"
        ></vxe-column>
        <vxe-column
          type="seq"
          title="序号"
          width="60"
          align="center"
        ></vxe-column>
        <vxe-column field="id" title="id" width="60"></vxe-column>
        <vxe-column
          tree-node
          field="ltitle"
          title="标题"
          width="350"
          align="center"
        ></vxe-column>
        <vxe-column field="name" title="规则" width="350"></vxe-column>
        <vxe-column field="icon" align="center" title="图标" width="150">
          <template v-slot="scoped">
            <i :class="scoped.row.icon"></i>
          </template>
        </vxe-column>
        <vxe-column
          field="sort"
          align="center"
          title="排序"
          width="70"
        ></vxe-column>
        <vxe-column field="status" title="菜单" width="80" align="center"
          ><template v-slot="scoped">
            <el-switch
              v-model="scoped.row.status"
              active-color="#13ce66"
              @change="userStateChaged(scoped.row)"
              :active-value="1"
              :inactive-value="0"
            ></el-switch>
          </template>
        </vxe-column>
        <vxe-column field="auth_open" title="状态" width="80" align="center">
          <template v-slot="scoped">
            <el-switch
              v-model="scoped.row.auth_open"
              active-color="#13ce66"
              @change="userAuthChaged(scoped.row)"
              :active-value="1"
              :inactive-value="0"
            ></el-switch>
          </template>
        </vxe-column>
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
    <el-dialog
      title="添加"
      v-model="addaddEnterpriseShow"
      width="70%"
      :destroy-on-close="true"
    >
      <el-form
        :model="EnterpriseruleForm"
        :rules="Enterpriserules"
        ref="EnterpriseruleFormRef"
        label-width="100px"
      >
        <el-form-item label="菜单" prop="type">
          <el-radio-group v-model="EnterpriseruleForm.type">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="2">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="菜单状态" prop="status">
          <el-radio-group
            v-model="EnterpriseruleForm.status"
            @change="changelabel"
          >
            <el-radio label="1">开启</el-radio>
            <el-radio label="2">关闭</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="父级" prop="pid">
          <el-select v-model="EnterpriseruleForm.pid" placeholder="请选择">
            <el-option
              v-for="item in ltitle"
              :key="item.id"
              :label="item.ltitle"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="规则" prop="name">
          <el-input v-model="EnterpriseruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="标题" prop="title">
          <el-input v-model="EnterpriseruleForm.title"></el-input>
        </el-form-item>
        <el-form-item label="排序" prop="sort">
          <el-input v-model="EnterpriseruleForm.sort"></el-input>
        </el-form-item>
        <el-form-item label="图标" prop="icon">
          <choice-icon @update:modelValue="insert"></choice-icon>
        </el-form-item>
        <el-form-item label="权限验证" prop="auth_open">
          <el-radio-group v-model="EnterpriseruleForm.auth_open">
            <el-radio label="1">开启</el-radio>
            <el-radio label="0">关闭</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="展示端口" prop="is_mobile">
          <el-radio-group v-model="EnterpriseruleForm.is_mobile">
            <el-radio label="1">pc</el-radio>
            <el-radio label="2">app</el-radio>
            <el-radio label="3">两端</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <span>
        <el-button @click="addaddEnterpriseShow = false">取 消</el-button>
        <el-button type="primary" @click="addEnterpriseValue">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="修改"
      v-model="editDialogVisible"
      width="70%"
      :destroy-on-close="true"
    >
      <el-form
        :model="editEnterprise"
        :rules="editEnterpriseRules"
        ref="editEnterpriseref"
        label-width="80px"
      >
        <el-form-item label="菜单" prop="type">
          <el-radio-group v-model="editEnterprise.type">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="2">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="父级" prop="pid">
          <el-select
            v-model="editEnterprise.ltitle"
            placeholder="请选择"
            class="el-selects"
            @change="editChang()"
          >
            <el-option
              v-for="item in ltitle"
              :key="item.id"
              :label="item.ltitle"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="规则" prop="name">
          <el-input v-model="editEnterprise.name"></el-input>
        </el-form-item>
        <el-form-item label="标题" prop="title">
          <el-input v-model="editEnterprise.title"></el-input>
        </el-form-item>
        <el-form-item label="排序" prop="sort">
          <el-input v-model="editEnterprise.sort"></el-input>
        </el-form-item>
        <el-form-item label="图标" prop="icon">
          <choice-icon @update:modelValue="insert"></choice-icon>
        </el-form-item>
        <el-form-item label="权限验证" prop="auth_open">
          <el-radio-group v-model="editEnterprise.auth_open">
            <el-radio :label="1">开启</el-radio>
            <el-radio :label="0">关闭</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="展示端口" prop="is_mobile">
          <el-radio-group v-model="editEnterprise.is_mobile">
            <el-radio :label="1">pc</el-radio>
            <el-radio :label="2">app</el-radio>
            <el-radio :label="3">两端</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>

      <span>
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editDialogVisibleUser"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <el-dialog
      title="详情"
      v-model="detailsVisible"
      width="70%"
      :destroy-on-close="true"
    >
      <el-descriptions direction="vertical" :column="4" border>
        <el-descriptions-item label="id">
          {{ designerDetailsValue.id }}
        </el-descriptions-item>
        <el-descriptions-item label="规则">
          {{ designerDetailsValue.name }}
        </el-descriptions-item>
        <el-descriptions-item label="标题">
          {{ designerDetailsValue.title }}
        </el-descriptions-item>
        <el-descriptions-item label="菜单列表">
          <div
            :class="{
              green: designerDetailsValue.type === 1,
              red: designerDetailsValue.type === 2,
            }"
          >
            {{ filterType(designerDetailsValue.type) }}
          </div>
        </el-descriptions-item>
        <el-descriptions-item label="菜单状态">
          <div
            :class="{
              green: designerDetailsValue.status === 1,
              red: designerDetailsValue.status === 0,
            }"
          >
            {{ filterStatus(designerDetailsValue.status) }}
          </div>
        </el-descriptions-item>
        <el-descriptions-item label="状态">
          <div
            :class="{
              green: designerDetailsValue.auth_open === 1,
              red: designerDetailsValue.auth_open === 0,
            }"
          >
            {{ filterAuth_open(designerDetailsValue.auth_open) }}
          </div>
        </el-descriptions-item>
        <el-descriptions-item label="端口">
          <div
            :class="{
              green: designerDetailsValue.is_mobile === 1,
              yellow: designerDetailsValue.is_mobile === 2,
              red: designerDetailsValue.is_mobile === 3,
            }"
          >
            {{ filterIs_mobile(designerDetailsValue.is_mobile) }}
          </div>
        </el-descriptions-item>
        <el-descriptions-item label="图标">
          <i :class="designerDetailsValue.icon"></i>
        </el-descriptions-item>
        <el-descriptions-item label="创建时间">
          {{ designerDetailsValue.create_time }}
        </el-descriptions-item>
        <el-descriptions-item label="更新时间">
          {{ designerDetailsValue.update_time }}
        </el-descriptions-item>
      </el-descriptions>
      <span>
        <el-button @click="detailsVisible = false">返 回</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { postD } from "@/api";
import choiceIcon from "./iconchoice/choiceIcon.vue";
export default {
  components: { choiceIcon },
  inject: ["reload"],
  data() {
    return {
      allAlign: null,
      tableData: [],
      url: {
        listRuleInterface: "company_rule/listRule",
        ruleAddInterface: "company_rule/ruleAdd",
        ruleSelectDelInterface: "company_rule/ruleSelectDel",
        ruleDelInterface: "company_rule/ruleDel",
        ruleEditInterface: "company_rule/ruleEdit",
        authCompanyInterface: "company_rule/ruleShow",
      },
      addaddEnterpriseShow: false,
      //表单数据
      EnterpriseruleForm: {
        type: "",
        pid: "",
        name: "",
        title: "",
        status: "",
        sort: "",
        auth_open: "",
        icon: "",
        is_mobile: "",
      },
      Enterpriserules: {
        type: [
          { required: true, message: "请选择是否为主菜单", trigger: "change" },
        ],
        status: [
          { required: true, message: "请选择菜单状态", trigger: "change" },
        ],
        title: [
          {
            required: true,
            message: "请输入标题",
            tirgger: "blur",
          },
          {
            min: 3,
            max: 10,
            message: "长度在3-10个",
            tirgger: "blur",
          },
        ],
        name: [
          {
            required: true,
            message: "请输入规则",
            tirgger: "blur",
          },
          {
            min: 3,
            max: 30,
            message: "长度在3-30个",
            tirgger: "blur",
          },
        ],
        sort: [{ required: true, message: "请输入排序", trigger: "change" }],
        auth_open: [
          { required: true, message: "请选择权限状态", trigger: "change" },
        ],
        is_mobile: [
          { required: true, message: "请选择展示端口", trigger: "change" },
        ],
      },
      ltitle: "",
      //选中的数组
      ids: [],
      //选中时将对象保存到arrs中
      arrs: [],
      removecompanys: {
        id: "",
      },
      // 单个删除
      oneCompanyvalue: {
        id: "",
      },
      //   列表菜单开关
      loginFrom: {
        id: "",
        status: "",
      },
      //   列表权限开关
      loginFroms: {
        id: "",
        auth_open: "",
      },
      //   修改数据
      editEnterprise: {
        ltitle: "",
        type: "",
        pid: "",
        name: "",
        title: "",
        status: "",
        sort: "",
        auth_open: "",
        icon: "",
        is_mobile: "",
      },
      editEnterpriseRules: {
        type: [
          { required: true, message: "请选择是否为主菜单", trigger: "change" },
        ],
        status: [
          { required: true, message: "请选择菜单状态", trigger: "change" },
        ],
        title: [
          {
            required: true,
            message: "请输入标题",
            tirgger: "blur",
          },
          {
            min: 3,
            max: 10,
            message: "长度在3-10个",
            tirgger: "blur",
          },
        ],
        name: [
          {
            required: true,
            message: "请输入规则",
            tirgger: "blur",
          },
          {
            min: 3,
            max: 30,
            message: "长度在3-30个",
            tirgger: "blur",
          },
        ],
        sort: [{ required: true, message: "请输入排序", trigger: "change" }],
        auth_open: [
          { required: true, message: "请选择权限状态", trigger: "change" },
        ],
        is_mobile: [
          { required: true, message: "请选择展示端口", trigger: "change" },
        ],
      },
      //   修改show
      editDialogVisible: false,
      //   详情show
      detailsVisible: false,
      detailsVisiblesId: {
        id: "",
      },
      designerDetailsValue: {
        username: "",
      },
    };
  },
  created() {
    this.listRuleValue();
  },
  methods: {
    tableRowStyle() {
      return "background: #FFFFFF;box-shadow: 0px 2px 5px 1px rgba(0, 0, 0, 0.05);border-radius: 10px 10px 10px 10px;opacity: 1;";
    },
    tableStyle() {
      return "box-shadow: 0px 2px 5px 1px rgba(0, 0, 0, 0.05);border-radius: 10px 10px 10px 10px;opacity: 1;";
    },
    // 请求列表数据
    listRuleValue() {
      postD(this.url.listRuleInterface).then((res) => {
        this.tableData = res.list;
      });
    },
    // 父级选择数据
    addEnterprise() {
      this.addaddEnterpriseShow = true;
      postD(this.url.listRuleInterface).then((res) => {
        this.ltitle = res.list;
      });
    },
    // 是否开启菜单
    changelabel(va) {
      this.EnterpriseruleForm.status = va;
    },
    // 图标
    insert(value) {
      this.EnterpriseruleForm.icon = value;
    },
    // 添加
    addEnterpriseValue() {
      this.$refs.EnterpriseruleFormRef.validate((valid) => {
        if (!valid) return;
        postD(this.url.ruleAddInterface, this.EnterpriseruleForm).then(
          (res) => {
            if (res.code == "200") {
              this.$message.success("状态修改成功");
              this.addaddEnterpriseShow = false;
              this.reload();
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
      });
    },
    // 批量删除
    checkboxChangeEvent(data) {
      this.arrs = data.records;
    },
    async selectDel() {
      const selectDelValue = await this.$confirm(
        "此操作将永久删除管理, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);
      if (selectDelValue !== "confirm") {
        return this.$message.info("取消删除");
      }
      if (selectDelValue === "confirm") {
        this.arrs.forEach((v) => {
          this.ids.push(v.id);
        });
        this.removecompanys.id = this.ids.toString();
        postD(this.url.ruleSelectDelInterface, this.removecompanys).then(
          (res) => {
            if (res.code == "200") {
              this.$message.success("状态修改成功");
              this.listRuleValue();
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
        postD(this.url.ruleDelInterface, this.oneCompanyvalue).then((res) => {
          if (res.code == "200") {
            this.$message.success("状态修改成功");
            this.listRuleValue();
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
    // 菜单
    userStateChaged(data) {
      this.loginFrom.id = data.id;
      this.loginFrom.status = data.status;
      postD(this.url.ruleEditInterface, this.loginFrom).then((res) => {
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
    // 状态
    userAuthChaged(data) {
      this.loginFroms.id = data.id;
      this.loginFroms.auth_open = data.auth_open;
      postD(this.url.ruleEditInterface, this.loginFroms).then((res) => {
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
    // 修改
    showEditAddmodify(data) {
      this.editDialogVisible = true;
      this.editEnterprise = data;
      this.editEnterprise.type = data.type;
      this.editEnterprise.auth_open = data.auth_open;
      postD(this.url.listRuleInterface).then((res) => {
        this.ltitle = res.list;
      });
    },
    editChang() {
      this.editEnterprise.pid = this.editEnterprise.ltitle;
    },
    editDialogVisibleUser() {
      this.$refs.editEnterpriseref.validate((valid) => {
        if (!valid) return;
        postD(this.url.ruleEditInterface, this.editEnterprise).then((res) => {
          if (res.code == "200") {
            this.$message.success("状态修改成功");
            this.editDialogVisible = false;
            this.listRuleValue();
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
      });
    },
    detailsValue(data) {
      this.detailsVisible = true;
      this.detailsVisiblesId.id = data.id.toString();
      postD(this.url.authCompanyInterface, this.detailsVisiblesId).then(
        (res) => {
          console.log(res);
          this.designerDetailsValue = res.data;
        }
      );
    },
    filterType(val) {
      if (val === 1) {
        return "是菜单列表 ";
      } else {
        return "不是菜单列表";
      }
    },
    filterStatus(val) {
      if (val === 1) {
        return "开启 ";
      } else {
        return "关闭";
      }
    },
    filterAuth_open(val) {
      if (val === 1) {
        return "开启 ";
      } else {
        return "关闭";
      }
    },
    filterIs_mobile(val) {
      if (val === 1) {
        return "pc ";
      } else if (val === 2) {
        return "app";
      } else {
        return "两端";
      }
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
    .buttonStyles {
      line-height: 48px;
      width: 170px;
      height: 48px;
      background: rgb(39, 224, 248);
      box-shadow: 2px 5px 20px 1px rgba(58, 203, 233, 0.15);
      border-radius: 10px 10px 10px 10px;
      opacity: 1;
      cursor: pointer;
      p {
        font-size: 14px;
        font-weight: 500;
        color: #ffffff;
      }
    }
    .buttonStyle {
      line-height: 48px;
      width: 170px;
      height: 48px;
      background: red;
      box-shadow: 2px 5px 20px 1px rgba(58, 203, 233, 0.15);
      border-radius: 10px 10px 10px 10px;
      opacity: 1;
      cursor: pointer;
      margin-left: 15px;
      p {
        font-size: 14px;
        font-weight: 500;
        color: #ffffff;
      }
    }
  }
  .twons {
    padding: 20px;
  }
}
.postDyex {
  display: flex;
  justify-content: center;
  align-items: flex-end;
}
.postDyexer {
  padding: 0 5px;
}
.el-selects {
  z-index: 8000 !important;
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
.clickHeader {
  cursor: pointer;
}
</style>