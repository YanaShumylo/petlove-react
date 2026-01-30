import { NavLink } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';

export default function UserBar() {
   const { user } = useAuth();

  return (
    <NavLink to="/profile">
      <img src={user?.avatar || '/default-avatar.png'} alt="avatar" />
      <span>{user?.name}</span>
    </NavLink>
  );
}