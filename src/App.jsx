import { Layout, Modal } from "antd";
import PageFooter from "./components/PageFooter";
import PageHeader from "./components/PageHeader";
import "./css/App.css";
import RouteConfig from "./router";
import LoginForm from "./components/LoginForm";
import { useState } from "react";

const { Header, Footer, Content } = Layout;

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  function closeModal() {
    setIsModalOpen(false);
  }

  function loginHandle() {
    setIsModalOpen(true);
  }

  return (
    <div className="App">
      <Header className="header">
        <PageHeader loginHandle={loginHandle} />
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
