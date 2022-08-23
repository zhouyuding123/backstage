<template>
  <el-container class="layout-container-demo" style="height: 100%">
    <el-aside :width="isCollapse ? '55px' : '200px'">
      <el-scrollbar >
        <div>
          <div class="logStyle">
            <img src="../../assets/logo.png" alt="" />
          </div>
        </div>
        <el-menu
          :collapse="isCollapse"
          :collapse-transition="false"
          router
          background-color="rgb(39,56,69)"
        >
          <div class="indexhomePageStyle">
            <router-link class="indexhomePage" to="/pageHome">
              <div>控制台</div></router-link>
          </div>
          <el-sub-menu
            v-for="item in leftNavigationValue"
            :key="item.id"
            :index="item.id + ''"
          >
            <template #title>
              <el-icon><i :class="item.icon"></i></el-icon>
              <div class="textLitle">{{ item.title }}</div>
            </template>
            <el-menu-item-group>
              <el-menu-item
                v-for="value in item.children"
                :key="value.id"
                :index="'/' + value.name"
              >
                <div>{{ value.title }}</div>
              </el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
        </el-menu>
      </el-scrollbar>
    </el-aside>
    <el-container>
      <el-header
        style="
          text-align: right;
          font-size: 12px;
          box-shadow: 1px 1px 30px rgb(0 21 41 / 8%);
          border-radius: 60px 60px 60px 60px;
          opacity: 1;
        "
      >
        <div class="toggle-button" @click="toggleButton">
          <svg
            t="1652198536671"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="1869"
            width="16"
            height="16"
          >
            <path
              d="M866.8672 257.024H157.184c-30.208 0-54.6304-22.8864-54.6304-51.2 0-28.2624 24.4736-51.2 54.6304-51.2H866.816c30.208 0 54.6304 22.9376 54.6304 51.2 0 28.3136-24.4736 51.2-54.6304 51.2z m0 307.2H157.184c-30.208 0-54.6304-22.8864-54.6304-51.2 0-28.2624 24.4736-51.2 54.6304-51.2H866.816c30.208 0 54.6304 22.9376 54.6304 51.2 0 28.3136-24.4736 51.2-54.6304 51.2z m0 307.2H157.184c-30.208 0-54.6304-22.8864-54.6304-51.2 0-28.2624 24.4736-51.2 54.6304-51.2H866.816c30.208 0 54.6304 22.9376 54.6304 51.2 0 28.3136-24.4736 51.2-54.6304 51.2z"
              fill="#333333"
              p-id="1870"
            ></path>
          </svg>
        </div>
        <Crumbs></Crumbs>
        <div class="fullScreen" @click="fullScreen">
          <svg
            t="1650962932909"
            class="icon"
            viewBox="0 0 1228 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="2295"
            width="16"
            height="16"
          >
            <path
              d="M843.1616 68.266667H989.866667a170.666667 170.666667 0 0 1 170.666666 170.666666v152.8832a34.133333 34.133333 0 1 0 68.266667 0V238.933333a238.933333 238.933333 0 0 0-238.933333-238.933333h-146.705067a34.133333 34.133333 0 0 0 0 68.266667zM1160.533333 629.3504V785.066667a170.666667 170.666667 0 0 1-170.666666 170.666666h-123.5968a34.133333 34.133333 0 0 0 0 68.266667H989.866667a238.933333 238.933333 0 0 0 238.933333-238.933333v-155.716267a34.133333 34.133333 0 1 0-68.266667 0zM393.4208 955.733333H238.933333a170.666667 170.666667 0 0 1-170.666666-170.666666v-155.136a34.133333 34.133333 0 0 0-68.266667 0V785.066667a238.933333 238.933333 0 0 0 238.933333 238.933333h154.487467a34.133333 34.133333 0 0 0 0-68.266667zM68.266667 393.045333V238.933333a170.666667 170.666667 0 0 1 170.666666-170.666666h147.933867a34.133333 34.133333 0 0 0 0-68.266667H238.933333a238.933333 238.933333 0 0 0-238.933333 238.933333v154.112a34.133333 34.133333 0 1 0 68.266667 0z"
              p-id="2296"
            ></path>
          </svg>
        </div>
        <div class="toolbar">
          <el-dropdown>
            <el-icon
              style="
                margin-right: 8px;
                margin-top: 0px;
                width: 16px;
                height: 16px;
              "
              ><setting
            /></el-icon>
            <template #dropdown>
              <el-dropdown-menu>
                <!-- <el-dropdown-item @click="signOut">退出</el-dropdown-item> -->
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <span>
            {{ useNames }}
          </span>
        </div>
      </el-header>

      <el-main>
        <router-view to="'/'+value.name" />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { postD } from "../../api/index.js";
