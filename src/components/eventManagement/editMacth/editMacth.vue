<template>
  <el-dialog title="提示" v-model="dialogEditMatch" width="30%">
    <span>这是一段信息</span>
    <span>
      <el-button @click="dialogEditMatch = false">取 消</el-button>
      <el-button type="primary" @click="dialogEditMatch = false">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
    data() {
        return {
            dialogEditMatch:false
        }
    }
}
</script>