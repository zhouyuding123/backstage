<template>
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