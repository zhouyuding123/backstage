<template>
  <div class="leftser">
    <div>
      <div class="Page-description">
        <p>管理员管理</p>
        <p>
          一个管理员可以有多个角色组,左侧的菜单根据管理员所拥有的权限进行生成
        </p>
      </div>

      <div class="Query-search">
        <el-row>
          <el-col :span="1"
            ><div>
              <el-button type="success" @click="addUser = true">添加</el-button>
              <el-dialog
                title="添加"
                width="50%"
                v-model="addUser"
                @close="addListClosed"
              >
                <span class="dialog-footer">
                  <el-form
                    :model="addList"
                    :rules="addListRules"
                    ref="addListRef"
                    label-width="100px"
                  >
                    <el-form-item label="用户名" prop="username">
                      <el-input v-model="addList.username"></el-input>
                    </el-form-item>
                    <el-form-item label="昵称" prop="nickname">
                      <el-input v-model="addList.nickname"></el-input>
                    </el-form-item>
                    <el-form-item label="组别">
                      <vxe-select
                        v-model="addList.group_id"
                        placeholder="请选择"
                      >
                        <vxe-option
                          v-for="item in group"
                          :key="item.id"
                          :value="item.id"
                          :label="item.title"
                        ></vxe-option>
                      </vxe-select>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                      <el-input v-model="addList.password"></el-input>
                    </el-form-item>
                    <el-form-item label="头像">
                      <el-upload
                        class="avatar-uploader"
                        action="http://weisou.chengduziyi.com/admin/Uploads/uploadFile"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload"
                        :data="{ fileType: this.fileType }"
                      >
                        <img
                          v-if="imageUrl"
                          :src="imageUrl"
                          class="avatar"
                          :v-model="imageUrl"
                        />
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                      </el-upload>
                    </el-form-item>
                  </el-form>
                  <el-button @click="addUser = false">取 消</el-button>
                  <el-button type="primary" @click="addUserList"
                    >确 定</el-button
                  >
                </span>
              </el-dialog>
            </div></el-col
          >
          <el-col :span="1"
            ><el-button type="danger" plain @click="deleteUser"
              >批量删除</el-button
            ></el-col
          >
        </el-row>
      </div>
    </div>
    <div>
      <vxe-table
        border
        :align="allAlign"
        :row-config="{ isHover: true }"
        :data="tableData"
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
          title="id"
          width="60"
          align="center"
        ></vxe-column>
        <vxe-column field="username" title="用户名" align="center"></vxe-column>
        <vxe-column
          field="nickname"
          title="真实姓名"
          align="center"
        ></vxe-column>
        <vxe-column field="group" title="所属组别" align="center"></vxe-column>
        <vxe-column field="loginip" title="登录ip" align="center"></vxe-column>
        <vxe-column title="头像" width="100" align="center">
          <template v-slot="scoped">
            <el-image
              :src="
                'https://weisoutc.oss-cn-shanghai.aliyuncs.com/' +
                scoped.row.image
              "
              alt=""
              :preview-src-list="[
                'https://weisoutc.oss-cn-shanghai.aliyuncs.com/' +
                  scoped.row.image,
              ]"
              style="width: 50px; height: 50px"
              class="textphoto"
            />
          </template>
        </vxe-column>
        <vxe-column
          field="create_time"
          title="登陆时间"
          align="center"
        ></vxe-column>
        <vxe-column
          field="update_time"
          title="最后登录"
          align="center"
        ></vxe-column>
        <vxe-column title="操作" align="center">
          <template v-slot="scoped">
            <div class="postDyex">
              <div class="Edit">
                <el-button
                  type="primary"
                  @click="adminListEditAddmodify(scoped.row)"
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
                    ></path></svg
                  >编辑</el-button
                >
                <el-dialog
                  title="修改信息"
                  v-model="adminListeditAddmodify"
                  width="50%"
                >
                  <el-form
                    :model="adminListeditFrom"
                    :rules="adminListeditFromRules"
                    ref="adminListeditFromref"
                    label-width="70px"
                  >
                    <el-form-item label="用户名" prop="username">
                      <el-input v-model="adminListeditFrom.username"></el-input>
                    </el-form-item>
                    <el-form-item label="真实姓名" prop="nickname">
                      <el-input v-model="adminListeditFrom.nickname"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                      <el-input v-model="adminListeditFrom.password"></el-input>
                    </el-form-item>
                    <el-form-item label="组别">
                      <vxe-select
                        v-model="adminListeditFrom.group_id"
                        placeholder="请选择"
                      >
                        <vxe-option
                          v-for="item in group"
                          :key="item.id"
                          :value="item.id"
                          :label="item.title"
                        ></vxe-option>
                      </vxe-select>
                    </el-form-item>
                    <el-form-item label="状态">
                      <el-radio-group v-model="adminListeditFrom.status">
                        <el-radio :label="1">开启</el-radio>
                        <el-radio :label="0">关闭</el-radio>
                      </el-radio-group>
                    </el-form-item>
                    <el-form-item label="头像">
                    <el-upload
                      class="avatar-uploader"
                      action="http://weisou.chengduziyi.com/admin/Uploads/uploadFile"
                      :show-file-list="false"
                      :on-success="handleAvatarSuccesser"
                      :before-upload="beforeAvatarUploader"
                      :data="{ fileType: this.fileType }"
                    >
                      <img
                        v-if="imageUrlValue"
                        :src="imageUrlValue"
                        class="avatar"
                        :v-model="imageUrlValue"
                      />
                      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                  </el-form-item>
                  </el-form>
                  

                  <span>
                    <el-button @click="adminListeditAddmodify = false"
                      >取消</el-button
                    >
                    <el-button type="primary" @click="adminListinfo"
                      >确定</el-button
                    >
                  </span>
                </el-dialog>
              </div>
              <div class="postDyexer">
                <el-button type="danger" @click="adminListremoveRow(scoped.row)"
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
    </div>
  </div>
