import { Layout } from "antd";

import "./styles/App.css";
import Home from "./Page/Home";
import Footer from "./Components/Footer";
import Text from "./CommonComponents/Text";
import { WHITE } from "./config/colors";

const { Content, Header } = Layout;

function App() {
  return (
    <Layout className="layout">
      <Header>
        <Text bold size={32} style={{ color: WHITE }}>
          ShopBridge
        </Text>
      </Header>
      <Content style={{ padding: "20px 50px 80px 50px", overflowY: "auto", height: "calc(100vh - 134px)" }}>
        <Home />
      </Content>
      <Footer />
    </Layout>
  );
}

export default App;
