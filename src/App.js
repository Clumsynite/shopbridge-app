import { Layout, Menu } from "antd";
import { HeartFilled } from "@ant-design/icons";

import "./App.css";
import ExternalLink from "./CommonComponents/ExternalLink";
import { Link, Route, Routes } from "react-router-dom";
import Product from "./Page/Product";
import Home from "./Page/Home";

const { Content, Footer, Header } = Layout;

function App() {
  return (
    <Layout className="layout">
      <Header>
        <Menu mode="horizontal" theme="dark">
          <Menu.Item key="">
            <Link to="/">Home</Link>
          </Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: "0 50px" }}>
        <div className="site-layout-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product" element={<Product />} />
          </Routes>
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Made with <HeartFilled style={{ color: "#ff1129" }} /> by{" "}
        <ExternalLink name="Rishabh Pathak" title="Link to my Github Profile" to="https://github.com/Clumsynite" />
      </Footer>
    </Layout>
  );
}

export default App;
