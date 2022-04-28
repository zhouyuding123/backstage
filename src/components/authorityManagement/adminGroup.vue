<template>
  <div class="group-left">
    <div class="Page-description">
      <p>角色组</p>
      <p>
        角色组可以有多个,角色有上下级层级关系,如果子角色有角色组和管理员的权限则可以派生属于自己组别的下级角色组或管理员
      </p>
    </div>
    <div class="addPage-Group">
      <el-row>
        <el-col :span="1">
          <el-button type="success" @click="addGroup = true">添加</el-button>
          <el-dialog
            title="添加"
            width="50%"
            v-model="addGroup"
            @close="addListClosed"
          >
            <el-form
              :model="addGroupList"
              :rules="addGroupListRules"
              ref="addGroupListref"
              label-width="100px"
            >
              <el-form-item label="用户名" prop="title">
                <el-input v-model="addGroupList.title"></el-input>
              </el-form-item>

              <el-form-item label="状态" prop="status">
                <el-radio-group
                  v-model="addGroupList.status"
                  @change="changelabel"
                >
                  <el-radio label="1">开启</el-radio>
                  <el-radio label="0">关闭</el-radio>
                </el-radio-group>
              </el-form-item>

              <el-form-item label="权限" prop="rules">
                <vxe-table
                  class="leftser"
                  border
                  round
                  resizable
                  ref="xTree"
                  row-id="id"
                  :tree-config="{
                    transform: true,
                    rowField: 'id',
                    parentField: 'pid',
                    lazy: true,
                    hasChild: 'hasChild',
                  }"
                  :data="data"
                  @checkbox-change="checkboxChangeEventer"
                  @checkbox-all="checkboxChangeEventer"
                >
                  <vxe-column
                    align="center"
                    type="checkbox"
                    width="50"
                    class="linker"
                  ></vxe-column>
                  <vxe-column tree-node field="ltitle" width="350"></vxe-column>
                </vxe-table>
              </el-form-item>
            </el-form>
            <span>
              <el-button @click="addGroup = false">取 消</el-button>
              <el-button type="primary" @click="addGroupSubmit"
                >确 定</el-button
              >
            </span>
          </el-dialog>
        </el-col>
        <el-col :span="1">
          <el-button type="danger" plain @click="deleteUser"
            >批量删除</el-button
          >
        </el-col>
      </el-row>
    </div>
    <div class="table-padding">
      <vxe-table
        border
        :align="allAlign"
        :row-config="{ isHover: true }"
        :data="tableData"
        @checkbox-change="checkboxChangeEvent"
        @checkbox-all="checkboxChangeEvent"
        row-id="id"
      >
        <vxe-column
          align="center"
          type="checkbox"
          width="80"
          class="linker"
        ></vxe-column>
        <vxe-column type="seq" title="id" width="60"></vxe-column>
        <vxe-column field="title" title="组别"></vxe-column>
        <vxe-column field="status" title="地位"></vxe-column>
        <vxe-column field="create_time" title="创建时间"></vxe-column>
        <vxe-column field="update_time" title="更新时间"></vxe-column>
        <vxe-column title="操作">
          <template v-slot="scoped">
            <div class="postDyex">
              <div class="Edit">
                <el-button
                  type="primary"
                  @click="adminGroupEditaddList(scoped.row)"
                  ><svg
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
                <el-dialog
                  title="修改信息"
                  v-model="adminGroupEditadd"
                  width="50%"
                  @close="setRightClosed"
                >
                  <el-form
                    :model="adminGroupEditFrom"
                    :rules="adminGroupEditFromRules"
                    ref="adminGroupEditFromref"
                    label-width="70px"
                  >
                    <el-form-item label="用户名" prop="title">
                      <el-input v-model="adminGroupEditFrom.title"></el-input>
                    </el-form-item>
                    <el-form-item label="状态" prop="status">
                      <el-radio-group v-model="adminGroupEditFrom.status">
                        <el-radio :label="1">开启</el-radio>
                        <el-radio :label="0">关闭</el-radio>
                      </el-radio-group>
                    </el-form-item>

                    <el-form-item label="权限">
                      <el-tree
                        show-checkbox
                        node-key="id"
                        ref="tree"
                        highlight-current
                        :data="datas"
                        :props="defaultProps"
                        @check="
                          (click, checked) => {
                            handleNodeClickEdit(click, checked);
                          }
                        "
                        :default-checked-keys="rules"
                      ></el-tree>
                    </el-form-item>
                  </el-form>
                  <span>
                    <el-button @click="adminGroupEditadd = false"
                      >取 消</el-button
                    >
                    <el-button type="primary" @click="adminGroupEditaddinfo"
                      >确 定</el-button
                    >
                  </span>
                </el-dialog>
              </div>

              <div class="postDyexer">
                <el-button type="danger" @click="removeRow(scoped.row)"
                  ><svg
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
                    ></path></svg
                  >删除</el-button
                >
              </div>
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
        @page-change="handlePageChange"
      >
      </vxe-pager>
    </div>
  </div>
</template>

