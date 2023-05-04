// 导入常量
import { CHANGE_USER_INFO } from "../redux/constants";

export default function reducer(
  state = {
    userInfo:{}
  },
  action
) {
  switch (action.type) {
    case CHANGE_USER_INFO:
      return {
        ...state,
        userInfo: action.userInfo,
      };
    default:
      return state;
  }
}