</template>
<script>
import { postD } from "../../api/index.js";
export default {
  data() {
    return {
      imageUrlValue: "",
      imageUrl: "",
      fileType: "images",
      group: "",
      adminListeditAddmodify: false,
      adminListeditFrom: {
        id: "",
        group_id: "",
        password: "",
        status: "",
        image: "",
      },
      adminListeditFromRules: {
        group_id: [
          {
            required: true,
            message: "请输入标题",
            tirgger: "blur",
          },
        ],
      },
      //选中的数组
      ids: {
        id: "",
      },
      //选中时将对象保存到arrs中
      arrs: [],
      show: false,
      url: {
        adminListInterface: "Auth/adminList",
        adminAddInterface: "Auth/adminAdd",
        adminSelectDelInterface: "Auth/adminSelectDel",
        adminEditInterface: "Auth/adminEdit",
        adminDelInterface: "Auth/adminDel",
        // 下拉框
        adminGroupInterface: "Auth/adminGroup",
      },
      // 删除按钮
      adminListremoveRowFrom: {
        id: "",
      },
      value: "",
      input: "",
      allAlign: null,
      tableData: [],
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
      value2: "",
      addUser: false,
      addList: {
        username: "",
        password: "",
        nickname: "",
        group_id: "",
        image: "",
      },
      addListRules: {
        username: [
          {
            required: true,
            message: "请输入用户名",
            tirgger: "blur",
          },
          {
            min: 3,
            max: 10,
            message: "长度在3-10个",
            tirgger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "请输入用密码",
            tirgger: "blur",
          },
          {
            min: 3,
            max: 10,
            message: "长度在3-10个",
            tirgger: "blur",
          },
        ],
        nickname: [
          {
            required: true,
            message: "请输入昵称",
            tirgger: "blur",
          },
        ],
      },
    };
  },
  created() {
    this.tableDataValue();
    this.addListAdd();
  },
  methods: {
    tableDataValue() {
      postD(this.url.adminListInterface).then((res) => {
        this.tableData = res.list;
      });
    },
    // 添加用户
    addUserList() {
      console.log(this.addList.image);
      this.$refs.addListRef.validate((valid) => {
        if (!valid) return;
        postD(this.url.adminAddInterface, this.addList).then((res) => {
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
          this.addUser = false;
          this.tableDataValue();
        });
      });
    },
    // 下拉框
    addListAdd() {
      postD(this.url.adminGroupInterface).then((res) => {
        this.group = res.list;
      });
    },
    addListClosed() {
      this.$refs.addListRef.resetFields();
      this.addList.group_id = "";
    },
    checkboxChangeEvent(data) {
      this.arrs = data.records;
    },
    // 批量删除按钮
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
          postD(this.url.adminSelectDelInterface, this.ids).then((res) => {
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
            this.tableDataValue();
          });
        });
      }
    },
    adminListEditAddmodify(id) {
      this.adminListeditFrom = id;
      this.adminListeditFrom.id = id.id;
      this.adminListeditAddmodify = true;
    },
    adminListinfo() {
      this.$refs.adminListeditFromref.validate((v) => {
        if (!v) return;
        postD(this.url.adminEditInterface, this.adminListeditFrom).then(
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
            this.adminListeditAddmodify = false;
            
            this.tableDataValue();
          }
        );
      });
    },
    async adminListremoveRow(id) {
      const removeadminList = await this.$confirm(
        "此操作将永久删除管理, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);
      if (removeadminList !== "confirm") {
        return this.$message.info("取消删除");
      }
      if (removeadminList === "confirm") {
        this.adminListremoveRowFrom.id = id.id;
        postD(this.url.adminDelInterface, this.adminListremoveRowFrom).then(
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
            this.tableDataValue();
          }
        );
      }
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      this.addList.image = res.url;
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    handleAvatarSuccesser(res, file) {
      this.imageUrlValue = URL.createObjectURL(file.raw);
      this.adminListeditFrom.image = res.url;
    },
    beforeAvatarUploader(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
  },
};
</script>

<style lang="less" scoped>
.leftser {
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
.Query-search {
  .el-row {
    text-align: left;
    padding-top: 15px;
    padding-bottom: 15px;
  }
  .el-select {
    width: 100%;
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
.textphoto {
  position: absolute;
  top: 0;
  left: 25%;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
