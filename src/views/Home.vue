<template>
  <div class="autos">
    <left-navigation></left-navigation>
  </div>
</template>
<script>
import leftNavigation from "../components/Home/leftNavigation.vue";
export default {
  components: { leftNavigation },
  mounted: function () {
    if (location.href.indexOf("#reloaded") == -1) {
      location.href = location.href + "#reloaded";
      location.reload();
    }
  },
};
</script>
<style lang="less" scoped>
.autos {
  width: 100%;
  height: 100%;
}
</style>
