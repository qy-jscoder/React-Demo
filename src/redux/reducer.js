// 导入常量
import { INCREMENT, DECREMENT,COUNTTIME } from "../redux/constants";

export default function reducer(
  state = {
    count: 0,
    msg: "我爱你中国",
    arr: [1, 2, 3, 4],
  },
  action
) {
  switch (action.type) {
    // case "ADD":
    case INCREMENT:
      return {
        ...state,
        count: state.count + action.data,
      };
    case DECREMENT:
      return {
        ...state,
        count: state.count - action.data,
      };
    case COUNTTIME:
      return {
        ...state,
        
      }
    default:
      return state;
  }
}

