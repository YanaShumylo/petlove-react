import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

interface PublicRouteProps {
  restricted?: boolean; 
  children: React.ReactElement;
}

const PublicRoute = ({ restricted = false, children }: PublicRouteProps) => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated && restricted) {
    return <Navigate to="/profile" replace />;
  }

  return children;
};

export default PublicRoute;