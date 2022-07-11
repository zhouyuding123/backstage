<template>
  <div>
    <div class="borderStyle"></div>
    <div>
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        active-text-color="#333333"
      >
        <el-menu-item index="1" @click="cjqz">系统设置</el-menu-item>
        <el-menu-item index="2" @click="cjqzs">敏感词设置</el-menu-item>
        <el-menu-item index="3">邮箱设置</el-menu-item>
        <el-menu-item index="4">短信设置</el-menu-item>
      </el-menu>
    </div>
    <div class="paddingStyle" v-if="this.flag == 1">
      <div style="text-align: left; padding-bottom: 15px">
        <strong>vip收费标准:</strong>
      </div>
      <el-form
        :model="systemListValue"
        :rules="systemrules"
        ref="systemruleForm"
        label-width="180px"
        class="demo-ruleForm"
        style="width: 500px"
      >
        <div>门店</div>
        <el-form-item label="门店端会员收费标准月度" style="padding-top: 20px">
          <el-input
            v-model="systemListValue.vip_business_price_month"
          ></el-input>
        </el-form-item>
        <el-form-item label="门店端会员收费标准季度">
          <el-input
            v-model="systemListValue.vip_business_price_quarter"
          ></el-input>
        </el-form-item>
        <el-form-item label="门店端会员收费标准年度">
          <el-input
            v-model="systemListValue.vip_business_price_year"
          ></el-input>
        </el-form-item>
        <el-form-item label="门店端会员折扣">
          <el-input v-model="systemListValue.vip_business_discount"></el-input>
        </el-form-item>
        <div>设计师</div>
        <el-form-item
          label="设计师端会员收费标准月度"
          style="padding-top: 20px"
        >
          <el-input
            v-model="systemListValue.vip_designer_price_month"
          ></el-input>
        </el-form-item>
        <el-form-item label="设计师端会员收费标准季度">
          <el-input
            v-model="systemListValue.vip_designer_price_quarter"
          ></el-input>
        </el-form-item>
        <el-form-item label="设计师端会员收费标准年度">
          <el-input
            v-model="systemListValue.vip_designer_price_year"
          ></el-input>
        </el-form-item>
        <el-form-item label="设计师端会员折扣">
          <el-input v-model="systemListValue.vip_designer_discount"></el-input>
        </el-form-item>
        <div>企业</div>
        <el-form-item label="企业端会员收费标准月度" style="padding-top: 20px">
          <el-input
            v-model="systemListValue.vip_company_price_month"
          ></el-input>
        </el-form-item>
        <el-form-item label="企业端会员收费标准季度">
          <el-input
            v-model="systemListValue.vip_company_price_quarter"
          ></el-input>
        </el-form-item>
        <el-form-item label="企业端会员收费标准年度">
          <el-input v-model="systemListValue.vip_company_price_year"></el-input>
        </el-form-item>
        <el-form-item label="企业端会员折扣">
          <el-input v-model="systemListValue.vip_company_discount"></el-input>
        </el-form-item>
        <el-form-item label="用户赛事投票次数">
          <el-input v-model="systemListValue.match_voto_count"></el-input>
        </el-form-item>
        <el-button type="primary" @click="submitsystem">提交</el-button>
      </el-form>
    </div>
    <div class="paddingStyle" v-if="this.flag == 2">
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
    <div class="paddingStyle" v-if="this.flag == 3">3</div>
    <div class="paddingStyle" v-if="this.flag == 4">4</div>
  </div>
</template>

<script>
import { postD } from "@/api";
import {
  SensitiveSetDataApi,
  SensitiveGetDataApi,
  configGetDataApi,
  configSetDataApi,
} from "@/urls/sensitiveUrl";
export default {
  data() {
    return {
      activeIndex: "1",
      flag: true,
      //   敏感词
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
      //    系统
      systemListValue: {
        match_voto_count: "",
        vip_business_discount: "",
        vip_business_price_month: "",
        vip_business_price_quarter: "",
        vip_business_price_year: "",
        vip_company_discount: "",
        vip_company_price_month: "",
        vip_company_price_quarter: "",
        vip_company_price_year: "",
        vip_designer_discount: "",
        vip_designer_price_month: "",
        vip_designer_price_quarter: "",
        vip_designer_price_year: "",
      },
      systemrules: {},
    };
  },
  created() {
    this.systemList();
  },
  methods: {
    handleSelect() {
      console.log();
    },
    cjqz() {
      this.flag = 1;
    },
    // 敏感词
    cjqzs() {
      this.flag = 2;
      postD(SensitiveGetDataApi()).then((res) => {
        this.ruleForm.content = res.data.content;
      });
    },
    // 上传敏感词
    submitForm() {
      this.$refs.ruleForm.validate(() => {
        postD(SensitiveSetDataApi(), this.ruleForm).then((res) => {
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
          this.cjqzs();
        });
      });
    },
    // 系统配置
    systemList() {
      postD(configGetDataApi()).then((res) => {
        this.systemListValue = res.data;
      });
    },
    // 修改系统配置
    submitsystem() {
      postD(configSetDataApi(),this.systemListValue).then((res) => {
        if (res.code == "200") {
          this.$message.success("系统配置修改成功");
          this.systemList();
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.borderStyle {
  padding-top: 5px;
}
.paddingStyle {
  padding: 30px;
}
.memberDeleber {
  padding: 1% 2.5% 1% 2.5%;
}
.mgcpp {
  text-align: left;
  padding: 2.5% 2.5% 0 8.5%;
  color: red;
}
</style>