<template>
  <div class="tike">
    <el-button type="primary" @click="addDialogVisible = true"
      >添加管理</el-button
    >
    <el-dialog title="添加" v-model="addDialogVisible" width="50%">
      <!-- 内容 -->
      <el-form
        :model="addForm"
        :rules="addFormRules"
        ref="addFormRef"
        label-width="100px"
      >
        <el-form-item label="菜单" prop="type">
          <el-radio-group v-model="addForm.type">
            <el-radio label="是" @click="isMenuClick(1)"></el-radio>
            <el-radio label="否" @click="noMenuClick(2)"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="父级" prop="ltitle">
          <el-select v-model="addForm.ltitle" placeholder="请选择">
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
        <el-form-item label="icon" prop="图标">
          <el-input v-model="addForm.icon"></el-input>
        </el-form-item>
        <el-form-item label="排序" prop="sort">
          <el-input v-model="addForm.sort"></el-input>
        </el-form-item>

        <el-form-item label="权限验证" prop="auth_open">
          <el-radio-group v-model="addForm.auth_open">
            <el-radio label="开启" @click="isOpenClick(1)"></el-radio>
            <el-radio label="关闭" @click="isCloseClick(0)"></el-radio>
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
export default {
  inject: ["reload"],
  data() {
    return {
      ltitle: "",
      url: {
        addInterface: "Auth/ruleAdd",
        pathParameters: "Auth/adminRule",
      },

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
            min: 3,
            max: 10,
            message: "长度在3-10个",
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
      postD(this.url.pathParameters).then((res) => {
        this.ltitle = res.list;
      });
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    isMenuClick(e) {
      this.addForm.type = e;
    },
    noMenuClick(i) {
      this.addForm.type = i;
    },
    isOpenClick(j) {
      this.addForm.auth_open = j;
    },
    isCloseClick(k) {
      this.addForm.auth_open = k;
    },
    addUser() {
      this.$refs.addFormRef.validate((valid) => {
        if (!valid) return;
        // 发请求
        postD(this.url.addInterface, this.addForm).then((res) => {
          if (res.code !== 200) {
            this.$message.error("添加失败");
          }
          this.$message.success("添加成功");
          this.addDialogVisible = false;
          this.reload();
        });
      });
    },
  },
};
</script>

<style lang="less" scoped>
.tike {
  text-align: left;
  .el-button {
    margin: 1em 2.5% 1em 2.5%;
  }
}
.el-select {
  width: 60em;
}
</style>