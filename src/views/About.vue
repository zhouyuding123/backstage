<template>
  <div> 欢迎 </div>
</template>
<script>
export default {
  data() {
    return {
      timer: "",
      value: 0,
    };
  },
  methods: {
    get() {
      this.$router.push("/home");
    },
  },
  mounted() {
    this.timer = setInterval(this.get, 3000);
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
};
</script>