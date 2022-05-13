<template>
  <div>
    <el-button type="success" @click="addActivityVal">发布活动</el-button>
    <el-dialog title="提示" v-model="addActivityShow" width="70%">
      <el-form
        :model="addForm"
        :rules="addFormRules"
        ref="addFormRef"
        label-width="120px"
      >
        <el-form-item label="活动类型:" prop="category">
          <el-radio-group v-model="addForm.category">
            <el-radio label="1">普通活动</el-radio>
            <el-radio label="2">评选活动</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="活动标题:" prop="title">
          <el-input v-model="addForm.title"></el-input>
        </el-form-item>
        <el-form-item label="开始时间:" prop="sign_time">
          <el-date-picker
            v-model="start_time"
            type="datetime"
            placeholder="选择报名时间"
            @change="getTime"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间:" prop="exh_time">
          <el-date-picker
            v-model="end_time"
            type="datetime"
            placeholder="选择展示时间"
            @change="gitTime"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="地区可见:" prop="style">
          <el-radio-group v-model="addForm.style">
            <el-radio label="1">同城可见</el-radio>
            <el-radio label="2">全国可见</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="活动内容:" prop="content">
          <el-input v-model="addForm.content"></el-input>
        </el-form-item>
        <el-form-item label="活动规则:" prop="rule">
          <el-input v-model="addForm.rule"></el-input>
        </el-form-item>
        <el-form-item label="活动海报:" prop="poster">
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
        <el-form-item label="活动封面图:" prop="thumb">
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
        <div v-for="(item, index) in addForm.prize" :key="index">
          <el-form-item label="活动奖品:" prop="prize" style="width: 100%">
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
        <el-form-item label="是否投票活动:" prop="is_voto">
          <el-radio-group v-model="addForm.is_voto">
            <el-radio label="1">投票</el-radio>
            <el-radio label="0">不投票</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item
          label="投票开始时间:"
          prop="exh_time"
          v-if="addForm.is_voto == 1"
        >
          <el-date-picker
            v-model="voto_start_time"
            type="datetime"
            placeholder="选择时间"
            @change="gatTime"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item
          label="投票结束时间:"
          prop="exh_time"
          v-if="addForm.is_voto == 1"
        >
          <el-date-picker
            v-model="voto_end_time"
            type="datetime"
            placeholder="选择时间"
            @change="gutTime"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item
          label="展示时间:"
          prop="exh_time"
          v-if="addForm.is_voto == 1"
        >
          <el-date-picker
            v-model="exh_time"
            type="datetime"
            placeholder="选择展示时间"
            @change="gotTime"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item
          label="投票方式:"
          prop="method"
          v-if="addForm.is_voto == 1"
        >
          <el-select v-model="addForm.method" placeholder="请选择">
            <el-option
              v-for="item in methodOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="重复的次数:"
          prop="repeat_count"
          v-if="addForm.is_voto == 1"
        >
          <el-input v-model="addForm.repeat_count"></el-input>
        </el-form-item>
        <el-form-item
          label="投票次数限制:"
          prop="repeat"
          v-if="addForm.is_voto == 1"
        >
          <el-select v-model="addForm.repeat" placeholder="请选择">
            <el-option
              v-for="item in repeatOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="地区限制:"
          prop="is_detail"
          v-if="addForm.is_voto == 1"
        >
          <el-radio-group v-model="addForm.is_detail">
            <el-radio label="1">限制</el-radio>
            <el-radio label="0">不限制</el-radio>
          </el-radio-group>
        </el-form-item>
        <div class="division" v-if="addForm.is_detail == 1">
          <el-form-item label="省:" prop="province">
            <el-input v-model="addForm.province"></el-input>
          </el-form-item>
          <el-form-item label="市:" prop="city">
            <el-input v-model="addForm.city"></el-input>
          </el-form-item>
          <el-form-item label="区:" prop="area">
            <el-input v-model="addForm.area"></el-input>
          </el-form-item>
        </div>
        <el-form-item
          label="参加人员称谓:"
          prop="call"
          v-if="addForm.is_voto == 1"
        >
          <el-input v-model="addForm.call"></el-input>
        </el-form-item>
        <el-form-item label="投票单位:" prop="unit" v-if="addForm.is_voto == 1">
          <el-input v-model="addForm.unit"></el-input>
        </el-form-item>
        <el-form-item
          label="投票按钮文字:"
          prop="button_writ"
          v-if="addForm.is_voto == 1"
        >
          <el-input v-model="addForm.button_writ"></el-input>
        </el-form-item>

        <div class="it_votoStyle">
          <el-form-item label="选择项:" prop="is_img" v-if="addForm.is_voto == 1"  >
          <el-radio-group v-model="is_img">
            <el-radio label="0">非图片</el-radio>
            <el-radio label="1">图片</el-radio>
          </el-radio-group>
          <div
            v-for="(item, index) in addForm.voto"
            :key="index"
            class="itemIsimg"
          >
            <div v-if="is_img == 0" >
              <p :v-model="(item.is_img = '0')"></p>
              <el-input v-model="item.item" class="yesNoItem"></el-input>
            </div>
            <div v-if="is_img == 1">
              <p :v-model="(item.is_img = '1')"></p>
              <el-upload
                class="avatar-uploader"
                action="http://weisou.chengduziyi.com/admin/Uploads/uploadFile"
                :show-file-list="false"
                :on-success="handleAvatarSuccessvoto"
                :before-upload="beforeAvatarUpload"
                :data="{ fileType: this.fileType }"
              >
                <img
                  v-if="item.item"
                  :src="imagesValue + item.item"
                  class="avatar"
                  :v-model="item.item"
                />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </div>
            <p class="addInput" @click="addvoto" v-if="index === 0">
              <img src="../../../assets/lovig/jiahao.png" alt="" />
            </p>
            <p class="addInput" v-else @click="delvoto(index)">
              <img src="../../../assets/lovig/jianhao.png" alt="" />
            </p>
          </div>
        </el-form-item>
        </div>
      </el-form>
      <span>
        <el-button @click="addActivityShow = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { beforeAvatar } from "../../../assets/js/modifyStyle.js";
