<template>
  <vue3-icon-picker v-model="icon1" />
</template>

<script>
import { ref } from 'vue'
import Vue3IconPicker from '../Vue3IconPicker.vue'
export default {
  components: {
    Vue3IconPicker
  },
  setup () {
    const icon1 = ref('far fa-grin-hearts')
    return { icon1}
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.icon {
  font-size: 40px;
}
</style>