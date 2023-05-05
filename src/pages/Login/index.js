import { Button, Form, Input } from "antd";
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
    maxHeight:300,
    width:'50vw',
    height:'50vh',
    display:'flex',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    alignItems:'center',
    justifyContent: "space-around"
  };

  const onFinish = (values) => {
    dispatch(registerLogin(values));
  };
  useEffect(() => {
    if (Object.keys(userInfo)?.length) {
      console.log(userInfo,'xxxxxxx');
      navigate("/my/dashboard");
    }// eslint-disable-next-line
  }, [userInfo]);

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
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
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

export default Login;
