import { Layout, Menu } from "antd";
import { Link, Route, Routes } from "react-router-dom";

import "./styles/App.css";
import Product from "./Page/Product";
import Home from "./Page/Home";
import Footer from "./Components/Footer";

const { Content, Header } = Layout;

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
      <Footer />
    </Layout>
  );
}

export default App;
