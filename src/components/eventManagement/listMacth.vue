<template>
  <div class="backColor">
    <macth-seatch v-show="seatchShow" @macthSeatch="costPlannedAmountChange" />
    <div class="firstColor">
      <div>
        <add-macth />
      </div>
      <div style="padding-left: 20px">
        <el-button type="danger" plain @click="macthDels">批量删除</el-button>
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
        @checkbox-change="checkboxChangeEvent"
        @checkbox-all="checkboxChangeEvent"
      >
        <vxe-column
          align="center"
          type="checkbox"
          width="50"
          class="linker"
        ></vxe-column>
        <vxe-column width="50" align="center">
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
        <vxe-column field="username" title="用户名" align="center"></vxe-column>
        <vxe-column field="nickname" title="昵称" align="center"></vxe-column>
        <vxe-column field="title" title="赛事主题" align="center"></vxe-column>\
        <vxe-column width="50" align="center">
          <template v-slot="scoped">
            <el-image
              :src="imagesValue + scoped.row.poster"
              alt=""
              :preview-src-list="[imagesValue + scoped.row.poster]"
              style="width: 40px; height: 40px"
              class="imgStyles"
            />
          </template>
        </vxe-column>
        <vxe-column
          title="审核状态"
          width="120"
          align="center"
          show-overflow="ellipsis"
        >
          <template v-slot="scoped">
            <div>
              <div
                :class="{
                  green: scoped.row.status === 1,
                  yellow: scoped.row.status == 0,
                  red: scoped.row.status === 2,
                  blue: scoped.row.status === 3,
                }"
              >
                {{ filterStatus(scoped.row.status) }}
              </div>
            </div>
          </template>
        </vxe-column>
        <vxe-column field="is_open" title="开关" align="center" width="70">
          <template v-slot="scoped">
            <el-switch
              v-model="scoped.row.is_open"
              active-color="#13ce66"
              @change="is_openChaged(scoped.row)"
              :active-value="1"
              :inactive-value="0"
            ></el-switch>
          </template>
        </vxe-column>
        <vxe-column
          field="sign_time"
          title="报名时间"
          align="center"
          width="145"
          show-overflow="title"
        ></vxe-column>
        <vxe-column
          field="exh_time"
          title="展示时间"
          align="center"
          width="145"
          show-overflow="title"
        ></vxe-column>
        <vxe-column
          field="browse"
          title="浏览量"
          align="center"
          width="75"
        ></vxe-column>
        <vxe-column
          field="create_time"
          title="创建时间"
          align="center"
          width="145"
          show-overflow="title"
        ></vxe-column>
        <vxe-column title="操作" align="center">
          <template v-slot="scoped">
            <div class="postDyex">
              <div class="postDyexer">
                <el-button type="success" @click="detailsValue(scoped.row)"
                  >详情</el-button
                >
              </div>
              <div class="postDyexer">
                <el-button type="primary" @click="showEditAddmodify(scoped.row)"
                  >修改</el-button
                >
              </div>
              <div class="postDyexer">
                <el-button type="danger" @click="oneCompany(scoped.row)"
                  >删除</el-button
                >
              </div>
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
    <el-dialog title="详情" v-model="dialogShow" width="70%">
      <el-descriptions direction="vertical" :column="5" border>
        <el-descriptions-item label="用户名" align="center">{{
          detailsValues.username
        }}</el-descriptions-item>
        <el-descriptions-item label="昵称" align="center">{{
          detailsValues.nickname
        }}</el-descriptions-item>
        <el-descriptions-item label="头像" align="center">
          <el-image
            :src="imagesValue + detailsValues.headimage"
            :preview-src-list="[imagesValue + detailsValues.headimage]"
            style="width: 40px; height: 40px"
            class="stylecss"
          />
        </el-descriptions-item>
        <el-descriptions-item label="赛事主题" align="center">{{
          detailsValues.title
        }}</el-descriptions-item>
        <el-descriptions-item label="征集类别" align="center">{{
          detailsValues.category
        }}</el-descriptions-item>
        <el-descriptions-item label="赛事简介" align="center">{{
          detailsValues.description
        }}</el-descriptions-item>
        <el-descriptions-item label="赛事机构" align="center">{{
          detailsValues.mechanism
        }}</el-descriptions-item>
        <el-descriptions-item label="海报" align="center">
          <el-image
            :src="imagesValue + detailsValues.poster"
            :preview-src-list="[imagesValue + detailsValues.poster]"
            style="width: 40px; height: 40px"
            class="stylecss"
          />
        </el-descriptions-item>

        <el-descriptions-item label="报名时间" align="center">{{
          detailsValues.sign_time
        }}</el-descriptions-item>
        <el-descriptions-item label="展示时间" align="center">{{
          detailsValues.exh_time
        }}</el-descriptions-item>

        <el-descriptions-item label="奖项" align="center">
          <div v-for="(item, index) in detial" :key="index">
            奖项:{{ item.name }}个数: {{ item.amount }}奖品:{{ item.item }}
          </div>
        </el-descriptions-item>
        <el-descriptions-item label="创建时间" align="center">
          <div
            :class="{
              orange: detailsValues.status == 3,
              yellow: detailsValues.status == 0,
              green: detailsValues.status == 1,
              red: detailsValues.status === 2,
            }"
          >
            {{ filterStatus(detailsValues.status) }}
          </div>
        </el-descriptions-item>
        <el-descriptions-item label="详情（平台发布）" align="center">{{
          detailsValues.content
        }}</el-descriptions-item>
        <el-descriptions-item label="浏览量" align="center">{{
          detailsValues.browse
        }}</el-descriptions-item>
        <el-descriptions-item label="创建时间" align="center">{{
          detailsValues.create_time
        }}</el-descriptions-item>
      </el-descriptions>
      <span>
        <el-button @click="dialogShow = false">取 消</el-button>
        <el-button type="primary" @click="dialogShow = false">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="修改"
      v-model="dialogEditMatch"
      width="70%"
      :destroy-on-close="true"
    >
      <el-form
        :model="editFrom"
        :rules="editFromRules"
        ref="editFromref"
        label-width="100px"
      >
        <el-form-item label="赛事主题" prop="title">
          <el-input v-model="editFrom.title"></el-input>
        </el-form-item>
        <el-form-item label="征集类别" prop="category">
          <el-input v-model="editFrom.category"></el-input>
        </el-form-item>
        <el-form-item label="赛事简介" prop="description">
          <el-input v-model="editFrom.description"></el-input>
        </el-form-item>
        <el-form-item label="赛事机构" prop="mechanism">
          <el-input v-model="editFrom.mechanism"></el-input>
        </el-form-item>
        <el-form-item label="报名时间" prop="sign_time">
          <el-date-picker
            v-model="editFrom.exh_time"
            type="datetime"
            placeholder="选择报名时间"
            @change="getTimes"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="展示时间" prop="exh_time">
          <el-date-picker
            v-model="editFrom.exh_time"
            type="datetime"
            placeholder="选择展示时间"
            @change="gitTimes"
          >
          </el-date-picker>
        </el-form-item>

        <el-form-item label="海报" prop="poster">
          <el-upload
            class="avatar-uploader"
            action="http://weisou.chengduziyi.com/admin/Uploads/uploadFile"
            :show-file-list="false"
            :on-success="handposter"
            :before-upload="beforeAvatarUpload"
            :data="{ fileType: this.fileType }"
          >
            <img
              v-if="editFrom.poster"
              :src="imagesValue + editFrom.poster"
              class="avatar"
              :v-model="editFrom.poster"
            />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="封面图" prop="thumb">
          <el-upload
            class="avatar-uploader"
            action="http://weisou.chengduziyi.com/admin/Uploads/uploadFile"
            :show-file-list="false"
            :on-success="handlthumb"
            :before-upload="beforeAvatarUploadthumb"
            :data="{ fileType: this.fileType }"
          >
            <img
              v-if="editFrom.thumb"
              :src="imagesValue + editFrom.thumb"
              class="avatar"
              :v-model="editFrom.thumb"
            />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <!-- 后期改 -->
        <el-form-item label="赛事详情内容" prop="content" style="width: 70%">
          <el-input type="textarea" v-model="editFrom.content"></el-input>
        </el-form-item>
        <div v-for="(item, index) in editFrom.prize" :key="index">
          <el-form-item label="活动奖品" prop="prize" style="width: 100%">
            <p>奖项名称:</p>
            <el-input v-model="item.name" style="width: 15%"></el-input>
            <p>数量:</p>
            <el-input v-model="item.amount" style="width: 15%"></el-input>
            <p>奖品:</p>
            <el-input v-model="item.item" style="width: 15%"></el-input>
            <p class="addInput" @click="addInputHandle" v-if="index === 0">
              <img src="../../assets/lovig/jiahao.png" alt="" />
            </p>
            <p class="addInput" v-else @click="delInputHandle(index)">
              <img src="../../assets/lovig/jianhao.png" alt="" />
            </p>
          </el-form-item>
        </div>
      </el-form>
      <span>
        <el-button @click="dialogEditMatch = false">取 消</el-button>
        <el-button type="primary" @click="dialogEditMatchs">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import macthSeatch from "./macthSeatch/macthSeatch.vue";
