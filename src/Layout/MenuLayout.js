import { PieChartOutlined, UserOutlined } from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, theme, Button } from "antd";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router";
import { useNavigate, Outlet } from "react-router-dom";
import { changeUserInfo } from "../redux/modules/login";
const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
function getBreadItem(title, href) {
  return {
    title,
    href,
  };
}
//首字母大写其余小写
const strUpper=(str)=>{
  return str.slice(0, 1).toUpperCase() + str.slice(1).toLowerCase()
}
const items = [
  getItem("Dashboard", "/my/dashboard", <PieChartOutlined />),
  getItem("User", "/my/user", <UserOutlined />),
];

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();
  const location = useLocation();
  const { userInfo } = useSelector((state) => state.login);
  const dispatch = useDispatch();
  //获取当前页面路由
  const str = location.pathname.replace("/", "");
  const currentRoute =strUpper((strUpper(str)).replace('My/',''))
  //获取当前面包屑
  const breadItems = [getBreadItem('My'),getBreadItem(currentRoute)];
  //当前高亮菜单项
  const defaultSelectedKeys =
    location.pathname === "/my" ? "/my/dashboard" : location.pathname;
  //点击导航路由跳转
  const goRoute = (e) => {
    navigate(e.key);
  };
  //退出登录
  const logout = () => {
    dispatch(changeUserInfo({}));
  };
  useEffect(() => {
    if (!userInfo || !Object.keys(userInfo)?.length) {
      navigate("/login");
    }// eslint-disable-next-line
  }, [userInfo]);
  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div
          style={{
            height: 32,
            margin: 16,
            background: "rgba(255, 255, 255, 0.2)",
            color: "#fff",
            fontSize: 20,
            textAlign: "center",
            lineHeight: "32px",
            textOverflow: "ellipsis",
            overflow: "hidden",
          }}
          title="React Demo"
        >
          React Demo
        </div>
        <Menu
          theme="dark"
          defaultSelectedKeys={[defaultSelectedKeys]}
          mode="inline"
          items={items}
          onClick={goRoute}
        ></Menu>
      </Sider>
      <Layout className="site-layout">
        <Header
          style={{
            padding: "0 16px",
            background: colorBgContainer,
            fontWeight: "bold",
            fontSize: 20,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span>{`Hi! ${userInfo.role?'管理员':'游客'}${userInfo.userName} 你好！`}</span>
          <Button type="primary" onClick={logout}>
            退出登录
          </Button>
        </Header>
        <Content
          style={{
            margin: "0 16px",
          }}
        >
          <Breadcrumb
            style={{
              margin: "16px 0",
            }}
            items={breadItems}
          ></Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Ant Design ©2023 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};
export default App;
