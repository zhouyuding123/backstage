import axios from "axios"; // 引用axios
import config from "@/api/config";

const _baseUrl = config.baseUrl.dev; // 使用到代
_baseUrl;
// axios 配置
axios.defaults.timeout = 120000; // 设置接口响应时间
axios.defaults.baseURL = "http://weisou.chengduziyi.com/admin/"; // 这是调用数据接口,公共接口url+调用接口名
// 增加token（先写了个固定的token，实际项目中应该是通过接口获取到token）
axios.defaults.headers.common["token"] = localStorage.getItem("token")
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";

export function get(url, params = {}) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params: params,
      })
      .then((response) => {
        resolve(response);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
// 封装post请求
export function post(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.post(url, data).then(
      (response) => {
        resolve(response.data);
      },
      (err) => {
        reject(err);
      }
    );
  });
}
