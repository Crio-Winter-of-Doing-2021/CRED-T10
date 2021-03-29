import axios from 'axios';
import { useReducer } from 'react';
import { GET_TRANSACTIONS, SET_TRANSACTIONS } from '../types';
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
    transactions: null,
    loading: true,
    errors: null,
  };

  const [state, dispatch] = useReducer(statementReducer, initialState);

  // Actions:
  // Get all the transaction from backend:
  const getTransactions = async (month, year, cardId, cardNumber) => {
    // Here locationState (this is done through react-router-dom useLocation hook which can be used to pass state while going to another link) contains the state value (here it is equivalent to card object as an array)
    //console.log(locationState);

    try {
      console.log(month, year, cardId, cardNumber, 'Params Check');
      console.log('getTransactions');
      const res = await axios.get(
        backendApi.local +
          `/api/cards/${cardNumber}/statements/${year}/${month}`
      );
      console.log(res.data);
      dispatch({
        type: GET_TRANSACTIONS,
        payload: [month, year, cardId],
      });
      setTransactions(res.data.statement.accountActivity.transactions);
    } catch (err) {
      console.log('errors here');
      console.log(err);
    }
  };

  // Set all the transactions to state and set loading to false
  const setTransactions = (transactions) => {
    console.log('Transactions set to state');
    dispatch({
      type: SET_TRANSACTIONS,
      payload: transactions,
    });
    console.log(transactions);
    // set transactions and loading=false in state
  };
  // clear errors if any
  const clearErrors = () => {
    console.log('Clear Transaction Errors');
  };
  //clear state
  const clearTransactions = () => {
    console.log('Clear State');
  };
  return (
    <StatementContext.Provider
      value={{
        month: state.month,
        year: state.year,
        cardId: state.cardId,
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
