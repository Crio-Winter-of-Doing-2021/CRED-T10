import {
  GET_CARDS,
  ADD_CARD,
  SET_CURRENT, // for viewing a particular card
  CLEAR_CURRENT, // remove from a view a particular card
  CLEAR_CARDS, // remove card list from memory/localStorage
  CARD_ERROR,
  CLEAR_ERRORS,
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_CARDS:
      return {
        ...state,
        loading: false,
        cardsLoading: false,
        cardList: action.payload.data,
      };
    case ADD_CARD:
      return {
        ...state,
        loading: true,
        cardsLoading: true,
      };
    case CLEAR_CARDS:
      return {
        ...state,
        loading: false,
        cardsLoading: true,
        cardList: [],
        card: null,
      };
    case SET_CURRENT:
      return {
        ...state,
        card: action.payload,
        loading: false,
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        loading: false,
        card: null,
      };
    case CARD_ERROR:
      return {
        ...state,
        cards: null,
        card: null,
        errors: ['error'],
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        errors: null,
      };
    default:
      return state;
  }
};
