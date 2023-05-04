// 在Counter组件中,如果想用redux中的数据
// 1.先导入connect函数
import { connect } from "react-redux";

// 引入展示组件counter
import Login from "../pages/Login/index";

// 导入action
import {registerLogin} from "../redux/actions";


export default connect(
  (state) => ({ userInfo: state.userInfo }),
  { registerLogin }
)(Login);

