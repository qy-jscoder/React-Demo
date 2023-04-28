import React, { Fragment, useState, useRef } from "react";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:8090";

function Counter(props) {
  const handleAdd = () => {
    props.Add(2);
  };

  const handleLess = () => {
    props.Less(1);
  };

  const [operateRes, setOperateRes] = useState("");

  const inputRef = useRef(null);
  const userRef = useRef(null);
  const passwordRef = useRef(null);

  const getUserInfo = () => {
    axios.get("/getUserInfo?id=" + inputRef.current.value).then(
      (response) => {
        if (response?.data?.status !== "success") {
          setOperateRes(response?.data?.message);
        } else {
          const data = response?.data?.data;
          setOperateRes(
            `id:${data.id}<br/>账号:${data.user_name}<br/>密码:${data.password}`
          );
        }
      },
      (error) => {
        console.log("请求失败", error);
      }
    );
  };
  const addUserInfo = () => {
    const params = {
      userName: userRef.current.value,
      password: passwordRef.current.value,
    };
    axios.post("/addUser", params).then(
      (response) => {
        setOperateRes(response?.data?.message);
      },
      (error) => {
        console.log("请求失败", error);
      }
    );
  };
  const getAllUsers = () => {
    axios.get("/getAllUsers").then(
      (response) => {
        let str = "";
        response?.data?.data?.length &&
          response?.data?.data.forEach((item) => {
            str +=
              "id:" +
              item.id +
              ",账号:" +
              item.user_name +
              ",密码:" +
              item.password +
              "<br/>";
          });
        setOperateRes(str);
      },
      (error) => {
        console.log("请求失败", error);
      }
    );
  };
  return (
    <Fragment>
      <div>{props.count}</div>
      <button onClick={handleAdd}>type:"ADD" 加2</button>
      <button onClick={handleLess}>type:"Less" 减1</button>
      <div style={{ marginTop: "10px" }}>
        <input type="text" ref={inputRef} placeholder="请输入用户id" />
        <br />
        <input type="text" ref={userRef} placeholder="请输入用户账号" />
        <br />
        <input type="password" ref={passwordRef} placeholder="请输入用户密码" />
        <br />
        <button onClick={getAllUsers} style={{ marginRight: "10px" }}>
          全部用户
        </button>
        <button onClick={getUserInfo} style={{ marginRight: "10px" }}>
          查询用户
        </button>
        <button onClick={addUserInfo}>新增用户</button>
        {operateRes && (
          <div
            style={{
              border: "1px solid red",
              marginTop: "10px",
              padding: "10px",
            }}
            dangerouslySetInnerHTML={{ __html: operateRes }}
          ></div>
        )}
      </div>
    </Fragment>
  );
}
export default Counter;
