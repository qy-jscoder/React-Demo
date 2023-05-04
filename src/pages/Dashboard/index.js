import { message, Spin } from "antd";
import { useState, useEffect } from "react";
import axios from "axios";
import { LoadingOutlined } from "@ant-design/icons";
import * as echarts from "echarts";

axios.defaults.baseURL = "http://localhost:8090";
function Dashboard() {
  const [messageApi, contextHolder] = message.useMessage();
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(false);

  const error = (text = "接口请求失败") => {
    messageApi.open({
      type: "error",
      content: text,
    });
  };
  const getAllUsers = async () => {
    axios.get("/getAllUsers").then(
      (response) => {
        const arr = Array.isArray(response?.data?.data)
          ? response?.data?.data
          : [];
        setUserData(arr);
      },
      () => {
        error();
      }
    );
  };
  //获取全部数据
  useEffect(() => {
    const getData = async () => {
        setLoading(true);
        await getAllUsers();
        setLoading(false);
      };
      getData(); // eslint-disable-next-line
  }, []);
  //生成mycharts
  useEffect(() => {
    let myChart = null;
    const adminCount = userData.filter((item) => !!item.role)?.length || 0;
    const touristCount = userData.length - adminCount;
    if (userData?.length && !myChart) {
      myChart = echarts.init(document.getElementById("chart"));
      myChart.setOption({
        title: {
          text: "用户角色分析",
          left: "center",
        },
        tooltip: {
          trigger: "item",
        },
        legend: {
          orient: "vertical",
          left: "left",
        },
        series: [
          {
            name: "角色",
            type: "pie",
            radius: "50%",
            data: [
              { value: adminCount, name: "管理员" },
              { value: touristCount, name: "游客" },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      });
    }
  }, [userData]);
  return (
    <div>
      <Spin
        tip="Loading..."
        indicator={<LoadingOutlined></LoadingOutlined>}
        size="large"
        spinning={loading}
      >
        {contextHolder}
        <h2>用户总数量：{userData.length}</h2>
        <h2>用户角色分析：</h2>
        <div id="chart" style={{ width: 500, height: 300 }}></div>
      </Spin>
    </div>
  );
}
export default Dashboard;
