<template>
      <vue3-icon-picker v-model="icon1" />
</template>

<script>
import { ref } from "vue";
import Vue3IconPicker from "../../Vue3IconPicker.vue";
export default {
  components: {
    Vue3IconPicker,
  },
   setup () {
    const icon1 = ref('far fa-grin-hearts')
    return { icon1}
  }
}
</script>