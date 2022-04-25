<template>
  <vue3-icon-picker v-model="values.icon1" />
</template>

<script>
import { ref } from "vue";
import Vue3IconPicker from "../../Vue3IconPicker.vue";
export default {
  components: {
    Vue3IconPicker,
  },
  data() {
    return {
      values: {
        icon1: ref("far fa-grin-hearts")
      }
    }
  },
  created() {
    this.asd();
  },
  methods: {
    asd() {
      this.$emit('func',this.values) 
    },
  },
};
</script>