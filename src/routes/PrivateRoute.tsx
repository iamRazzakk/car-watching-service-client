import { UserRole } from '../types/UserTypes/userTypes';
import { useAppSelector } from '../redux/hooks';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { RootState } from '../redux/store';

interface RoleProtectedRouteProps {
  allowedRoles: UserRole[];
  children: React.ReactNode;
}

export const PrivateRoute: React.FC<RoleProtectedRouteProps> = ({ allowedRoles, children }) => {
  const token = useAppSelector((state: RootState) => state.auth.token);
  const user = useAppSelector((state: RootState) => state.auth.user);
  
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/login', { replace: true });
    } else if (user && !allowedRoles.includes(user?.role as UserRole)) {
      navigate('/dashboard/me', { replace: true });
    }
  }, [token, user, allowedRoles, navigate]);

  // While navigating, render nothing
  if (!token || (user && !allowedRoles.includes(user?.role as UserRole))) {
    return null;
  }

  return <>{children}</>;
};
