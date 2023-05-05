import { Button, Form, Input } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { registerLogin } from "../../redux/modules/login";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
// import bg from '../../assets/img/1.jpg'
axios.defaults.baseURL = "http://localhost:8090";

const Login = () => {
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.login);

  const dispatch = useDispatch();
  const bgStyle = {
    width: "100vw",
    height: "100vh",
    overflow: "hidden",
    position: "relative",
    // backgroundImage: `url(${bg})`,
  };
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
    flexDirection:'column',
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    alignItems: "center",
    justifyContent: "center",
  };

  const onFinish = (values) => {
    dispatch(registerLogin(values));
  };
  useEffect(() => {
    if (userInfo&&Object.keys(userInfo)?.length) {
      navigate("/my/dashboard");
    } // eslint-disable-next-line
  }, [userInfo]);

  return (
    <div style={bgStyle}>
      <div style={formStyle}>
        <h2>注册/登录</h2>
        <Form
          name="normal_login"
          style={{maxWidth:300}}
          onFinish={onFinish}
        >
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
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{width:'100%'}}
            >
              确认
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
