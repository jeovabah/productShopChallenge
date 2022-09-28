import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Layout } from "antd";
import React, { useState } from "react";
import style from "./styles.module.scss";
import { Header as HeaderNav } from "../Header";

const { Header, Sider, Content } = Layout;

export const LayoutComponent = ({ children }: any) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout className={style.container}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <HeaderNav routeProtected={true} collapsed={collapsed} />
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{ padding: "0 1rem", color: "white", fontSize: "1.3rem" }}
        >
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: () => setCollapsed(!collapsed),
            }
          )}
        </Header>
        <Content
          className="site-layout-background"
          id="divHeight"
          style={{ overflowY: "scroll" }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};
