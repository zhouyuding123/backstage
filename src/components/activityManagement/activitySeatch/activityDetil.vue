<template>
  <div>
    <el-button type="success" @click="detailsValue()">详情</el-button>
    <el-dialog title="详情" v-model="dialogVisible" width="70%">
      <el-descriptions direction="vertical" :column="5" border>
        <el-descriptions-item label="用户名" align="center">{{
          ActivityDetailsValue.username
        }}</el-descriptions-item>
        <el-descriptions-item label="昵称" align="center">{{
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
        <el-descriptions-item label="活动类型" align="center">
          <div
            :class="{
              green: ActivityDetailsValue.category === 1,
              yellow: ActivityDetailsValue.category == 2,
            }"
          >
            {{ filterCategory(ActivityDetailsValue.category) }}
          </div>
        </el-descriptions-item>
        <el-descriptions-item label="活动标题" align="center">{{
          ActivityDetailsValue.title
        }}</el-descriptions-item>
        <el-descriptions-item label="开始时间" align="center">{{
          ActivityDetailsValue.start_time
        }}</el-descriptions-item>
        <el-descriptions-item label="结束时间" align="center">{{
          ActivityDetailsValue.end_time
        }}</el-descriptions-item>
        <el-descriptions-item label="活动内容" align="center">{{
          ActivityDetailsValue.content
        }}</el-descriptions-item>
        <el-descriptions-item label="具体规则" align="center">{{
          ActivityDetailsValue.rule
        }}</el-descriptions-item>
        <el-descriptions-item label="海报" align="center">
          <el-image
            :src="imagesValue + ActivityDetailsValue.poster"
            :preview-src-list="[imagesValue + ActivityDetailsValue.poster]"
            style="width: 40px; height: 40px"
            class="stylecss"
          />
        </el-descriptions-item>
        <el-descriptions-item label="封面" align="center">
          <el-image
            :src="imagesValue + ActivityDetailsValue.thumb"
            :preview-src-list="[imagesValue + ActivityDetailsValue.thumb]"
            style="width: 40px; height: 40px"
            class="stylecss"
          />
        </el-descriptions-item>
        <el-descriptions-item label="奖项" align="center">
          <div v-for="(item, index) in detial" :key="index">
            奖项:{{ item.name }}个数: {{ item.amount }}奖品:{{ item.item }}
          </div>
        </el-descriptions-item>
        <el-descriptions-item label="开关" align="center">
          <div
            :class="{
              green: ActivityDetailsValue.is_open === 1,
              red: ActivityDetailsValue.is_open == 0,
            }"
          >
            {{ filterIs_open(ActivityDetailsValue.is_open) }}
          </div>
        </el-descriptions-item>
        <el-descriptions-item label="单用户的抽奖次数限制" align="center">
          {{ ActivityDetailsValue.luck_count }}
        </el-descriptions-item>
        <el-descriptions-item label="单次抽奖消耗积分" align="center">
          {{ ActivityDetailsValue.integral }}
        </el-descriptions-item>
        <el-descriptions-item label="浏览量" align="center">
          {{ ActivityDetailsValue.browse }}
        </el-descriptions-item>
        <el-descriptions-item label="是否投票活动" align="center">
          <div
            :class="{
              green: ActivityDetailsValue.is_voto === 1,
              red: ActivityDetailsValue.is_voto == 2,
            }"
          >
            {{ filterIs_voto(ActivityDetailsValue.is_voto) }}
          </div>
        </el-descriptions-item>
        <el-descriptions-item label="item" align="center">
          <div v-for="(item, index) in votoValue" :key="index">
            <div v-if="item.is_img == 0">投票项:{{ item.item }}</div>
            <div v-if="item.is_img == 1" class="imageser">
              <div style="width: 50px">
                <el-image
                  :src="imagesValue + item.item"
                  :preview-src-list="[imagesValue + item.item]"
                  style="width: 40px; height: 40px"
                />
              </div>
            </div>
          </div>
        </el-descriptions-item>

        <div v-if="ActivityDetailsValue.is_voto == 1">
          <el-descriptions-item label="展示时间" align="center">
            {{ voto_configValue.exh_time }}
          </el-descriptions-item>
          <el-descriptions-item label="投票开始时间" align="center">
            {{ voto_configValue.voto_start_time }}
          </el-descriptions-item>
          <el-descriptions-item label="投票结束时间" align="center">
            {{ voto_configValue.voto_end_time }}
          </el-descriptions-item>
          <el-descriptions-item label="投票方式" align="center">
            <div
              :class="{
                green: voto_configValue.method == 1,
                red: voto_configValue.method == 0,
                orange: voto_configValue.method == 2,
                blueqing: voto_configValue.method == 3,
                blue: voto_configValue.method == 4,
              }"
            >
              {{ filterMethod(voto_configValue.method) }}
            </div>
          </el-descriptions-item>
          <el-descriptions-item label="投票方式" align="center">
            <div
              :class="{
                green: voto_configValue.repeat == 1,
                red: voto_configValue.repeat == 0,
                orange: voto_configValue.repeat == 2,
              }"
            >
              {{ filterRepeat(voto_configValue.repeat) }}
            </div>
          </el-descriptions-item>
          <el-descriptions-item label="重复的次数" align="center">
            {{ voto_configValue.repeat_count }}
          </el-descriptions-item>

          <el-descriptions-item label="地区限制" align="center">
            <div
              :class="{
                green: voto_configValue.is_detail == 1,
                red: voto_configValue.is_detail == 0,
              }"
            >
              {{ filterIs_detail(voto_configValue.is_detail) }}
            </div>
          </el-descriptions-item>
          <el-descriptions-item label="省" align="center">
            {{ voto_configValue.province }}
          </el-descriptions-item>
          <el-descriptions-item label="市" align="center">
            {{ voto_configValue.area }}
          </el-descriptions-item>
          <el-descriptions-item label="区" align="center">
            {{ voto_configValue.area }}
          </el-descriptions-item>
          <el-descriptions-item label="参赛人员称谓" align="center">
            {{ voto_configValue.call }}
          </el-descriptions-item>
          <el-descriptions-item label="投票单位" align="center">
            {{ voto_configValue.unit }}
          </el-descriptions-item>
          <el-descriptions-item label="投票按钮文字" align="center">
            {{ voto_configValue.button_writ }}
          </el-descriptions-item>
        </div>
      </el-descriptions>

      <div class="elFoot">
        <span>
          <el-button @click="dialogVisible = false">返 回</el-button>
        </span>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { imgUrl } from "../../../assets/js/modifyStyle.js";
