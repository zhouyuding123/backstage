<template>
  <el-container class="layout-container-demo" style="height: 100%">
    <el-aside :width="isCollapse ? '50px' : '170px'">
      <el-scrollbar>
        <div class="toggle-button" @click="toggleButton">+-</div>
        <el-menu
          background-color="#304156"
          :collapse="isCollapse"
          :collapse-transition="false"
          router
        >
          <router-link class="indexhomePage" to="/pageHome">首页</router-link>
          <el-sub-menu
            v-for="item in leftNavigationValue"
            :key="item.id"
            :index="item.id + ''"
          >
            <template #title>
              <el-icon><i :class="item.icon"></i></el-icon>
              <div style="color: white">{{ item.title }}</div>
            </template>
            <el-menu-item-group>
              <el-menu-item
                v-for="value in item.children"
                :key="value.id"
                :index="'/' + value.name"
              >
                <el-icon><i :class="value.icon"></i></el-icon>
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
          box-shadow: 1px 1px rgb(0 21 41 / 8%);
        "
      >
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
                <el-dropdown-item @click="signOut">退出</el-dropdown-item>
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
          this.leftNavigationValue = res.list;
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
.layout-container-demo .el-aside {
  color: var(--el-text-color-primary);
  background: #304156;
}
.layout-container-demo .el-menu {
  border-right: none;
  background-color: #304156;
  .el-icon {
    width: 30px;
    color: aliceblue;
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
.topfirst {
  width: 200px;
  height: 60px;
  .topcenter {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 10%;
    left: 35%;
    transform: translate(-50%, -10%);
  }
}
.el-menu-item-group {
  background-color: #1f2d3d !important;
}
.el-menu-item {
  color: white;
}
.el-menu-item.is-active {
  color: var(--el-menu-active-color);
}
.toggle-button {
  background-color: #4a5064;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}
.indexhomePage {
  cursor: pointer;
  height: 30px;
  color: #fff;
  font-size: 14px;
  line-height: 30px;
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
</style>