import { postD } from "../../../api/index.js";
import { timestampToTime } from "../../../assets/js/time.js";
import { imgUrl } from "../../../assets/js/modifyStyle.js";
import {ActivityReleaseApi} from "@/urls/activityUrl.js"
export default {
  inject: ["activityListValue"],
  data() {
    return {
      isShow: false,
      imagesValue: "",
      addActivityShow: false,
      addForm: {
        title: "",
        start_time: "",
        end_time: "",
        category: "",
        style: "",
        content: "",
        rule: "",
        poster: "",
        thumb: "",
        exh_time: "",
        voto_start_time: "",
        voto_end_time: "",
        method: "",
        repeat: "",
        repeat_count: "",
        is_detail: "",
        province: "",
        city: "",
        area: "",
        call: "",
        unit: "",
        button_writ: "",
        is_voto: "",
        prize: [
          {
            name: "",
            amount: "",
            item: "",
          },
        ],
        voto: [
          {
            item: "",
            is_img: "",
          },
        ],
      },
      is_img: "0",
      //时间
      start_time: "",
      end_time: "",
      exh_time: "",
      voto_start_time: "",
      voto_end_time: "",
      //   图片
      imageUrl: "",
      imageUrlthumb: "",
      fileType: "images",
      imageUrlvoto: "",
      addFormRules: {
        title: [
          {
            required: true,
            message: "请输入活动标题",
            tirgger: "blur",
          },
        ],
        start_time: [
          {
            required: true,
            message: "请输入开始时间",
            tirgger: "blur",
          },
        ],
        end_time: [
          {
            required: true,
            message: "请输入结束时间",
            tirgger: "blur",
          },
        ],
        category: [
          {
            required: true,
            message: "请输入活动类型",
            tirgger: "blur",
          },
        ],
        content: [
          {
            required: true,
            message: "请输入活动内容",
            tirgger: "blur",
          },
        ],
        rule: [
          {
            required: true,
            message: "请输入活动规则",
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
        poster: [
          {
            required: true,
            message: "请输入海报",
            tirgger: "blur",
          },
        ],
        is_voto: [
          {
            required: true,
            message: "请输入是否投票",
            tirgger: "blur",
          },
        ],
      },
      //   投票方式
      methodOptions: [
        {
          value: "单选",
          label: "单选",
        },
        {
          value: "最多选两项",
          label: "最多选两项",
        },
        {
          value: "最多选三项",
          label: "最多选三项",
        },
        {
          value: "最多选四项",
          label: "最多选四项",
        },
        {
          value: "最多选五项",
          label: "最多选五项",
        },
      ],
      // 投票次数限制
      repeatOptions: [
        {
          value: "0",
          label: "不允重复",
        },
        {
          value: "1",
          label: "每天限制次数",
        },
        {
          value: "2",
          label: "总共限制次数",
        },
      ],
    };
  },
  methods: {
    addActivityVal() {
      this.addActivityShow = true;
      this.imagesValue = imgUrl();
    },
    addUser() {
      this.$refs.addFormRef.validate((valid) => {
        if (!valid) return;
        postD(ActivityReleaseApi(), this.addForm).then((res) => {
          if (res.code == "200") {
            this.$message.success("状态修改成功");
            this.addActivityShow = false;
            this.activityListValue();
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
    // 时间
    getTime(date) {
      this.start_time = date;
      this.addForm.start_time = timestampToTime(this.start_time / 1000);
    },
    gitTime(date) {
      this.end_time = date;
      this.addForm.end_time = timestampToTime(this.end_time / 1000);
    },
    gotTime(date) {
      this.exh_time = date;
      this.addForm.exh_time = timestampToTime(this.exh_time / 1000);
    },
    gatTime(date) {
      this.voto_start_time = date;
      this.addForm.voto_start_time = timestampToTime(
        this.voto_start_time / 1000
      );
    },
    gutTime(date) {
      this.voto_end_time = date;
      this.addForm.voto_end_time = timestampToTime(this.voto_end_time / 1000);
    },
    // 海报
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      this.addForm.poster = res.url;
    },
    handleAvatarSuccessthumb(res, file) {
      this.imageUrlthumb = URL.createObjectURL(file.raw);
      this.addForm.thumb = res.url;
    },
    beforeAvatarUpload(file) {
      beforeAvatar(file);
    },
    beforeAvatarUploadthumb(file) {
      beforeAvatar(file);
    },
    // 奖励
    addInputHandle() {
      this.addForm.prize.push({ name: "", amount: "", item: "" });
    },
    delInputHandle(index) {
      this.addForm.prize.splice(index, 1);
    },
    addvoto() {
      this.addForm.voto.push({ item: "", is_img: "" });
    },
    delvoto(index) {
      this.addForm.voto.splice(index, 1);
    },
    handleAvatarSuccessvoto(res, file) {
      this.imageUrlvoto = URL.createObjectURL(file.raw);
      let b = [];
      for (var a in this.addForm.voto) {
        b.push(this.addForm.voto[a]);
      }
      this.addForm.voto[a].item = res.url;
    },
    asder(val) {
      console.log(val);
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
.division {
  display: flex;
  width: 49%;
}
/deep/.el-form-item {
  width: 100%;
  .itemIsimg {
   width: 100%;
  }
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 32px;
  height: 32px;
  line-height: 32px;
  text-align: center;
}
.avatar {
  width: 32px;
  height: 32px;
  display: block;
}
.it_votoStyle {
  width: 100%;
}

</style>
