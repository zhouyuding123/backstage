<template>
  <div class="backColor">
    <div class="twons">
      <el-tabs v-model="activeName">
        <el-tab-pane label="公开作品" name="first">
          <div class="">
            <div class="contentLift">
              <el-row :gutter="20">
                <el-col :span="1"
                  ><div>
                    <div class="divText">关键词搜索:</div>
                  </div></el-col
                >
                <el-col :span="2"
                  ><div style="text-align: left">
                    <el-input
                      v-model="workseatch.keyword"
                      placeholder="关键词搜索"
                    ></el-input></div
                ></el-col>
                <el-col :span="1"
                  ><div>
                    <div class="divText">审核状态:</div>
                  </div></el-col
                >
                <el-col :span="2"
                  ><div>
                    <el-select v-model="workseatch.status" placeholder="请选择">
                      <el-option
                        v-for="item in statusOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      >
                      </el-option>
                    </el-select></div
                ></el-col>
                <el-col :span="1"
                  ><div>
                    <div class="divText">类别:</div>
                  </div></el-col
                >
                <el-col :span="2"
                  ><div>
                    <el-select
                      v-model="workseatch.product_type_id"
                      placeholder="请选择"
                    >
                      <el-option
                        v-for="item in commodityOptions"
                        :key="item.id"
                        :label="item.title"
                        :value="item.id"
                      >
                      </el-option>
                    </el-select></div
                ></el-col>
                <el-col :span="2"
                  ><div style="display: flex">
                    <el-button type="success" @click="submitSearch"
                      >搜索</el-button
                    >
                    <el-button type="info" @click="submitReset">重置</el-button>
                  </div></el-col
                >
              </el-row>
            </div>
          </div>
          <div class="worksvalue">
            <div v-for="item in myListValue" :key="item.id" class="workbody">
              <div class="imgdiv">
                <img :src="imagesValue + item.thumb" alt="" />
              </div>
              <div class="information">
                <div class="informationBody">
                  <div class="informationBodyTitle">
                    <span>{{ item.title }}</span>
                  </div>
                  <div class="informationBodyLabel">
                    <div
                      v-for="items in item.label.split(',')"
                      :key="items"
                      class="informationBodyLabelValue"
                    >
                      <span> #{{ items }}</span>
                    </div>
                  </div>
                  <div>
                    {{ fullstatus(item.status) }}
                  </div>
                </div>
                <div class="options">
                  <workdetil class="ax" :detilWork="item.id"/>
                  <div class="ax" @click="edit(item.id)"><span>审核</span></div>
                </div>
              </div>
            </div>
          </div>
          <div style="padding: 20px">
            <vxe-pager
              :current-page="work.offset"
              :page-size="work.limit"
              :total="work.totalResult"
              :layouts="[
                'PrevPage',
                'JumpNumber',
                'NextPage',
                'FullJump',
                'Sizes',
                'Total',
              ]"
              @page-change="handlePageChangeActivity"
              align="center"
            ></vxe-pager>
          </div>
        </el-tab-pane>
        <el-tab-pane label="付费作品" name="second">
          <div class="">
            <div class="contentLift">
              <el-row :gutter="20">
                <el-col :span="1"
                  ><div>
                    <div class="divText">关键词搜索:</div>
                  </div></el-col
                >
                <el-col :span="2"
                  ><div style="text-align: left">
                    <el-input
                      v-model="payworkseatch.keyword"
                      placeholder="关键词搜索"
                    ></el-input></div
                ></el-col>
                <el-col :span="1"
                  ><div>
                    <div class="divText">审核状态:</div>
                  </div></el-col
                >
                <el-col :span="2"
                  ><div>
                    <el-select
                      v-model="payworkseatch.status"
                      placeholder="请选择"
                    >
                      <el-option
                        v-for="item in statusOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      >
                      </el-option>
                    </el-select></div
                ></el-col>
                <el-col :span="1"
                  ><div>
                    <div class="divText">类别:</div>
                  </div></el-col
                >
                <el-col :span="2"
                  ><div>
                    <el-select
                      v-model="payworkseatch.product_type_id"
                      placeholder="请选择"
                    >
                      <el-option
                        v-for="item in commodityOptions"
                        :key="item.id"
                        :label="item.title"
                        :value="item.id"
                      >
                      </el-option>
                    </el-select></div
                ></el-col>
                <el-col :span="2"
                  ><div style="display: flex">
                    <el-button type="success" @click="paysubmitSearch"
                      >搜索</el-button
                    >
                    <el-button type="info" @click="submitReset">重置</el-button>
                  </div></el-col
                >
              </el-row>
            </div>
          </div>
          <div class="worksvalue">
            <div v-for="item in payListValue" :key="item.id" class="workbody">
              <div class="imgdiv">
                <img :src="imagesValue + item.thumb" alt="" />
              </div>
              <div class="information">
                <div class="informationBody">
                  <div class="informationBodyTitle">
                    <span>{{ item.title }}</span>
                  </div>
                  <div class="informationBodyLabel">
                    <div
                      v-for="items in item.label.split(',')"
                      :key="items"
                      class="informationBodyLabelValue"
                    >
                      <span> #{{ items }}</span>
                    </div>
                  </div>
                  <div>
                    {{ fullstatus(item.status) }}
                  </div>
                </div>
                <div class="options">
                  <div class="ax"><span>详情</span></div>
                  <div class="ax" @click="edit(item.id)"><span>审核</span></div>
                </div>
              </div>
            </div>
          </div>
          <div style="padding: 20px">
            <vxe-pager
              :current-page="paywork.offset"
              :page-size="paywork.limit"
              :total="paywork.totalResult"
              :layouts="[
                'PrevPage',
                'JumpNumber',
                'NextPage',
                'FullJump',
                'Sizes',
                'Total',
              ]"
              @page-change="payhandlePageChangeActivity"
              align="center"
            ></vxe-pager>
          </div>
        </el-tab-pane>
        <el-tab-pane label="私密作品" name="third">
          <div class="">
            <div class="contentLift">
              <el-row :gutter="20">
                <el-col :span="1"
                  ><div>
                    <div class="divText">关键词搜索:</div>
                  </div></el-col
                >
                <el-col :span="2"
                  ><div style="text-align: left">
                    <el-input
                      v-model="privateworkseatch.keyword"
                      placeholder="关键词搜索"
                    ></el-input></div
                ></el-col>
                <el-col :span="1"
                  ><div>
                    <div class="divText">审核状态:</div>
                  </div></el-col
                >
                <el-col :span="2"
                  ><div>
                    <el-select
                      v-model="privateworkseatch.status"
                      placeholder="请选择"
                    >
                      <el-option
                        v-for="item in statusOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      >
                      </el-option>
                    </el-select></div
                ></el-col>
                <el-col :span="1"
                  ><div>
                    <div class="divText">类别:</div>
                  </div></el-col
                >
                <el-col :span="2"
                  ><div>
                    <el-select
                      v-model="privateworkseatch.product_type_id"
                      placeholder="请选择"
                    >
                      <el-option
                        v-for="item in commodityOptions"
                        :key="item.id"
                        :label="item.title"
                        :value="item.id"
                      >
                      </el-option>
                    </el-select></div
                ></el-col>
                <el-col :span="2"
                  ><div style="display: flex">
                    <el-button type="success" @click="privatesubmitSearch"
                      >搜索</el-button
                    >
                    <el-button type="info" @click="submitReset">重置</el-button>
                  </div></el-col
                >
              </el-row>
            </div>
          </div>
          <div class="worksvalue">
            <div
              v-for="item in privateListValue"
              :key="item.id"
              class="workbody"
            >
              <div class="imgdiv">
                <img :src="imagesValue + item.thumb" alt="" />
              </div>
              <div class="information">
                <div class="informationBody">
                  <div class="informationBodyTitle">
                    <span>{{ item.title }}</span>
                  </div>
                  <div class="informationBodyLabel">
                    <div
                      v-for="items in item.label.split(',')"
                      :key="items"
                      class="informationBodyLabelValue"
                    >
                      <span> #{{ items }}</span>
                    </div>
                  </div>
                  <div>
                    {{ fullstatus(item.status) }}
                  </div>
                </div>
                <div class="options">
                  <workdetil class="ax" :detilWork="item.id"/>
                  <div class="ax" @click="edit(item.id)"><span>审核</span></div>
                </div>
              </div>
            </div>
          </div>
          <div style="padding: 20px">
            <vxe-pager
              :current-page="privatework.offset"
              :page-size="privatework.limit"
              :total="privatework.totalResult"
              :layouts="[
                'PrevPage',
                'JumpNumber',
                'NextPage',
                'FullJump',
                'Sizes',
                'Total',
              ]"
              @page-change="privatehandlePageChangeActivity"
              align="center"
            ></vxe-pager>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <el-dialog title="审核" v-model="dialogVisible" width="60%">
      <div>
        <el-radio v-model="editStatus.status" label="1">通过</el-radio>
        <el-radio v-model="editStatus.status" label="2">驳回</el-radio>
      </div>
      <div v-if="editStatus.status == 2">
        <div>请说明原因</div>
        <el-input
          v-model="editStatus.status_description"
          placeholder="请输入内容"
        ></el-input>
      </div>
      <div style="padding-top: 60px">
        <span>
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="okEdit">确 定</el-button>
        </span>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { postD } from "@/api";
