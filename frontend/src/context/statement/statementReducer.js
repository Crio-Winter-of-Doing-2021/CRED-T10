import { GET_TRANSACTIONS, SET_TRANSACTIONS } from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_TRANSACTIONS:
      return {
        ...state,
        month: action.payload[0],
        year: action.payload[1],
        cardId: action.payload[2],
      };
    case SET_TRANSACTIONS:
      return {
        ...state,
        transactions: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};
