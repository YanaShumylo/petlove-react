import { NavLink } from 'react-router-dom';
import css from "./AuthNav.module.css"

export default function AuthNav() {
  return (
    <div className={css.authNav}>
      <NavLink to="/login" className={`${css.link} ${css.logoLink}`}>LOG IN</NavLink>
      <NavLink to="/register" className={`${css.link} ${css.registerLink}`}>REGISTRATION</NavLink>      
    </div>
  );
}