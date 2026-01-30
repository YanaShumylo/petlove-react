import { NavLink } from 'react-router-dom';
import css from './Nav.module.css';

type NavProps = {
  isHome: boolean;
};

export default function Nav({ isHome }: NavProps) {
  const getClass = ({ isActive }: { isActive: boolean }) => {
    if (window.innerWidth >= 1440 && !isHome) {
    // стилі для всіх сторінок 
      return isActive ? css.activeBurger : css.linkBurger;
    }
    // стилі на домашню сторінку
    return isActive ? css.active : css.link;
  };
  return (
    <nav className={window.innerWidth >= 1440 && !isHome ? css.navBurger : css.nav}>
      <NavLink to="/news" className={getClass} >News</NavLink>
      <NavLink to="/notices" className={getClass} >Find pet</NavLink>
      <NavLink to="/friends" className={getClass} >Our friends</NavLink>
    </nav>
  );
}