import { postD } from "../../api/index.js";
import {
  styleModify,
  styleModifytwo,
  imgUrl,
  beforeAvatar,
} from "../../assets/js/modifyStyle.js";
import { timestampToTime } from "../../assets/js/time.js";
import AddMacth from './macthSeatch/addMacth.vue';
export default {
  provide() {
    return {
      MacthValue: this.MacthValue,
    };
  },
  components: {
    macthSeatch,
    AddMacth,
  },
  data() {
    return {
      imagesValue: "",
      seatchShow: false,
      allAlign: null,
      tableData: [],
      url: {
        listMacthInterface: "match/listMacth",
        adminSelectDelMatchInterface: "Match/adminSelectDelMatch",
        delMatchInterface: "Match/delMatch",
        editMatchInterface: "match/editMatch",
        releaseInterface: "match/release",
        showMatchInterface: "match/showMatch",
      },
      listMacth: {
        id: "",
        is_open: "",
      },
      // 批量删除
      ids: [],
      //选中时将对象保存到arrs中
      arrs: [],
      macthDelsValues: {
        id: "",
      },
      // 单个删除
      oneCompanyvalue: {
        id: "",
      },
      // 分页
      page1: {
        offset: 1,
        limit: 10,
        totalResult: 0,
      },
      fileType: "images",
      // x修改图片
      imageUrlEdit: "",
      imageUrlthumbEdit: "",
      // 详情
      dialogShow: false,
      detailsId: {
        id: "",
      },
      detailsValues: [],
      detial: "",
      // 编辑
      dialogEditMatch: false,
      editFrom: {
        title: "",
        category: "",
        description: "",
        mechanism: "",
        poster: "",
        sign_time: "",
        exh_time: "",
        prize: "",
        content: "",
        thumb: "",
        id: "",
      },
      sign_timeTimes: "",
      exh_timeTimes: "",
      editFromRules: {
        title: [
          {
            required: true,
            message: "请输入赛事主题",
            tirgger: "blur",
          },
        ],
        category: [
          {
            required: true,
            message: "请输入征集类别",
            tirgger: "blur",
          },
        ],
        poster: [
          {
            required: true,
            message: "请输入海报",
            tirgger: "blur",
          },
        ],
        description: [
          {
            required: true,
            message: "请输入赛事简介",
            tirgger: "blur",
          },
        ],
        mechanism: [
          {
            required: true,
            message: "请输入赛事机构",
            tirgger: "blur",
          },
        ],
        thumb: [
          {
            required: true,
            message: "请输入封面图",
            tirgger: "blur",
          },
        ],
        sign_time: [
          {
            required: true,
            message: "请输入报名时间",
            tirgger: "blur",
          },
        ],
        exh_time: [
          {
            required: true,
            message: "请输入展示时间",
            tirgger: "blur",
          },
        ],
      },
    };
  },
  created() {
    this.MacthValue();
  },
  methods: {
    MacthValue() {
      postD(this.url.listMacthInterface).then((res) => {
        this.tableData = res.list;
        this.page1.totalResult = res.count;
        this.imagesValue = imgUrl();
      });
    },
    // 分页
    handlePageChange({ currentPage, pageSize }) {
      this.page1.offset = currentPage;
      this.page1.limit = pageSize;
      this.MacthValue();
    },
    filterStatus(val) {
      if (val === 0) {
        return "等待平台审核";
      } else if (val === 1) {
        return "平台通过";
      } else if (val === 2) {
        return "驳回";
      } else if (val == 3) {
        return "结束";
      }
    },
    // 开关
    is_openChaged(data) {
      this.listMacth.is_open = data.is_open;
      this.listMacth.id = data.id;
      postD(this.url.editMatchInterface, this.listMacth).then((res) => {
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
      });
    },
    // 批量删除
    checkboxChangeEvent(data) {
      this.arrs = data.records;
    },
    async macthDels() {
      const macthDelsValue = await this.$confirm(
        "此操作将永久删除管理, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);
      if (macthDelsValue !== "confirm") {
        return this.$message.info("取消删除");
      }
      if (macthDelsValue === "confirm") {
        this.arrs.forEach((v) => {
          this.ids.push(v.id);
        });
        this.macthDelsValues.id = this.ids.toString();
        postD(this.url.adminSelectDelMatchInterface, this.macthDelsValues).then(
          (res) => {
            if (res.code == "200") {
              this.$message.success("状态修改成功");
              this.MacthValue();
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
    // 单个删除
    async oneCompany(data) {
      const oneCompanyList = await this.$confirm(
        "此操作将永久删除, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);
      if (oneCompanyList !== "confirm") {
        return this.$message.info("取消删除");
      }
      if (oneCompanyList === "confirm") {
        this.oneCompanyvalue.id = data.id;
        postD(this.url.delMatchInterface, this.oneCompanyvalue).then((res) => {
          if (res.code == "200") {
            this.$message.success("状态修改成功");
            this.MacthValue();
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
    addInputHandle() {
      this.addMacthValue.prize.push({ name: "", amount: "", item: "" });
    },
    delInputHandle(index) {
      this.addMacthValue.prize.splice(index, 1);
    },
    getTimes(date) {
      this.sign_timeTimes = date;
      this.editFrom.sign_time = timestampToTime(this.sign_timeTimes / 1000);
    },
    gitTimes(date) {
      this.exh_timeTimes = date;
      this.editFrom.exh_time = timestampToTime(this.exh_timeTimes / 1000);
    },
    // 海报
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      this.addMacthValue.poster = res.url;
    },
    handposter(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      this.editFrom.poster = res.url;
    },
    beforeAvatarUpload(file) {
      beforeAvatar(file);
    },
    handlthumb(res, file) {
      this.imageUrlthumb = URL.createObjectURL(file.raw);
      this.editFrom.thumb = res.url;
    },
    beforeAvatarUploadthumb(file) {
      beforeAvatar(file);
    },
    tableRowStyle() {
     return styleModify();
    },
    tableStyle() {
     return styleModifytwo();
    },
    showCont() {
      this.seatchShow = !this.seatchShow;
      this.$refs.btn1.$el.innerText;
    },
    async costPlannedAmountChange(param1) {
      this.tableData = param1;
    },
    showEditAddmodify(data) {
      this.editFrom.id = data.id;
      this.dialogEditMatch = true;
      postD(this.url.showMatchInterface, this.editFrom).then((res) => {
        this.editFrom.title = res.data.title;
        this.editFrom.category = res.data.category;
        this.editFrom.description = res.data.description;
        this.editFrom.mechanism = res.data.mechanism;
        this.editFrom.poster = res.data.poster;
        this.editFrom.sign_time = res.data.sign_time;
        this.editFrom.exh_time = res.data.exh_time;
        this.editFrom.prize = res.data.prize;
        this.editFrom.content = res.data.content;
        this.editFrom.thumb = res.data.thumb;
      });
    },
    dialogEditMatchs() {
      this.$refs.editFromref.validate((valid) => {
        if (!valid) return;
        postD(this.url.editMatchInterface, this.editFrom).then((res) => {
          if (res.code == "200") {
            this.$message.success("状态修改成功");
            this.MacthValue();
            this.dialogEditMatch = false;
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
      });
    },
    // 详情
    detailsValue(data) {
      this.detailsId.id = data.id;
      this.dialogShow = true;
      postD(this.url.showMatchInterface, this.detailsId).then((res) => {
        this.detailsValues = res.data;
        this.detial = res.data.prize;
      });
    },
    filterStatus(val) {
      if (val === 0) {
        return "等待平台审核";
      } else if (val === 1) {
        return "平台通过";
      } else if (val === 2) {
        return "驳回";
      } else if (val === 3) {
        return "结束";
      }
    },
  },
};
</script>
<style lang="less" scoped>
.contentRight {
  padding-left: 86.5%;
}
.postDyex {
  display: flex;
  justify-content: center;
  align-items: flex-end;
}
.postDyexer {
  padding: 0 5px;
}
.el-form {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-left: 50px;
  margin-right: 50px;
  .el-form-item {
    width: 45%;
    p {
      font-size: 12px;
    }
  }
}
/deep/ .el-date-editor {
  position: relative;
  .el-input__prefix {
    display: none;
  }
}
.stylecss {
  margin-left: -19px;
  margin-top: -8px;
  position: absolute;
}
.addInput {
  line-height: 10px;
}
</style>