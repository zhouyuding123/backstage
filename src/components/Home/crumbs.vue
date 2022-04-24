<template>
  <div class="crumbs">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item
        v-for="item in list"
        :key="item.path"
        :to="item.path"
        >{{ item.meta.title }}</el-breadcrumb-item
      >
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    list() {
      return this.$route.matched;
    },
  },
};
</script>

<style lang="less" scoped>
.crumbs {
  position: absolute;
  padding: 25px 0 0 0;
}
</style>
