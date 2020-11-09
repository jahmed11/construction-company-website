import React, { useState } from "react";
import { Redirect, Switch, Route, Link } from "react-router-dom";
import { withAuthenticator } from "@aws-amplify/ui-react";
import { Auth } from "aws-amplify";
import AddModel from "../../components/addModel/addModel";
import WebsiteElements from "./websiteElements";
import UpdateModel from "../../components/updateModel/updateModel";
import Table from "./table";
import { SignoutButton } from "../../styled-components/styled-components";
import Welcome from "./welcome";
import { Layout, Menu } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import "../../assets/scss/custom.less";
const { Header, Sider, Content, Footer } = Layout;

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const toggle = () => {
    setCollapsed(!collapsed);
  };
  const signout = async () => {
    console.log("hello");
    try {
      await Auth.signOut();
      setRedirect(true);
    } catch (error) {
      console.log("error signing out: ", error);
    }
  };
  return (
    <Layout>
      {redirect && <Redirect to="/" />}
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{
          overflow: "auto",
          height: "100vh",
          left: 0,
        }}
        theme="light"
      >
        <div className="logo" />
        <Menu theme="light" mode="inline" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1" icon={<UserOutlined />}>
            <Link to="/dashboard/models">Models</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<VideoCameraOutlined />}>
            <Link exact="true" to="/dashboard/websiteElement">
              Manage Website
            </Link>
          </Menu.Item>
          {/*} <Menu.Item key="3" icon={<UploadOutlined />}>
            nav 3
          </Menu.Item>*/}
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          theme="light"
          style={{ padding: 0 }}
        >
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: toggle,
            }
          )}

          <SignoutButton className="btn btn-outline-warning" onClick={signout}>
            SIGN OUT
          </SignoutButton>
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            overflow: "scroll",
          }}
        >
          <Switch>
            <Route exact path="/dashboard/models" component={Table} />
            <Route
              exact
              path="/dashboard/websiteElement"
              component={WebsiteElements}
            />
            <Route exact path="/dashboard/addModel" component={AddModel} />
            <Route
              exact
              path="/dashboard/editModel/:id"
              component={UpdateModel}
            />
            <Route path="/dashboard" component={Welcome} />
          </Switch>
        </Content>
        <Footer>Footer</Footer>
      </Layout>
    </Layout>
  );
};

export default withAuthenticator(Dashboard);