import { postD } from "../../../api/index.js";
import { ActivityShowActiyityApi } from "@/urls/activityUrl.js";
export default {
  inject: ["activityListValue"],
  props: ["detialFort"],
  data() {
    return {
      imagesValue: "",
      dialogVisible: false,
      ActivityDetailsId: {
        id: "",
      },
      ActivityDetailsValue: [],
      detial: "",
      votoValue: "",
      voto_configValue: "",
    };
  },
  methods: {
    detailsValue() {
      this.dialogVisible = true;
      this.ActivityDetailsId.id = this.detialFort.id;
      postD(ActivityShowActiyityApi(), this.ActivityDetailsId).then((res) => {
        this.ActivityDetailsValue = res.data;
        this.imagesValue = imgUrl();
        this.detial = res.data.prize;
        this.votoValue = res.data.voto;
        this.voto_configValue = res.data.voto_config;
      });
    },
    filterCategory(val) {
      if (val === 1) {
        return "普通活动";
      } else if (val === 2) {
        return "评选活动";
      }
    },
    filterIs_open(val) {
      if (val === 0) {
        return "关闭";
      } else if (val === 1) {
        return "开启";
      }
    },
    filterIs_voto(val) {
      if (val === 0) {
        return "不是";
      } else if (val === 1) {
        return "是";
      }
    },
    filterMethod(val) {
      if (val === 0) {
        return "单选";
      } else if (val === 1) {
        return "最多选两项";
      } else if (val === 2) {
        return "最多选三项";
      } else if (val === 3) {
        return "最多选四项";
      } else if (val === 4) {
        return "最多选五项";
      }
    },
    filterRepeat(val) {
      if (val === 0) {
        return "不允重复";
      } else if (val === 1) {
        return "每天限制次数";
      } else if (val === 2) {
        return "总共限制次数";
      }
    },
    filterIs_detail(val) {
      if (val === 0) {
        return "不限制";
      } else if (val === 1) {
        return "限制";
      }
    },
  },
};
</script>

<style lang="less" scoped>
.imageser {
  display: inline;
  float: left;
}
.elFoot {
  padding-top: 15px;
}
</style>