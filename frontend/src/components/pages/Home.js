import { useContext, useEffect, useLayoutEffect, useState } from 'react';
import ViewCards from '../viewCards/index';
import AddCard from '../addCard/index';
import Alerts from '../layout/Alerts';
import AuthContext from '../../context/auth/authContext';
import Greet from '../extras/Greet';

const Home = () => {
  const [showHello, setShowHello] = useState(false);
  const authContext = useContext(AuthContext);
  const { user, userLoading } = authContext;

  useLayoutEffect(() => {
    authContext.loadUser();

    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    setShowHello(!showHello);
    return () => {
      setShowHello(false);
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div style={{ padding: '10px' }}>
      <Alerts />
      {!userLoading
        ? showHello && (
            <div style={{ textAlign: 'center' }}>
              <Greet
                setShowHello={setShowHello}
                showHello={showHello}
                user={user}
              />
            </div>
            // <h1
            //   onClick={() => setShowHello(!showHello)}
            //   onLoad={() => setTimeout(() => setShowHello(false), 1000)}
            // >
            //   Hello {user.firstName + user.lastName + '  '}!
            // </h1>
          )
        : null}
      <div>
        <ViewCards />
      </div>
      <div style={{ textAlign: 'center' }}>
        <AddCard />
      </div>
    </div>
  );
};

export default Home;
