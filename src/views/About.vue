<template>
  <div>{{timer}}</div>
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
      this.$router.push("/login");
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
