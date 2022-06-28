<template>
  <div>
    <el-button type="success" @click="addMacth">添加</el-button>
    <el-dialog
      title="添加赛事"
      v-model="addMacthShow"
      width="70%"
      :destroy-on-close="true"
    >
      <el-form
        :model="addMacthValue"
        :rules="addMacthValueRules"
        ref="addMacthValueRef"
        label-width="110px"
      >
        <el-form-item label="赛事主题" prop="title">
          <el-input v-model="addMacthValue.title"></el-input>
        </el-form-item>
        <el-form-item label="赛事介绍" prop="description">
          <el-input v-model="addMacthValue.description"></el-input>
        </el-form-item>
        <el-form-item label="海报" prop="poster">
          <el-upload
            class="avatar-uploader"
            action="https://weisou.chengduziyi.com/admin/Uploads/uploadFile"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            :data="{ fileType: this.fileType }"
          >
            <img
              v-if="imageUrl"
              :src="imageUrl"
              class="avatar"
              :v-model="imageUrl"
            />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="封面图" prop="thumb">
          <el-upload
            class="avatar-uploader"
            action="https://weisou.chengduziyi.com/admin/Uploads/uploadFile"
            :show-file-list="false"
            :on-success="handleAvatarSuccessthumb"
            :before-upload="beforeAvatarUploadthumb"
            :data="{ fileType: this.fileType }"
          >
            <img
              v-if="imageUrlthumb"
              :src="imageUrlthumb"
              class="avatar"
              :v-model="imageUrlthumb"
            />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="报名开始时间" prop="sign_start_time">
          <el-date-picker
            v-model="addMacthValue.sign_start_time"
            type="datetime"
            placeholder="选择报名开始时间"
            @change="getTime"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="报名结束时间" prop="sign_end_time">
          <el-date-picker
            v-model="addMacthValue.sign_end_time"
            type="datetime"
            placeholder="选择报名结束时间"
            @change="gitTime"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="评选开始时间" prop="voto_start_time">
          <el-date-picker
            v-model="addMacthValue.voto_start_time"
            type="datetime"
            placeholder="选择评选开始时间"
            @change="gatTime"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="评选结束时间" prop="voto_end_time">
          <el-date-picker
            v-model="addMacthValue.voto_end_time"
            type="datetime"
            placeholder="选择评选结束时间"
            @change="gutTime"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="公示开始时间" prop="exh_start_time">
          <el-date-picker
            v-model="addMacthValue.exh_start_time"
            type="datetime"
            placeholder="选择公示开始时间"
            @change="gltTime"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="公示结束时间" prop="exh_end_time">
          <el-date-picker
            v-model="addMacthValue.exh_end_time"
            type="datetime"
            placeholder="选择公示结束时间"
            @change="gctTime"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="评选规则" prop="rule">
          <el-input v-model="addMacthValue.rule"></el-input>
        </el-form-item>
        <el-form-item label="设计说明" prop="explain">
          <el-input v-model="addMacthValue.explain"></el-input>
        </el-form-item>
        <el-form-item label="参赛须知" prop="entry_info">
          <el-input v-model="addMacthValue.entry_info"></el-input>
        </el-form-item>
        <el-form-item label="获奖通知" prop="notice">
          <el-input v-model="addMacthValue.notice"></el-input>
        </el-form-item>

        <div v-for="(item, index) in addMacthValue.prize" :key="index">
          <el-form-item label="奖励" prop="prize" style="width: 100%">
            <p>奖项名称:</p>
            <el-input v-model="item.name" style="width: 15%"></el-input>
            <p>数量:</p>
            <el-input v-model="item.amount" style="width: 15%"></el-input>
            <p>奖品:</p>
            <el-input v-model="item.item" style="width: 15%"></el-input>
            <p class="addInput" @click="addInputHandle" v-if="index === 0">
              <img src="../../../assets/lovig/jiahao.png" alt="" />
            </p>
            <p class="addInput" v-else @click="delInputHandle(index)">
              <img src="../../../assets/lovig/jianhao.png" alt="" />
            </p>
          </el-form-item>
        </div>
        <div v-for="(item, index) in addMacthValue.standard" :key="index">
          <el-form-item label="评选标准" prop="standard" style="width: 100%">
            <p>评选规则:</p>
            <el-input v-model="item.title" style="width: 25%"></el-input>
            <p>评选规则的描述:</p>
            <el-input v-model="item.description" style="width: 25%"></el-input>
            <p class="addInput" @click="addStandard" v-if="index === 0">
              <img src="../../../assets/lovig/jiahao.png" alt="" />
            </p>
            <p class="addInput" v-else @click="delStandard(index)">
              <img src="../../../assets/lovig/jianhao.png" alt="" />
            </p>
          </el-form-item>
        </div>
      </el-form>
      <span>
        <el-button @click="addMacthShow = false">取 消</el-button>
        <el-button type="primary" @click="addEventContent">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { beforeAvatar } from "../../../assets/js/modifyStyle.js";
