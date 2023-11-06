import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Avatar, Button, List, Popover, Image } from "antd";
import styles from "../css/LoginAvatar.module.css";
import { UserOutlined } from "@ant-design/icons";
import { changeLoginStatus, clearUserInfo } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";

function LoginAvatar(props) {
  const { isLogin, userInfo } = useSelector((state) => state.user);
  let loginStatus = null;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function listClickHandle(item) {
    if (item === "个人中心") {
      //props.history.push("/user");
    } else if (item === "退出登录") {
      localStorage.removeItem("userToken");
      dispatch(clearUserInfo);
      dispatch(changeLoginStatus(false));
      navigate("/");
    }
  }

  if (isLogin) {
    const content = (
      <List
        dataSource={["个人中心", "退出登录"]}
        size="large"
        renderItem={(item) => {
          return (
            <List.Item
              style={{ cursor: "pointer" }}
              onClick={() => listClickHandle(item)}
            >
              {item}
            </List.Item>
          );
        }}
      />
    );

    loginStatus = (
      <Popover content={content} trigger="hover" placement="bottom">
        <div className={styles.avatarContainer}>
          <Avatar
            src={<Image src={userInfo?.avatar} prefix={false} />}
            size={"large"}
            icon={<UserOutlined />}
          ></Avatar>
        </div>
      </Popover>
    );
  } else {
    loginStatus = (
      <Button type={"primary"} size={"large"} onClick={props.loginHandle}>
        注册/登录
      </Button>
    );
  }
  return <div>{loginStatus}</div>;
}

export default LoginAvatar;
