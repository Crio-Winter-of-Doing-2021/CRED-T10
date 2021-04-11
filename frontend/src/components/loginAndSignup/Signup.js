import React, { useEffect, useState, useContext } from 'react';
import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';
import Alerts from '../layout/Alerts';
const Signup = (props) => {
  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);
  const { register, isAuthenticated, logout, clearErrors, error } = authContext;
  const { setAlert } = alertContext;
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  useEffect(() => {
    let mounted = true;
    if (mounted && isAuthenticated) {
      props.history.push('/');
    } else {
      logout();
    }
    if (error === 'User already exists') {
      setAlert(error, 'danger');
      clearErrors();
    }
    return () => (mounted = false);
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    if (e.target.name === 'confirmPassword') {
      if (e.target.value !== user.password) {
        e.target.setCustomValidity('Passwords do not match');
      } else {
        e.target.setCustomValidity('');
      }
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(user);
    delete user.confirmPassword;
    console.log(user);
    register(user);
    setUser({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    });
  };
  const handleInvalidCapture = (err) => {
    console.log(err.target.name);
  };
  return (
    <>
      {!error && <Alerts />}
      <form
        className="form lessWide"
        onSubmit={handleSubmit}
        onInvalidCapture={handleInvalidCapture}
      >
        <>
          <input
            type="text"
            placeholder="First Name"
            name="firstName"
            value={user.firstName}
            onChange={onChange}
            required
            maxLength={20}
          />
          <input
            type="text"
            placeholder="Last Name"
            name="lastName"
            value={user.lastName}
            onChange={onChange}
            required
            maxLength={20}
          />
        </>
        <>
          <input
            type="email"
            name="email"
            value={user.email}
            placeholder="Email"
            onChange={onChange}
            required
            maxLength={35}
          />
          <input
            type="password"
            name="password"
            value={user.password}
            placeholder="Password"
            onChange={onChange}
            maxLength={20}
            minLength={6}
            required
          />
        </>
        <>
          <input
            type="password"
            name="confirmPassword"
            value={user.confirmPassword}
            placeholder="Confirm Password"
            onChange={onChange}
            maxLength={20}
            minLength={6}
            required
          />
        </>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button
            type="submit"
            className="formOptions"
            style={{
              margin: '5px',
              borderRadius: '5px',
              width: '75px',
              backgroundColor: '#f4f4f4',
            }}
          >
            Submit
          </button>
          <button
            type="reset"
            className="formOptions"
            style={{
              margin: '5px',
              borderRadius: '5px',
              width: '75px',
              backgroundColor: '#f4f4f4',
            }}
          >
            Reset
          </button>
        </div>
      </form>
    </>
  );
};

export default Signup;
