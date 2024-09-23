import React from "react";
import { Layout, Menu, theme } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import {
  UserOutlined,
  ScheduleOutlined,
  AppstoreAddOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";
import { useAppSelector } from "../../redux/hooks";
import { useCurrentUser } from "../../redux/features/auth/authslice";

const { Header, Content, Sider } = Layout;

// Define the type for menu items
type MenuItem = {
  key: string;
  icon: React.ReactNode;
  label: string;
  path?: string;
  children?: MenuItem[];
};

const adminMenuItems: MenuItem[] = [
  {
    key: "profile",
    icon: <UserOutlined />,
    label: "Profile",
    path: "me",
  },
  {
    key: "services",
    icon: <AppstoreOutlined />,
    label: "Service Management",
    children: [
      {
        key: "services-create",
        icon: <AppstoreAddOutlined />,
        label: "Show Service",
        path: "services",
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
        label: "Create Slot",
        path: "slot/create",
      },
      {
        key: "slot-view",
        icon: <AppstoreAddOutlined />,
        label: "View Slots",
        path: "slot/view",
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
        label: "Booking Service",
        path: "user/booking",
      },
      {
        key: "update-role",
        icon: <UserOutlined />,
        label: "User Role Update",
        path: "user/role",
      },
    ],
  },
  {
    key: "home",
    icon: <UserOutlined />,
    label: "Home",
    path: "/",
  },
];

const userMenuItems: MenuItem[] = [
  {
    key: "profile",
    icon: <UserOutlined />,
    label: "Profile",
    path: "me",
  },
  {
    key: "past-bookings",
    icon: <UserOutlined />,
    label: "Past Bookings",
    path: "past-bookings",
  },
  {
    key: "upcoming-bookings",
    icon: <UserOutlined />,
    label: "Upcoming Bookings",
    path: "upcoming-bookings",
  },
  {
    key: "home",
    icon: <UserOutlined />,
    label: "Home",
    path: "/",
  },
];

const Dashboard: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const navigate = useNavigate();
  const currentUser = useAppSelector(useCurrentUser) ;

  // Determine if the user is an admin
  const isAdmin = currentUser?.role === 'ADMIN';

  // Filter menu items based on the user role
  const menuItems: MenuItem[] = isAdmin ? adminMenuItems : userMenuItems;

  // Handle navigation on menu item click
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleMenuClick = (menuInfo: any) => {
    const clickedItem = menuItems.find(item =>
      item.key === menuInfo.key || item.children?.find(child => child.key === menuInfo.key)
    );

    if (clickedItem?.path) {
      navigate(clickedItem.path);
    } else {
      const childItem = clickedItem?.children?.find(child => child.key === menuInfo.key);
      if (childItem?.path) {
        navigate(childItem.path);
      }
    }
  };

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
          onClick={handleMenuClick}
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
