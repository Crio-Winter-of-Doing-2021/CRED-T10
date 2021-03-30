import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
import { useLocation, useParams, Link } from 'react-router-dom'; // use Params is used to get the url parmater
import AuthContext from '../../context/auth/authContext';
import CardContext from '../../context/card/cardContext';
import PaymentContext from '../../context/payment/paymentContext';

import CheckMarkGIF from '../static/checkMark.gif';
import CheckMarkFinal from '../static/checkMarkFinal.png';

const Payment = (props) => {
  const [isBillPaid, setIsBillPaid] = useState(false);
  const [gifToImage, setGifToImage] = useState(false);
  const [amount, setAmount] = useState(0);
  const authContext = useContext(AuthContext);
  const paymentContext = useContext(PaymentContext);
  const { cardId } = useParams();
  const location = useLocation();

  const counter = 0;
  // we are calling useLayout Effect on every change of authContext.loading and props.history (the last one because it gives error if not written in the array)
  useLayoutEffect(() => {
    authContext.loadUser(); // load user
    // check if the user is loaded not before
    if (isBillPaid === false && authContext.loading === false) {
      // Here in the below if we check if the user is a valid user, check state of the location, and verify if user is accessing his own card or not.
      // Since payment route is of high security therefore we don't allow user to access the same payment portal through any other tab (if the user tries to we redirect him to his dashboard)
      //@Still-to-solve: What if user opens two payment portals: (i think at one time user should be only allowed to open 1 payment route)
      // here we check if someone has just copy pasted the link and tried to access
      if (
        authContext.user.creditCards.includes(cardId) === false ||
        !location.state
      ) {
        // as the current user does not have access to this particular cardId we send the user back to Home
        console.log('user cannot access');
        props.history.push('/');
      } else {
        console.log('RIGHT NOW', location.state[0][4]);
        paymentContext.getMaxPayment(Math.abs(location.state[0][4]));
        console.log('RIGHT NOW', location.state[0]);
      }
    }
  }, [authContext.loading, props.history]);
  useLayoutEffect(() => {
    if (isBillPaid) {
      setTimeout(() => {
        setGifToImage(!gifToImage);
        paymentContext.confirmPayment(cardId);
      }, 2200);
      console.log(counter, 'counter');
    }
  }, [isBillPaid]);
  // clearing out the payment state after component dismount
  useEffect(() => {
    return () => paymentContext.clearPayments();
  }, []);
  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    console.log('Paid');
    setIsBillPaid(!isBillPaid);
    // setTimeout(() => (setGifToImage(!gifToImage), 4000));
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
    paymentContext.setAmountPaid(Number(e.target.value));
  };

  return (
    <>
      {isBillPaid ? (
        <>
          {gifToImage ? (
            <div>
              <div
                style={{
                  // display: 'flex',
                  backgroundColor: '#f2f2f2',
                  // width: '325px',
                  // justifyContent: 'center',
                  textAlign: 'center',
                }}
              >
                <img
                  src={CheckMarkFinal}
                  alt="checkMarkFinal"
                  style={{
                    width: '300px',
                  }}
                />
              </div>
              <div
                style={{
                  display: 'flex',
                  backgroundColor: 'lightblue',
                  justifyContent: 'space-around',
                }}
              >
                <p>Go Back To Home!{'  '}</p>
                <Link
                  to={{
                    pathname: '/',
                    state: null,
                  }}
                >
                  <button onClick={paymentContext.clearPayments}>Home!</button>
                </Link>
              </div>
            </div>
          ) : (
            <div
              style={{
                backgroundColor: '#f2f2f2',
                textAlign: 'center',
              }}
            >
              <img
                src={CheckMarkGIF}
                alt="checkMarkGIF"
                style={{ width: '300px' }}
                loading="lazy"
              />
            </div>
          )}
        </>
      ) : (
        <div style={{ color: '#f2f2f2', backgroundColor: 'hotpink' }}>
          <div style={{ fontSize: '30px' }}>
            <b>Pay Amount</b>
          </div>
          <form onSubmit={handlePaymentSubmit}>
            <label htmlFor="amountToPay">Pay: </label>
            <input
              type="number"
              name="amountToPay"
              style={{ height: '30px', borderRadius: '5px' }}
              min={1}
              max={Math.abs(paymentContext.maxPaymentAllowed)}
              value={amount}
              onChange={handleAmountChange}
            />
            {'  '}
            <button
              type="submit"
              style={{ borderRadius: '8px', padding: '2px' }}
            >
              <b>Pay Now!</b>
            </button>
          </form>
          {/* <div>{location}</div> */}
        </div>
      )}
    </>
  );
};

export default Payment;
