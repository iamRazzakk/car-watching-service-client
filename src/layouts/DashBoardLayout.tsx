import { Outlet } from 'react-router-dom';
import Dashboard from '../components/Dashboard/Dashboard';

const DashBoardLayout = () => {
    return (
        <div>
            <Dashboard />
            <Outlet />

        </div>
    );
};

export default DashBoardLayout;