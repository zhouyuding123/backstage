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
              <el-icon><message style="color: white" /></el-icon>
              <div style="color: white">{{ item.title }}</div>
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
          box-shadow: 1px 1px rgb(0 21 41 / 8%);
        "
      >
        <div class="toolbar">
          <el-dropdown>
            <el-icon style="margin-right: 8px; margin-top: 1px"
              ><setting
            /></el-icon>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="signOut">退出</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <span>Tom</span>
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
export default {
  components: {
    Menu,
    Message,
    Setting,
  },
  data() {
    return {
      url: {
        getHomePageHeadMessage: "Index/index",
      },
      leftNavigationValue: "",
      leftvalue: "",
      // 是否折叠
      isCollapse: false,
    };
  },
  created() {
    this.leftNavigation();
  },
  methods: {
    leftNavigation(e) {
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
</style>