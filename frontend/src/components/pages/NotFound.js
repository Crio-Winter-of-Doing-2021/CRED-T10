import { useEffect, useContext } from 'react';
import AuthContext from '../../context/auth/authContext';
const NotFound = () => {
  const authContext = useContext(AuthContext);
  const { logout } = authContext;
  useEffect(() => {
    logout();
  }, []);
  return (
    <div>
      {' '}
      <p>You have wandered into the depths of universe!</p>{' '}
    </div>
  );
};

export default NotFound;
