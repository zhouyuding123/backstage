<template>
  <div class="backColor">
    <div class="memberDeleber" v-if="show">
      <el-row>
        <el-col :span="2"><p>关键词搜索:</p></el-col>
        <el-col :span="4"
          ><div>
            <el-input v-model="input" placeholder="请输入内容"></el-input></div
        ></el-col>
        <el-col :span="2"><el-button type="success">提交</el-button></el-col>
      </el-row>
    </div>
    <div class="memberDeleber">
      <el-row>
        <el-col :span="2"
          ><div>
            <el-button type="danger" plain @click="compalanitDeletes"
              >批量删除</el-button
            >
          </div>
          </el-col
        >
        <el-col :span="1"
          ><div>
            <el-button @click="Refresh">刷新</el-button>
          </div></el-col
        >

        <el-col :span="20"><div></div></el-col>
        <el-col :span="1"
          ><div>
            <el-button type="info" plain @click="showCont($event)" ref="btn1"
              >查询</el-button
            >
          </div></el-col
        >
      </el-row>
    </div>
    <div class="memberTable">
      <vxe-table
        round
        border="true"
        ref="xTable1"
        :align="allAlign"
        :row-config="{ isHover: true }"
        :data="tableData"
        row-id="id"
        @checkbox-change="checkboxChangeEvent"
        @checkbox-all="checkboxChangeEvent"
        :row-style="tableRowStyle"
        :header-row-style="tableStyle"
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
          width="150"
          align="center"
        ></vxe-column>
        <vxe-column field="content" title="内容" align="center"></vxe-column>
        <vxe-column
          field="from"
          title="联系人"
          width="80"
          align="center"
        ></vxe-column>
        <vxe-column title="照片" width="80" align="center">
          <template v-slot="scoped">
            <el-image
              :src="
                'https://weisoutc.oss-cn-shanghai.aliyuncs.com/' +
                scoped.row.images
              "
              alt=""
              :preview-src-list="[
                'https://weisoutc.oss-cn-shanghai.aliyuncs.com/' +
                  scoped.row.images,
              ]"
              style="width: 50px; height: 50px"
              class="textphoto"
            />
          </template>
        </vxe-column>
        <vxe-column
          field="create_time"
          title="投诉时间"
          width="180"
          align="center"
        ></vxe-column>
        <vxe-column title="操作" width="180" align="center">
          <template v-slot="scoped">
            <el-button type="danger" @click="complaintRemoveRow(scoped.row)">
              删除
            </el-button>
          </template>
        </vxe-column>
      </vxe-table>
    </div>
  </div>
</template>

<script>
import { postD } from "../../api/index.js";
export default {
  data() {
    return {
      url: {
        getListInterface: "Complaint/getList",
        selectDelInterface: "Complaint/selectDel",
        delInterface: "Complaint/del",
      },
      show: false,
      input: "",
      tableData: [],
      allAlign: null,
      // 批量删除
      ids: [],
      idL: {
        id: "",
      },
      //批量删除选中时将对象保存到arrs中
      arrs: [],
      // 单个删除
      complaintRemoveRowList: {
        id: "",
      },
    };
  },
  created() {
    this.getListValue();
  },
  methods: {
    // 搜索隐藏显示
    showCont() {
      this.show = !this.show;
      this.$refs.btn1.$el.innerText;
    },
    // 刷新
    Refresh() {
      this.getListValue();
    },
    // 获取投诉列表数据
    getListValue() {
      postD(this.url.getListInterface).then((res) => {
        this.tableData = res.list;
      });
    },
    // 批量删除
    checkboxChangeEvent(data) {
      this.arrs = data.records;
    },
    async compalanitDeletes() {
      const compalanitDeleteser = await this.$confirm(
        "此操作将永久删除管理, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);
      if (compalanitDeleteser !== "confirm") {
        return this.$message.info("取消删除");
      }
      if (compalanitDeleteser === "confirm") {
        this.arrs.forEach((v) => {
          this.ids.push(v.id);
        });
        this.idL.id = this.ids.toString();
        postD(this.url.selectDelInterface, this.idL).then((res) => {
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
          this.getListValue();
        });
      }
    },
    async complaintRemoveRow(data) {
      const complaintRemoveRows = await this.$confirm(
        "此操作将永久删除, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);
      if (complaintRemoveRows !== "confirm") {
        return this.$message.info("取消删除");
      }
      if (complaintRemoveRows === "confirm") {
        this.complaintRemoveRowList.id = data.id;
        postD(this.url.delInterface, this.complaintRemoveRowList).then(
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
            this.getListValue();
          }
        );
      }
    },
    tableRowStyle() {
      return "background: #FFFFFF;box-shadow: 0px 2px 5px 1px rgba(0, 0, 0, 0.05);border-radius: 10px 10px 10px 10px;opacity: 1;";
    },
    tableStyle() {
      return "box-shadow: 0px 2px 5px 1px rgba(0, 0, 0, 0.05);border-radius: 10px 10px 10px 10px;opacity: 1;";
    },
  },
};
</script>

<style lang="less" scoped>
.backColor {
  background: #f9f9f9;
  width: 100%;
  height: 100%;
}
.memberDeleber {
  text-align: left;
  padding: 1% 2.5% 1% 2.5%;
  line-height: 10px;
}
p {
  line-height: 2;
}
.memberTable {
  padding: 0 2.5% 0 2.5%;
}
.textphoto {
  position: absolute;
  top: 0;
  left: 20%;
}
</style>