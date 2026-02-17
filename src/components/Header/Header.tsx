import { useState, useEffect } from 'react';
import {  Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Nav from '../Header/Nav/Nav';
import AuthNav from '../Header/AuthNav/AuthNav';
import css from './Header.module.css';
import LogOutBtn from './LogOutBtn/LogOutBtn';

export default function Header() {
  const { isAuthenticated, user } = useAuth();
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isTablet, setIsTablet] = useState(window.innerWidth >= 768 && window.innerWidth < 1280);
  const toggleMenu = () => setMenuOpen(prev => !prev);

  
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1280);
      
    if (window.innerWidth >= 1280) {
      setMenuOpen(false);
    }
  };

  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const isHome = location.pathname === '/';
  
  const burgerColorClass = isHome ? css.burgerWhite : css.burgerBlack;

  return (
    <header className={`${css.header} ${isHome ? css.homeHeader : ''}`}>
      <div className={css.container}>
        {/* логотип */}
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

        {/* компютерна версія тільки навігація */}
        <nav className={css.desktopNav}>
      <Nav isHome={isHome}/>
        </nav>       
      
        {/* {лише аватарка в хедері на мобілці} */}
        {isAuthenticated && isMobile && (
          <Link to="/profile" className={css.mobileUser}>
            <img
              src={user?.avatar || '/default-avatar.png'}
              alt="avatar"
              className={css.avatar}
            />
          </Link>
        )}

         {/* на планшеті в хедері лише ім'я та аватарка лоагут або логін/регістрація */}
        {isTablet && (
  <div className={css.tabletHeader}>
            {isAuthenticated ? (
              <>
             <LogOutBtn />
          <Link to="/profile" className={css.userInfo}>
            <img
              src={user?.avatar || '/default-avatar.png'}
              alt="avatar"
              className={css.avatar}
            />
            <p className={css.name}>{user?.name}</p>
          </Link>               
              </> ) : (
      <AuthNav />
            )}     
  </div>
)}
        
        {/* {на  комп'ютері в хедері кнопка Логаут + аватарка + імя} */}
{!isMobile && !isTablet && (
  <>
    {!isAuthenticated  && (
      <div className={css.desktopAuthNav}>
        <AuthNav />
      </div>
    )}

    {isAuthenticated && (
      <div className={css.desktopHeaderUser}>
        <LogOutBtn />
        <Link to="/profile" className={css.userInfo}>
          <img
            src={user?.avatar || '/default-avatar.png'}
            alt="avatar"
            className={css.avatar}
          />
          <p className={css.name}>{user?.name}</p>
        </Link>
      </div>
    )}
  </>
)}

        {/* бургер меню на мобілці та планшеті*/}
        {(isMobile || isTablet) && (
          <button className={`${css.burgerBtn} ${burgerColorClass}`} onClick={toggleMenu} aria-label="Open menu">
            <svg width="32" height="32">
              <use href="/svg-sprite.svg#icon-menu-burger" />
            </svg>
          </button>
        )}  
      </div>
      
      {/* контент бургер меню */}
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
          {isAuthenticated ? <LogOutBtn/> : <AuthNav />}
            </div>
            </div>
          </div>
      )}      
    </header>
  );
}