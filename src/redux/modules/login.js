import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8090";

export const registerLogin = createAsyncThunk(
  "post/registerLogin",
  async (params) => {
    try {
      const res = await axios.post("/registerLogin", params);
      return res?.data?.data;
    } catch (error) {
      return error.message;
    }
  }
);

// 创建数据和方法
const loginSlice = createSlice({
  // 名称 对应index.js 文件中的reducer对象中的key
  name: "login",
  // 初始化的数据
  initialState: {
    userInfo: {},
  },
  // 方法
  reducers: {
    //修改userInfo
    changeUserInfo: (state, { payload }) => {
      state.userInfo = payload;
    },
  },
  extraReducers: (builder) => {
    // 接口请求返回
    builder.addCase(registerLogin.fulfilled, (state, { payload }) => {
      state.userInfo = payload;
    })
  },
});

export const { changeUserInfo } = loginSlice.actions; // 暴露方法
export default loginSlice.reducer; // 导出reducer传给index.js
