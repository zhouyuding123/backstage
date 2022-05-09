<template>
  <div class="backColor">
    <circle-seatch
      v-show="seatchShow"
      @circleSeatch="costPlannedAmountChange"
    />
    <div class="firstColor">
      <div>
        <el-button type="danger" plain @click="selectDel">批量删除</el-button>
      </div>
      <div class="contentRight">
        <el-button type="info" plain ref="btn1" @click="showCont($event)"
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
        @checkbox-change="checkboxChangeEventer"
        @checkbox-all="checkboxChangeEventer"
      >
        <vxe-column
          align="center"
          type="checkbox"
          width="50"
          class="linker"
        ></vxe-column>
        <vxe-column
          type="seq"
          title="序号"
          width="60"
          align="center"
        ></vxe-column>
        <vxe-column
          field="id"
          title="id"
          width="60"
          align="center"
        ></vxe-column>
        <vxe-column
          field="title"
          title="标题"
          width="250"
          align="center"
        ></vxe-column>
        <vxe-column
          field="description"
          title="简介"
          width="250"
          align="center"
        ></vxe-column>
        <vxe-column width="60" align="center">
          <template v-slot="scoped">
            <el-image
              :src="
                'https://weisoutc.oss-cn-shanghai.aliyuncs.com/' +
                scoped.row.headimg
              "
              alt=""
              :preview-src-list="[
                'https://weisoutc.oss-cn-shanghai.aliyuncs.com/' +
                  scoped.row.headimg,
              ]"
              style="width: 40px; height: 40px"
              class="imgStyle"
            />
          </template>
        </vxe-column>
        <vxe-column
          field="nickname"
          title="名字"
          width="120"
          align="center"
        ></vxe-column>
        <vxe-column
          field="label"
          title="标签"
          width="100"
          align="center"
        ></vxe-column>
        <vxe-column title="status" width="60" align="center">
          <template v-slot="scoped">
            <el-switch
              v-model="scoped.row.status"
              active-color="#13ce66"
              @change="circleStatys(scoped.row)"
              :active-value="1"
              :inactive-value="0"
            ></el-switch>
          </template>
        </vxe-column>
        <vxe-column
          field="tel"
          title="电话"
          width="110"
          align="center"
        ></vxe-column>
        <vxe-column title="成员数" width="80" align="center">
          <template v-slot="scoped">
            <div class="textVuel" @click="member_countClick(scoped.row)">
              {{ scoped.row.member_count }}
            </div>
          </template>
        </vxe-column>
        <vxe-column title="论坛数" width="80" align="center">
          <template v-slot="scoped">
            <div class="textVuel" @click="forum_countClick(scoped.row)">
              {{ scoped.row.forum_count }}
            </div>
          </template>
        </vxe-column>
        <vxe-column title="操作" align="center">
          <template v-slot="scoped">
            <el-button type="danger" @click="delRow(scoped.row)"
              >删除</el-button
            >
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
      >
      </vxe-pager>
    </div>
    <el-dialog
      title="人员"
      v-model="member_countClicks"
      width="70%"
      :destroy-on-close="true"
    >
      <div class="seachStyle">
        <el-input
          v-model="personneInput"
          placeholder="请输入内容"
          class="inputlong"
        ></el-input
        ><el-button type="success" @click="keywordSeach(scoped.row)"
          >成功按钮</el-button
        >
      </div>
      <vxe-table
        round
        border="true"
        ref="xTable2"
        :row-config="{ isHover: true }"
        :data="circlePersonnelTab"
        row-id="id"
      >
        <vxe-column
          align="center"
          type="checkbox"
          width="50"
          class="linker"
        ></vxe-column>
        <vxe-column
          type="seq"
          title="序号"
          width="60"
          align="center"
        ></vxe-column>
        <vxe-column field="id" title="id" width="60" align="center"></vxe-column
        ><vxe-column field="nickname" title="昵称" align="center"></vxe-column>
        <vxe-column field="headimg" title="头像" align="center"></vxe-column>
        <vxe-column
          field="create_time"
          title="时间"
          align="center"
        ></vxe-column>
        <vxe-column title="操作" align="center">
          <template v-slot="sec">
            <el-button type="danger" @click="personneDetil(sec.row)"
              >删除</el-button
            >

            <el-dialog title="提示" v-model="personneDetils" width="30%">
              <span>
                <el-button @click="personneDetils = false">取 消</el-button>
                <el-button type="primary" @click="personneDetilYes"
                  >确 定</el-button
                >
              </span>
            </el-dialog>
          </template>
        </vxe-column>
      </vxe-table>
    </el-dialog>
    <el-dialog
      title="论坛"
      v-model="forum_countInput"
      width="70%"
      :destroy-on-close="true"
    >
      <div class="seachStyle">
        <el-input
          v-model="forum_countInputInput.keyword"
          placeholder="请输入内容"
          class="inputlong"
        ></el-input
        ><el-button
          type="success"
          @click="forum_countInputKeywordSeach"
          >成功按钮</el-button
        >
      </div>

      <vxe-table
        round
        border="true"
        ref="xTable3"
        :row-config="{ isHover: true }"
        :data="forum_countTab"
        row-id="id"
        show-overflow="tooltip"
      >
        <vxe-column align="center" type="checkbox" width="50"></vxe-column>
        <vxe-column
          type="seq"
          title="序号"
          width="60"
          align="center"
        ></vxe-column>
        <vxe-column
          field="id"
          title="id"
          width="60"
          align="center"
        ></vxe-column>
        <vxe-column
          field="circle_id"
          title="圈子id"
          width="70"
          align="center"
        ></vxe-column>
        <vxe-column
          field="title"
          title="话题"
          width="150"
          align="center"
        ></vxe-column>
        <vxe-column field="content" title="内容" align="center"></vxe-column>
        <vxe-column field="status" title="状态" align="center">
          <template v-slot="scr">
            <el-switch
              v-model="scr.row.status"
              active-color="#13ce66"
              @change="forumStatus(scr.row)"
              :active-value="1"
              :inactive-value="0"
            ></el-switch>
          </template>
        </vxe-column>
        <vxe-column field="browse" title="浏览量" align="center"></vxe-column>
        <vxe-column
          field="comment_count"
          title="评论量"
          align="center"
        ></vxe-column>
        <vxe-column field="type" title="类型" align="center"></vxe-column>
        <vxe-column title="操作" align="center" width="200">
          <template v-slot="forumed">
            <el-row>
              <el-button type="primary" @click="forumDetails(forumed.row)"
                >详情</el-button
              >
              <el-button type="danger" @click="forumDle(forumed.row)"
                >删除</el-button
              >
            </el-row>
          </template>
        </vxe-column>
      </vxe-table>
      <vxe-pager
        :current-page="forum_countId.offset"
        :page-size="forum_countId.limit"
        :total="forum_countId.totalResult"
        :layouts="[
          'PrevPage',
          'JumpNumber',
          'NextPage',
          'FullJump',
          'Sizes',
          'Total',
        ]"
        @page-change="handlePageChangeFroum_count"
      >
      </vxe-pager>
      <span>
        <el-button @click="forum_countInput = false">取 消</el-button>
        <el-button type="primary" @click="forum_countInput = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <el-dialog
      title="论坛详情"
      v-model="forumDetailsDialog"
      width="30%"
      :destroy-on-close="true"
    >
      <el-descriptions direction="vertical" :column="3" border>
        <el-descriptions-item label="id">{{
          forumDetailsValue.id
        }}</el-descriptions-item>
        <el-descriptions-item label="圈子id">{{
          forumDetailsValue.circle_id
        }}</el-descriptions-item>
        <el-descriptions-item label="标题">{{
          forumDetailsValue.title
        }}</el-descriptions-item>
        <el-descriptions-item label="缩略图">{{
          forumDetailsValue.thumb
        }}</el-descriptions-item>
        <el-descriptions-item label="描述">{{
          forumDetailsValue.description
        }}</el-descriptions-item>
        <el-descriptions-item label="内容">{{
          forumDetailsValue.content
        }}</el-descriptions-item>
        <el-descriptions-item label="地址">{{
          forumDetailsValue.details
        }}</el-descriptions-item>
        <el-descriptions-item label="区域">{{
          forumDetailsValue.city
        }}</el-descriptions-item>
        <el-descriptions-item label="浏览量">{{
          forumDetailsValue.browse
        }}</el-descriptions-item>
        <el-descriptions-item label="评论量">{{
          forumDetailsValue.comment_count
        }}</el-descriptions-item>
        <el-descriptions-item label="创造时间">{{
          forumDetailsValue.create_time
        }}</el-descriptions-item>
        <el-descriptions-item label="更新时间">{{
          forumDetailsValue.update_time
        }}</el-descriptions-item>
      </el-descriptions>
      <div class="forumDetailsDialogStyle">
        <span>
          <el-button @click="forumDetailsDialog = false">返 回</el-button>
        </span>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { postD } from "../../api/index.js";
