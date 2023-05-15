import { Button, Form, Input, message } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { registerLogin } from "../../redux/modules/login";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
axios.defaults.baseURL = "http://localhost:8090";

const Login = () => {
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.login);
  const [messageApi, contextHolder] = message.useMessage();

  const dispatch = useDispatch();

  const formStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    maxWidth: 400,
    maxHeight: 300,
    width: "50vw",
    height: "50vh",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    alignItems: "center",
    justifyContent: "center",
  };

  const onFinish = async (values) => {
    const res = await dispatch(registerLogin(values));
    if (!res?.payload) {
      messageApi.open({
        type: "error",
        content: "登录注册失败",
      });
    }
  };
  useEffect(() => {
    if (userInfo && Object.keys(userInfo)?.length) {
      navigate("/my/dashboard");
    } // eslint-disable-next-line
  }, [userInfo]);

  return (
    <div style={formStyle}>
      {contextHolder}
      <h2 style={{ color: "#fff" }}>注册/登录</h2>
      <Form name="normal_login" style={{ maxWidth: 300 }} onFinish={onFinish}>
        <Form.Item
          name="userName"
          rules={[
            {
              required: true,
              message: "Please input your Username!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
            autoComplete="off"
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
            确认
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
