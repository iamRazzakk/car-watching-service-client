import DashboardServices from '../components/Dashboard/services/DashboardServices';
import CreateSlot from '../components/Dashboard/Slot/CreateSlot';
import { Outlet } from 'react-router-dom';
import ViewAllSlote from '../components/Dashboard/Slot/ViewAllSlote';
import UserManagement from '../components/Dashboard/userManagement/UserManagement';
import ViewUserBookings from '../components/Dashboard/userManagement/ViewUserBookings';
// import CreateService from '../components/Dashboard/services/CreateService';

export const dashboardRouter = [
  {
    path: 'services',
    element: <DashboardServices />,
    children: [
      // {
      //   path: 'services',
      //   element: <CreateSlot />,
      // },
      // {
      //   path: 'create',
      //   element: <CreateService />,
      // },
    ],
  },
  {
    path: 'slot',
    element: <div><Outlet /></div>,
    children: [
      {
        path: 'create',
        element: <CreateSlot />,
      },
      {
        path: 'view',
        element: <ViewAllSlote />,
      },
    ],
  },
  {
    path: 'user',
    element: <div><Outlet /></div>,
    children: [
      {
        path: 'booking',
        element:  <ViewUserBookings />,
      },
      {
        path: 'role',
        element: <UserManagement />,
      },
    ],
  },
];
