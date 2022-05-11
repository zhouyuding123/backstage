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
        label-width="100px"
      >
        <el-form-item label="赛事主题" prop="title">
          <el-input v-model="addMacthValue.title"></el-input>
        </el-form-item>
        <el-form-item label="征集类别" prop="category">
          <el-input v-model="addMacthValue.category"></el-input>
        </el-form-item>
        <el-form-item label="赛事简介" prop="description">
          <el-input v-model="addMacthValue.description"></el-input>
        </el-form-item>
        <el-form-item label="赛事机构" prop="mechanism">
          <el-input v-model="addMacthValue.mechanism"></el-input>
        </el-form-item>

        <el-form-item label="报名时间" prop="sign_time">
          <el-date-picker
            v-model="sign_timeTime"
            type="datetime"
            placeholder="选择报名时间"
            @change="getTime"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="展示时间" prop="exh_time">
          <el-date-picker
            v-model="exh_timeTime"
            type="datetime"
            placeholder="选择展示时间"
            @change="gitTime"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="海报" prop="poster">
          <el-upload
            class="avatar-uploader"
            action="http://weisou.chengduziyi.com/admin/Uploads/uploadFile"
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
            action="http://weisou.chengduziyi.com/admin/Uploads/uploadFile"
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
        <!-- 后期改 -->
        <el-form-item label="赛事详情内容" prop="content" style="width: 100%">
          <el-input type="textarea" v-model="addMacthValue.content"></el-input>
        </el-form-item>
        <div v-for="(item, index) in addMacthValue.prize" :key="index">
          <el-form-item label="活动奖品" prop="prize" style="width: 100%">
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
export default {
  inject: ["MacthValue"],
  data() {
    return {
      url: {
        releaseInterface: "match/release",
      },
      // 添加对话框显示
      addMacthShow: false,
      addMacthValue: {
        title: "",
        category: "",
        poster: "",
        description: "",
        mechanism: "",
        thumb: "",
        prize: [
          {
            name: "",
            amount: "",
            item: "",
          },
        ],
        sign_time: "",
        exh_time: "",
        content: "",
      },
      addMacthValueRules: {
        title: [
          {
            required: true,
            message: "请输入赛事主题",
            tirgger: "blur",
          },
        ],
        category: [
          {
            required: true,
            message: "请输入征集类别",
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
        mechanism: [
          {
            required: true,
            message: "请输入赛事机构",
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
        sign_time: [
          {
            required: true,
            message: "请输入报名时间",
            tirgger: "blur",
          },
        ],
        exh_time: [
          {
            required: true,
            message: "请输入展示时间",
            tirgger: "blur",
          },
        ],
      },
      // 时间
      sign_timeTime: "",
      exh_timeTime: "",
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
      this.sign_timeTime = date;
      this.addMacthValue.sign_time = timestampToTime(this.sign_timeTime / 1000);
    },
    gitTime(date) {
      this.exh_timeTime = date;
      this.addMacthValue.exh_time = timestampToTime(this.exh_timeTime / 1000);
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
        postD(this.url.releaseInterface, this.addMacthValue).then((res) => {
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