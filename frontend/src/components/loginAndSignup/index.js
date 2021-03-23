import React, { useState } from 'react';
import Form from './Form';
import './index.css';

const LoginAndSignup = () => {
  const [isRegistered, setIsRegistered] = useState(false);
  const handleToggle = (e) => {
    e.preventDefault();
    setIsRegistered(!isRegistered);
  };
  return (
    <>
      <Form isRegistered={isRegistered} />
      <button onClick={handleToggle} className="toggle">
        {isRegistered === true ? 'New User ?' : 'Already Registered?  '}
      </button>
    </>
  );
};

export default LoginAndSignup;
