import React from "react";
import { Route, Routes, Link } from "react-router-dom";
import headerLogo from '../images/header__logo.svg';

function Header({ onSignOut, email }) {
  return (
    <header className="header">
      <div className="header__content">
        <img className="header__logo" src={headerLogo} alt="Логотип" />
        <Routes>
          <Route path="/sign-in" element={<Link to="/sign-up" className="header__link">Регистрация</Link>} />
          <Route path="/sign-up" element={<Link to="/sign-in" className="header__link">Войти</Link>} />
          <Route path="/" element={
            <div className="header__menu">
              <p className="header__email">{email}</p>
              <Link to="/sign-in" className="header__button" onClick={onSignOut}>Выйти</Link>
            </div>
          }
          />
        </Routes>
      </div>
    </header>
  );
};

export default Header;