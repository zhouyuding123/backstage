<template>
  <div>
    <button @click="asdwqe">123</button>
  </div>
</template>

<script>
import {postD} from "../../api/index.js"
export default {
  methods: {
    asdwqe() {
      postD().then((res)=> {
        console.log(res);
      })
    }
  }
}
</script>