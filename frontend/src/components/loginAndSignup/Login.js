import { useContext } from 'react';

import AuthContext from '../../context/auth/authContext';

const Login = ({ user, setUser }) => {
  const authContext = useContext(AuthContext);
  const { login } = authContext;
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

export default Login;
