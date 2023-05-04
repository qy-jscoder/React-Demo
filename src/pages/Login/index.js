// import {useNavigate } from 'react-router-dom'
import { Button, Form, Input } from "antd";
import { useSelector,useDispatch } from "react-redux";
import { registerLogin } from "../../redux/actions";
import axios from 'axios'
axios.defaults.baseURL = "http://localhost:8090";

const Login = () => {
  // const [messageApi, contextHolder] = message.useMessage();
  // const navigate=useNavigate()
  // const messageOpen=(type,message)=>{
  //   messageApi.open({
  //     type: type,
  //     content: message,
  //   });
  // }
  const userInfo=useSelector(state=>state.userInfo)
  const dispatch=useDispatch()
  const bgStyle = {
    width: "100vw",
    height: "100vh",
    overflow: "hidden",
    position: "relative",
    backgroundImage: require("./1.jpg"),
  };
  const formStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };

  const onFinish = (values) => {
    dispatch(registerLogin(values))
  };
  const onFinishFailed = (errorInfo) => {
  };
  return (
    <div style={bgStyle}>
      <div style={formStyle}>
        {/* {contextHolder} */}
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="userName"
            rules={[
              {
                required: true,
                message: "Please input your userName!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              注册/登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login