import {
  designer_worksGetListApi,
  designer_worksEditApi,
} from "@/urls/designerUrl.js";
import { imgUrl } from "@/assets/js/modifyStyle";
import workdetil from "./workdetil/workdetil.vue";
export default {
  components: { workdetil },
  data() {
    return {
      activeName: "first",
      imagesValue: "",
      myListValue: [],
      payListValue: [],
      privateListValue: [],
      work: {
        category: "2",
        offset: 1,
        limit: 10,
        totalResult: 0,
      },
      workseatch: {
        keyword: null,
        product_type_id: null,
        status: null,
        category: "2",
        offset: 1,
        limit: 10,
        totalResult: 0,
      },
      paywork: {
        category: "3",
        offset: 1,
        limit: 10,
        totalResult: 0,
      },
      payworkseatch: {
        keyword: null,
        product_type_id: null,
        status: null,
        category: "3",
        offset: 1,
        limit: 10,
        totalResult: 0,
      },
      privatework: {
        category: "1",
        offset: 1,
        limit: 10,
        totalResult: 0,
      },
      privateworkseatch: {
        keyword: null,
        product_type_id: null,
        status: null,
        category: "1",
        offset: 1,
        limit: 10,
        totalResult: 0,
      },
      dialogVisible: false,
      editStatus: {
        status: "",
        status_description: "",
        id: "",
      },
      statusOptions: [
        {
          value: "0",
          label: "待审核",
        },
        {
          value: "1",
          label: "通过",
        },
        {
          value: "2",
          label: "驳回",
        },
      ],
      commodityOptions: [],
      //   详情
    };
  },
  created() {
    this.worksList();
    this.payList();
    this.privateList();
    this.commodityid();
    this.imagesValue = imgUrl();
  },
  methods: {
    commodityid() {
      postD(
        "https://weisou.chengduziyi.com/designer/product_type/getList"
      ).then((res) => {
        this.commodityOptions = res.list;
      });
    },
    worksList() {
      postD(designer_worksGetListApi(), this.work).then((res) => {
        this.myListValue = res.list;
        this.work.totalResult = res.count;
      });
    },
    payList() {
      postD(designer_worksGetListApi(), this.paywork).then((res) => {
        this.payListValue = res.list;
        this.paywork.totalResult = res.count;
      });
    },
    privateList() {
      postD(designer_worksGetListApi(), this.privatework).then((res) => {
        console.log(res);
        this.privateListValue = res.list;
        this.privatework.totalResult = res.count;
      });
    },
    fullstatus(val) {
      if (val === 0) {
        return "待审核";
      } else if (val === 1) {
        return "通过";
      } else if (val === 2) {
        return "驳回";
      }
    },
    edit(val) {
      this.dialogVisible = true;
      this.editStatus.id = val;
    },
    handlePageChangeActivity({ currentPage, pageSize }) {
      if (
        this.workseatch.status !== null ||
        this.workseatch.keyword !== null ||
        this.workseatch.product_type_id !== null
      ) {
        this.workseatch.offset = currentPage;
        this.workseatch.limit = pageSize;
        postD(designer_worksGetListApi(), this.workseatch).then((res) => {
          this.myListValue = res.list;
          this.work.totalResult = res.count;
        });
      } else {
        this.work.offset = currentPage;
        this.work.limit = pageSize;
        postD(designer_worksGetListApi(), this.work).then((res) => {
          this.myListValue = res.list;
          this.work.totalResult = res.count;
        });
      }
    },
    payhandlePageChangeActivity({ currentPage, pageSize }) {
      if (
        this.payworkseatch.status !== null ||
        this.payworkseatch.keyword !== null ||
        this.payworkseatch.product_type_id !== null
      ) {
        this.payworkseatch.keywoffsetord = currentPage;
        this.payworkseatch.limit = pageSize;
        postD(designer_worksGetListApi(), this.payworkseatch).then((res) => {
          console.log(res);
          this.privateListValue = res.list;
          this.paywork.totalResult = res.count;
        });
      } else {
        this.paywork.offset = currentPage;
        this.paywork.limit = pageSize;
        postD(designer_worksGetListApi(), this.paywork).then((res) => {
          this.payListValue = res.list;
          this.paywork.totalResult = res.count;
        });
      }
    },
    privatehandlePageChangeActivity({ currentPage, pageSize }) {
      if (
        this.privateworkseatch.status != null ||
        this.privateworkseatch.keyword != null ||
        this.privateworkseatch.product_type_id != null
      ) {
        this.privateworkseatch.offset = currentPage;
        this.privateworkseatch.limit = pageSize;
        postD(designer_worksGetListApi(), this.privateworkseatch).then(
          (res) => {
            this.privateListValue = res.list;
            this.privatework.totalResult = res.count;
          }
        );
      } else {
        this.privatework.offset = currentPage;
        this.privatework.limit = pageSize;

        postD(designer_worksGetListApi(), this.privatework).then((res) => {
          this.privateListValue = res.list;
          this.privatework.totalResult = res.count;
        });
      }
    },
    okEdit() {
      postD(designer_worksEditApi(), this.editStatus).then((res) => {
        if (res.code == "200") {
          this.$message.success("审核成功");
          this.worksList();
          this.payList();
          this.privateList();
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
    },
    submitSearch() {
      postD(designer_worksGetListApi(), this.workseatch).then((res) => {
        this.myListValue = res.list;
        this.work.totalResult = res.count;
      });
    },
    paysubmitSearch() {
      postD(designer_worksGetListApi(), this.payworkseatch).then((res) => {
        this.payListValue = res.list;
        this.paywork.totalResult = res.count;
      });
    },
    privatesubmitSearch() {
      postD(designer_worksGetListApi(), this.privateworkseatch).then((res) => {
        this.privateListValue = res.list;
        this.privatework.totalResult = res.count;
      });
    },
    submitReset() {
      this.workseatch.keyword = null;
      this.workseatch.product_type_id = null;
      this.workseatch.status = null;
      this.workseatch.offset = 1;
      this.payworkseatch.keyword = null;
      this.payworkseatch.product_type_id = null;
      this.payworkseatch.status = null;
      this.payworkseatch.offset = 1;
      this.privateworkseatch.keyword = null;
      this.privateworkseatch.product_type_id = null;
      this.privateworkseatch.status = null;
      this.privateworkseatch.offset = 1;
    },
  },
};
</script>

<style lang="less" scoped>
@import url("./de.less");
</style>