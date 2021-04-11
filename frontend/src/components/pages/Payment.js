import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
import { useLocation, useParams, Link } from 'react-router-dom'; // use Params is used to get the url parmater
import AuthContext from '../../context/auth/authContext';
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
    // eslint-disable-next-line
  }, [authContext.loading, props.history]);
  useLayoutEffect(() => {
    if (isBillPaid) {
      setTimeout(() => {
        setGifToImage(!gifToImage);
        paymentContext.confirmPayment(cardId);
      }, 2200);
      console.log(counter, 'counter');
    }
    // eslint-disable-next-line
  }, [isBillPaid]);
  // clearing out the payment state after component dismount
  useEffect(() => {
    return () => paymentContext.clearPayments();
    // eslint-disable-next-line
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
                  backgroundColor: '#e0e0e0',
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
                  backgroundColor: '#e0e0e0',
                  justifyContent: 'space-around',
                }}
              >
                <Link
                  to={{
                    pathname: '/',
                    state: null,
                  }}
                >
                  <button
                    onClick={paymentContext.clearPayments}
                    style={{
                      backgroundColor: '#1f1f1f',
                      color: '#e0e0e0',
                      padding: '5px',
                      marginBottom: '5px',
                      borderRadius: '8px',
                    }}
                  >
                    Go Back to Home
                  </button>
                </Link>
              </div>
            </div>
          ) : (
            <div
              style={{
                backgroundColor: '#e0e0e0',
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
        <div
          style={{
            color: '#f2f2f2',
            backgroundColor: '#1f1f1f',
            textAlign: 'center',
          }}
        >
          <div style={{ fontSize: '30px' }}>
            <h3>Bill Payment</h3>
          </div>
          <form onSubmit={handlePaymentSubmit}>
            <label
              htmlFor="amountToPay "
              style={{
                marginRight: '10px',
                fontSize: '20px',
                paddingTop: '5px',
              }}
            >
              Amount :{' '}
            </label>{' '}
            <input
              type="number"
              name="amountToPay"
              style={{
                height: '30px',
                borderRadius: '5px',
                textAlign: 'center',
                padding: '5px',
              }}
              min={1}
              max={Math.abs(paymentContext.maxPaymentAllowed)}
              value={amount}
              onChange={handleAmountChange}
            />
            {'  '}
            <div>
              <button
                type="submit"
                style={{ borderRadius: '8px', padding: '2px', width: '60px' }}
              >
                <b>Pay</b>
              </button>
            </div>
          </form>
          {/* <div>{location}</div> */}
          <div
            style={{
              backgroundColor: '#000',
              marginTop: '15px',
              paddingTop: '10px',
              textAlign: 'left',
            }}
          >
            <span>Outstanding Amount:</span>{' '}
            <span style={{ color: '#ffae42' }}>
              {' '}
              ₹<b>{paymentContext.maxPaymentAllowed} </b>
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default Payment;
