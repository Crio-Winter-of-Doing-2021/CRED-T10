import axios from 'axios';
import { useReducer } from 'react';
import cardReducer from './cardReducer';
import CardContext from './cardContext';
import {
  GET_CARDS,
  ADD_CARD,
  SET_CURRENT, // for viewing a particular card
  CLEAR_CURRENT, // remove from a view a particular card
  CLEAR_CARDS, // remove card list from memory/localStorage
  CARD_ERROR,
  CLEAR_ERRORS,
} from '../types';
import setAuthToken from '../../utils/setAuthToken';

const backendApi = {
  local: 'http://localhost:8081',
  hosted: 'http://localhost:8081',
};

const CardState = (props) => {
  const initialState = {
    cardList: null,
    card: null,
    cardsLoading: true,
    errors: null,
    loading: true,
  };
  const [state, dispatch] = useReducer(cardReducer, initialState);

  // Actions:

  // get all cards of user
  const getAllCards = async () => {
    try {
      const res = await axios.get(backendApi.local + '/api/cards');
      dispatch({ type: GET_CARDS, payload: res });
      console.log(res.data, 'Here it is');
    } catch (err) {
      dispatch({ type: CARD_ERROR });
    }
  };
  // remove all cards of user
  const removeAllCards = () => {
    dispatch({
      type: CLEAR_CARDS,
    });
    console.log('Remove all cards');
  };
  // add card
  const addCard = async (cardObject) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const res = await axios.post(
        backendApi.local + '/api/cards',
        cardObject,
        config
      );
      dispatch({ type: ADD_CARD, payload: res });
      console.log(res.data);
      getAllCards();
    } catch (err) {
      console.log(err.response);
      if (err.response.status === 500) {
        dispatch({
          type: CARD_ERROR,
          payload: err.response.data.msg.message,
        });
      } else {
        dispatch({
          type: CARD_ERROR,
          payload: err.response.data.msg,
        });
      }
    }
  };
  // set current card for viewing (it's details)
  const setCurrentCard = (card) => {
    console.log(card);
    console.log('Set Current Card');
    dispatch({
      type: SET_CURRENT,
      payload: card,
    });
  };
  // remove current card from viewing (it's details)
  const removeCurrentCard = () => {
    console.log('Remove current Card');
  };
  // clear card errors
  const clearCardErrors = () => {
    console.log('Clear Card Errors if any');
    dispatch({
      type: CLEAR_ERRORS,
    });
  };

  return (
    <CardContext.Provider
      value={{
        cardList: state.cardList,
        card: state.card,
        loading: state.loading,
        errors: state.errors,
        cardsLoading: state.cardsLoading,
        getAllCards,
        removeAllCards,
        addCard,
        setCurrentCard,
        removeCurrentCard,
        clearCardErrors,
      }}
    >
      {props.children}
    </CardContext.Provider>
  );
};

export default CardState;

//
//[hotel,...,x] = categoriesNames
//[0,1,...,x_count] =categoriesCount
//[1000,2000...,x_amount] = categoriesAmount

//[amazon,] = vendorsNames
//[0,1,...] = vendorsCount
//[100,3000,...] = vendorsAmount
