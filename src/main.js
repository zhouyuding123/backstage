import { createApp,Vue } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "./assets/css/reset.less";
import 'xe-utils'
import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'
import iconPicker from 'vue-fontawesome-elementui-icon-picker';
import "@/assets/font_vps5a74vj8r/iconfont.css"

createApp(App).use(store).use(router).use(ElementPlus).use(VXETable).use(iconPicker).mount("#app");
