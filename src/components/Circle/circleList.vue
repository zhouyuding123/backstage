<template>
  <div class="backColor">
    <div class="firstColor">
      <div class="buttonStyle">
        <p>添加</p>
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
        <vxe-column
          width="60"
          align="center"
        >
        <template v-slot="scoped">
        <img :src="scoped.row.headimage" alt="">
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
        <vxe-column
          field="member_count"
          title="成员数"
          width="80"
          align="center"
        ></vxe-column>
        <vxe-column
          field="forum_count"
          title="论坛数"
          width="80"
          align="center"
        ></vxe-column>
        <vxe-column
          title="操作"
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
      tableData: [],
      allAlign: null,
      url: {
        getListInterface: "Circle/getList",
      },
    };
  },
  created() {
    this.circleValue();
  },
  methods: {
    circleValue() {
      postD(this.url.getListInterface).then((res) => {
        this.tableData = res.list;
      });
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
  .firstColor {
    padding: 20px 20px 0 0;
    width: 100%;
    display: flex;
    flex-flow: row-reverse;
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
</style>