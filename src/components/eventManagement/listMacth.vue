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
        <el-button @click="Refresh">刷新</el-button>
        <el-button type="info" plain ref="btn1" @click="showCont($event)"
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
        <vxe-column field="title" title="赛事主题" align="center"></vxe-column>
        <vxe-column width="50" align="center" title="海报">
          <template v-slot="scoped">
            <el-image
              :src="imagesValue + scoped.row.poster"
              alt=""
              :preview-src-list="[imagesValue + scoped.row.poster]"
              style="width: 40px; height: 40px"
              class="imgStyleser"
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
            <div @click="companySetStatus(scoped.row)">
              <div
                class="clickHeader"
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
            <div
              @click="Reject(scoped.row)"
              style="color: #79bbff; cursor: pointer; font-size: 12px"
              v-if="scoped.row.status == 2"
            >
              驳回原因
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
        <vxe-column title="冠名" align="center" width="75">
          <template v-slot="scoped">
            <el-button type="primary" @click="TitleList(scoped.row)"
              >冠名列表</el-button
            >
          </template>
        </vxe-column>
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
        <el-descriptions-item label="id" align="center">{{
          detailsValues.id
        }}</el-descriptions-item>
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
          />
        </el-descriptions-item>
        <el-descriptions-item label="赛事主题" align="center">{{
          detailsValues.title
        }}</el-descriptions-item>
        <el-descriptions-item label="赛事介绍" align="center">{{
          detailsValues.description
        }}</el-descriptions-item>
        <el-descriptions-item label="海报" align="center">
          <el-image
            :src="imagesValue + detailsValues.poster"
            :preview-src-list="[imagesValue + detailsValues.poster]"
            style="width: 40px; height: 40px"
          />
        </el-descriptions-item>
        <el-descriptions-item label="报名开始时间" align="center">{{
          detailsValues.sign_start_time
        }}</el-descriptions-item>
        <el-descriptions-item label="报名结束时间" align="center">{{
          detailsValues.sign_end_time
        }}</el-descriptions-item>
        <el-descriptions-item label="评选开始时间" align="center">{{
          detailsValues.voto_start_time
        }}</el-descriptions-item>
        <el-descriptions-item label="评选结束时间" align="center">{{
          detailsValues.voto_end_time
        }}</el-descriptions-item>
        <el-descriptions-item label="公示开始时间" align="center">{{
          detailsValues.exh_start_time
        }}</el-descriptions-item>
        <el-descriptions-item label="公示结束时间" align="center">{{
          detailsValues.exh_end_time
        }}</el-descriptions-item>

        <el-descriptions-item label="评选规则" align="center">{{
          detailsValues.rule
        }}</el-descriptions-item>
        <el-descriptions-item label="设计说明" align="center">{{
          detailsValues.explain
        }}</el-descriptions-item>
        <el-descriptions-item label="参赛须知" align="center">{{
          detailsValues.entry_info
        }}</el-descriptions-item>
        <el-descriptions-item label="获奖通知" align="center">{{
          detailsValues.notice
        }}</el-descriptions-item>
        <el-descriptions-item label="奖项" align="center">
          <div v-for="(item, index) in detial" :key="index">
            奖项:{{ item.name }}个数: {{ item.amount }}奖品:{{ item.item }}
          </div>
        </el-descriptions-item>
        <el-descriptions-item label="规则" align="center">
          <div v-for="(item, index) in standardDetial" :key="index">
            评选规则:{{ item.title }}评选规则的描述: {{ item.description }}
          </div>
        </el-descriptions-item>
        <el-descriptions-item label="平台审核" align="center">
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
      <div style="padding-top: 15px">
        <span>
          <el-button @click="dialogShow = false">取 消</el-button>
          <el-button type="primary" @click="dialogShow = false"
            >确 定</el-button
          >
        </span>
      </div>
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
        <el-form-item label="赛事简介" prop="description">
          <el-input v-model="editFrom.description"></el-input>
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
        <el-form-item label="报名开始时间" prop="sign_start_time">
          <el-date-picker
            v-model="editFrom.sign_start_time"
            type="datetime"
            placeholder="选择报名开始时间"
            @change="getTime"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="报名结束时间" prop="sign_end_time">
          <el-date-picker
            v-model="editFrom.sign_end_time"
            type="datetime"
            placeholder="选择报名结束时间"
            @change="gitTime"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="评选开始时间" prop="voto_start_time">
          <el-date-picker
            v-model="editFrom.voto_start_time"
            type="datetime"
            placeholder="选择评选开始时间"
            @change="gatTime"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="评选结束时间" prop="voto_end_time">
          <el-date-picker
            v-model="editFrom.voto_end_time"
            type="datetime"
            placeholder="选择评选结束时间"
            @change="gutTime"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="公示开始时间" prop="exh_start_time">
          <el-date-picker
            v-model="editFrom.exh_start_time"
            type="datetime"
            placeholder="选择公示开始时间"
            @change="gltTime"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="公示结束时间" prop="exh_end_time">
          <el-date-picker
            v-model="editFrom.exh_end_time"
            type="datetime"
            placeholder="选择公示结束时间"
            @change="gctTime"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="评选规则" prop="rule">
          <el-input v-model="editFrom.rule"></el-input>
        </el-form-item>
        <el-form-item label="设计说明" prop="explain">
          <el-input v-model="editFrom.explain"></el-input>
        </el-form-item>
        <el-form-item label="参赛须知" prop="entry_info">
          <el-input v-model="editFrom.entry_info"></el-input>
        </el-form-item>
        <el-form-item label="获奖通知" prop="notice">
          <el-input v-model="editFrom.notice"></el-input>
        </el-form-item>

        <!-- 后期改 -->

        <div v-for="(item, index) in editFrom.prize" :key="index">
          <el-form-item label="奖励" prop="prize" style="width: 100%">
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
        <div v-for="(item, index) in editFrom.standard" :key="index">
          <el-form-item label="评选标准" prop="standard" style="width: 100%">
            <p>评选规则:</p>
            <el-input v-model="item.title" style="width: 25%"></el-input>
            <p>评选规则的描述:</p>
            <el-input v-model="item.description" style="width: 25%"></el-input>
            <p class="addInput" @click="addStandard" v-if="index === 0">
              <img src="../../assets/lovig/jiahao.png" alt="" />
            </p>
            <p class="addInput" v-else @click="delStandard(index)">
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
    <el-dialog title="审核" v-model="SetStatus" width="50%">
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
          />
        </el-descriptions-item>
        <el-descriptions-item label="赛事主题" align="center">{{
          setDetilValue.title
        }}</el-descriptions-item>
        <el-descriptions-item label="赛事介绍" align="center">{{
          setDetilValue.description
        }}</el-descriptions-item>
        <el-descriptions-item label="海报" align="center">
          <el-image
            :src="imagesValue + setDetilValue.poster"
            :preview-src-list="[imagesValue + setDetilValue.poster]"
            style="width: 40px; height: 40px"
          />
        </el-descriptions-item>
        <el-descriptions-item label="报名开始时间" align="center">{{
          setDetilValue.sign_start_time
        }}</el-descriptions-item>
        <el-descriptions-item label="报名结束时间" align="center">{{
          setDetilValue.sign_end_time
        }}</el-descriptions-item>
        <el-descriptions-item label="评选开始时间" align="center">{{
          setDetilValue.voto_start_time
        }}</el-descriptions-item>
        <el-descriptions-item label="评选结束时间" align="center">{{
          setDetilValue.voto_end_time
        }}</el-descriptions-item>
        <el-descriptions-item label="公示开始时间" align="center">{{
          setDetilValue.exh_start_time
        }}</el-descriptions-item>
        <el-descriptions-item label="公示结束时间" align="center">{{
          setDetilValue.exh_end_time
        }}</el-descriptions-item>
        <el-descriptions-item label="评选规则" align="center">{{
          setDetilValue.rule
        }}</el-descriptions-item>
        <el-descriptions-item label="设计说明" align="center">{{
          setDetilValue.explain
        }}</el-descriptions-item>
        <el-descriptions-item label="参赛须知" align="center">{{
          setDetilValue.entry_info
        }}</el-descriptions-item>
        <el-descriptions-item label="获奖通知" align="center">{{
          setDetilValue.notice
        }}</el-descriptions-item>
        <el-descriptions-item label="奖项" align="center">
          <div v-for="(item, index) in detial" :key="index">
            奖项:{{ item.name }}个数: {{ item.amount }}奖品:{{ item.item }}
          </div>
        </el-descriptions-item>
        <el-descriptions-item label="规则" align="center">
          <div v-for="(item, index) in standardDetial" :key="index">
            评选规则:{{ item.title }}评选规则的描述: {{ item.description }}
          </div>
        </el-descriptions-item>
        <el-descriptions-item label="详情（平台发布）" align="center">{{
          setDetilValue.content
        }}</el-descriptions-item>
        <el-descriptions-item label="浏览量" align="center">{{
          setDetilValue.browse
        }}</el-descriptions-item>
        <el-descriptions-item label="创建时间" align="center">{{
          setDetilValue.create_time
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
        <el-radio :label="3">结束</el-radio>
      </el-radio-group>
      <div v-if="SetStatusRadio.status == 2">
        <el-input
          v-model="SetStatusRadio.reason"
          placeholder="请输入驳回原因"
        ></el-input>
        <!-- 驳回 -->
      </div>
      <div style="padding-top: 15px">
        <span>
          <el-button @click="SetStatus = false">取 消</el-button>
          <el-button type="primary" @click="SetStatusValue">确 定</el-button>
        </span>
      </div>
    </el-dialog>
    <el-dialog title="驳回原因" v-model="RejectShow" width="30%">
      <span>{{ RejectValue }}</span>
      <div style="padding-top: 15px">
        <span>
          <el-button @click="RejectShow = false">取 消</el-button>
        </span>
      </div>
    </el-dialog>
    <!-- 冠名 -->
    <el-dialog title="冠名列表" v-model="TitleShow" width="70%">
      <div style="display: flex">
        <el-button type="danger" plain @click="TitDels">批量删除</el-button>
      </div>
      <div>
        <vxe-table
          round
          border="true"
          ref="xTable1"
          :align="allAlign"
          :row-config="{ isHover: true }"
          :data="TitleListValue"
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
          <vxe-column field="nickname" title="昵称" align="center"></vxe-column>
          <vxe-column field="name" title="名字" align="center"></vxe-column>
          <vxe-column field="price" title="金额" align="center"></vxe-column>
          <vxe-column field="tel" title="电话" align="center"></vxe-column>
          <vxe-column title="冠名审核(操作)" align="center">
            <template v-slot="scoped">
              <div @click="titStatus(scoped.row)">
                <div class="clickHeader" style="color: red">
                  {{ fulstatus(scoped.row.status) }}
                </div>
              </div>
            </template>
          </vxe-column>
          <vxe-column title="操作" align="center">
            <template v-slot="scoped">
              <el-button type="danger" @click="oneTitledel(scoped.row)"
                >删除</el-button
              >
            </template>
          </vxe-column>
        </vxe-table>
      </div>
      <span>
        <el-button @click="TitleShow = false">返 回</el-button>
      </span>
    </el-dialog>

    <el-dialog title="冠名审核" v-model="TitleStShow" width="30%">
      <span>此操作将审核状态通过</span>
      <div>
        <el-radio-group
          v-model="titleStatus.status"
          class="SetStatusRadioStyle"
        >
          <el-radio :label="0">待通过</el-radio>
          <el-radio :label="1">已通过</el-radio>
        </el-radio-group>
      </div>
      <span>
        <el-button @click="TitleStShow = false">取 消</el-button>
        <el-button type="primary" @click="TitleStShowover">确 定</el-button>
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
import AddMacth from "./macthSeatch/addMacth.vue";
import {
  matchShowMatchApi,
  MatchDelMatchApi,
  matchListMacthApi,
  matchEditMatchApi,
  MatchAdminSelectDelMatchApi,
  matchAccessListApi,
  matchEditAccessApi,
  matchDelAccessApi,
} from "@/urls/matchUrl.js";
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
      seatchShow: true,
      allAlign: null,
      tableData: [],
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
        is_platform: null,
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
      standardDetial: "",
      // 编辑
      dialogEditMatch: false,
      editFrom: {
        id: "",
        title: "",
        description: "",
        thumb: "",
        poster: "",
        sign_start_time: "",
        sign_end_time: "",
        voto_start_time: "",
        voto_end_time: "",
        exh_start_time: "",
        exh_end_time: "",
        prize: [
          {
            name: "",
            amount: "",
            item: "",
          },
        ],
        standard: [
          {
            title: "",
            description: "",
          },
        ],
        rule: "",
        explain: "",
        entry_info: "",
        notice: "",
      },
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
      // 审核
      SetStatusRadio: {
        id: "",
        status: "",
        reason: "",
      },
      // 审核
      SetStatus: false,
      setDetilValue: [],
      RejectShow: false,
      RejectId: {
        id: "",
      },
      RejectValue: "",
      editFromDetil: {
        id: "",
      },
      // 冠名
      TitleShow: false,
      TitleListId: {
        match_id: "",
      },
      TitleListValue: [],
      TitleStShow: false,
      titleStatus: {
        access_id: "",
        status: "",
      },
      // 单个删除
      TitleDelOne: {
        id: "",
      },
      // 批量
      TitleDelsValues: {
        id: "",
      },
    };
  },
  created() {
    this.MacthValue();
  },
  methods: {
    // 冠名
    TitleList(value) {
      this.TitleShow = true;
      this.TitleListId.match_id = value.id;
      postD(matchAccessListApi(), this.TitleListId).then((res) => {
        this.TitleListValue = res.list;
      });
    },
    titStatus(value) {
      this.titleStatus.access_id = value.id;
      this.titleStatus.status = value.status;
      this.TitleStShow = true;
    },
    TitleStShowover() {
      postD(matchEditAccessApi(), this.titleStatus).then((res) => {
        if (res.code == "200") {
          this.$message.success("审核通过");
          this.TitleStShow = false;
          postD(matchAccessListApi(), this.TitleListId).then((res) => {
            this.TitleListValue = res.list;
          });
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
    async oneTitledel(val) {
      this.TitleDelOne.id = val.id.toString();
      console.log(this.TitleDelOne);
      const oneTitledelValue = await this.$confirm(
        "此操作将永久删除, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);
      if (oneTitledelValue !== "confirm") {
        return this.$message.info("取消删除");
      }
      if (oneTitledelValue === "confirm") {
        postD(matchDelAccessApi(), this.TitleDelOne).then((res) => {
          if (res.code == "200") {
            this.$message.success("删除成功");
            postD(matchAccessListApi(), this.TitleListId).then((res) => {
              this.TitleListValue = res.list;
            });
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
    // 冠名批量
    async TitDels() {
      const TitleDelValues = await this.$confirm(
        "此操作将永久删除管理, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);
      if (TitleDelValues !== "confirm") {
        return this.$message.info("取消删除");
      }
      if (TitleDelValues === "confirm") {
        this.arrs.forEach((v) => {
          this.ids.push(v.id);
        });
        this.TitleDelsValues.id = this.ids.toString();
        postD(matchDelAccessApi(), this.TitleDelsValues).then((res) => {
          if (res.code == "200") {
            this.$message.success("状态修改成功");
            postD(matchAccessListApi(), this.TitleListId).then((res) => {
              this.TitleListValue = res.list;
            });
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

    MacthValue() {
      postD(matchListMacthApi()).then((res) => {
        this.tableData = res.list;
        this.page1.totalResult = res.count;
        this.imagesValue = imgUrl();
      });
    },
    // 分页
    handlePageChange({ currentPage, pageSize }) {
      this.page1.offset = currentPage;
      this.page1.limit = pageSize;
      postD(matchListMacthApi(), this.page1).then((res) => {
        this.tableData = res.list;
        this.page1.totalResult = res.count;
      });
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
      postD(matchEditMatchApi(), this.listMacth).then((res) => {
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
        postD(MatchAdminSelectDelMatchApi(), this.macthDelsValues).then(
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
        postD(MatchDelMatchApi(), this.oneCompanyvalue).then((res) => {
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
      this.editFrom.prize.push({ name: "", amount: "", item: "" });
    },
    delInputHandle(index) {
      this.editFrom.prize.splice(index, 1);
    },
    addStandard() {
      this.editFrom.standard.push({ title: "", description: "" });
    },
    delStandard(index) {
      this.editFrom.standard.splice(index, 1);
    },
    getTime(date) {
      this.editFrom.sign_start_time = timestampToTime(date / 1000);
    },
    gitTime(date) {
      this.editFrom.sign_end_time = timestampToTime(date / 1000);
    },
    gatTime(date) {
      this.editFrom.voto_start_time = timestampToTime(date / 1000);
    },
    gutTime(date) {
      this.editFrom.voto_end_time = timestampToTime(date / 1000);
    },
    gltTime(date) {
      this.editFrom.exh_start_time = timestampToTime(date / 1000);
    },
    gctTime(date) {
      this.editFrom.exh_end_time = timestampToTime(date / 1000);
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
      this.tableData = param1.list;
      this.page1.totalResult = param1.count;
      this.page1.is_platform = param1.list[0].is_platform;
    },
    showEditAddmodify(data) {
      this.editFromDetil.id = data.id;
      this.dialogEditMatch = true;
      postD(matchShowMatchApi(), this.editFromDetil).then((res) => {
        this.editFrom.title = res.data.title;
        this.editFrom.description = res.data.description;
        this.editFrom.poster = res.data.poster;
        this.editFrom.prize = res.data.prize;
        this.editFrom.thumb = res.data.thumb;
        this.editFrom.sign_start_time = res.data.sign_start_time;
        this.editFrom.sign_end_time = res.data.sign_end_time;
        this.editFrom.voto_start_time = res.data.voto_start_time;
        this.editFrom.voto_end_time = res.data.voto_end_time;
        this.editFrom.exh_start_time = res.data.exh_start_time;
        this.editFrom.exh_end_time = res.data.exh_end_time;
        this.editFrom.standard = res.data.standard;
        this.editFrom.rule = res.data.rule;
        this.editFrom.explain = res.data.explain;
        this.editFrom.entry_info = res.data.entry_info;
        this.editFrom.notice = res.data.notice;
      });
    },
    dialogEditMatchs() {
      this.$refs.editFromref.validate((valid) => {
        if (!valid) return;
        this.editFrom.id = this.editFromDetil.id;
        postD(matchEditMatchApi(), this.editFrom).then((res) => {
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
      postD(matchShowMatchApi(), this.detailsId).then((res) => {
        console.log(res);
        this.detailsValues = res.data;
        this.detial = res.data.prize;
        this.standardDetial = res.data.standard;
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
    companySetStatus(data) {
      this.SetStatus = true;
      this.SetStatusRadio.id = data.id;
      this.SetStatusRadio.status = data.status;
      postD(matchShowMatchApi(), this.SetStatusRadio).then((res) => {
        this.setDetilValue = res.data;
      });
    },
    SetStatusValue() {
      postD(matchEditMatchApi(), this.SetStatusRadio).then((res) => {
        if (res.code == "200") {
          this.$message.success("状态修改成功");
          this.SetStatus = false;
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
    },
    Reject(data) {
      this.RejectShow = true;
      this.RejectId.id = data.id;
      postD(matchShowMatchApi(), this.RejectId).then((res) => {
        this.RejectValue = res.data.reason;
      });
    },
    Refresh() {
      this.page1.is_platform = null;
      this.MacthValue();
    },
    // 冠名审核
    fulstatus(val) {
      if (val == 0) {
        return "待通过";
      } else if (val == 1) {
        return "已通过";
      }
    },
  },
};
</script>
<style lang="less" scoped>
.contentRight {
  padding-left: 82.8%;
  display: flex;
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
.addInput {
  line-height: 10px;
}
.itemImgBody {
  width: 40px;
  float: left;
  .itemImg {
    width: 40px;
    .el-image {
      display: flex;
    }
  }
}
.SetStatusRadioStyle {
  padding-top: 15px;
}
</style>