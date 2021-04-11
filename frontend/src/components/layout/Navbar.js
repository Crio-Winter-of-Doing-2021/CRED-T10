import { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import AuthContext from '../../context/auth/authContext';

import './navbar.css';

const Navbar = ({ icon, title }) => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, user, logout } = authContext;
  const onLogout = (e) => {
    logout();
  };
  const userLinks = (
    <ul>
      <li>Hello {user && user.firstName}!</li>
      <li>
        <Link to="/about">About</Link>
      </li>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/rewardPoints">Rewards</Link>
      </li>
      <li>
        <a onClick={onLogout} href="#">
          <i className="fas fa-sign-out-alt"></i>{' '}
          <span className="hide-sm">Logout</span>
        </a>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <Link to="/login">Login</Link>
      </li>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/about">About</Link>
      </li>
    </ul>
  );

  return (
    <div
      className="navbar bg-primary"
      style={{ backgroundColor: '#000', borderColor: '#000' }}
    >
      <h1>
        <img
          src="https://web-assets.cred.club/_next/assets/images/home-page/cred-logo.png"
          style={{ width: '40px', height: '60px' }}
        />
        {/* <i className={icon} /> {title} */}
      </h1>
      <ul>{isAuthenticated ? userLinks : guestLinks}</ul>
    </div>
  );
};
Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
};

Navbar.defaultProps = {
  title: 'CRED',
  icon: 'fas fa-credit-card',
};

export default Navbar;
