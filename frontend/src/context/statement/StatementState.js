import axios from 'axios';
import { useReducer } from 'react';
import {
  GET_TRANSACTIONS,
  SET_TRANSACTIONS,
  CLEAR_TRANSACTIONS,
} from '../types';
import StatementContext from './statementContext';
import statementReducer from './statementReducer';

const backendApi = {
  local: 'http://localhost:8081',
  hosted: 'http://localhost:8081',
};

const StatementState = (props) => {
  const initialState = {
    month: null,
    year: null,
    cardId: null,
    cardNumber: null,
    transactions: null,
    loading: true,
    errors: null,
  };

  const [state, dispatch] = useReducer(statementReducer, initialState);

  // Actions:
  // Get all the requirements for transactions for making an api call to backend:
  const getTransactions = async (month, year, cardId, cardNumber) => {
    dispatch({
      type: GET_TRANSACTIONS,
      payload: [month, year, cardId, cardNumber],
    });
    setTransactions(month, year, cardId, cardNumber);
  };

  // Get all the transactions, set it to state and set loading to false
  const setTransactions = async (month, year, cardId, cardNumber) => {
    try {
      console.log(month, year, cardId, cardNumber, 'Params Check');
      console.log('getting Transactions from backend');
      const res = await axios.get(
        backendApi.local +
          `/api/cards/${cardNumber}/statements/${year}/${month}`
      );
      console.log(res.data);
      dispatch({
        type: SET_TRANSACTIONS,
        payload: res.data.statement.accountActivity.transactions,
      });
      // setTransactions(res.data.statement.accountActivity.transactions);
    } catch (err) {
      console.log('errors here');
      console.log(err.msg);
      dispatch({
        type: SET_TRANSACTIONS,
        payload: [],
      });
    }
  };

  // clear errors if any
  const clearErrors = () => {
    console.log('Clear Transaction Errors');
  };
  //clear state
  const clearTransactions = () => {
    console.log('Clear State');
    dispatch({
      type: CLEAR_TRANSACTIONS,
    });
  };
  return (
    <StatementContext.Provider
      value={{
        month: state.month,
        year: state.year,
        cardId: state.cardId,
        cardNumber: state.cardNumber,
        transactions: state.transactions,
        loading: state.loading,
        errors: state.errors,
        getTransactions,
        setTransactions,
        clearErrors,
        clearTransactions,
      }}
    >
      {props.children}
    </StatementContext.Provider>
  );
};

export default StatementState;
