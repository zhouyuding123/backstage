<template>
  <div class="backColor">
    <brand-seatch v-show="seatchShow" @brandsSeatch="costPlannedAmountChange" />
    <div class="firstColor">
      <div>
        <el-button type="danger" @click="brandDels">批量删除</el-button>
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
        <vxe-column width="60" align="center">
          <template v-slot="scoped">
            <el-image
              :src="imagesValue + scoped.row.headimage"
              alt=""
              :preview-src-list="[imagesValue + scoped.row.headimage]"
              style="width: 40px; height: 40px"
              class="imgStyle"
            />
          </template>
        </vxe-column>
        <vxe-column
          field="username"
          title="用户名"
          width="120"
          align="center"
        ></vxe-column>
        <vxe-column
          field="nickname"
          title="昵称"
          align="center"
        ></vxe-column>
        <vxe-column
          field="title"
          title="标题"
          width="240"
          align="center"
        ></vxe-column>
        <vxe-column width="50" align="center">
          <template v-slot="scoped">
            <el-image
              :src="imagesValue + scoped.row.thumb"
              alt=""
              :preview-src-list="[imagesValue + scoped.row.thumb]"
              style="width: 40px; height: 40px"
              class="imgStyles"
            />
          </template>
        </vxe-column>
        <vxe-column
          field="description"
          title="品牌"
          align="center"
        ></vxe-column>
        <vxe-column
          title="审核状态"
          width="120"
          align="center"
          show-overflow="ellipsis"
        >
          <template v-slot="scoped">
            <div @click="companySetStatus(scoped.row)">
              <div
                class="clickHeader"
                :class="{
                  green: scoped.row.status === 1,
                  yellow: scoped.row.status == 0,
                  red: scoped.row.status === 2,
                }"
              >
                {{ filterStatus(scoped.row.status) }}
              </div>
            </div>
          </template>
        </vxe-column>
        <vxe-column
          field="create_time"
          title="创建时间"
          align="center"
          show-overflow="title"
        ></vxe-column>
        <vxe-column
          field="update_time"
          title="更新时间"
          align="center"
          show-overflow="title"
        ></vxe-column>
        <vxe-column title="操作" align="center"> 
            <template v-slot="scoped">
                <div class="postDyex">
                    <brand-del :delBrand="scoped.row" class="postDyexer" />
                    <brand-details :detailsBrand="scoped.row" class="postDyexer" />
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
    <el-dialog title="审核" v-model="SetStatus" width="30%">
      <el-descriptions direction="vertical" :column="5" border>
        <el-descriptions-item label="用户名" align="center">{{
          setDetilValue.username
        }}</el-descriptions-item>
        <el-descriptions-item label="昵称" align="center">{{
          setDetilValue.nickname
        }}</el-descriptions-item>
        <el-descriptions-item label="头像" align="center">
          <el-image
            :src="imagesValue + setDetilValue.headimage"
            :preview-src-list="[imagesValue + setDetilValue.headimage]"
            style="width: 40px; height: 40px"
            class="stylecss"
          />
        </el-descriptions-item>
        <el-descriptions-item label="标题" align="center">{{
          setDetilValue.title
        }}</el-descriptions-item>
        <el-descriptions-item label="封面" align="center">
          <el-image
            :src="imagesValue + setDetilValue.thumb"
            :preview-src-list="[imagesValue + setDetilValue.thumb]"
            style="width: 40px; height: 40px"
            class="stylecss"
          />
        </el-descriptions-item>
        <el-descriptions-item label="品牌" align="center">
          {{ setDetilValue.description }}
        </el-descriptions-item>
        <el-descriptions-item label="创建时间" align="center">{{
          setDetilValue.create_time
        }}</el-descriptions-item>
        <el-descriptions-item label="更新时间" align="center">{{
          setDetilValue.update_time
        }}</el-descriptions-item>
      </el-descriptions>
      <div style="padding-top: 15px">请选择</div>
      <el-radio-group
        v-model="SetStatusRadio.status"
        class="SetStatusRadioStyle"
      >
        <el-radio :label="0">等待平台审核</el-radio>
        <el-radio :label="1">平台通过，进行中</el-radio>
        <el-radio :label="2">驳回</el-radio>
      </el-radio-group>
      <div style="padding-top: 20px">
        <el-input
          type="textarea"
          :rows="3"
          placeholder="如有驳回请说明"
          v-model="SetStatusRadio.description"
        >
        </el-input>
      </div>
      <div style="padding-top: 20px">
        <span>
          <el-button @click="SetStatus = false">取 消</el-button>
          <el-button type="primary" @click="SetStatusValue">确 定</el-button>
        </span>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import brandDel from "./brandSeatch/brandDel.vue"
