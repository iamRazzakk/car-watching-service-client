import DashboardServices from '../components/Dashboard/services/DashboardServices';
import CreateSlot from '../components/Dashboard/Slot/CreateSlot';
import { Outlet } from 'react-router-dom';
import ViewAllSlote from '../components/Dashboard/Slot/ViewAllSlote';

export const dashboardRouter = [
  {
    path: 'services',
    element: <DashboardServices />,
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
        path: 'create',
        element:  <h1>create user</h1>,
      },
      {
        path: 'view',
        element: <h1>view user</h1>,
      },
    ],
  },
];
