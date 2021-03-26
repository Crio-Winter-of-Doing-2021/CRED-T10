import { useContext, useEffect, useLayoutEffect } from 'react';
import ViewCards from '../viewCards/index';
import AddCard from '../addCard/index';
import AuthContext from '../../context/auth/authContext';

const Home = () => {
  const authContext = useContext(AuthContext);
  const { user, loading } = authContext;
  useLayoutEffect(() => {
    authContext.loadUser();
    // eslint-disable-next-line
  }, []);

  const onPageLoad = () => {};

  return (
    <div>
      {/* {!loading ? (
        <h1>Hello {user.firstName + user.lastName + '  '}!</h1>
      ) : null} */}
      <div>
        <AddCard />
      </div>
      <div>
        <ViewCards />
      </div>
    </div>
  );
};

export default Home;
