import { useContext, useLayoutEffect } from 'react';
import AuthContext from '../../context/auth/authContext';
const About = () => {
  const authContext = useContext(AuthContext);
  useLayoutEffect(() => {
    authContext.loadUser();
    // eslint-disable-next-line
  }, []);
  return (
    <div>
      <h1>About this App</h1>
      <p className="my-1">
        This is a full stack app for Credit card management
      </p>
      <p className="bg-dark p">
        <strong>Version: 1.0.0</strong>
      </p>
    </div>
  );
};

export default About;
