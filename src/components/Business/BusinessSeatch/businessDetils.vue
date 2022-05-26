<template>
  <div>
    <el-button type="success" @click="detailsValue()">详情</el-button>
    <el-dialog title="提示" v-model="dialogVisible" width="60%">
      <el-descriptions direction="vertical" :column="5" border>
        <el-descriptions-item label="用户名" align="center">{{
          ActivityDetailsValue.username
        }}</el-descriptions-item>
        <el-descriptions-item label="负责人" align="center">{{
          ActivityDetailsValue.name
        }}</el-descriptions-item>
        <el-descriptions-item label="企业名称" align="center">{{
          ActivityDetailsValue.nickname
        }}</el-descriptions-item>
        <el-descriptions-item label="头像" align="center">
          <el-image
            :src="imagesValue + ActivityDetailsValue.headimage"
            :preview-src-list="[imagesValue + ActivityDetailsValue.headimage]"
            style="width: 40px; height: 40px"
            class="stylecss"
          />
        </el-descriptions-item>
        <el-descriptions-item label="企业电话" align="center">{{
          ActivityDetailsValue.tel
        }}</el-descriptions-item>
        <el-descriptions-item label="封面" align="center">
          <el-image
            :src="imagesValue + ActivityDetailsValue.thumb"
            :preview-src-list="[imagesValue + ActivityDetailsValue.thumb]"
            style="width: 40px; height: 40px"
            class="stylecss"
          />
        </el-descriptions-item>
        <el-descriptions-item label="省" align="center">{{
          ActivityDetailsValue.province
        }}</el-descriptions-item>
        <el-descriptions-item label="市" align="center">{{
          ActivityDetailsValue.city
        }}</el-descriptions-item>
        <el-descriptions-item label="区" align="center">{{
          ActivityDetailsValue.area
        }}</el-descriptions-item>
        <el-descriptions-item label="地址" align="center">{{
          ActivityDetailsValue.detail
        }}</el-descriptions-item>
        <el-descriptions-item label="经度" align="center">{{
          ActivityDetailsValue.lng
        }}</el-descriptions-item>
        <el-descriptions-item label="纬度" align="center">{{
          ActivityDetailsValue.lat
        }}</el-descriptions-item>
        <el-descriptions-item label="账号认证状态" align="center">
          <div
            :class="{
              green: ActivityDetailsValue.auth === 2,
              yellow: ActivityDetailsValue.auth == 1,
              red: ActivityDetailsValue.auth == 3,
            }"
          >
            {{ filterAuth(ActivityDetailsValue.auth) }}
          </div>
        </el-descriptions-item>
        <el-descriptions-item label="负责人电话" align="center">{{
          ActivityDetailsValue.tel_f
        }}</el-descriptions-item>
        <el-descriptions-item label="身份证号码" align="center">{{
          ActivityDetailsValue.card_no
        }}</el-descriptions-item>
        <el-descriptions-item label="身份证正面照片" align="center">
          <el-image
            :src="imagesValue + ActivityDetailsValue.card_z"
            :preview-src-list="[imagesValue + ActivityDetailsValue.card_z]"
            style="width: 40px; height: 40px"
          />
        </el-descriptions-item>
        <el-descriptions-item label="身份证反面照片" align="center">
          <el-image
            :src="imagesValue + ActivityDetailsValue.card_f"
            :preview-src-list="[imagesValue + ActivityDetailsValue.card_f]"
            style="width: 40px; height: 40px"
          />
        </el-descriptions-item>
        <el-descriptions-item label="店铺照片" align="center">
          <el-image
            :src="imagesValue + ActivityDetailsValue.shop_img"
            :preview-src-list="[imagesValue + ActivityDetailsValue.shop_img]"
            style="width: 40px; height: 40px"
          />
        </el-descriptions-item>
        <el-descriptions-item label="营业执照" align="center">
          <el-image
            :src="imagesValue + ActivityDetailsValue.license"
            :preview-src-list="[imagesValue + ActivityDetailsValue.license]"
            style="width: 40px; height: 40px"
          />
        </el-descriptions-item>
      </el-descriptions>
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
import { businessAuthBusinessApi } from "@/urls/busomessUrl.js";
import { postD } from "@/api";
import { imgUrl } from "@/assets/js/modifyStyle";
export default {
  props: ["detilsSusinesser"],
  data() {
    return {
      imagesValue: "",
      dialogVisible: false,
      ActivityDetailsId: {
        id: "",
      },
      ActivityDetailsValue: [],
    };
  },
  methods: {
    detailsValue() {
      this.dialogVisible = true;
      this.ActivityDetailsId.id = this.detilsSusinesser.id;
      postD(businessAuthBusinessApi(), this.ActivityDetailsId).then((res) => {
        this.ActivityDetailsValue = res.data;
        this.imagesValue = imgUrl();
      });
    },
    filterAuth(val) {
      if (val == 1) {
        return "已认证待审核";
      } else if (val == 2) {
        return "审核通过";
      } else if (val == 3) {
        return "审核不通过";
      } else {
        return "待认证";
      }
    },
  },
};
</script>