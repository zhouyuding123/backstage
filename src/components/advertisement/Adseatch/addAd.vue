<template>
  <div>
    <el-button type="success" @click="addShow">添加广告</el-button>
    <div>
      <el-dialog
        title="添加类别"
        v-model="dialogVisible"
        width="50%"
        append-to-body
      >
        <el-form
          :model="addForm"
          :rules="addFormRules"
          ref="addFormRef"
          label-width="120px"
        >
          <el-form-item label="类别名称:" prop="title">
            <el-input v-model="addForm.title"></el-input>
          </el-form-item>
          <el-form-item label="描述简介:" prop="description">
            <el-input v-model="addForm.description"></el-input>
          </el-form-item>
          <el-form-item label="类别id:">
            <el-select v-model="addForm.tid" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.id"
                :label="item.title"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="排序:" prop="sort">
            <el-input v-model="addForm.sort"></el-input>
          </el-form-item>
          <el-form-item label="跳转链接:" prop="url">
            <el-input v-model="addForm.url"></el-input>
          </el-form-item>
          <el-form-item label="广告类别:" prop="style">
            <div id="rad" v-if="addForm.style ==''">
              <el-radio v-model="addForm.style" label="1">图片</el-radio>
              <el-radio v-model="addForm.style" label="2">视频</el-radio>
            </div>
            <div v-if="addForm.style == 1">已选择图片</div>
            <div v-if="addForm.style == 2">已选择视频</div>
          </el-form-item>
          <el-form-item
            label="上传图片:"
            prop="thumb"
            v-if="addForm.style == 1"
          >
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
          <el-form-item label="上传视频:" v-if="addForm.style == 2">
            <el-upload
              class="avatar-uploader"
              action="http://weisou.chengduziyi.com/admin/Uploads/uploadFile"
              :on-progress="uploadVideoProcess"
              :on-success="handleVideoSuccess"
              :before-upload="beforeUploadVideo"
              :show-file-list="false"
              :data="{ fileType: this.fileTypes }"
            >
              <video
                v-if="videoForm.showVideoPath != '' && !videoFlag"
                :src="imagesValue + videoForm.showVideoPath"
                class="r"
                controls="controls"
              ></video>
              <i v-else-if="videoForm.showVideoPath == '' && !videoFlag"
                >上传视频</i
              >
              <el-progress
                v-if="videoFlag == true"
                type="circle"
                :percentage="videoUploadPercent"
                style="margin-top: 7px"
              ></el-progress>
            </el-upload>
          </el-form-item>
        </el-form>
        <div style="padding-top: 15px; text-align: center">
          <span>
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button @click="cz">重 置</el-button>
            <el-button type="primary" @click="addCategory">确 定</el-button>
          </span>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { beforeAvatar } from "@/assets/js/modifyStyle.js";
import { imgUrl } from "../../../assets/js/modifyStyle";
import { AdListAdTypeApi } from "@/urls/categoryUrl.js";
import { AdAddApi } from "@/urls/advertisementUrl.js";
import { postD } from "@/api";
export default {
  inject: ["adListValue"],
  data() {
    return {
      dialogVisible: false,
      imagesValue: "",
      addForm: {
        title: "",
        description: "",
        sort: "",
        thumb: "",
        tid: "",
        url: "",
        style: "",
      },
      imageUrl: "",
      fileType: "images",
      fileTypes: "moves",
      addFormRules: {
        title: [
          {
            required: true,
            message: "请输入类别名称",
            tirgger: "blur",
          },
        ],
        description: [
          {
            required: true,
            message: "请输入类别描述简介",
            tirgger: "blur",
          },
        ],
        sort: [
          {
            required: true,
            message: "请输入类别排序",
            tirgger: "blur",
          },
        ],
        tid: [
          {
            required: true,
            message: "请选择类别",
            tirgger: "blur",
          },
        ],
      },
      options: [],
      videoFlag: false,
      //是否显示进度条
      videoUploadPercent: "",
      //进度条的进度，
      isShowUploadVideo: false,
      //显示上传按钮
      videoForm: {
        showVideoPath: "", //回显的变量
      },
    };
  },
  created() {
    this.imagesValue = imgUrl();
    this.categoryListValue();
  },
  methods: {
    categoryListValue() {
      postD(AdListAdTypeApi()).then((res) => {
        this.options = res.list;
      });
    },
    addShow() {
      this.dialogVisible = true;
    },
    cz() {
      this.addForm.title = "";
      this.addForm.description = "";
      this.addForm.sort = "";
      this.addForm.thumb = "";
      this.addForm.tid = "";
      this.addForm.url = "";
      this.addForm.style = "";
      var ra = document.getElementById("rad");
      ra.style.display = "block";
    },
    addCategory() {
      this.$refs.addFormRef.validate((valid) => {
        if (!valid) return;
        postD(AdAddApi(), this.addForm).then((res) => {
          if (res.code == "200") {
            this.$message.success("添加成功");
            this.adListValue();
            this.dialogVisible = false;
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
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      this.addForm.thumb = res.url;
    },
    beforeAvatarUpload(file) {
      beforeAvatar(file);
    },
    beforeUploadVideo(file) {
      var fileSize = file.size / 1024 / 1024 < 50; //控制大小  修改50的值即可
      if (
        [
          "video/mp4",
          "video/ogg",
          "video/flv",
          "video/avi",
          "video/wmv",
          "video/rmvb",
          "video/mov",
        ].indexOf(file.type) == -1 //控制格式
      ) {
        layer.msg("请上传正确的视频格式");
        return false;
      }
      if (!fileSize) {
        layer.msg("视频大小不能超过50MB");
        return false;
      }
      this.isShowUploadVideo = false;
    },
    //进度条
    uploadVideoProcess(event, file, fileList) {
      //注意在data中添加对应的变量名
      this.videoFlag = true;
      this.videoUploadPercent = file.percentage.toFixed(0) * 1;
    },
    //上传成功回调
    handleVideoSuccess(res, file) {
      this.isShowUploadVideo = true;
      this.videoFlag = false;
      this.videoUploadPercent = 0;
      //后台上传数据
      this.videoForm.showVideoPath = res.url; //上传成功后端返回视频地址 回显
      this.addForm.thumb = this.videoForm.showVideoPath;
    },
  },
};
</script>

<style lang="less" scoped>
.avatar-uploader-icon {
  border: 1px dashed #d9d9d9 !important;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9 !important;
  border-radius: 6px !important;
  position: relative !important;
  overflow: hidden !important;
}
.avatar-uploader .el-upload:hover {
  border: 1px dashed #d9d9d9 !important;
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 300px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 300px;
  height: 178px;
  display: block;
}
</style>