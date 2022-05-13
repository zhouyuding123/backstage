<template>
  <div class="backColor">
    <product-type-seatch
      v-show="seatchShow"
      @productSeatch="costPlannedAmountChange"
    />
    <div class="firstColor">
      <addproduct-type />
      <div style="padding-left: 20px">
        <el-button type="danger" @click="productDels">批量删除</el-button>
      </div>
      <div class="contentRight">
        <el-button type="info" ref="btn1" @click="showCont($event)"
          >查询</el-button
        >
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
        <vxe-column field="id" title="id" align="center"></vxe-column>
        <vxe-column field="title" title="标题" align="center"></vxe-column>
        <vxe-column
          field="description"
          title="描述"
          align="center"
        ></vxe-column>
        <vxe-column field="sort" title="分类" align="center"></vxe-column>
        <vxe-column field="status" title="展示" align="center">
          <template v-slot="scoped">
            <el-switch
              v-model="scoped.row.status"
              active-color="#13ce66"
              @change="statusChaged(scoped.row)"
              :active-value="1"
              :inactive-value="0"
            ></el-switch>
          </template>
        </vxe-column>
        <vxe-column
          field="create_time"
          title="创建时间"
          align="center"
        ></vxe-column>
        <vxe-column title="操作" align="center">
          <template v-slot="scoped">
            <div class="postDyex">
              <product-detil :detilFunction="scoped.row" class="postDyexer" />
              <edit-product :editFunction="scoped.row" class="postDyexer" />
              <prodict-del :delFunction="scoped.row" class="postDyexer" />
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
        @page-change="handlePageChange"
      ></vxe-pager>
    </div>
  </div>
</template>
<script>
import prodictDel from "./product_typeSeatch/productDel.vue";
import editProduct from "./product_typeSeatch/editProduct.vue";
import { styleModify, styleModifytwo } from "../../assets/js/modifyStyle.js";
import addproductType from "./product_typeSeatch/addproductType.vue";
import { postD } from "../../api/index.js";
import productTypeSeatch from "./product_typeSeatch/productTypeSeatch.vue";
import ProductDetil from "./product_typeSeatch/productDetil.vue";
import {
  product_typeSelectDelApi,
  product_typeGetListApi,
  product_typeEditApi,
} from "@/urls/product_typeUrl.js";
export default {
  provide() {
    return {
      productValue: this.productValue,
    };
  },
  components: {
    addproductType,
    productTypeSeatch,
    editProduct,
    ProductDetil,
    prodictDel,
  },
  data() {
    return {
      allAlign: null,
      tableData: [],
      statusSwitch: {
        id: "",
        status: "",
      },
      // 分页
      page1: {
        offset: 1,
        limit: 10,
        totalResult: 0,
      },
      seatchShow: false,
      ids: [],
      //选中时将对象保存到arrs中
      arrs: [],
      productDelsValues: {
        id: "",
      },
    };
  },
  created() {
    this.productValue();
  },
  methods: {
    tableRowStyle() {
      return styleModify();
    },
    tableStyle() {
      return styleModifytwo();
    },
    productValue() {
      postD(product_typeGetListApi()).then((res) => {
        this.tableData = res.list;
        this.page1.totalResult = res.count;
      });
    },
    // 商品开关
    statusChaged(data) {
      this.statusSwitch.id = data.id;
      this.statusSwitch.status = data.status;
      postD(product_typeEditApi(), this.statusSwitch).then((res) => {
        if (res.code == "200") {
          this.$message.success("状态修改成功");
          this.productValue();
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
    handlePageChange({ currentPage, pageSize }) {
      this.page1.offset = currentPage;
      this.page1.limit = pageSize;
      postD(product_typeGetListApi(), this.page1).then((res) => {
        this.tableData = res.list;
      });
    },
    showCont() {
      this.seatchShow = !this.seatchShow;
      this.$refs.btn1.$el.innerText;
    },
    async costPlannedAmountChange(param1) {
      this.tableData = param1;
    },
    // 批量删除
    checkboxChangeEvent(data) {
      this.arrs = data.records;
    },
    async productDels() {
      const productDelsList = await this.$confirm(
        "此操作将永久删除管理, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);
      if (productDelsList !== "confirm") {
        return this.$message.info("取消删除");
      }
      if (productDelsList === "confirm") {
        this.arrs.forEach((v) => {
          this.ids.push(v.id);
        });
      }
      this.productDelsValues.id = this.ids.toString();
      postD(product_typeSelectDelApi(), this.productDelsValues).then((res) => {
        if (res.code == "200") {
          this.$message.success("状态修改成功");
          this.productValue();
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
  },
};
</script>

<style lang="less" scoped>
.contentRight {
  padding-left: 85%;
}
</style>