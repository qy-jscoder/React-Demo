import "antd/dist/reset.css";
import { Space, Table, Button, Radio, Spin, message } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import axios from "axios";
import { useState, useEffect } from "react";
import Dialog from "../../components/Dialog/index";
import {  useSelector } from "react-redux";

const { Column } = Table;
axios.defaults.baseURL = "http://localhost:8090";

function User() {
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setModalVisible] = useState(false);
  const [dialogInfo, setDialogInfo] = useState({
    key: "",
    text: "",
    row: null,
  });
  const [role, setRole] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const { userInfo } = useSelector((state) => state.login);

  const success = (text = "接口请求成功") => {
    messageApi.open({
      type: "success",
      content: text,
    });
  };
  const error = (text = "接口请求失败") => {
    messageApi.open({
      type: "error",
      content: text,
    });
  };
  //获取全部数据
  const getAllUsers = () => {
    axios.get("/getAllUsers").then(
      (response) => {
        const arr = Array.isArray(response?.data?.data)
          ? response?.data?.data
          : [];
        setTableData(arr);
      },
      () => {
        error();
      }
    );
  };
  //删除账号
  const deleteUser = () => {
    axios.post("/deleteUser", { id: dialogInfo?.row?.id }).then(
      (response) => {
        response.data?.status === "fail"
          ? error("操作失败")
          : success("操作成功");
      },
      (err) => {
        error();
      }
    );
  };
  //修改角色
  const alterUser = async (role, id) => {
    axios.post("/alterUser", { role, id }).then(
      (response) => {
        response.data?.status === "fail"
          ? error("操作失败")
          : success("操作成功");
      },
      () => {
        error();
      }
    );
  };
  const onChange = (e) => {
    setRole(e.target.value);
  };
  //子组件回调
  const dialogCallback = async (visible, val) => {
    setModalVisible(visible);
    if (val) {
      setLoading(true);
      if (dialogInfo.key === "delete") {
        await deleteUser(role, dialogInfo?.row?.id);
        await getAllUsers();
      } else {
        await alterUser(role, dialogInfo?.row?.id);
        await getAllUsers();
      }
      setLoading(false);
    }
  };
  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      await getAllUsers();
      setLoading(false);
    };
    getData(); // eslint-disable-next-line
  }, []);

  return (
    <Spin
      tip="Loading..."
      indicator={<LoadingOutlined></LoadingOutlined>}
      size="large"
      spinning={loading}
    >
      {contextHolder}
      <Table dataSource={tableData} rowKey={(record) => record.id}>
        <Column title="Id" dataIndex="id" key="id" />
        <Column title="UserName" dataIndex="user_name" key="user_name" />
        <Column title="Password" dataIndex="password" key="password" />
        <Column
          title="Role"
          key="role"
          render={(_, row) => <span>{row.role ? "管理员" : "游客"}</span>}
        />
        <Column
          title="Action"
          key="action"
          render={(tags, row) => (
            <Space>
              <Button
                disabled={row.user_name === "admin"}
                type="primary"
                onClick={() => {
                  setModalVisible(true);
                  setRole(row.role);
                  setDialogInfo({
                    key: "role",
                    row,
                  });
                }}
              >
                角色
              </Button>
              <Button
                disabled={row.user_name === "admin"||row.user_name===userInfo.user_name}
                type="primary"
                danger
                onClick={() => {
                  setModalVisible(true);
                  setDialogInfo({
                    key: "delete",
                    text: "确认要删除用户"+row.user_name+"吗？",
                    row,
                  });
                }}
              >
                删除
              </Button>
            </Space>
          )}
        />
      </Table>
      <Dialog
        title={dialogInfo.key === "role" ? "用户"+dialogInfo?.row?.user_name+'的角色' : "删除"}
        visible={isModalOpen}
        callback={dialogCallback}
        icon={dialogInfo.icon}
      >
        <>
          {dialogInfo.key !== "role" ? (
            dialogInfo.text
          ) : (
            <Radio.Group onChange={onChange} value={role}>
              <Radio value={true}>管理员</Radio>
              <Radio value={false}>游客</Radio>
            </Radio.Group>
          )}
        </>
      </Dialog>
    </Spin>
  );
}
export default User;
