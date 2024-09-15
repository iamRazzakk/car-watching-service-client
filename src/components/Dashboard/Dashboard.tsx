import React from 'react';
import { Layout, Menu, theme } from 'antd';
import {  NavLink, Outlet } from 'react-router-dom';
import DashboardServices from './services/DashboardServices';

const { Header, Content,  Sider } = Layout;
const items = [
  {
    name: 'Create A. Semester',
    path: 'services',
    element: <DashboardServices />,
  },
]
const dashBoardRouteGenerator = items?.map(
  (item, index) => ({
    key: String(index + 1),
    label: <NavLink to={`${item.path}`}>{item.name}</NavLink>,
  }),
);

const App: React.FC = () => {
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
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']} items={dashBoardRouteGenerator} />
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

export default App;