import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classname';
import '../assets/styles/Header.scss';
import { Link } from 'react-router-dom';
import gravatar from '../ultils/gravatar';
import { logoutRequest } from '../actions';
import Favicon from '../assets/static/favicon.png';
import UserIcon from '../assets/static/user-icon.png';

const Header = (props) => {
  const { user, isLogin, isRegister } = props;
  const hasUser = Object.keys(user).length > 0;
  const handleLogout = () => {
    props.logoutRequest({});
  };

  const headerClass = classNames('header', {
    isLogin,
    isRegister,
  });

  return (
    <header className={headerClass}>
      <Link to='/'>
        <img className='header__img' src={Favicon} alt='Slogive' />
      </Link>
      <div className='header__menu'>
        <div className='header__menu--profile'>
          <img
            src={hasUser ? gravatar(user.email) : UserIcon}
            alt={user.email}
          />
          <p>Perfil</p>
        </div>
        <ul>
          {hasUser ? (
            <li>
              <Link to='/account'>{user.email}</Link>
            </li>
          ) : null}
          {hasUser ? (
            <li>
              <Link to='/' onClick={handleLogout}>
                Cerrar Sesión
              </Link>
            </li>
          ) : (
            <li>
              <Link to='/login'>Iniciar Sesión</Link>
            </li>
          )}
        </ul>
      </div>
    </header>
  );
};

Header.propTypes = {
  user: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = {
  logoutRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
