<template>
  <div>
    <el-button type="primary" @click="editShow">修改</el-button>
    <el-dialog
      title="添加类别"
      v-model="dialogVisible"
      width="50%"
      append-to-body
    >
      <el-form
        :model="editFrom"
        :rules="editFromRules"
        ref="editFromRef"
        label-width="120px"
      >
        <el-form-item label="快递公司名称:" prop="title">
          <el-input v-model="editFrom.title"></el-input>
        </el-form-item>
        <el-form-item label="编码:" prop="no">
          <el-input v-model="editFrom.no"></el-input>
        </el-form-item>
        <el-form-item label="排序:" prop="sort">
          <el-input v-model="editFrom.sort"></el-input>
        </el-form-item>
      </el-form>
      <div style="padding-top: 15px; text-align: center">
        <span>
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addCategory">确 定</el-button>
        </span>
      </div>
    </el-dialog>
  </div>
</template>


<script>
import { LogisticsExitLogisApi } from "@/urls/logistics.js";
import { postD } from "@/api";
export default {
  props: ["editFunction"],
  inject: ["logslist"],
  data() {
    return {
      dialogVisible: false,
      editFrom: {
        id: "",
        title: "",
        sort: "",
        no: "",
      },
      editFromRules: {
        title: [
          {
            required: true,
            message: "请输入快递公司名称",
            tirgger: "blur",
          },
        ],
        sort: [
          {
            required: true,
            message: "请输入排序",
            tirgger: "blur",
          },
        ],
        no: [
          {
            required: true,
            message: "请输入编号",
            tirgger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    editShow() {
      this.dialogVisible = true;
      this.editFrom.id = this.editFunction.id;
      this.editFrom.title = this.editFunction.title;
      this.editFrom.sort = this.editFunction.sort;
      this.editFrom.no = this.editFunction.no;
    },
    addCategory() {
      postD(LogisticsExitLogisApi(), this.editFrom).then((res) => {
        if (res.code == "200") {
          this.dialogVisible = false;
          this.$message.success("修改成功");
          this.logslist();
        } else {
          this.$message.error(res.msg);
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
</style>