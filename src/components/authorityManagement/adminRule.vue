<template>
  <div class="backColor">
    <!-- 添加 -->
    <rule-add />
    <div>
      <vxe-table
        class="leftser"
        round
        ref="xTree"
        row-id="id"
        :tree-config="{
          transform: true,
          rowField: 'id',
          parentField: 'pid',
          lazy: true,
          hasChild: 'hasChild',
        }"
        :data="tableData1"
        @checkbox-change="checkboxChangeEvent"
        @checkbox-all="checkboxChangeEvent"
        :row-style="tableRowStyle"
        :header-row-style="tableStyle"
      >
        <vxe-column
          align="center"
          type="checkbox"
          width="80"
          class="linker"
        ></vxe-column>
        <vxe-column
          type="seq"
          align="center"
          title="序号"
          width="60"
        ></vxe-column>
        <vxe-column field="id" title="id" width="60"></vxe-column>
        <vxe-column
          tree-node
          field="ltitle"
          title="标题"
          width="350"
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
        <vxe-column field="status" title="菜单" width="80" align="center">
          <template v-slot="scoped">
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
              <!-- 修改 -->
              <div class="Edit">
                <el-button
                  type="primary"
                  @click="showEditAddmodify(scoped.row)"
                >
                  <svg
                    t="1649929274884"
                    class="icon"
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="6151"
                    width="16"
                    height="16"
                  >
                    <path
                      d="M784.9 925.8H239.1c-77.7 0-140.9-63.2-140.9-140.9V239.1c0-77.7 63.2-140.9 140.9-140.9H512c27.5 0 49.9 22.3 49.9 49.9S539.6 198 512 198H239.1c-22.7 0-41.2 18.5-41.2 41.2v545.7c0 22.7 18.5 41.2 41.2 41.2h545.7c22.7 0 41.2-18.5 41.2-41.2V512c0-27.6 22.3-49.9 49.9-49.9 27.5 0 49.9 22.3 49.9 49.9v272.8c0 77.8-63.3 141-140.9 141z"
                      p-id="6152"
                      fill="#ffffff"
                    ></path>
                    <path
                      d="M427.6 646.3c-12.8 0-25.5-4.9-35.3-14.6-19.5-19.5-19.5-51 0-70.5L816.5 137c19.5-19.5 51-19.5 70.5 0s19.5 51 0 70.5L462.8 631.7c-9.7 9.7-22.5 14.6-35.2 14.6z"
                      p-id="6153"
                      fill="#ffffff"
                    ></path>
                  </svg>
                  编辑
                </el-button>
                <el-dialog title="修改信息" v-model="editAddmodify" width="50%">
                  <el-form
                    :model="editFrom"
                    :rules="editFromRules"
                    ref="editFromref"
                    label-width="70px"
                  >
                    <el-form-item label="菜单" prop="type">
                      <el-radio-group v-model="editFrom.type">
                        <el-radio :label="1">是</el-radio>
                        <el-radio :label="2">否</el-radio>
                      </el-radio-group>
                    </el-form-item>

                    <el-form-item label="父级" prop="title">
                      <el-select v-model="editFrom.ltitle" placeholder="请选择">
                        <el-option
                          v-for="item in ltitle"
                          :key="item.id"
                          :label="item.ltitle"
                          :value="item.id"
                          disabled
                        >
                        </el-option>
                      </el-select>
                    </el-form-item>

                    <el-form-item label="规则" prop="name">
                      <el-input v-model="editFrom.name"></el-input>
                    </el-form-item>
                    <el-form-item label="标题" prop="title">
                      <el-input v-model="editFrom.title"></el-input>
                    </el-form-item>
                    <el-form-item label="icon" prop="图标">
                      <icon-list @update:modelValue="insert" />
                    </el-form-item>
                    <el-form-item label="排序" prop="sort">
                      <el-input v-model="editFrom.sort"></el-input>
                    </el-form-item>
                    <el-form-item label="权限验证" prop="auth_open">
                      <el-radio-group v-model="editFrom.auth_open">
                        <el-radio :label="1">开启</el-radio>
                        <el-radio :label="0">关闭</el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </el-form>

                  <span>
                    <el-button @click="editAddmodify = false">取消</el-button>
                    <el-button type="primary" @click="editInfo">确定</el-button>
                  </span>
                </el-dialog>
              </div>
              <!-- 删除 -->
              <div class="postDyexer">
                <el-button type="danger" @click="removeRow(scoped.row)">
                  <svg
                    t="1649929178133"
                    class="icon"
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="4525"
                    width="16"
                    height="16"
                  >
                    <path
                      d="M872.7 278.8H151.5c-30.3 0-55-24.7-55-55v-32.7c0-22 17.9-39.9 39.9-39.9h744.4c25.7 0 46.7 21 46.7 46.7v25.9c0 30.4-24.6 55-54.8 55z m-736.3-96.3c-4.8 0-8.6 3.9-8.6 8.7v32.7c0 13.1 10.7 23.7 23.7 23.7h721.2c13.2 0 23.6-10.4 23.6-23.7V198c0-8.5-7-15.5-15.5-15.5H136.4z"
                      fill="#ffffff"
                      p-id="4526"
                    ></path>
                    <path
                      d="M602.9 182.5H421.1v-17.6c0-50.1 40.8-90.8 90.9-90.8 50.1 0 90.9 40.8 90.9 90.8v17.6zM454 151.2h116c-6.2-26.3-29.9-45.9-58-45.9-28.2 0-51.8 19.6-58 45.9zM695.8 948H328.1C267.4 948 218 898.6 218 837.9V247.6h588v590.3c0 60.7-49.4 110.1-110.2 110.1zM249.3 278.8v559c0 43.5 35.4 78.9 78.9 78.9h367.7c43.5 0 78.9-35.4 78.9-78.9v-559H249.3z"
                      fill="#ffffff"
                      p-id="4527"
                    ></path>
                    <path
                      d="M400.7 784.9c-8.6 0-15.6-7-15.6-15.6v-386c0-8.6 7-15.6 15.6-15.6s15.6 7 15.6 15.6v386c0 8.6-7 15.6-15.6 15.6zM512 784.9c-8.6 0-15.6-7-15.6-15.6v-386c0-8.6 7-15.6 15.6-15.6s15.6 7 15.6 15.6v386c0 8.6-7 15.6-15.6 15.6zM623.3 728.9c-8.6 0-15.6-7-15.6-15.6v-330c0-8.6 7-15.6 15.6-15.6s15.6 7 15.6 15.6v330c0 8.6-7 15.6-15.6 15.6z"
                      fill="#ffffff"
                      p-id="4528"
                    ></path>
                  </svg>
                  删除</el-button
                >
              </div>
            </div>
          </template>
        </vxe-column>
      </vxe-table>
    </div>
    <div class="deleteRow">
      <vxe-button @click="deleteRow" status="danger" icon="fa fa-trash-o"
        >批量删除</vxe-button
      >
    </div>
  </div>
