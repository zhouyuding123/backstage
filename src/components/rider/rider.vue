<template>
  <div class="backColor">
    <seatch v-show="seatchShow" @SeatchAd="costPlannedAmountChange" />
    <div class="firstColor">
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
        <vxe-column field="id" title="id" align="center"> </vxe-column>
        <vxe-column field="in_code" title="邀请码" align="center"> </vxe-column>
        <vxe-column title="头像" align="center">
          <template v-slot="scoped">
            <el-image
              style="
                width: 50px;
                height: 50px;
                border-radius: 50%;
                position: absolute;
                top: 0;
                left: 45%;
              "
              :src="imagesValue + scoped.row.headimage"
              :preview-src-list="[imagesValue + scoped.row.headimage]"
            >
            </el-image>
          </template>
        </vxe-column>
        <vxe-column field="name" title="名字" align="center"> </vxe-column>
        <vxe-column field="nickname" title="昵称" align="center"> </vxe-column>
        <vxe-column field="sex" title="性别" align="center">
          <template v-slot="scoped">
            <div>
              {{ full(scoped.row.sex) }}
            </div>
          </template>
        </vxe-column>
        <vxe-column field="tel" title="电话" align="center"> </vxe-column>
        <vxe-column title="审核" width="120" align="center">
          <template v-slot="scoped">
            <div @click="companySetStatus(scoped.row)">
              <div
                class="clickHeader"
                :class="{
                  green: scoped.row.auth === 2,
                  yellow: scoped.row.auth == 1,
                  red: scoped.row.auth === 3,
                }"
              >
                {{ filterAuth(scoped.row.auth) }}
              </div>
            </div>
          </template>
        </vxe-column>
        <vxe-column field="status" title="开关" width="100px" align="center">
          <template v-slot="scoped">
            <div>
              <el-switch
                v-model="scoped.row.status"
                active-color="#13ce66"
                inactive-color="#ff4949"
                @change="statuschange(scoped.row)"
                :active-value="1"
                :inactive-value="0"
              >
              </el-switch>
            </div>
          </template>
        </vxe-column>
        <vxe-column
          field="create_time"
          title="创建时间"
          align="center"
          width="200px"
        >
        </vxe-column>
        <vxe-column title="操作" align="center">
          <template v-slot="scoped">
            <div class="postDyex">
              <el-button type="danger" @click="adDel(scoped.row)"
                >删除</el-button
              >
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
    <el-dialog v-model="SetStatus" width="60%">
      <el-descriptions direction="vertical" :column="5" border>
        <el-descriptions-item label="用户名" align="center">{{
          setDetilValue.username
        }}</el-descriptions-item>
        <el-descriptions-item label="名字" align="center">{{
          setDetilValue.name
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
        <el-descriptions-item label="身份证号码" align="center">{{
          setDetilValue.card_no
        }}</el-descriptions-item>
        <el-descriptions-item label="身份证正面" align="center">
          <el-image
            :src="imagesValue + setDetilValue.card_z"
            :preview-src-list="[imagesValue + setDetilValue.card_z]"
            style="width: 40px; height: 40px"
            class="stylecss"
          />
        </el-descriptions-item>
        <el-descriptions-item label="身份证反面" align="center">
          <el-image
            :src="imagesValue + setDetilValue.card_f"
            :preview-src-list="[imagesValue + setDetilValue.card_f]"
            style="width: 40px; height: 40px"
            class="stylecss"
          />
        </el-descriptions-item>
        <el-descriptions-item label="电话" align="center">{{
          setDetilValue.tel
        }}</el-descriptions-item>
        <el-descriptions-item label="单位" align="center">{{
         fullstyle(setDetilValue.style) 
        }}</el-descriptions-item>
        <el-descriptions-item label="营业执照" align="center" v-if="setDetilValue.style==2">
          <el-image
            :src="imagesValue + setDetilValue.license"
            :preview-src-list="[imagesValue + setDetilValue.license]"
            style="width: 40px; height: 40px"
            class="stylecss"
          />
        </el-descriptions-item>
        <el-descriptions-item label="性别" align="center">{{
         full(setDetilValue.sex) 
        }}</el-descriptions-item>
        <el-descriptions-item label="邀请码" align="center">{{
          setDetilValue.in_code
        }}</el-descriptions-item>
        <el-descriptions-item label="认证" align="center">
          <div
            :class="{
              green: setDetilValue.auth === 2,
              yellow: setDetilValue.auth == 1,
              red: setDetilValue.auth === 3,
            }"
          >
            {{ filterAuth(setDetilValue.auth) }}
          </div>
        </el-descriptions-item>
        <el-descriptions-item label="创建时间" align="center">{{
          setDetilValue.create_time
        }}</el-descriptions-item>
        <el-descriptions-item label="更新时间" align="center">{{
          setDetilValue.update_time
        }}</el-descriptions-item>
        <el-descriptions-item label="简介" align="center">{{
          setDetilValue.auth_description
        }}</el-descriptions-item>
        
      </el-descriptions>
      <div style="padding-top: 15px">请选择</div>
      <el-radio-group v-model="SetStatusRadio.auth" class="SetStatusRadioStyle">
        <el-radio :label="1">已认证待审核</el-radio>
        <el-radio :label="2">审核通过</el-radio>
        <el-radio :label="3">审核不通过</el-radio>
      </el-radio-group>
      <div v-if="SetStatusRadio.auth == 3">
        <el-input
          type="textarea"
          :rows="2"
          placeholder="请输入内容"
          v-model="SetStatusRadio.description"
        >
        </el-input>
      </div>
      <div style="padding-top: 15px">
        <span>
          <el-button @click="SetStatus = false">取 消</el-button>
          <el-button type="primary" @click="SetStatusValue">确 定</el-button>
        </span>
      </div>
    </el-dialog>
  </div>
</template>


<script>
import seatch from "./seatch/seatch.vue";
import {
  riderIndexApi,
  riderEditStatApi,
  riderDelApi,
  riderSelectDelApi,
  riderSetAuthApi,
  riderAuthRiderApi,
} from "@/urls/rider.js";
import { postD } from "@/api";
import {
  styleModify,
  styleModifytwo,
  imgUrl,
} from "@/assets/js/modifyStyle.js";
export default {
  components: { seatch },
  provide() {
    return {
      riderlist: this.riderlist,
    };
  },
  data() {
    return {
      imagesValue: "",
      tableData: [],
      allAlign: null,
      seatchShow: true,
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
      // 分页
      page1: {
        offset: 1,
        limit: 10,
        totalResult: 0,
      },
      //   认证
      SetStatus: false,
      SetStatusRadio: {
        id: "",
        auth: "",
        description: "",
      },
      setDetilValue: [],
    };
  },
  created() {
    this.riderlist();
    this.imagesValue = imgUrl();
  },
  methods: {
    showCont() {
      this.seatchShow = !this.seatchShow;
      this.$refs.btn1.$el.innerText;
    },
    tableRowStyle() {
      return styleModify();
    },
    tableStyle() {
      return styleModifytwo();
    },
    // 批量删除
    checkboxChangeEvent(data) {
      this.arrs = data.records;
    },
    riderlist() {
      postD(riderIndexApi()).then((res) => {
        this.tableData = res.data;
        this.page1.totalResult = res.count;
      });
    },
    handlePageChangeActivity({ currentPage, pageSize }) {
      this.page1.offset = currentPage;
      this.page1.limit = pageSize;
      postD(riderIndexApi(), this.page1).then((res) => {
        this.tableData = res.data;
        this.page1.totalResult = res.count;
      });
    },
    full(val) {
      if (val == 1) {
        return "男";
      } else {
        return "女";
      }
    },
    statuschange(val) {
      var edit = {
        id: val.id,
        status: val.status,
      };
      postD(riderEditStatApi(), edit).then((res) => {
        if (res.code == "200") {
          this.$message.success("状态修改成功");
          this.logslist();
        } else {
          this.$message.error(res.msg);
        }
      });
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
        postD(riderSelectDelApi(), this.adDelsValues).then((res) => {
          if (res.code == "200") {
            this.$message.success("删除成功");
            this.riderlist();
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
        postD(riderDelApi(), this.DelId).then((res) => {
          if (res.code == "200") {
            this.$message.success("删除成功");
            this.riderlist();
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
    async costPlannedAmountChange(param1) {
      this.tableData = param1.data;
      this.page1.totalResult = param1.count;
    },
    filterAuth(val) {
      if (val == 1) {
        return "已认证待审核";
      } else if (val == 2) {
        return "审核通过";
      } else if (val == 3) {
        return "审核不通过";
      } else if (val === 0) {
        return "待认证";
      }
    },
    SetStatusValue() {
      postD(riderSetAuthApi(), this.SetStatusRadio).then((res) => {
        if (res.code == "200") {
          this.$message.success("状态修改成功");
          this.SetStatus = false;
          this.riderlist();
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
    companySetStatus(data) {
      this.SetStatus = true;
      var idser = {
        id: data.id,
      };
      postD(riderAuthRiderApi(), idser).then((res) => {
        console.log(res.data);
        this.setDetilValue =res.data;
      });
    },
    fullstyle(val) {
        if(val==1){
            return "个人"
        }else {
 return "企业"
        }
    },
  },
};
</script>