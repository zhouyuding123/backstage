<template>
  <div class="backColor">
    <forum-seatch @change="costPlannedAmountChange" />
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
      >
        <vxe-column align="center" type="checkbox" width="50"></vxe-column>
        <vxe-column
          field="username"
          title="username"
          align="center"
        ></vxe-column>
        <vxe-column
          field="nickname"
          title="nickname"
          align="center"
        ></vxe-column>
        <vxe-column
          field="circle"
          title="圈子"
          width="150"
          align="center"
        ></vxe-column>
        <vxe-column
          field="title"
          title="标题"
          width="140"
          align="center"
        ></vxe-column>
        <vxe-column
          field="content"
          title="内容"
          align="center"
          show-overflow="tooltip"
        >
        </vxe-column>
        <vxe-column title="可见" align="center" width="80">
          <template v-slot="scoped">
            <div
              :class="{
                green: scoped.row.style == 2,
                yellow: scoped.row.style == 1,
              }"
            >
              {{ filterStyle(scoped.row) }}
            </div>
          </template>
        </vxe-column>
        <vxe-column title="是否投票帖子" align="center" width="110">
          <template v-slot="scoped">
            <div
              :class="{
                green: scoped.row.is_voto == 1,
                red: scoped.row.is_voto == 0,
              }"
            >
              {{ filterIs_voto(scoped.row.is_voto) }}
            </div>
          </template>
        </vxe-column>
        <vxe-column
          field="status"
          title="论坛状态开关"
          align="center"
          width="110"
        >
          <template v-slot="scoped">
            <el-switch
              v-model="scoped.row.status"
              active-color="#13ce66"
              @change="circleStatys(scoped.row)"
              :active-value="1"
              :inactive-value="2"
            ></el-switch>
          </template>
        </vxe-column>
        <vxe-column
          field="browse"
          title="浏览量"
          align="center"
          width="70"
        ></vxe-column>
        <vxe-column
          field="create_time"
          title="创建时间"
          align="center"
          width="150"
        ></vxe-column>
        <vxe-column
          field="update_time"
          title="结束时间"
          align="center"
          width="150"
        ></vxe-column>
        <vxe-column title="操作" align="center" width="180">
          <template v-slot="forum">
            <el-row>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <el-button type="primary" @click="forumDetails(forum.row)"
                >详情</el-button
              >
              <el-button type="danger" @click="forumDle(forum.row)"
                >删除</el-button
              >
            </el-row>
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
    <el-dialog
      title="提示"
      v-model="forumDetailsShow"
      width="70%"
      :destroy-on-close="true"
    >
      <el-descriptions direction="vertical" :column="6" border>
        <el-descriptions-item label="id" align="center">{{
          forumDetailsValue.id
        }}</el-descriptions-item>
        <el-descriptions-item label="圈子ID" align="center">{{
          forumDetailsValue.circle_id
        }}</el-descriptions-item>
        <el-descriptions-item label="标题" align="center">{{
          forumDetailsValue.title
        }}</el-descriptions-item>
        <el-descriptions-item label="缩略图" align="center">
          <el-image
            :src="imagesValue + forumDetailsValue.thumb"
            style="width: 40px; height: 40px"
          >
          </el-image>
        </el-descriptions-item>
        <el-descriptions-item label="描述" align="center">{{
          forumDetailsValue.description
        }}</el-descriptions-item>
        <el-descriptions-item label="内容" align="center">{{
          forumDetailsValue.content
        }}</el-descriptions-item>
        <el-descriptions-item label="地址" align="center">{{
          forumDetailsValue.details
        }}</el-descriptions-item>
        <el-descriptions-item label="城市" align="center">{{
          forumDetailsValue.city
        }}</el-descriptions-item>
        <el-descriptions-item label="经度" align="center">{{
          forumDetailsValue.lat
        }}</el-descriptions-item>
        <el-descriptions-item label="纬度" align="center">{{
          forumDetailsValue.lng
        }}</el-descriptions-item>
        <el-descriptions-item label="style" align="center">
          <div
            :class="{
              green: forumDetailsValue.style == 2,
              yellow: forumDetailsValue.style == 1,
            }"
          >
            {{ filterStyles(forumDetailsValue) }}
          </div>
        </el-descriptions-item>

        <el-descriptions-item label="浏览量" align="center">{{
          forumDetailsValue.browse
        }}</el-descriptions-item>
        <el-descriptions-item label="创建时间" align="center">{{
          forumDetailsValue.create_time
        }}</el-descriptions-item>
        <el-descriptions-item label="更新时间" align="center">{{
          forumDetailsValue.update_time
        }}</el-descriptions-item>
        <el-descriptions-item label="投票开始时间" align="center">{{
          forumDetailsValue.voto_start_time
        }}</el-descriptions-item>
        <el-descriptions-item label="投票结束时间" align="center">{{
          forumDetailsValue.voto_end_time
        }}</el-descriptions-item>
        <el-descriptions-item label="投票方式" align="center">
          <div
            :class="{
              orange: forumDetailsValue.method == 1,
              yellow: forumDetailsValue.method == 2,
              green: forumDetailsValue.method == 3,
              blue: forumDetailsValue.method == 4,
              blueqing: forumDetailsValue.method == 5,
            }"
          >
            {{ filterMethod(forumDetailsValue.method) }}
          </div>
        </el-descriptions-item>
        <el-descriptions-item label="评论条数" align="center">{{
          forumDetailsValue.comment_count
        }}</el-descriptions-item>
      </el-descriptions>

      <div class="long" v-if="show">
        <div class="DetailBody">
          <div>
            <div class="DetailImage">
              <div class="Detailel-image">
                <el-image
                  :src="imagesValue + forumDetailsValue.headimage"
                ></el-image>
              </div>
              <div class="DetailelName">
                <a>{{ forumDetailsValue.nickname }}</a>
              </div>
              <div class="DetailelTime">
                <p>
                  {{
                    new Date(
                      new Date(forumDetailsValue.voto_start_time).valueOf() /
                        1000
                    )
                      .toTimeString()
                      .substr(0, 8)
                  }}
                </p>
              </div>
            </div>
            <div class="DetailValue">
              <div>
                <img src="../../assets/imgers/投票.png" alt="" />
              </div>
              <div class="DetailValueText">
                <p>投票 | {{ forumDetailsValue.title }}</p>
              </div>
            </div>
            <div class="DetailDetil">
              <p>
                {{ forumDetailsValue.content }}
              </p>
            </div>
            <div class="DetailOption">
              <div class="DetailOptionArror">
                <p>选哪个</p>
              </div>
              <div>
                <div class="DetailPhoper">
                  <p>{{ votoCountnum }}人参与</p>
                </div>
                <div v-if="imagesShows">
                  <div
                    class="DetailRadio"
                    v-for="item in forumDetailsValue.voto"
                    :key="item.id"
                  >
                    <div>
                      <el-radio-group
                        v-model="votoValue.id"
                        @change="changelabel"
                      >
                        <el-radio>{{ item.item }}</el-radio>
                      </el-radio-group>
                    </div>
                  </div>
                </div>
                <div class="placeOrder" v-if="imagesShow">
                  <el-radio-group v-model="votoValue.id" @change="changelabel">
                    <div
                      class="radioDiv"
                      v-for="item in forumDetailsValue.voto"
                      :key="item.id"
                    >
                      <el-image :src="imagesValue + item.item"></el-image>
                      <el-radio><div class="diemPost"></div></el-radio>
                    </div>
                  </el-radio-group>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <span class="dialog-footer">
        <el-button @click="forumDetailsShow = false">返回</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { postD } from "../../api/index.js";
