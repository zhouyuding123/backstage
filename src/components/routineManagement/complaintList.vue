<template>
  <div>
    <div class="memberDeleber" v-if="show">
      <el-row>
        <el-col :span="2"><p>关键词搜索:</p></el-col>
        <el-col :span="4"
          ><div>
            <el-input v-model="input" placeholder="请输入内容"></el-input></div
        ></el-col>
      </el-row>
    </div>
    <div class="memberDeleber">
      <el-row>
        <el-col :span="2"
          ><div>
            <el-button type="danger" plain>批量删除</el-button>
          </div></el-col
        >
        <el-col :span="1"
          ><div>
            <el-button @click="Refresh">刷新</el-button>
          </div></el-col
        >
        <el-col :span="1"
          ><div>
            <vxe-button>导出选中</vxe-button>
          </div></el-col
        >
        <el-col :span="19"><div></div></el-col>
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
        ref="xTable1"
        border
        :align="allAlign"
        :row-config="{ isHover: true }"
        :data="tableData"
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
        ></vxe-column>
        <vxe-column
          field="title"
          title="标题"
          width="150"
          align="center"
        ></vxe-column>
        <vxe-column
          field="content"
          title="内容"
          width="300"
          align="center"
        ></vxe-column>
        <vxe-column
          field="from"
          title="联系人"
          width="80"
          align="center"
        ></vxe-column>
        <vxe-column title="照片" width="80" align="center">
          <template v-slot="scoped">
            <img :src="scoped.row.images" alt="" />
          </template>
        </vxe-column>
        <vxe-column
          field="create_time"
          title="投诉时间"
          width="180"
          align="center"
        ></vxe-column>
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
      },
      show: false,
      input: "",
      tableData: [],
      allAlign: null,
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
        console.log(res.list);
        this.tableData = res.list;
      });
    },
  },
};
</script>

<style lang="less" scoped>
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
</style>