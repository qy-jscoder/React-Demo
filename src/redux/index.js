//  辅助函数
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import loginSlice from './modules/login';

const reducer = combineReducers({
  login: loginSlice,
});

const store = configureStore({
  reducer,
});

export default store;