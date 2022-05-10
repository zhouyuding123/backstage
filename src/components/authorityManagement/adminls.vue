<template>
  <!-- <vue3-icon-picker v-model="icon1"   /> -->
    <div>
        <button @my-emit="parentEmit">1231546</button>
    </div>
</template>

<script>
import Vue3IconPicker from "./adminLog.vue";
export default {
  components: {
    Vue3IconPicker,
  },
//   data() {
//     return {
//       icon1: ref("far fa-grin-hearts"),
//     };
//   },
  setup() {
    function parentEmit(val){
        alert(val)
    }
    return{
        parentEmit
    }
  },
};

</script>