</template>
<script>
import { postD } from "../../api/index";
import ruleAdd from "./adminRuleAssembly/ruleAdd.vue";
import iconList from "./adminRuleAssembly/iconList.vue";
export default {
  inject: ["leftNavigationList"],
  provide() {
    return {
      userList: this.userList,
    };
  },
  components: { ruleAdd, iconList },
  data() {
    return {
      //选中的数组
      ids: [],
      idsL: {
        id: "",
      },
      //选中时将对象保存到arrs中
      arrs: [],
      tableData1: [],
      url: {
        getHomePageHeadMessage: "Auth/ruleEdit",
        deleteIInterface: "Auth/ruleDel",
        ruleEditInterface: "Auth/ruleEdit",
        pathParameters: "Auth/adminRule",
        ruleSelectDel: "Auth/ruleSelectDel",
      },
      loginFrom: {
        id: "",
        status: "",
      },
      loginFroms: {
        id: "",
        auth_open: "",
      },
      removeRowFrom: {
        id: "",
      },
      editAddmodify: false,
      editFrom: {
        ltitle: "",
        title: "",
        name: "",
        icon: "",
        sort: "",
        type: "",
        auth_open: "",
        status: "",
        pid: "",
        id: "",
      },
      editFromRules: {
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
      },
      ltitle: "",
    };
  },
  created() {
    this.userList();
    this.editltitleValue();
  },
  methods: {
    userList() {
      postD("Auth/adminRule").then((res) => {
        this.tableData1 = res.list;
      });
    },
    // 菜单开关
    userStateChaged(userinfo) {
      this.loginFrom.id = userinfo.id;
      this.loginFrom.status = userinfo.status;
      postD(this.url.getHomePageHeadMessage, this.loginFrom).then((res) => {
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
    // 状态开关
    userAuthChaged(userinfor) {
      this.loginFroms.id = userinfor.id;
      this.loginFroms.auth_open = userinfor.auth_open;
      postD(this.url.getHomePageHeadMessage, this.loginFroms).then((res) => {
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
    // 删除按钮
    async removeRow(userinfors) {
      const removeValue = await this.$confirm(
        "此操作将永久删除管理, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);

      if (removeValue !== "confirm") {
        return this.$message.info("取消删除");
      }
      if (removeValue === "confirm") {
        this.removeRowFrom.id = userinfors.id;
        postD(this.url.deleteIInterface, this.removeRowFrom).then((res) => {
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
          this.userList();
          this.leftNavigationList();
        });
      }
    },
    editltitleValue() {
      postD(this.url.pathParameters).then((res) => {
        this.ltitle = res.list;
      });
    },
    showEditAddmodify(id) {
      this.editFrom = id;
      this.editFrom.id = id.id;
      this.editFrom.type = id.type;
      this.editFrom.auth_open = id.auth_open;
      this.editAddmodify = true;
    },
    editInfo() {
      this.$refs.editFromref.validate((valid) => {
        if (!valid) return;
        postD(this.url.ruleEditInterface, this.editFrom).then((res) => {
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

          this.editAddmodify = false;
          
          this.leftNavigationList();
          this.userList();
        });
      });
    },
    checkboxChangeEvent(data) {
      this.arrs = data.records;
    },
    async deleteRow() {
      const deleteRows = await this.$confirm(
        "此操作将永久删除管理, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);

      if (deleteRows !== "confirm") {
        return this.$message.info("取消删除");
      }
      if (deleteRows === "confirm") {
        this.arrs.forEach((v) => {
          this.ids.push(v.id);
        });
        this.idsL.id = this.ids.toString();
        postD(this.url.ruleSelectDel, this.idsL).then((res) => {
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
          this.userList();
          this.leftNavigationList();
        });
      }
    },
    insert(value) {
      this.editFrom.icon = value
    },
    tableRowStyle() {
      return "background: #FFFFFF;box-shadow: 0px 2px 5px 1px rgba(0, 0, 0, 0.05);border-radius: 10px 10px 10px 10px;opacity: 1;";
    },
    tableStyle() {
      return "box-shadow: 0px 2px 5px 1px rgba(0, 0, 0, 0.05);border-radius: 10px 10px 10px 10px;opacity: 1;";
    },
  },
};
</script>

<style lang="less" scoped>
@import "../../assets/css/style.css";
.backColor {
  background: #f9f9f9;
  width: 100%;
  height: 100%;
}
.leftser {
  margin-left: 2.5%;
  margin-right: 2.5%;
}
.linker {
  margin-top: 10%;
}
.postDyex {
  display: table;
  width: 100%;
}
.postDyexer {
  width: 50%;
  display: table-cell;
}
.Edit {
  width: 50%;
  display: table-cell;
}
.el-select {
  width: 60em;
}
.deleteRow {
  text-align: left;
  .vxe-button {
    margin: 1em 2.5% 1em 2.5%;
  }
}
.ssss {
  width: 100px;
  height: 100px;
  background-color: aqua;
}
</style>