import { Menu, Message, Setting } from "@element-plus/icons-vue";
import Crumbs from "./crumbs.vue";
export default {
  provide() {
    return {
      leftNavigationList: this.leftNavigationList,
    };
  },
  components: {
    Menu,
    Message,
    Setting,
    Crumbs,
  },
  data() {
    return {
      useNames: "",
      url: {
        getHomePageHeadMessage: "Index/index",
      },
      leftNavigationValue: "",
      leftvalue: "",
      // 是否折叠
      isCollapse: false,
      fullscreen: false,
    };
  },
  created() {
    this.leftNavigation();
    this.useName();
  },
  methods: {
    leftNavigation() {
      postD(this.url.getHomePageHeadMessage)
        .then((res) => {
          if (res.code == "200") {
          this.leftNavigationValue = res.list;
        } else if (res.code == "-200") {
          this.$message.error("参数错误，或暂无数据");
        } else if (res.code == "-201") {
          this.$message.error("重新登入");
          this.$router.push("/about")
        } else if (res.code == "-203") {
          this.$message.error("对不起，你没有此操作权限");
        } else {
          this.$message.error("注册失败，账号已存在");
        }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    leftNavigationList() {
      postD(this.url.getHomePageHeadMessage)
        .then((res) => {
          this.leftNavigationValue = res.list;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 折叠功能
    toggleButton() {
      this.isCollapse = !this.isCollapse;
    },
    // 退出功能
    signOut() {
      window.sessionStorage.clear();
      //跳转到登录页
      this.$router.push("/login");
    },
    useName() {
      this.useNames = localStorage.use;
    },
    fullScreen() {
      let element = document.documentElement;
      if (this.fullscreen) {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      } else {
        if (element.requestFullscreen) {
          element.requestFullscreen();
        } else if (element.webkitRequestFullScreen) {
          element.webkitRequestFullScreen();
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen();
        } else if (element.msRequestFullscreen) {
          element.msRequestFullscreen();
        }
      }
      this.fullscreen = !this.fullscreen;
    },
  },
};
</script>

<style lang="less" scoped>
.logStyle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  padding-top: 15px;
  padding-bottom: 10px;
  padding-left: 3px;
  color: white;
  font-family: Manrope3-Bold, Manrope3;
  img {
    width: 125px;
    height: 40px;
  }
}
.layout-container-demo .el-aside {
  background: rgb(39,56,69);
  // border-radius: 0px 60px 60px 0px;
  opacity: 1;
}
.layout-container-demo .el-menu {
  border-right: none;
   background: rgb(39,56,69);
     font-weight: bold;
  .textLitle {
    color: #fff;
    line-height: 0px;
    padding-left: 5px;
  }
  .el-icon {
    width: 30px;
    color: white;
  }
}
.layout-container-demo .el-main {
  padding: 0;
}
.layout-container-demo .toolbar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  right: 20px;
}
.el-menu-item-group {
  // background-color: #672fdb;
}

.el-menu-item {
  color: #ffffff;
}
.el-menu-item.is-active {
  // color: red;
  background-color: rgb(95,178,251);
}
.toggle-button {
  color: #fff;
  text-align: left;
  cursor: pointer;
  position: absolute;
  padding-top: 24px;
}
.indexhomePage {
  cursor: pointer;
  height: 30px;
  color: #ffff;
  font-size: 14px;
  line-height: 30px;
  div {
    margin-left: -10px;
  }
}
.indexhomePageStyle:active {
  // background-color: #672fdb;
}
.indexhomePage:focus {
  color: white;
}
.indexhomePage {
  text-decoration: none;
}
.fullScreen {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  cursor: pointer;
}
.topfirster {
  position: relative;
  width: 200px;
  height: 60px;
  color: white;
  background-color: #2b2f3a;
  .toponecenter {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -10%);
    font-size: 14px;
  }
}
</style>