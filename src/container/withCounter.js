// 在Counter组件中,如果想用redux中的数据
// 1.先导入connect函数
import { connect } from "react-redux";

// 引入展示组件counter
import Counter from "../Counter";

// 导入action
import { Add, Less } from "../redux/actions";


const WithCounter = connect(
  (state) => ({ count: state.count }),
  { Add, Less }
)(Counter);
export default WithCounter;

