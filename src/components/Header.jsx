import React from 'react';
import '../assets/styles/Header.scss';
import Favicon from '../assets/static/favicon.png';
import UserIcon from '../assets/static/user-icon.png';

const Header = () => {
  return (
    <header className='header'>
      <img className='header__img' src={Favicon} alt='Slogive' />
      <div className='header__menu'>
        <div className='header__menu--profile'>
          <img src={UserIcon} alt='' />
          <p>Perfil</p>
        </div>
        <ul>
          <li>
            <a href='/'>Cuenta</a>
          </li>
          <li>
            <a href='/'>Cerrar Sesión</a>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
