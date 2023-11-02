import React from "react";
import { NavLink } from "react-router-dom";
import { Input, Select, Space } from "antd";
import LoginAvatar from "./LoginAvatar";

function PageHeader(props) {
  const options = [
    {
      value: "issue",
      label: "问答",
    },
    {
      value: "book",
      label: "书籍",
    },
  ];
  return (
    <div className="headerContainer">
      <div className="logoContainer">
        <div className="logo" />
      </div>

      <nav className="navContainer">
        <NavLink to="/" className="navgation">
          问答
        </NavLink>
        <NavLink to="/books" className="navgation">
          书籍
        </NavLink>
        <NavLink to="/interviews" className="navgation">
          面试题
        </NavLink>
        <a
          herf="https://www.google.com/"
          className="navgation"
          target="_blank"
          rel="noreferrer"
        >
          视频教程
        </a>
      </nav>

      <div className="searchContainer">
        <Space.Compact>
          <Select defaultValue="issue" size="large" options={options} />
          <Input.Search
            placeholeder="请输入要搜索的内容"
            allowClear
            enterButton="搜索"
            size="large"
            style={{ width: "80%" }}
          />
        </Space.Compact>
      </div>

      <div className="loginContainer">
        <LoginAvatar loginHandle={props.loginHandle} />
      </div>
    </div>
  );
}

export default PageHeader;
