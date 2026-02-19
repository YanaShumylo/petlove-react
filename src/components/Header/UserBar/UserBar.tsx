import { NavLink } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import css from "./UserBar.module.css";

export default function UserBar() {
   const { user } = useAuth();

  return (
    <NavLink to="/profile" className={css.link}>
      <img className={css.image} src={user?.avatar || '/default-avatar.png'} alt="avatar" />
      <span className={css.name}>{user?.name}</span>
    </NavLink>
  );
}