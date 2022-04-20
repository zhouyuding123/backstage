import { get, post } from "./http.js";

export const getD = (url, m) => get(url, m);
export const postD = (url, m) => post(url, m);