import circleSeatch from "./Circle/circleSeatch.vue";
export default {
  provide() {
    return {
      circleValue: this.circleValue,
    };
  },
  components: {
    circleSeatch,
  },
  data() {
    return {
      seatchShow: false,
      tableData: [],
      allAlign: null,
      url: {
        getListInterface: "Circle/getList",
        getCircleMemberInterface: "Circle/getCircleMember",
        delCircleMemberInterface: "Circle/delCircleMember",
        selectDelInterface: "Circle/selectDel",
        delInterface: "Circle/del",
        getCircleForumInterface: "Circle/getCircleForum",
        delCircleForumInterface: "Circle/delCircleForum",
        showForumInterface: "Circle/showForum",
        listForumInterface: "Circle/listForum",
        setCircleStatInterface: "Circle/setCircleStat",
        setForumStatInterface: "Circle/setForumStat",
      },
      // 打开人员
      member_countClicks: false,
      // 人员接口id
      circlePersonnel: {
        id: "",
      },
      // 圈子人员table
      circlePersonnelTab: [],
      // 圈子人员搜索
      personneInput: "",
      personneInputSearch: {
        id: "",
        keyword: "",
      },
      // 论坛搜索
      forum_countInputInput: {
        keyword: null,
      },
      // 圈子人员删除
      detilPersonne: {
        id: "",
      },
      // 圈子人员删除确认
      personneDetils: false,
      // 圈子分页
      page1: {
        offset: 1,
        limit: 10,
        totalResult: 0,
      },
      // 论坛分页
      page2: {
        offset: 1,
        limit: 10,
        totalResult: 0,
      },
      //选中的数组  批量删除 选中时将对象保存到arrs中
      ids: [],
      arrs: [],
      selectDelValue: {
        id: "",
      },
      // 单个删除
      delRowValue: {
        id: "",
      },
      // status
      statusModelRadio: {
        id: "",
        status: "",
      },
      forumStatusRadio: {
        id: "",
        status: "",
      },

      // 论坛
      forum_countInput: false,
      forum_countId: {
        id: "",
        offset: 1,
        limit: 10,
        totalResult: 0,
      },
      forum_countTab: [],
      // 论坛详情
      forum_countdetails: {
        id: "",
      },
      forumDetailsDialog: false,
      forumDetailsValue: [],
      // 论坛删除
      forum_countdel: {
        id: "",
      },
    };
  },
  created() {
    this.circleValue();
  },
  methods: {
    // 读取圈子列表
    circleValue() {
      postD(this.url.getListInterface, this.page1).then((res) => {
        this.tableData = res.list;
        this.page1.totalResult = res.count;
      });
    },
    tableRowStyle() {
      return "background: #FFFFFF;box-shadow: 0px 2px 5px 1px rgba(0, 0, 0, 0.05);border-radius: 10px 10px 10px 10px;opacity: 1;";
    },
    tableStyle() {
      return "box-shadow: 0px 2px 5px 1px rgba(0, 0, 0, 0.05);border-radius: 10px 10px 10px 10px;opacity: 1;";
    },
    member_countClick(data) {
      this.circlePersonnel.id = data.id;
      this.member_countClicks = true;
      postD(this.url.getCircleMemberInterface, this.circlePersonnel).then(
        (res) => {
          this.circlePersonnelTab = res.list;
        }
      );
    },
    // 圈子成员搜索
    keywordSeach(data) {
      this.personneInputSearch.id = data.id.toString();
      this.personneInputSearch.keyword = this.personneInput;
      postD(this.url.getCircleMemberInterface, this.personneInputSearch).then(
        (res) => {
          this.circlePersonnelTab = res.list;
        }
      );
    },
    // 圈子人员删除
    personneDetil(data) {
      this.personneDetils = true;
      this.detilPersonne.id = data.id.toString();
    },
    personneDetilYes() {
      postD(this.url.delCircleMemberInterface, this.detilPersonne).then(
        (res) => {
          if (res.code == "200") {
            this.$message.success("状态修改成功");
            postD(this.url.getCircleMemberInterface, this.circlePersonnel).then(
              (res) => {
                this.circlePersonnelTab = res.list;
              }
            );
          } else if (res.code == "-200") {
            this.$message.error("参数错误，或暂无数据");
          } else if (res.code == "-201") {
            this.$message.error("未登陆");
          } else if (res.code == "-203") {
            this.$message.error("对不起，你没有此操作权限");
          } else {
            this.$message.error("注册失败，账号已存在");
          }
        }
      );
      this.personneDetils = false;
    },
    // 分页
    handlePageChange({ currentPage, pageSize }) {
      this.page1.offset = currentPage;
      this.page1.limit = pageSize;
      this.circleValue();
    },
    // 批量删除
    checkboxChangeEventer(data) {
      this.arrs = data.records;
    },
    async selectDel() {
      const selectDels = await this.$confirm(
        "此操作将永久删除管理, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);
      if (selectDels !== "confirm") {
        return this.$message.info("取消删除");
      }
      if (selectDels === "confirm") {
        this.arrs.forEach((v) => {
          this.ids.push(v.id);
        });
        this.selectDelValue.id = this.ids.toString();
        postD(this.url.selectDelInterface, this.selectDelValue).then((res) => {
          if (res.code == "200") {
            this.$message.success("状态修改成功");
            this.circleValue();
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
    // 单个删除
    async delRow(data) {
      const delRowS = await this.$confirm(
        "此操作将永久删除管理, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);
      if (delRowS !== "confirm") {
        return this.$message.info("取消删除");
      }
      if (delRowS === "confirm") {
        this.delRowValue.id = data.id;
        postD(this.url.delInterface, this.delRowValue).then((res) => {
          if (res.code == "200") {
            this.$message.success("状态修改成功");
            this.circleValue();
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
    // 圈子审核
    circleStatys(data) {
      this.statusModelRadio.id = data.id.toString();
      this.statusModelRadio.status = data.status.toString();
      postD(this.url.setCircleStatInterface, this.statusModelRadio).then(
        (res) => {
          if (res.code == "200") {
            this.$message.success("状态修改成功");
          } else if (res.code == "-200") {
            this.$message.error("参数错误，或暂无数据");
          } else if (res.code == "-201") {
            this.$message.error("未登陆");
          } else if (res.code == "-203") {
            this.$message.error("对不起，你没有此操作权限");
          } else {
            this.$message.error("注册失败，账号已存在");
          }
        }
      );
    },
    // 论坛
    forum_countClick(data) {
      this.forum_countId.id = data.id;
      this.forum_countInput = true;
      postD(this.url.getCircleForumInterface, this.forum_countId).then(
        (res) => {
          this.forum_countTab = res.list;
          this.forum_countId.totalResult = res.count;
        }
      );
    },
    // 论坛分页
    handlePageChangeFroum_count({ currentPage, pageSize }) {
      this.forum_countId.offset = currentPage;
      this.forum_countId.limit = pageSize;
      postD(this.url.getCircleForumInterface, this.forum_countId).then(
        (res) => {
          this.forum_countTab = res.list;
          this.forum_countId.totalResult = res.count;
        }
      );
    },
    // 论坛详情
    forumDetails(data) {
      this.forumDetailsDialog = true;
      this.forum_countdetails.id = data.id;
      postD(this.url.showForumInterface, this.forum_countdetails).then(
        (res) => {
          this.forumDetailsValue = res.data;
        }
      );
    },
    // 论坛删除
    async forumDle(data) {
      const forumDles = await this.$confirm(
        "此操作将永久删除, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);
      if (forumDles !== "confirm") {
        return this.$message.info("取消删除");
      }
      if (forumDles === "confirm") {
        this.forum_countdel.id = data.id;
        postD(this.url.delCircleForumInterface, this.forum_countdel).then(
          (res) => {
            if (res.code == "200") {
              this.$message.success("状态修改成功");
              postD(this.url.getCircleForumInterface, this.forum_countId).then(
                (res) => {
                  this.forum_countTab = res.list;
                  this.forum_countId.totalResult = res.count;
                }
              );
            } else if (res.code == "-200") {
              this.$message.error("参数错误，或暂无数据");
            } else if (res.code == "-201") {
              this.$message.error("未登陆");
            } else if (res.code == "-203") {
              this.$message.error("对不起，你没有此操作权限");
            } else {
              this.$message.error("注册失败，账号已存在");
            }
          }
        );
      }
    },
    // 论坛审核
    forumStatus(data) {
      this.forumStatusRadio.id = data.id;
      this.forumStatusRadio.status = data.status;
      postD(this.url.setForumStatInterface, this.forumStatusRadio).then(
        (res) => {
          if (res.code == "200") {
            this.$message.success("状态修改成功");
          } else if (res.code == "-200") {
            this.$message.error("参数错误，或暂无数据");
          } else if (res.code == "-201") {
            this.$message.error("未登陆");
          } else if (res.code == "-203") {
            this.$message.error("对不起，你没有此操作权限");
          } else {
            this.$message.error("注册失败，账号已存在");
          }
        }
      );
    },
    showCont() {
      this.seatchShow = !this.seatchShow;
      this.$refs.btn1.$el.innerText;
    },
    async costPlannedAmountChange(param1) {
      this.tableData = param1;
    },
    forum_countInputKeywordSeach() {
      postD(this.url.getCircleForumInterface, this.forum_countInputInput).then((res) => {
        this.tableData = res.list;
      });
    },
  },
};
</script>

<style lang="less" scoped>
.backColor {
  background: #f9f9f9;
  width: 100%;
  height: 100%;
  .firstColor {
    padding: 20px 20px 0 20px;
    width: 100%;
    display: flex;
    flex-flow: row;
  }
  .twons {
    padding: 20px;
  }
}
.imgStyle {
  position: absolute;
  border-radius: 50%;
  top: 10%;
  left: 60%;
  background: #ffffff;
  box-shadow: 0px 2px 5px 1px rgba(0, 0, 0, 0.05);
  opacity: 1;
}
.linker {
  background: #ffffff;
  border-radius: 3px 3px 3px 3px;
  opacity: 1;
  border: 1px solid #b5b2b2;
}
.textVuel:hover {
  color: red;
  cursor: pointer;
}
.seachStyle {
  position: relative;
  text-align: left;
  .el-button {
    margin-left: 20px;
    margin-top: -2px;
  }
}
.inputlong {
  width: 200px;
}
.clickHeader {
  cursor: pointer;
}
.green {
  color: #39b54a;
}
.yellow {
  color: #f29124;
}
.red {
  color: #e6432d;
}
.white {
  color: white;
}
.contentRight {
  padding-left: 90%;
}
</style>