<script>
import { postD } from "../../api/index.js";
export default {
  inject: ["reload"],
  data() {
    return {
      removeRowFrom: {
        id: "",
      },
      radio: 1,
      // 修改
      rules: [],
      adminGroupEditadd: false,
      adminGroupEditFrom: {
        id: "",
        title: "",
        rules: [],
        status: "",
      },
      adminGroupEditFromRules: {},
      ltitle: {},
      page1: {
        offset: 1,
        limit: 10,
        totalResult: 0,
      },
      url: {
        adminGroupInterface: "Auth/adminGroup",
        getHomePageHeadMessage: "Index/index",
        groupAddInterface: "Auth/groupAdd",
        groupSelectDelInterface: "Auth/groupSelectDel",
        groupEditInterface: "Auth/groupEdit",
        groupDelInterface: "Auth/groupDel",
        // 读取权限
        adminRuleInterface: "Auth/adminRule",
      },
      allAlign: null,
      tableData: [],
      show: true,
      // 添加功能对话框
      addGroup: false,
      addGroupList: {
        title: "",
        rules: "",
        status: "",
      },
      addGroupListRules: {
        title: [
          {
            required: true,
            message: "请输入用户名",
            tirgger: "blur",
          },
          {
            min: 2,
            max: 10,
            message: "用户名长度在2-10个字",
            tirgger: "blur",
          },
        ],
        status: [{ required: true, message: "请选择状态", tirgger: "change" }],
      },
      // 权限
      data: [],
      defaultProps: {
        children: "children",
        label: "ltitle",
      },
      //选中的数组 批量删除
      ids: {
        id: "",
      },
      //选中时将对象保存到arrs中
      arrs: [],
      // 搜索
      abb: "",
      pushId: [],
      datas: [],
      datap: [],
    };
  },
  created() {
    this.groupVaule();
    this.addPermission();
    this.addPermissioner();
  },
  methods: {
    checkboxChangeEventer(data) {
      this.abb = data.records;
    },
    groupVaule() {
      postD(this.url.adminGroupInterface, this.page1).then((res) => {
        this.tableData = res.list;
        this.page1.totalResult = res.count;
        this.loading = false;
      });
    },
    //添加权限
    addPermission() {
      postD(this.url.adminRuleInterface).then((res) => {
        this.data = res.list;
      });
    },
    addPermissioner() {
      postD(this.url.adminRuleInterface).then((res) => {
        var arr = res.list
        arr.map((item, i) => {
          if (item.pid == 0) {
            item.children = [];
            this.datas.push(item);
          }
        });
        this.datas.forEach((item, i) => {
          arr.forEach((list, j) => {
            if (item.id == list.pid) {
              list.children = [];
              item.children.push(list);
            }
          });
        });
        arr.forEach((jk, k) => {
          this.datas.forEach((item, i) => {
            if (item.children.length > 0) {
              item.children.forEach((list, j) => {
                if (list.id == jk.pid) {
                  list.children.push(jk);
                }
              });
            }
          });
        });
      });
    },
    addGroupSubmit() {
      this.$refs.addGroupListref.validate((v) => {
        if (!v) return;
        this.abb.forEach((s) => {
          this.pushId.push(s.id);
        });
        this.addGroupList.rules = this.pushId.toString();
        postD(this.url.groupAddInterface, this.addGroupList).then((res) => {
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
          this.addGroup = false;
          this.groupVaule();
        });
      });
    },
    addListClosed() {
      this.$refs.addGroupListref.resetFields();
    },
    checkboxChangeEvent(data) {
      this.arrs = data.records;
    },
    // 批量删除
    async deleteUser() {
      const deleteUsers = await this.$confirm(
        "此操作将永久删除管理, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);
      if (deleteUsers !== "confirm") {
        return this.$message.info("取消删除");
      }
      if (deleteUsers === "confirm") {
        this.arrs.forEach((v) => {
          this.ids.id = v.id;
          postD(this.url.groupSelectDelInterface, this.ids).then((res) => {
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
            this.groupVaule();
          });
        });
      }
    },
    adminGroupEditaddList(id) {
      this.adminGroupEditFrom.id = id.id;
      this.adminGroupEditFrom.title = id.title;
      this.adminGroupEditFrom.status = id.status;

      this.rules = id.rules;
      this.rules = id.rules.split(",");
      this.adminGroupEditadd = true;
    },
    changelabel(va) {
      this.addGroupList.status = va;
    },
    setRightClosed() {
      this.reload();
    },
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
        postD(this.url.groupDelInterface, this.removeRowFrom).then((res) => {
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
          this.groupVaule();
        });
      }
    },
    handleNodeClickEdit(data, checked) {
      console.log(checked);
      this.adminGroupEditFrom.rules = checked.checkedKeys.toString();
    },
    adminGroupEditaddinfo() {
      this.$refs.adminGroupEditFromref.validate((v) => {
        postD(this.url.groupEditInterface, this.adminGroupEditFrom).then(
          (res) => {
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
            this.adminGroupEditadd = false;
            
          }
        );
      });
    },
    handlePageChange({ currentPage, pageSize }) {
      this.page1.offset = currentPage;
      this.page1.limit = pageSize;
      this.groupVaule();
    },
  },
};
</script>

<style lang="less" scoped>
.group-left {
  margin-top: 2.5%;
  margin-left: 2.5%;
  margin-right: 2.5%;
}
.Page-description {
  font-size: 14px;
  text-align: left;
  background-color: #e8edf0;
  height: 67px;
  padding: 15px;
}
.table-padding {
  padding: 15px 0 0 0;
}
.addPage-Group {
  padding-top: 15px;
  text-align: left;
}
.fuzzySearch {
  padding-top: 15px;
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
</style>