import { timestampToTime } from "../../../assets/js/time.js";
import { postD } from "../../../api/index.js";
import { matchReleaseApi } from "@/urls/matchUrl.js";
export default {
  inject: ["MacthValue"],
  data() {
    return {
      // 添加对话框显示
      addMacthShow: false,
      addMacthValue: {
        title: "",
        description: "",
        thumb: "",
        poster: "",
        sign_start_time: "",
        sign_end_time: "",
        voto_start_time: "",
        voto_end_time: "",
        exh_start_time: "",
        exh_end_time: "",
        prize: [
          {
            name: "",
            amount: "",
            item: "",
          },
        ],
        standard: [
          {
            title: "",
            description: "",
          },
        ],
        rule: "",
        explain: "",
        entry_info: "",
        notice: "",
      },
      addMacthValueRules: {
        title: [
          {
            required: true,
            message: "请输入赛事主题",
            tirgger: "blur",
          },
        ],
        poster: [
          {
            required: true,
            message: "请输入海报",
            tirgger: "blur",
          },
        ],
        description: [
          {
            required: true,
            message: "请输入赛事简介",
            tirgger: "blur",
          },
        ],
        thumb: [
          {
            required: true,
            message: "请输入封面图",
            tirgger: "blur",
          },
        ],
        sign_start_time: [
          {
            required: true,
            message: "请输入报名开始时间",
            tirgger: "blur",
          },
        ],
        sign_end_time: [
          {
            required: true,
            message: "请输入报名结束时间",
            tirgger: "blur",
          },
        ],
        voto_start_time: [
          {
            required: true,
            message: "请输入评选开始时间",
            tirgger: "blur",
          },
        ],
        voto_end_time: [
          {
            required: true,
            message: "请输入评选结束时间",
            tirgger: "blur",
          },
        ],
        exh_start_time: [
          {
            required: true,
            message: "请输入公示开始时间",
            tirgger: "blur",
          },
        ],
        exh_end_time: [
          {
            required: true,
            message: "请输入公示结束时间",
            tirgger: "blur",
          },
        ],
        rule: [
          {
            required: true,
            message: "请输入评选规则",
            tirgger: "blur",
          },
        ],
        explain: [
          {
            required: true,
            message: "请输入设计说明",
            tirgger: "blur",
          },
        ],
        entry_info: [
          {
            required: true,
            message: "请输入参赛须知",
            tirgger: "blur",
          },
        ],
        notice: [
          {
            required: true,
            message: "请输入公示获奖通知",
            tirgger: "blur",
          },
        ],

      },
      imageUrl: "",
      fileType: "images",
      // 封面图
      imageUrlthumb: "",
    };
  },
  methods: {
    addMacth() {
      this.addMacthShow = true;
    },
    addInputHandle() {
      this.addMacthValue.prize.push({ name: "", amount: "", item: "" });
    },
    delInputHandle(index) {
      this.addMacthValue.prize.splice(index, 1);
    },
    addStandard() {
      this.addMacthValue.standard.push({title:"",description:""})
    },
    delStandard(index) {
      this.addMacthValue.standard.splice(index, 1);
    },
    handleAvatarSuccessthumb(res, file) {
      this.imageUrlthumb = URL.createObjectURL(file.raw);
      this.addMacthValue.thumb = res.url;
    },
    // 海报
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      this.addMacthValue.poster = res.url;
    },
    getTime(date) {
      this.addMacthValue.sign_start_time = timestampToTime(
        date/1000
      );
    },
    gitTime(date) {
      this.addMacthValue.sign_end_time = timestampToTime(
        date / 1000
      );
    },
    gatTime(date) {
      this.addMacthValue.voto_start_time = timestampToTime(
        date / 1000
      );
    },
    gutTime(date) {
      this.addMacthValue.voto_end_time = timestampToTime(
        date / 1000
      );
    },
    gltTime(date) {
      this.addMacthValue.exh_start_time = timestampToTime(
        date / 1000
      );
    },
    gctTime(date) {
      this.addMacthValue.exh_end_time = timestampToTime(
        date / 1000
      );
    },
    beforeAvatarUpload(file) {
      beforeAvatar(file);
    },
    beforeAvatarUploadthumb(file) {
      beforeAvatar(file);
    },
    // 添加提交
    addEventContent() {
      this.$refs.addMacthValueRef.validate((valid) => {
        if (!valid) return;
          postD(matchReleaseApi(), this.addMacthValue).then((res) => {
            if (res.code == "200") {
              this.$message.success("状态修改成功");
              this.MacthValue();
              this.addMacthShow = false;
            } else if (res.code == "-200") {
              this.$message.error("参数错误，或暂无数据");
            } else if (res.code == "-201") {
              this.$message.error("未登陆");
            } else if (res.code == "-203") {
              this.$message.error("对不起，你没有此操作权限");
            } else {
              this.$message.error("注册失败，账号已存在");
            }
          });
      });
    },
  },
};
</script>

<style lang="less" scoped>
.el-form {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-left: 50px;
  margin-right: 50px;
  .el-form-item {
    width: 45%;
    p {
      font-size: 12px;
    }
  }
}
</style>