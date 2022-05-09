<template>
  <div>
    <div class="mgcpp">*每个敏感词用英文逗号隔开</div>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="memberDeleber"
    >
      <el-form-item label="敏感词" prop="content">
        <el-input
          type="textarea"
          :rows="10"
          placeholder="请输入敏感词"
          v-model="ruleForm.content"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { postD } from "../../api/index.js";
export default {
  data() {
    return {
      url: {
        setDataInterface: "Sensitive/setData",
        getDataInterface:"Sensitive/getData"
      },
      ruleForm: {
        content: "",
      },
      rules: {
        content: [
          {
            required: true,
            message: "请输入敏感词并用中文，隔开",
            trigger: "blur",
          },
          {
            min: 2,
            message: "长度最少两个",
            tirgger: "blur",
          },
        ],
      },
    };
  },
  created() {
    this.readGetData()
  },
  methods: {
    readGetData(){
      postD(this.url.getDataInterface)
      .then((res)=>{
        this.ruleForm.content = res.data.content
      })
    },
    submitForm() {
      this.$refs.ruleForm.validate(() => {
        postD(this.url.setDataInterface, this.ruleForm).then((res) => {
          if (res.code == "200") {
          this.$message.success("状态修改成功");
        } else if (res.code == "-200") {
          this.$message.error("参数错误，或暂无数据");
        } else if (res.code == "-201") {
          this.$message.error("未登陆");
        } else if (res.code == "-203") {
          this.$message.error("对不起，你没有此操作权限");
        } else {
          this.$message.error("注册失败，账号已存在");
        }
          this.ruleForm.content = "";
          this.readGetData()
        });
      });
    },
  },
};
</script>

<style lang="less" scoped>
.memberDeleber {
  padding: 1% 2.5% 1% 2.5%;
}
.mgcpp {
  text-align: left;
  padding: 2.5% 2.5% 0 8.5%;
  color: red;
}
</style>