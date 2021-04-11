import { useReducer } from 'react';
import paymentReducer from './paymentReducer';
import {
  GET_TOTAL_PAYMENT_DUE,
  PAY_AMOUNT,
  CLEAR_PAYMENT_STATE,
  CONFIRM_PAYMENT,
} from '../types';
import PaymentContext from './paymentContext';
import axios from 'axios';

const backendApi = {
  local: 'http://localhost:8081',
  hosted: 'http://localhost:8081',
};

const PaymentState = (props) => {
  const initialState = {
    maxPaymentAllowed: null,
    amountPaid: null,
    paymentConfirmation: false,
  };
  const [state, dispatch] = useReducer(paymentReducer, initialState);

  // Actions:
  // Get the max Payment for a card:
  const getMaxPayment = (maxPaymentAllowed) => {
    dispatch({
      type: GET_TOTAL_PAYMENT_DUE,
      payload: maxPaymentAllowed,
    });
    console.log('state.maxPaymentAllowed :', state.maxPaymentAllowed);
  };

  // set the amount Paid for a card
  const setAmountPaid = (setAmountPaid) => {
    dispatch({
      type: PAY_AMOUNT,
      payload: setAmountPaid,
    });
    console.log('set amount paid');
  };

  //confirm payment
  const confirmPayment = async (cardId) => {
    console.log(state.amountPaid);
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const data = { amount: state.amountPaid };
    // axios POST Method for paying the cards balance
    try {
      const res = await axios.post(
        backendApi.local + `/api/cards/${cardId}/pay`,
        data,
        config
      );
      console.log(res);
      dispatch({
        type: CONFIRM_PAYMENT,
      });
      console.log('payment done and dusted');
    } catch (err) {
      console.log(err);
      console.log('payment error');
    }

    // console.log('confirm payment');
  };

  // clear state
  const clearPayments = () => {
    dispatch({
      type: CLEAR_PAYMENT_STATE,
    });
    console.log('clear payments');
  };
  return (
    <PaymentContext.Provider
      value={{
        maxPaymentAllowed: state.maxPaymentAllowed,
        amountPaid: state.amountPaid,
        getMaxPayment,
        setAmountPaid,
        clearPayments,
        confirmPayment,
      }}
    >
      {props.children}
    </PaymentContext.Provider>
  );
};

export default PaymentState;
