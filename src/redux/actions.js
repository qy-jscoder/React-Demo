// 将action对象封装起来  统称为actionCreator
// 引入常量
import { CHANGE_USER_INFO } from "../redux/constants";
import axios from 'axios'
//修改用户信息
function changeUserInfo(data) {
  return {
    type: CHANGE_USER_INFO,
    data: data
  };
}
//登录注册异步操作
function registerLogin(data){
  return (dispatch)=>{
    axios.post("/registerLogin",data.userInfo).then(
      (res) => {
        dispatch(changeUserInfo(res?.data?.data))
      }
    );
  }
}
export { registerLogin,changeUserInfo};