import brandSeatch from "./brandSeatch/brandSeatch.vue";
import brandDetails from "./brandSeatch/brandDetails.vue"
import {
  BrandGetListApi,
  BrandSetExaApi,
  BrandSelectDelApi,
} from "@/urls/brandUrl.js";
import {
  styleModify,
  styleModifytwo,
  imgUrl,
} from "@/assets/js/modifyStyle.js";
import { postD } from "@/api";
export default {
  provide() {
    return {
      BrandListValue: this.BrandListValue,
    };
  },
  components: {
    brandSeatch,
    brandDel,
    brandDetails
  },
  data() {
    return {
      tableData: [],
      allAlign: null,
      imagesValue: "",
      seatchShow: true,
      page1: {
        offset: 1,
        limit: 10,
        totalResult: 0,
      },
      SetStatus: false,
      SetStatusRadio: {
        id: "",
        status: "",
        description: "",
      },
      // 批量删除
      ids: [],
      //选中时将对象保存到arrs中
      arrs: [],
      activityDelsValues: {
        id: "",
      },
      setDetilValue:[]
    };
  },
  created() {
    this.BrandListValue();
  },
  methods: {
    tableRowStyle() {
      return styleModify();
    },
    tableStyle() {
      return styleModifytwo();
    },
    BrandListValue() {
      postD(BrandGetListApi()).then((res) => {
        this.tableData = res.list;
        this.imagesValue = imgUrl();
        this.page1.totalResult = res.count;
      });
    },
    showCont() {
      this.seatchShow = !this.seatchShow;
      this.$refs.btn1.$el.innerText;
    },
    async costPlannedAmountChange(param1) {
      this.tableData = param1;
    },
    // 分页
    handlePageChangeActivity({ currentPage, pageSize }) {
      this.page1.offset = currentPage;
      this.page1.limit = pageSize;
      postD(BrandGetListApi(), this.page1).then((res) => {
        this.tableData = res.list;
        this.page1.totalResult = res.count;
      });
    },
    companySetStatus(data) {
      this.SetStatus = true;
      this.SetStatusRadio.id = data.id;
      this.SetStatusRadio.status = data.status;
      this.setDetilValue = data;
    },
    filterStatus(val) {
      if (val === 0) {
        return "待审核";
      } else if (val === 1) {
        return "审核通过";
      } else if (val === 2) {
        return "驳回";
      }
    },
    // 审核
    SetStatusValue() {
      postD(BrandSetExaApi(), this.SetStatusRadio).then((res) => {
        if (res.code == "200") {
          this.$message.success("状态修改成功");
          this.SetStatus = false;
          this.BrandListValue();
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
    },
    // 批量删除
    checkboxChangeEvent(data) {
      this.arrs = data.records;
    },
    async brandDels() {
      const brandDelsId = await this.$confirm(
        "此操作将永久删除管理, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);
      if (brandDelsId !== "confirm") {
        return this.$message.info("取消删除");
      }
      if (brandDelsId === "confirm") {
        this.arrs.forEach((v) => {
          this.ids.push(v.id);
        });
        this.activityDelsValues.id = this.ids.toString();
        postD(BrandSelectDelApi(),this.activityDelsValues).then(res=> {
            if (res.code == "200") {
            this.$message.success("状态修改成功");
            this.BrandListValue();
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
  },
};
</script>

<style lang="less" scoped>
.contentRight {
  padding-left: 90.7%;
}
.linker {
  background: #ffffff;
  border-radius: 3px 3px 3px 3px;
  opacity: 1;
  border: 1px solid #b5b2b2;
}
</style>