import { useContext, useEffect, useState } from 'react';

import AuthContext from '../../context/auth/authContext';
import { LOGOUT } from '../../context/types';

const Login = (props) => {
  const authContext = useContext(AuthContext);

  const { login, error, clearErrors, isAuthenticated, logout } = authContext;

  useEffect(() => {
    let mounted = true;

    if (mounted && isAuthenticated) {
      props.history.push('/');
    } else {
      logout();
    }

    // if (error === 'Invalid Credentials') {
    //   //setAlert(error, 'danger');
    //   clearErrors();
    // }
    return () => (mounted = false);
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('login submit');
    const { email, password } = user;
    login({ email, password });
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
    <form
      className="form"
      onSubmit={handleSubmit}
      onInvalidCapture={handleInvalidCapture}
    >
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
  );
};

export default Login;