import ForumSeatch from "./Forum/ForumSeatch.vue";
import { imgUrl } from "../../assets/js/modifyStyle.js";
export default {
  provide() {
    return {
      listForumValue: this.listForumValue,
    };
  },
  components: {
    ForumSeatch,
  },
  data() {
    return {
      imagesValue: "",
      page1: {
        offset: 1,
        limit: 10,
        totalResult: 0,
      },
      url: {
        ListForumInterface: "Circle/listForum",
        setForumStatInterface: "Circle/setForumStat",
        showForumInterface: "Circle/showForum",
      },
      allAlign: null,
      tableData: [],
      statusModelRadio: {
        id: "",
        status: "",
      },
      // 详情show
      forumDetailsShow: false,
      forumDetailsId: {
        id: "",
      },
      forumDetailsValue: [],
      votoValue: {
        id: "",
      },
      show: false,
      imagesShow: false,
      imagesShows: false,
      votoCount: [],
      votoCountnum: "",
      votoImages: [],
    };
  },
  created() {
    this.listForumValue();
  },
  methods: {
    tableRowStyle() {
      return "background: #FFFFFF;box-shadow: 0px 2px 5px 1px rgba(0, 0, 0, 0.05);border-radius: 10px 10px 10px 10px;opacity: 1;";
    },
    tableStyle() {
      return "box-shadow: 0px 2px 5px 1px rgba(0, 0, 0, 0.05);border-radius: 10px 10px 10px 10px;opacity: 1;";
    },
    listForumValue() {
      postD(this.url.ListForumInterface).then((res) => {
        this.tableData = res.list;
        this.page1.totalResult = res.count;
        this.imagesValue = imgUrl();
      });
    },
    handlePageChange({ currentPage, pageSize }) {
      this.page1.offset = currentPage;
      this.page1.limit = pageSize;
      this.listForumValue();
    },
    // 同城
    filterStyle(val) {
      if (val.style === 1) {
        return val.city;
      } else if (val.style === 2) {
        return "全国可见";
      }
    },
    filterStyles(val) {
      if (val.style === 1) {
        return val.city;
      } else if (val.style === 2) {
        return "全国可见";
      }
    },
    // 投票
    filterIs_voto(val) {
      if (val == 0) {
        return "不是";
      } else {
        return "是";
      }
    },
    // 状态
    circleStatys(data) {
      this.statusModelRadio.id = data.id.toString();
      this.statusModelRadio.status = data.status.toString();
      postD(this.url.setForumStatInterface, this.statusModelRadio).then(
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
    // 详情
    forumDetails(data) {
      this.forumDetailsShow = true;
      this.forumDetailsId.id = data.id;
      postD(this.url.showForumInterface, this.forumDetailsId).then((res) => {
        this.forumDetailsValue = res.data;
        this.votoValue = res.data.voto;
        this.votoValue.forEach((v) => {
          this.votoCount.push(v.count);
          this.votoImages = v.is_img;
          this.votoCountnum = eval(Object.values(this.votoCount).join("+"));
        });
        if (this.forumDetailsValue.is_voto === 1) {
          if (this.votoImages === 1) {
            this.imagesShow = true;
          } else if (this.votoImages === 0) {
            this.imagesShow = !true;
            this.imagesShows = true;
          }
          this.show = true;
        } else {
          this.show = false;
        }
      });
    },
    // 多选
    filterMethod(val) {
      if (val === 1) {
        return "单选";
      } else if (val === 2) {
        return "两项";
      } else if (val === 3) {
        return "三项";
      } else if (val === 4) {
        return "四项";
      } else if (val === 5) {
        return "五项";
      }
    },
    changelabel(va) {
      this.votoValue.id = va;
    },
    // 事件处理函数
    async costPlannedAmountChange(param1) {
      this.tableData = param1;
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

.forumDet {
  width: 50px;
}
.long {
  background-color: black;
  padding: 2% 0;
  width: 415px;
  margin: 20px auto;
}
.DetailBody {
  background-color: white;
  width: 375px;
  margin: 0 5%;

  .DetailImage {
    width: 100%;
    height: 54px;
    padding: 10px 20px;
    display: flex;
    .Detailel-image {
      .el-image {
        width: 32px;
        height: 32px;
        border-radius: 50%;
      }
    }
    .DetailelName {
      margin: 10px 0px 0px 10px;
    }
    .DetailelTime {
      flex: 1;
      text-align: right;
      margin: 10px 0px 0px 10px;
    }
  }
  .DetailValue {
    width: 100%;
    height: 50px;
    background-color: ivory;
    padding: 20px 20px;
    display: flex;
    .DetailValueText {
      margin: 0px 0px 0px 10px;
      p {
        color: #333333;
        font-weight: bold;
      }
    }
  }
  .DetailDetil {
    text-align: left;
    padding: 20px 20px;
    p {
      color: #999999;
      font-size: 14px;
      line-height: 24px;
    }
  }
  .DetailOption {
    width: 100%;
    background: #f5f5f5;
    border-radius: 6px 6px 6px 6px;
    opacity: 1;
    padding: 30px 20px;
    .DetailOptionArror {
      text-align: left;
      p {
        font-weight: bold;
        color: #333333;
        font-size: 16px;
      }
    }
    .DetailPhoper {
      text-align: left;
      padding-top: 10px;
      p {
        font-size: 10px;
        color: #999999;
      }
    }
    .DetailRadio {
      text-align: left;
      padding-top: 10px;
      div {
        opacity: 1;
        border-bottom: 1px solid #eeeeee;
      }
    }
  }
}
.placeOrder {
  /deep/.el-radio.is-bordered.is-checked::before {
    content: "";
    width: 11px;
    height: 12px;
    position: absolute;
    bottom: 0;
    right: 0;
  }
  /deep/.el-radio.is-bordered {
    padding: 0 150px;
  }
  /deep/.el-radio__label {
    padding-left: 0;
  }
  .radioDiv {
    margin-left: 15px;
    margin-top: 10px;
    width: 150px;
    height: 210px;
    background: #ffffff;
    border-radius: 6px 6px 6px 6px;
    opacity: 1;
    box-shadow: 1px 1px 50px rgb(0 21 41 / 18%);
  }
  /deep/.el-radio {
    margin-top: 10px;
    width: 140;
    height: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .el-image {
    width: 150px;
    height: 170px;
    border-radius: 6px 6px 0px 0px;
  }
}
.diemPost {
  position: absolute;
  left: 38%;
  top: -30px;
  color: #eeeeee;
}
/deep/.el-radio__input.is-checked .el-radio__inner {
  border-color: greenyellow;
  background-color: greenyellow;
}
/deep/.el-radio__inner:hover {
  border-color: greenyellow;
}
</style>