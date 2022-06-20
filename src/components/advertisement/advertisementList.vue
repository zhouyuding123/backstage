<template>
  <div class="backColor">
    <seatch v-show="seatchShow" @SeatchAd="costPlannedAmountChange" />
    <div class="firstColor">
      <add-ad />
      <div style="padding-left: 10px">
        <el-button type="danger" @click="adDels">批量删除</el-button>
      </div>
      <div class="contentRight">
        <el-button type="info" ref="btn1" @click="showCont($event)"
          ><span class="iconfont icon-sousuo"></span
        ></el-button>
      </div>
    </div>
    <div class="twons">
      <vxe-table
        round
        border="true"
        ref="xTable1"
        :align="allAlign"
        :row-config="{ isHover: true }"
        :data="tableData"
        row-id="id"
        :row-style="tableRowStyle"
        :header-row-style="tableStyle"
        @checkbox-change="checkboxChangeEvent"
        @checkbox-all="checkboxChangeEvent"
      >
        <vxe-column
          align="center"
          type="checkbox"
          width="50"
          class="linker"
        ></vxe-column>
        <vxe-column title="广告标题" align="center" style="position: relative">
          <template v-slot="scoped">
            <div class="cont">
              {{ scoped.row.title }}
            </div>
          </template>
        </vxe-column>
        <vxe-column
          field="type"
          title="类别id"
          align="center"
          style="position: relative"
        >
          <template v-slot="scoped">
            <div class="cont">
              {{ scoped.row.type }}
            </div>
          </template>
        </vxe-column>
        <vxe-column
          field="thumb"
          title="图片和视频"
          align="center"
          style="position: relative"
        >
          <template v-slot="scoped">
            <div class="tp" v-if="funimgvideo(scoped.row.thumb) == 'images'">
              <el-image
                :src="imagesValue + scoped.row.thumb"
                alt=""
                :preview-src-list="[imagesValue + scoped.row.thumb]"
                style="width: 40px; height: 40px"
                class="imgStylell"
              />
            </div>
            <div v-if="funimgvideo(scoped.row.thumb) == 'moves'">
              <video width="100" height="100" controls>
                <source
                  :src="imagesValue + scoped.row.thumb"
                  type="video/mp4"
                />
                <source
                  :src="imagesValue + scoped.row.thumb"
                  type="video/ogg"
                />
              </video>
            </div>
          </template>
        </vxe-column>
        <vxe-column
          field="url"
          title="跳转链接"
          align="center"
          style="position: relative"
        >
          <template v-slot="scoped">
            <div class="cont">
              {{ scoped.row.url }}
            </div>
          </template>
        </vxe-column>
        <vxe-column
          field="description"
          title="简介描述"
          align="center"
          style="position: relative"
        >
          <template v-slot="scoped">
            <div class="cont">
              {{ scoped.row.description }}
            </div>
          </template>
        </vxe-column>
        <vxe-column title="操作" align="center">
          <template v-slot="scoped">
            <div class="postDyex">
              <edit-ad  :editFunction="scoped.row" class="postDyexer" />
              <el-button type="danger" @click="adDel(scoped.row)">删除</el-button>

            </div>
          </template>
        </vxe-column>
      </vxe-table>
      <vxe-pager
        :current-page="page1.offset"
        :page-size="page1.limit"
        :total="page1.totalResult"
        :layouts="[
          'PrevPage',
          'JumpNumber',
          'NextPage',
          'FullJump',
          'Sizes',
          'Total',
        ]"
        @page-change="handlePageChangeActivity"
      ></vxe-pager>
    </div>
  </div>
</template>

<script>
import { AdGetListApi,AdSelectDelApi } from "@/urls/advertisementUrl.js";
import seatch from "./Adseatch/seatch.vue";
import addAd from "./Adseatch/addAd.vue";
import editAd from "./Adseatch/editAd.vue"
import {
  styleModify,
  styleModifytwo,
  imgUrl,
} from "@/assets/js/modifyStyle.js";
import { postD } from "@/api";
export default {
  provide() {
    return {
      adListValue: this.adListValue,
    };
  },
  components: { seatch, addAd,editAd },
  data() {
    return {
      tableData: [],
      allAlign: null,
      seatchShow: true,
      imagesValue: "",
      // 分页
      page1: {
        offset: 1,
        limit: 10,
        totalResult: 0,
      },
      ids: [],
      //选中时将对象保存到arrs中
      arrs: [],
      adDelsValues: {
        id: "",
      },
      // 单个删除
      DelId: {
        id: "",
      },
    };
  },
  created() {
    this.adListValue();
    this.imagesValue = imgUrl();
  },
  methods: {
    tableRowStyle() {
      return styleModify();
    },
    tableStyle() {
      return styleModifytwo();
    },
    adListValue() {
      postD(AdGetListApi()).then((res) => {
        console.log(res);
        this.tableData = res.list;
        this.page1.totalResult = res.count;
      });
    },
    showCont() {
      this.seatchShow = !this.seatchShow;
      this.$refs.btn1.$el.innerText;
    },
    funimgvideo(val) {
      return val.split("/")[0];
    },
    // 分页
    handlePageChangeActivity({ currentPage, pageSize }) {
      this.page1.offset = currentPage;
      this.page1.limit = pageSize;
      postD(adListValue(), this.page1).then((res) => {
        this.tableData = res.list;
        this.page1.totalResult = res.count;
      });
    },
    async costPlannedAmountChange(param1) {
      this.tableData = param1.list;
      this.page1.totalResult= param1.count
    },
    // 批量删除
    checkboxChangeEvent(data) {
      this.arrs = data.records;
    },
    async adDels() {
      const adDelsValue = await this.$confirm(
        "此操作将永久删除, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);
      if (adDelsValue !== "confirm") {
        return this.$message.info("取消删除");
      }
      if (adDelsValue === "confirm") {
        this.arrs.forEach((v) => {
          this.ids.push(v.id);
        });
        this.adDelsValues.id = this.ids.toString();
        postD(AdSelectDelApi(),this.adDelsValues).then(res=> {
          if (res.code == "200") {
          this.$message.success("删除成功");
          this.adListValue();
        } else if (res.code == "-200") {
          this.$message.error("参数错误，或暂无数据");
        } else if (res.code == "-201") {
          this.$message.error("未登陆");
        } else if (res.code == "-203") {
          this.$message.error("对不起，你没有此操作权限");
        } else {
          this.$message.error("注册失败，账号已存在");
        }
        })
      }
    },
    async adDel(val) {
      const adDelOne = await this.$confirm(
        "此操作将永久删除, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);
      if (adDelOne !== "confirm") {
        return this.$message.info("取消删除");
      }
      if (adDelOne === "confirm") {
        this.DelId.id = val.id;
        postD(AdSelectDelApi(), this.DelId).then((res) => {
          if (res.code == "200") {
            this.$message.success("删除成功");
            this.adListValue();
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
      }
    },
  },
};
</script>

<style lang="less" scoped>
.contentRight {
  padding-left: 86.2%;
}
.linker {
  background: #ffffff;
  border-radius: 3px 3px 3px 3px;
  opacity: 1;
  border: 1px solid #b5b2b2;
}
.tp {
  position: relative;
}
.cont {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>