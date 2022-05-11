<template>
  <div>
    <el-button type="success" @click="detailsValue()">详情</el-button>
    <el-dialog title="提示" v-model="dialogVisible" width="70%">
      <span>这是一段信息</span>
      <span>
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { bannerListApi } from "../../../urls/urls.js";
export default {
  inject: ["activityListValue"],
  props: ["detialFort"],
  data() {
    return {
      dialogVisible: false,
      url: {
        showActiyityInterface: "Activity/showActiyity",
      },
      ActivityDetailsId: {
        id: "",
      },
      ActivityDetailsValue: "",
    };
  },
  methods: {
    async detailsValue() {
      this.dialogVisible = true;
      this.ActivityDetailsId.id = this.detialFort.id;
      const res = await bannerListApi(this.ActivityDetailsId);
      console.log(res);
    },
  },
};
</script>