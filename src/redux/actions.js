// 将action对象封装起来  统称为actionCreator
// 引入常量
import { INCREMENT, DECREMENT } from "../redux/constants";

// 增加功能
function Add(data) {
  return {
    // type: "ADD",
    type: INCREMENT,
    data: data
  };
}

// 减少功能
function Less(data) {
  return {
    type: DECREMENT,
    data: data
  };
}
function asyncCountTime(){
    return function(dispatch){
        setTimeout(()=>{
            dispatch({type:'COUNTTIME'})
        })
    }
}
export { Add, Less ,asyncCountTime};

