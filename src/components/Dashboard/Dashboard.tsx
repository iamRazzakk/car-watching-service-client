// src/layouts/Dashboard.tsx
import React from 'react';
import { Layout, Menu, theme } from 'antd';
import { NavLink, Outlet } from 'react-router-dom';
import {
  UserOutlined,
  ScheduleOutlined,
  AppstoreAddOutlined,
  AppstoreOutlined,
} from '@ant-design/icons';

const { Header, Content, Sider } = Layout;

// Define the menu items with sub-navigation
const menuItems = [
  {
    key: 'services',
    icon: <AppstoreOutlined />,
    label: <NavLink to="services">Service Management</NavLink>,
  },
  {
    key: 'slot',
    icon: <ScheduleOutlined />,
    label: 'Slot Management',
    children: [
      {
        key: 'slot-create',
        icon: <AppstoreAddOutlined />,
        label: <NavLink to="slot/create">Create Slot</NavLink>,
      },
      {
        key: 'slot-view',
        icon: <AppstoreAddOutlined />,
        label: <NavLink to="slot/view">View Slots</NavLink>,
      },
    ],
  },
  {
    key: 'home',
    icon: <UserOutlined />,
    label: <NavLink to="/">Home</NavLink>,
  },
];

const Dashboard: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: '100vh' }}>
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
          defaultSelectedKeys={['home']}
          items={menuItems}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: '24px 16px 0' }}>
          <div
            style={{
              padding: 24,
              minHeight: '100vh',
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
              boxSizing: 'border-box',
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
