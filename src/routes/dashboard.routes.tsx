import DashboardServices from '../components/Dashboard/services/DashboardServices';
import CreateSlot from '../components/Dashboard/Slot/CreateSlot';
import { Outlet } from 'react-router-dom';

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
        element: <h1>View all slot</h1>,
      },
    ],
  },
];
