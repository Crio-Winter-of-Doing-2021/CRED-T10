import {
  GET_TOTAL_PAYMENT_DUE,
  PAY_AMOUNT,
  CLEAR_PAYMENT_STATE,
  CONFIRM_PAYMENT,
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_TOTAL_PAYMENT_DUE:
      return {
        ...state,
        maxPaymentAllowed: action.payload,
      };
    case PAY_AMOUNT:
      return {
        ...state,
        amountPaid: action.payload,
      };
    case CONFIRM_PAYMENT:
      return {
        ...state,
        paymentConfirmation: true,
      };
    case CLEAR_PAYMENT_STATE:
      return {
        maxPaymentAllowed: null,
        amountPaid: null,
        paymentConfirmation: false,
      };
    default:
      return state;
      break;
  }
};
