import { NavLink } from 'react-router-dom';
import css from './Nav.module.css';

type NavProps = {
  isHome: boolean;
};

export default function Nav({ isHome }: NavProps) {
  const getClass = ({ isActive }: { isActive: boolean }) => 
    isHome
    ? isActive ? css.active : css.link
    : isActive ? css.activeBurger : css.linkBurger;
    
  return (
    <nav className={isHome ? css.nav : css.navBurger}>
      <NavLink to="/news" className={getClass} >News</NavLink>
      <NavLink to="/notices" className={getClass} >Find pet</NavLink>
      <NavLink to="/friends" className={getClass} >Our friends</NavLink>
    </nav>
  );
}