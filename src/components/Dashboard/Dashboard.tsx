// src/layouts/Dashboard.tsx
import React from "react";
import { Layout, Menu, theme } from "antd";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import {
  UserOutlined,
  ScheduleOutlined,
  AppstoreAddOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";

const { Header, Content, Sider } = Layout;

// Define the menu items with sub-navigation
const menuItems = [
  {
    key: "profile",
    icon: <UserOutlined />,
    label: <NavLink to="me">Profile</NavLink>,
  },
  {
    key: "services",
    icon: <AppstoreOutlined />,
    label: "Service Management",
    children: [
      {
        key: "services-create",
        icon: <AppstoreAddOutlined />,
        label: <NavLink to="services">Show Service</NavLink>,
      },
    ],
  },
  {
    key: "slot",
    icon: <ScheduleOutlined />,
    label: "Slot Management",
    children: [
      {
        key: "slot-create",
        icon: <AppstoreAddOutlined />,
        label: <NavLink to="slot/create">Create Slot</NavLink>,
      },
      {
        key: "slot-view",
        icon: <AppstoreAddOutlined />,
        label: <NavLink to="slot/view">View Slots</NavLink>,
      },
    ],
  },
  {
    key: "user",
    icon: <UserOutlined />,
    label: "User Management",
    children: [
      {
        key: "booking",
        icon: <UserOutlined />,
        label: <NavLink to="user/booking">Booking Service</NavLink>,
      },
      {
        key: "update-role",
        icon: <UserOutlined />,
        label: <NavLink to="user/role">User Role Update</NavLink>,
      },
    ],
  },
  {
    key: "home",
    icon: <UserOutlined />,
    label: <NavLink to="/">Home</NavLink>,
  },
];

const Dashboard: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const location = useLocation();

  // Determine the current selected menu item based on the route
  const currentKey = menuItems.find(item => {
    if (item.children) {
      return item.children.some(child => child.key === location.pathname.substring(1));
    }
    return item.key === location.pathname.substring(1);
  })?.key || "home";

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[currentKey]}
          items={menuItems}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: "24px 16px 0" }}>
          <div
            style={{
              padding: 24,
              minHeight: "100vh",
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
              boxSizing: "border-box",
            }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
