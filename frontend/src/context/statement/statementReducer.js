import {
  GET_TRANSACTIONS,
  SET_TRANSACTIONS,
  CLEAR_TRANSACTIONS,
} from '../types';

const statementReducer = (state, action) => {
  switch (action.type) {
    case GET_TRANSACTIONS:
      return {
        ...state,
        month: action.payload[0],
        year: action.payload[1],
        cardId: action.payload[2],
        cardNumber: action.payload[3],
      };
    case SET_TRANSACTIONS:
      return {
        ...state,
        transactions: action.payload,
        loading: false,
      };
    case CLEAR_TRANSACTIONS:
      return {
        ...state,
        month: null,
        year: null,
        cardId: null,
        cardNumber: null,
        transactions: null,
        loading: true,
        errors: null,
      };
    default:
      return state;
  }
};

export default statementReducer;

// export default (state, action) => {
//   switch (action.type) {
//     case GET_TRANSACTIONS:
//       return {
//         ...state,
//         month: action.payload[0],
//         year: action.payload[1],
//         cardId: action.payload[2],
//         cardNumber: action.payload[3],
//       };
//     case SET_TRANSACTIONS:
//       return {
//         ...state,
//         transactions: action.payload,
//         loading: false,
//       };
//     case CLEAR_TRANSACTIONS:
//       return {
//         ...state,
//         month: null,
//         year: null,
//         cardId: null,
//         cardNumber: null,
//         transactions: null,
//         loading: true,
//         errors: null,
//       };
//     default:
//       return state;
//   }
// };
