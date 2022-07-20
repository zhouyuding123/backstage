<template>
  <div class="backColor">
    <category-seatch v-show="seatchShow" @catSeatch="costPlannedAmountChange" />
    <div class="firstColor">
      <addcategory />
      <div style="padding-left: 10px">
        <el-button type="danger" @click="catDels">批量删除</el-button>
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
        <vxe-column field="id" title="id" align="center"> </vxe-column>
        <vxe-column
          field="title"
          title="广告类别标题"
          align="center"
        ></vxe-column>
        <vxe-column
          field="description"
          title="广告类别描述"
          align="center"
        ></vxe-column>
        <vxe-column field="sort" title="排序" align="center"></vxe-column>
        <vxe-column
          field="create_time"
          title="创建时间"
          align="center"
        ></vxe-column>
        <vxe-column
          field="update_time"
          title="更新时间"
          align="center"
        ></vxe-column>
        <vxe-column title="操作" align="center">
          <template v-slot="scoped">
            <div class="postDyex">
              <edit-cat :editFunction="scoped.row" class="postDyexer" />
              <delcategory :delFunction="scoped.row" class="postDyexer"/>
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
import categorySeatch from "./categorySeatch/categorySeatch.vue";
import addcategory from "./categorySeatch/addcategory.vue";
import editCat from "./categorySeatch/editCat.vue";
import delcategory from "./categorySeatch/delcategory.vue";
import {
  styleModify,
  styleModifytwo,
  imgUrl,
} from "@/assets/js/modifyStyle.js";
import { postD } from "@/api";
import { AdListAdTypeApi, AdDelAdTypeApi } from "@/urls/categoryUrl.js";
export default {
  provide() {
    return {
      categoryListValue: this.categoryListValue,
    };
  },
  components: { categorySeatch, addcategory, editCat, delcategory },
  data() {
    return {
      allAlign: null,
      tableData: [],
      seatchShow: true,
      ids: [],
      //选中时将对象保存到arrs中
      arrs: [],
      catDelsValues: {
        id: "",
      },
      // 分页
      page1: {
        offset: 1,
        limit: 10,
        totalResult: 0,
      },
    };
  },
  created() {
    this.categoryListValue();
  },
  methods: {
    tableRowStyle() {
      return styleModify();
    },
    tableStyle() {
      return styleModifytwo();
    },
    categoryListValue() {
      postD(AdListAdTypeApi()).then((res) => {
        this.tableData = res.list;
        this.page1.totalResult= res.count
      });
    },
    showCont() {
      this.seatchShow = !this.seatchShow;
      this.$refs.btn1.$el.innerText;
    },
    async costPlannedAmountChange(param1) {
      this.tableData = param1.list;
      this.page1.totalResult= param1.count
    },
    // 批量删除
    checkboxChangeEvent(data) {
      this.arrs = data.records;
    },
    async catDels() {
      const catDelsValue = await this.$confirm(
        "此操作将永久删除, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);
      if (catDelsValue !== "confirm") {
        return this.$message.info("取消删除");
      }
      if (catDelsValue === "confirm") {
        this.arrs.forEach((v) => {
          this.ids.push(v.id);
        });
      }
      this.catDelsValues.id = this.ids.toString();
      postD(AdDelAdTypeApi(), this.catDelsValues).then((res) => {
        if (res.code == "200") {
          this.$message.success("删除成功");
          this.categoryListValue();
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
    // 分页
    handlePageChangeActivity({ currentPage, pageSize }) {
      this.page1.offset = currentPage;
      this.page1.limit = pageSize;
      postD(AdListAdTypeApi(), this.page1).then((res) => {
        this.tableData = res.list;
        this.page1.totalResult= res.count
      });
    },
  },
};
</script>

<style lang="less" scoped>
.contentRight {
  padding-left: 86%;
}
.linker {
  background: #ffffff;
  border-radius: 3px 3px 3px 3px;
  opacity: 1;
  border: 1px solid #b5b2b2;
}
.vxe-column {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
}
</style>