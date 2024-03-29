import React, { useContext, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import AuthContext from '../../context/auth/authContext';

import TransactionList from './TransactionList';

const Statement = (props) => {
  const { cardId, month, year } = useParams();
  const location = useLocation();
  // const [cardNumber, setCardNumber] = useState(null);
  const authContext = useContext(AuthContext);

  useEffect(() => {
    authContext.loadUser();
    if (authContext.loading === false) {
      if (
        authContext.user.creditCards.includes(cardId) === false ||
        !location.state
      ) {
        console.log('Access Denied');
        props.history.push('/');
      }
    }
    // console.log(location);
    // eslint-disable-next-line
  }, [authContext.loading, props.history]);
  return (
    <div style={{ backgroundColor: '#e0e0e0', color: '#333' }}>
      <div>
        <h2>
          Statement For: {month}/{year}
        </h2>
      </div>
      {authContext.loading === false && location.state ? (
        <>
          {/* <div>{location.state}</div> */}
          <TransactionList locationState={location.state} />
        </>
      ) : null}
      {/* <div style={{display:'grid',gridTemplateColumns:'[first] 0.25fr }}>

      </div> */}
    </div>
  );
};

export default Statement;
