<template>
  <div>
    <div style="margin: 5px 0 5px 0">
      {{ "返回登入页面" + times + "秒" }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      times: 3, //倒计时250s，可以任意设定数字
    };
  },
  created() {
    this.getTime(); //只要该页面一渲染创建，就开始倒计时
  },
  methods: {
    getTime() {
      this.timer = setInterval(() => {
        this.times--;
        if (this.times === 0) {
          clearInterval(this.timer);
          this.$router.push("/login");
        }
      }, 1000);
    },
  },
};
</script>
