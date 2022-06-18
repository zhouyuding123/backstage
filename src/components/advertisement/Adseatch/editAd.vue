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
        <el-form-item label="类别名称:" prop="title">
          <el-input v-model="editFrom.title"></el-input>
        </el-form-item>
        <el-form-item label="描述简介:" prop="description">
          <el-input v-model="editFrom.description"></el-input>
        </el-form-item>
        <el-form-item label="类别id:">
          <el-select v-model="editFrom.tid" placeholder="请选择" :formatter="(row) => formatter(row, 'id', options)">
            <el-option
              v-for="(item,key) in options"
              :key="key"
              :label="item.title"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="排序:">
          <el-input v-model="editFrom.sort"></el-input>
        </el-form-item>
        <el-form-item label="跳转链接:" prop="url">
          <el-input v-model="editFrom.url"></el-input>
        </el-form-item>
        <el-form-item label="广告类别:" prop="style" @change="editImg">
          <div id="rad" v-if="editFrom.style !== ''">
            <el-radio v-model="editFrom.style" label="1">图片</el-radio>
            <el-radio v-model="editFrom.style" label="2">视频</el-radio>
          </div>
          <div v-if="editFrom.style == 1">已选择图片</div>
          <div v-if="editFrom.style == 2">已选择视频</div>
        </el-form-item>
        <el-form-item label="上传图片:" prop="thumb" v-if="editFrom.style == 1">
          <el-upload
            class="avatar-uploader"
            action="http://weisou.chengduziyi.com/admin/Uploads/uploadFile"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            :data="{ fileType: this.fileType }"
          >
            <img
              v-if="editFrom.thumb"
              :src="imagesValue + editFrom.thumb"
              class="avatar"
              :v-model="editFrom.thumb"
            />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="上传视频:" v-if="editFrom.style == 2">
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
              v-if="editFrom.thumb != '' && !videoFlag"
              :src="imagesValue + editFrom.thumb"
              class="r"
              controls="controls"
            ></video>
            <i v-else-if="editFrom.thumb == '' && !videoFlag">上传视频</i>
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
</template>

<script>
import { AdListAdTypeApi } from "@/urls/categoryUrl.js";
import {AdEditApi} from "@/urls/advertisementUrl.js"
import { imgUrl } from "@/assets/js/modifyStyle";
import { postD } from "@/api";
import { beforeAvatar } from "@/assets/js/modifyStyle.js";
export default {
  inject: ["adListValue"],
  props: ["editFunction"],
  data() {
    return {
      dialogVisible: false,
      imagesValue: "",
      editFrom: {
        id: "",
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
      editFromRules: {
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
  methods: {
    editShow() {
      this.dialogVisible = true;
      this.imagesValue = imgUrl();
      this.editFrom.id = this.editFunction.id;
      this.editFrom.title = this.editFunction.title;
      this.editFrom.description = this.editFunction.description;
      this.editFrom.sort = this.editFunction.sort;
      this.editFrom.style = this.editFunction.style;
      this.editFrom.url = this.editFunction.url;
      this.editFrom.thumb = this.editFunction.thumb;
      postD(AdListAdTypeApi()).then((res) => {
        this.options = res.list;
        console.log(this.editFrom.tid);
      });
    },
    cz() {
      this.editShow();
    },
    addCategory() {
        console.log(this.editFrom);
    //   this.$refs.editFromRef.validate((valid) => {
    //     if (!valid) return;
    //     postD(AdEditApi(), this.editFrom).then((res) => {
    //       if (res.code == "200") {
    //         this.$message.success("添加成功");
    //         this.adListValue();
    //         this.dialogVisible = false;
    //       } else if (res.code == "-200") {
    //         this.$message.error("参数错误，或暂无数据");
    //       } else if (res.code == "-201") {
    //         this.$message.error("未登陆");
    //       } else if (res.code == "-203") {
    //         this.$message.error("对不起，你没有此操作权限");
    //       } else {
    //         this.$message.error("注册失败，账号已存在");
    //       }
    //     });
    //   });
    },
    editImg() {
      this.editFrom.thumb = "";
    },
    handleAvatarSuccess(res, file) {
      this.editFrom.thumb = URL.createObjectURL(file.raw);
      this.editFrom.thumb = res.url;
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
      this.editFrom.thumb = res.url; //上传成功后端返回视频地址 回显
    },
  },
};
</script>

<style lang="less" scoped>
</style>