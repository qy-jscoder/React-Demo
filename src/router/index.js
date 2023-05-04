import Dashboard from "../pages/Dashboard/index";
import User from "../pages/User/index";
import Login from "../pages/Login/index";
import { Navigate, useRoutes } from "react-router-dom";
import MenuLayout from "../Layout/MenuLayout";
import ExtraLayout from '../Layout/ExtraLayout'
const MenuRoutes = () => {
  // 获取后台路由
  const routes = useRoutes([
    {
      path: "",
      element: <MenuLayout />,
      children: [
        {
          path: "/",
          element: <Navigate to="/my/dashboard" replace={true} />,
        },
        {
          path: "/dashboard",
          element: <Dashboard />,
        },
        {
          path: "/user",
          element: <User />,
        },
      ],
    },
  ]);
  return routes;
};
const ExtraRoutes = () => {
  // 获取后台路由
  const routes = useRoutes([
    {
      path: "",
      element: <ExtraLayout />,
      children: [
        {
            path: "/login",
            element: <Login />,
          },
      ],
    },
  ]);

  return routes;
};

const GetAllRoutes = () => {
  const routes = useRoutes([
    {
      path: "/*",
      element: <ExtraRoutes />,
    },
    {
      path: "/my/*", // 末尾的 /* 必不可少
      element: <MenuRoutes />,
    },
    {
      path: "*", // 这个404页面不会被匹配到
      element: <div>404</div>,
    },
  ]);
  return routes;
};
export default GetAllRoutes;
