<template>
  <div>
    <div @click="zxc"><span>详情</span></div>
    <el-dialog title="详情" v-model="dialogVisible" width="70%">
      <el-descriptions direction="vertical" :column="5" border>
        <el-descriptions-item label="id" align="center">{{
          worksValue.id
        }}</el-descriptions-item>
        <el-descriptions-item label="用户名" align="center">{{
          worksValue.username
        }}</el-descriptions-item>
        <el-descriptions-item label="昵称" align="center">{{
          worksValue.nickname
        }}</el-descriptions-item>
        <el-descriptions-item label="头像" align="center">
          <el-image
            :src="imagesValue + worksValue.headimage"
            :preview-src-list="[imagesValue + worksValue.headimage]"
            style="width: 40px; height: 40px"
          />
        </el-descriptions-item>
        <el-descriptions-item label="作品理念" align="center">{{
          worksValue.description
        }}</el-descriptions-item>
        <el-descriptions-item label="风格标签" align="center">{{
          worksValue.label
        }}</el-descriptions-item>
        <el-descriptions-item label="商品类别" align="center">{{
          worksValue.prodtuc_type
        }}</el-descriptions-item>
        <el-descriptions-item label="图文介绍" align="center">{{
          worksValue.content
        }}</el-descriptions-item>
        <el-descriptions-item label="类别" align="center">{{
          fullcat(worksValue.category)
        }}</el-descriptions-item>
        <el-descriptions-item label="付费作品收费金额" align="center">{{
          worksValue.money
        }}</el-descriptions-item>
        <el-descriptions-item label="浏览量" align="center">{{
          worksValue.browse
        }}</el-descriptions-item>
        <el-descriptions-item label="收藏量" align="center">{{
          worksValue.collection
        }}</el-descriptions-item>
        <el-descriptions-item label="3d模型" align="center">{{
          worksValue.model
        }}</el-descriptions-item>
        <el-descriptions-item label="众筹版权费" align="center">{{
          worksValue.crowd_price
        }}</el-descriptions-item>
        <el-descriptions-item label="私人定制费" align="center">{{
          worksValue.personal_price
        }}</el-descriptions-item>
        <el-descriptions-item label="版权买断费" align="center">{{
          worksValue.copyright_price
        }}</el-descriptions-item>
        <el-descriptions-item label="图集" align="center">
          <div v-for="item in imgs" :key="item">
            <div v-if="funimgvideo(item) == 'images'">
              <el-image
                :src="imagesValue + item"
                alt=""
                :preview-src-list="[imagesValue + item]"
                style="width: 40px; height: 40px"
                class="imgStylell"
              />
            </div>
            <div v-if="funimgvideo(item) == 'moves'">
              <video width="100" height="100" controls>
                <source
                  :src="imagesValue + item"
                  type="video/mp4"
                />
                <source
                  :src="imagesValue + item"
                  type="video/ogg"
                />
              </video>
            </div>
          </div>
        </el-descriptions-item>
      </el-descriptions>
      <div style="padding-top: 20px">
        <span>
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false"
            >确 定</el-button
          >
        </span>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { designer_worksShowApi } from "@/urls/designerUrl.js";
import { postD } from "@/api";
import { imgUrl } from "@/assets/js/modifyStyle";
export default {
  props: ["detilWork"],
  data() {
    return {
      dialogVisible: false,
      workId: {
        id: "",
      },
      worksValue: [],
      imagesValue: "",
      imgs: [],
    };
  },
  methods: {
    zxc() {
      this.workId.id = this.detilWork;
      this.dialogVisible = true;
      postD(designer_worksShowApi(), this.workId).then((res) => {
        this.worksValue = res.data;
        this.imgs = res.data.imgs.split(",");
        this.imagesValue = imgUrl();
      });
    },
    fullcat(val) {
      if (val == 1) {
        return "私密";
      } else if (val == 2) {
        return "公开";
      } else if (val == 3) {
        return "付费";
      }
    },
    funimgvideo(val) {
      return val.split("/")[0];
    },
  },
};
</script>

<style lang="less" scoped>
span {
  margin-left: 18px;
  margin-top: 2px;
  font-size: 12px;
  font-family: PingFang SC-Regular, PingFang SC;
  font-weight: 400;
  color: white;
  line-height: 25px;
}
</style>