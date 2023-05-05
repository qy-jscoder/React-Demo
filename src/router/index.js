import Dashboard from "../pages/Dashboard/index";
import User from "../pages/User/index";
import Login from "../pages/Login/index";
import { Navigate, useRoutes } from "react-router-dom";
import MenuLayout from "../Layout/MenuLayout";
import ExtraLayout from '../Layout/ExtraLayout'

// 登录后页面统一布局
const MenuRoutes = () => {
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
// 登录前页面统一布局
const ExtraRoutes = () => {
  const routes = useRoutes([
    {
      path: "",
      element: <ExtraLayout />,
      children: [
        {
          path: "/",
          element: <Navigate to="/login" replace={true} />,
        },
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
      element: <ExtraRoutes />
    },
    {
      path: "/my/*",
      element: <MenuRoutes />
    }
  ]);
  return routes;
};
export default GetAllRoutes;
