import { Layout, message, Modal } from "antd";
import PageFooter from "./components/PageFooter";
import NavHeader from "./components/NavHeader";
import "./css/App.css";
import RouteConfig from "./router";
import LoginForm from "./components/LoginForm";
import { useState, useEffect } from "react";
import { getInfo, getUserById } from "./api/user";
import { changeLoginStatus, initUserInfo } from "./redux/userSlice";
import { useDispatch } from "react-redux";

const { Header, Footer, Content } = Layout;

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dispatch = useDispatch();
  //加载根组件的时候，需要恢复用户的登录状态
  useEffect(() => {
    async function fetchData() {
      const result = await getInfo();
      if (result.data) {
        const { data } = await getUserById(result.data._id);
        dispatch(initUserInfo(data));
        dispatch(changeLoginStatus(true));
      } else {
        message.warning(result.msg);
        localStorage.removeItem("userToken");
      }
    }

    if (localStorage.getItem("userToken")) {
      fetchData();
    }
  }, []);

  function closeModal() {
    setIsModalOpen(false);
  }

  function loginHandle() {
    setIsModalOpen(true);
  }

  return (
    <div className="App">
      <Header className="header">
        <NavHeader loginHandle={loginHandle} />
      </Header>
      <Content className="content">
        <RouteConfig />
      </Content>
      <Footer className="footer">
        <PageFooter />
      </Footer>
      <LoginForm isShow={isModalOpen} closeModal={closeModal} />
    </div>
  );
}

export default App;
