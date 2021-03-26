import React, { useEffect, useState, useLayoutEffect } from 'react';
import Login from './Login';
import Signup from './Signup';
// import './index.css';

const LoginAndSignup = () => {
  const [formType, setFormType] = useState('login');
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  useLayoutEffect(() => {
    if (!localStorage.getItem('formType')) {
      localStorage.setItem('formType', formType);
    } else {
      const val = localStorage.getItem('formType');
      setFormType(val);
    }
  }, [formType]);
  const handleToggle = (e) => {
    console.log(e);
    const valFormType = formType === 'login' ? 'signUp' : 'login';
    localStorage.setItem('formType', valFormType);
    setFormType(valFormType);
  };
  return (
    <div>
      <h1>{formType.toUpperCase()}</h1>
      {formType === 'login' && <Login user={user} setUser={setUser} />}
      {formType === 'signUp' && <Signup user={user} setUser={setUser} />}
      <button onClick={handleToggle} className="toggle">
        {formType === 'login' ? 'New User ?' : 'Already Registered?  '}
      </button>
    </div>
  );
};

export default LoginAndSignup;
