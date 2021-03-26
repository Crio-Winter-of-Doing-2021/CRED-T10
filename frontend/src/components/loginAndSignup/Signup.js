import React, { useEffect, useState, useLayoutEffect } from 'react';

const Signup = ({ user, setUser }) => {
  const isRegistered = false;
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
    console.log(isRegistered);
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
      {!isRegistered && (
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
      )}
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
      {!isRegistered && (
        <>
          <input
            type="password"
            name="confirmPassword"
            value={user.confirmPassword}
            placeholder="Confirm Password"
            onChange={onChange}
            maxLength={20}
            required
          />
        </>
      )}
      <>
        <button type="submit" className="formOptions">
          Submit
        </button>
        <button type="reset" className="formOptions">
          Reset
        </button>
      </>
    </form>
  );
};

export default Signup;
