import { PieChartOutlined,UserOutlined } from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { useState } from "react";
import {useLocation} from 'react-router'
import { useNavigate, Navigate,useRoutes  } from "react-router-dom";
import Dashboard from "./pages/Dashboard/index";
import User from "./pages/User/index";
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
    href
  };
}
const items = [
  getItem("Dashboard", "/dashboard", <PieChartOutlined />),
  getItem("User", "/user", <UserOutlined />),
];
//路由配置
const routes=[
  {
    path:'/',
    element:<Navigate to="/dashboard" replace={true} />
  },
  {
    path: '/dashboard',
    element: <Dashboard />
  },
  {
    path: '/user',
    element: <User />
  }
]
const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();
  const location=useLocation()

  const goRoute = (e) => {
    navigate(e.key);
  };
  //获取当前页面路由
  const str=location.pathname.replace('/','')
  const currentRoute=str.slice(0,1).toUpperCase()+str.slice(1).toLowerCase()
  const breadItems=[
    getBreadItem(currentRoute)
  ]
  //当前高亮菜单项
  const defaultSelectedKeys=location.pathname==='/'?'/dashboard':location.pathname
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
            padding: 0,
            background: colorBgContainer,
          }}
        />
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
          >
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
            }}
          >
            {useRoutes(routes)}
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
