import {Layout} from "antd";
import PageFooter from "./components/PageFooter";
import PageHeader from "./components/PageHeader";
import "./css/App.css";
import RouteConfig from "./router";

const {Header, Footer, Content} = Layout;

function App() {
    return (
        <div className="App">
            <Header className='header'>
                <PageHeader/>
            </Header>
            <Content className='content'>
                <RouteConfig/>
            </Content>
            <Footer className='footer'>
                <PageFooter/>
            </Footer>
        </div>
    );
}

export default App;
