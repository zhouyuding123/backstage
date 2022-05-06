<template>
  <div class="backColor">
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
          type="seq"
          title="序号"
          width="60"
          align="center"
        ></vxe-column>
        <vxe-column
          field="title"
          title="title"
          width="70"
          align="center"
        ></vxe-column>
        <vxe-column
          field="description"
          title="description"
          width="70"
          align="center"
        ></vxe-column>
        <vxe-column field="content" title="content" align="center"></vxe-column>
        <vxe-column field="details" title="details" align="center"></vxe-column>
        <vxe-column field="style" title="style" align="center"></vxe-column>
        <vxe-column field="hooks" title="hooks" align="center"></vxe-column>
        <vxe-column field="status" title="status" align="center"></vxe-column>
        <vxe-column
          field="create_time"
          title="create_time"
          align="center"
        ></vxe-column>
        <vxe-column
          field="update_time"
          title="update_time"
          align="center"
        ></vxe-column>
        <vxe-column field="browse" title="browse" align="center"></vxe-column>
        <vxe-column field="circle" title="circle" align="center"></vxe-column>
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
      </vxe-table>
    </div>
  </div>
</template>
<script>
import { postD } from "@/api";
export default {
  data() {
    return {
      url: {
        listForumInterface: "Circle/listForum",
      },
      allAlign: null,
      tableData: [],
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
      postD(this.url.listForumInterface).then((res) => {
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
    .buttonStyles {
      line-height: 48px;
      width: 170px;
      height: 48px;
      background: rgb(39, 224, 248);
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
    .buttonStyle {
      line-height: 48px;
      width: 170px;
      height: 48px;
      background: red;
      box-shadow: 2px 5px 20px 1px rgba(58, 203, 233, 0.15);
      border-radius: 10px 10px 10px 10px;
      opacity: 1;
      cursor: pointer;
      margin-left: 15px;
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