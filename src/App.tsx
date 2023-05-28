import React from "react";
import "./App.css";
import { Layout, Menu, MenuProps } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import MainPage from "./pages/MainPage";

function App() {
  const menu: MenuProps["items"] = [{ key: "1", label: "Главная страница" }];
  return (
    <div className="App">
      <Layout style={{ minHeight: "100vh" }}>
        <Header>
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["1"]}
            items={menu}
          />
        </Header>
        <Content style={{ margin: 24 }}>
          <MainPage />
        </Content>
        <Footer>2023</Footer>
      </Layout>
    </div>
  );
}

export default App;