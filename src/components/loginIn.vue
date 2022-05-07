<template>
  <div id="loginbutton">
    <div class="login_box">
      <div class="avatar_box">
        <img src="../assets/imgers/tx.png" alt="" />
      </div>
      <el-form
        label-width="0px"
        class="login_form"
        :model="loginFrom"
        :rules="loginFromRules"
        ref="loginRef"
      >
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input placeholder="账号" v-model="loginFrom.username">
            <template #prefix>
              <el-icon class="el-input__icon"><avatar /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            placeholder="密码"
            v-model="loginFrom.password"
            type="password"
          >
            <template #prefix>
              <el-icon class="el-input__icon"
                ><svg
                  t="1649652762459"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="967"
                  width="200"
                  height="200"
                >
                  <path
                    d="M761.856 337.408V250.88c0-138.752-112.128-250.88-250.88-250.88s-250.88 112.128-250.88 250.88v86.528c-84.48 71.168-138.24 178.176-138.24 297.472 0 215.04 174.08 389.12 389.12 389.12s389.12-174.08 389.12-389.12c0-119.296-53.76-226.304-138.24-297.472z m-419.84-68.096c0-93.184 75.776-168.96 168.96-168.96 46.592 0 89.088 18.944 119.296 49.664 30.72 30.72 49.664 72.704 49.664 119.296v14.848c-51.2-24.576-108.544-38.4-168.96-38.4s-117.76 13.824-168.96 38.4v-14.848z m168.96 672.768c-169.472 0-307.2-137.728-307.2-307.2 0-73.216 25.6-140.8 68.608-193.536 20.48-25.088 45.056-47.104 72.704-65.024 47.616-30.72 104.96-48.64 165.888-48.64s118.272 17.92 165.888 48.64c27.648 17.92 52.224 39.936 72.704 65.024 43.008 52.736 68.608 120.32 68.608 193.536 0 169.472-137.216 307.2-307.2 307.2z"
                    p-id="968"
                  ></path>
                  <path
                    d="M510.976 716.8c-22.528 0-40.96-18.432-40.96-40.96v-81.92c0-22.528 18.432-40.96 40.96-40.96s40.96 18.432 40.96 40.96v81.92c0 22.528-18.432 40.96-40.96 40.96z"
                    p-id="969"
                  ></path></svg
              ></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <!-- 按钮 -->
        <el-form-item class="btns" style="display: flex">
          <el-button type="primary" @click="loginer">登入</el-button>
          <el-button type="info" @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { Avatar } from "@element-plus/icons-vue";
import { postD } from "../api/index.js";
export default {
  data() {
    return {
      url: {
        getHomePageHeadMessage: "Login/login",
      },
      loginFrom: {
        username: "",
        password: "",
      },
      loginFromRules: {
        username: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur",
          },
          {
            min: 3,
            max: 10,
            message: "Length should be 3 to 10",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur",
          },
          {
            min: 4,
            max: 15,
            message: "Length should be 6 to 15",
            trigger: "blur",
          },
        ],
      },
    };
  },
  created() {
    this.refreshtoken();
  },
  methods: {
    refreshtoken() {
      localStorage.removeItem("token");
    },
    // 点击重置
    reset() {
      this.$refs.loginRef.resetFields();
    },
    loginer() {
      this.$refs.loginRef.validate((valid) => {
        if (!valid) return;
        postD(this.url.getHomePageHeadMessage, this.loginFrom)
          .then((res) => {
            if (res.code !== 200) return this.$message.error("登入失败");
            this.$message.success("登入成功");
            localStorage.setItem("token", res.token);
            localStorage.setItem("use", res.data.username);
            this.$router.push("/home");
          })
          .catch((err) => {
            console.log(err);
          });
      });
    },
  },
  components: {
    Avatar,
  },
};
</script>

<style lang="less" scoped>
#loginbutton {
  height: 100%;
  background: url(../assets/imgers/bjt.png);
}
.login_box {
  width: 450px;
  height: 300px;
  background-color: white;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 0 10px black;
  .avatar_box {
    height: 130px;
    width: 130px;
    border: 1px solid white;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #000;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: burlywood;
    }
  }
}
.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 80px;
  box-sizing: border-box;
}
.btns {
  margin-left: 25%;
  margin-right: 25%;
}
</style>
