import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Nav from '../Header/Nav/Nav';
import AuthNav from '../Header/AuthNav/AuthNav';
import UserNav from '../Header/UserNav/UserNav';
import css from './Header.module.css';

export default function Header() {
  const { isAuthenticated } = useAuth();
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const location = useLocation();
  const toggleMenu = () => setMenuOpen(prev => !prev);

  useEffect(() => {
  const handleResize = () => {
    if (window.innerWidth >= 1280) {
      setMenuOpen(false);
    }
  };

  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const isHome = location.pathname === '/';
  const isAuthPage =
    location.pathname === '/login' ||
    location.pathname === '/register';
  
  const burgerColorClass = isHome ? css.burgerWhite : css.burgerBlack;

  return (
    <header className={css.header}>
      <div className={css.container}>
        <Link to="/" className={css.logo}>
          {isHome ? (
            <svg width="106" height="28">
              <use href="/svg-sprite.svg#icon-logo-desk" />
            </svg>
          ) : (
            <svg width="105" height="28">
              <use href="/svg-sprite.svg#icon-logo-color-desk" /> 
              </svg>
          )}
      </Link>

        {/* планшет */}
      <nav className={css.desktopNav}>
      <Nav isHome={isHome}/>
        {isAuthenticated ? <UserNav /> : <AuthNav />}
        </nav>
        
        {/* компонент AuthNav на сторінці Логін та реєстрації на планшеті*/}
        {!isAuthenticated && isAuthPage && (
          <div className={css.tabletAuthNav}>
            <AuthNav />
          </div>
        )}

        {/* бургер меню на мобілці та планшеті */}
      <button className={`${css.burgerBtn} ${burgerColorClass}`} onClick={toggleMenu} aria-label="Open menu">
          <svg width="32" height="32">
          <use href="/svg-sprite.svg#icon-menu-burger" />
        </svg>
        </button>        
      </div>
      
      {menuOpen && (
        <div className={css.burgerMenu}>
          <button
      className={css.closeBtn}
      onClick={() => setMenuOpen(false)}
      aria-label="Close menu"
    >
      <svg width="24" height="24">
        <use href="/svg-sprite.svg#icon-cross-small" />
      </svg>
          </button>
          <div className={css.menuContent}>
            <Nav isHome={false} />
            <div className={css.menuAuth}>
          {isAuthenticated ? <UserNav /> : <AuthNav />}
            </div>
            </div>
          </div>
      )}      
    </header>
  );
}