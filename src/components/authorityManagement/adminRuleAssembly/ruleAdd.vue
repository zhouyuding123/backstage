<template>
  <div class="tike">
    <el-button type="primary" @click="addDialogVisible = true"
      >添加管理</el-button
    >
    <el-dialog
      title="添加"
      v-model="addDialogVisible"
      width="50%"
      :destroy-on-close="true"
    >
      <!-- 内容 -->
      <el-form
        :model="addForm"
        :rules="addFormRules"
        ref="addFormRef"
        label-width="100px"
      >
        <el-form-item label="菜单" prop="type">
          <el-radio-group v-model="addForm.type" @change="changelabel">
            <el-radio label="1">是</el-radio>
            <el-radio label="2">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="父级" prop="ltitle">
          <el-select
            v-model="addForm.ltitle"
            placeholder="请选择"
            @change="chang()"
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
          <el-input v-model="addForm.name"></el-input>
        </el-form-item>
        <el-form-item label="标题" prop="title">
          <el-input v-model="addForm.title"></el-input>
        </el-form-item>
        <el-form-item label="url" prop="url">
          <el-input v-model="addForm.url"></el-input>
        </el-form-item>

        <el-form-item label="sort" prop="sort">
          <el-input v-model="addForm.sort"></el-input>
        </el-form-item>
        <el-form-item label="icon" prop="图标">
          <icon-list @update:modelValue="insert" />
        </el-form-item>
        <el-form-item label="权限验证" prop="auth_open">
          <el-radio-group v-model="addForm.auth_open">
            <el-radio label="1">开启</el-radio>
            <el-radio label="0">关闭</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <span class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { postD } from "../../../api/index.js";
import iconList from "./iconList.vue";
import { AuthAdminRuleApi, AuthRuleAddApi } from "@/urls/authUrl.js";
export default {
  components: { iconList },
  inject: ["userList", "leftNavigationList", "reload"],
  data() {
    return {
      ltitle: "",
      // 添加按钮打开关闭
      addDialogVisible: false,
      //  添加表单的数据
      addForm: {
        ltitle: "",
        title: "",
        url: "",
        name: "",
        icon: "",
        sort: "",
        type: "",
        auth_open: "",
        pid: "",
      },
      addFormRules: {
        delivery: false,
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
            min: 2,
            max: 30,
            message: "长度在2-30个",
            tirgger: "blur",
          },
        ],
        type: [{ required: true, message: "选择是否菜单", trigger: "change" }],
      },
    };
  },
  created() {
    this.ltitleValue();
  },
  methods: {
    ltitleValue() {
      postD(AuthAdminRuleApi()).then((res) => {
        this.ltitle = res.list;
      });
    },
    addUser() {
      this.$refs.addFormRef.validate((valid) => {
        if (!valid) return;
        // 发请求
        postD(AuthRuleAddApi(), this.addForm).then((res) => {
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
          this.addDialogVisible = false;
          this.userList();
          this.leftNavigationList();
          this.reload();
        });
      });
    },
    chang() {
      this.addForm.pid = this.addForm.ltitle;
    },
    changelabel(va) {
      this.addForm.type = va;
    },
    insert(value) {
      this.addForm.icon = value;
    },
  },
};
</script>

<style lang="less" scoped>
.el-select {
  width: 60em;
}
</style>