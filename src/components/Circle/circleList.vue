<template>
  <div class="backColor">
    <div class="firstColor">
      <div class="buttonStyle">
        <p @click="selectDel">批量删除</p>
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
        <vxe-column
          field="status"
          title="status"
          width="60"
          align="center"
        ></vxe-column>
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

            <el-dialog title="提示" v-model="member_countClicks" width="70%">
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
                <vxe-column
                  field="id"
                  title="id"
                  width="60"
                  align="center"
                ></vxe-column
                ><vxe-column
                  field="status"
                  title="status"
                  align="center"
                ></vxe-column
                ><vxe-column
                  field="nickname"
                  title="昵称"
                  align="center"
                ></vxe-column>
                <vxe-column
                  field="headimg"
                  title="头像"
                  align="center"
                ></vxe-column>
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

                    <el-dialog
                      title="提示"
                      v-model="personneDetils"
                      width="30%"
                    >
                      <span>这是一段信息</span>
                      <span>
                        <el-button @click="personneDetils = false"
                          >取 消</el-button
                        >
                        <el-button type="primary" @click="personneDetilYes"
                          >确 定</el-button
                        >
                      </span>
                    </el-dialog>
                  </template>
                </vxe-column>
              </vxe-table>
            </el-dialog>
          </template>
        </vxe-column>
        <vxe-column title="论坛数" width="80" align="center">
          <template v-slot="scoped">
            <div class="textVuel" @click="forum_countClick">
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
  </div>
</template>

<script>
import { postD } from "../../api/index.js";
export default {
  data() {
    return {
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
      // 圈子人员删除
      detilPersonne: {
        id: "",
      },
      // 圈子人员删除确认
      personneDetils: false,
      // 分页
      page1: {
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
    };
  },
  created() {
    this.circleValue();
  },
  methods: {
    // 读取圈子列表
    circleValue() {
      postD(this.url.getListInterface).then((res) => {
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
    forum_countClick() {
      alert("124");
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
    .buttonStyle {
      line-height: 48px;
      width: 170px;
      height: 48px;
      background: #3acbe9;
      box-shadow: 2px 5px 20px 1px rgba(58, 203, 233, 0.15);
      border-radius: 10px 10px 10px 10px;
      opacity: 1;
      cursor: pointer;
      p {
        font-size: 14px;
        font-weight: 500;
        color: #ffffff;
      }
    }
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
</style>