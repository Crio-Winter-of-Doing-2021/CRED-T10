import React, { useContext, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

import StatementContext from '../../context/statement/statementContext';

const TransactionList = ({ locationState }) => {
  // Here the prop locationState is card object which is passed as a prop to this component.
  const [sumForMonth, setSumForMonth] = useState(0);
  // const [counter, setCounter] = useState(0);
  let sumTotalForMonth = 0;
  const { cardId, month, year } = useParams();
  const statementContext = useContext(StatementContext);
  const {
    getTransactions,
    loading,
    transactions,
    clearTransactions,
  } = statementContext;
  useEffect(() => {
    console.log('call the statement state here');
    console.log(locationState[0][1], cardId, month, year);
    getTransactions(month, year, cardId, locationState[0][1]);
    return () => {
      clearTransactions();
    };
  }, []);
  useEffect(() => {
    if (loading === false) {
      transactions.map((transaction) => {
        sumTotalForMonth +=
          transaction.transaction_type === 'debit'
            ? transaction.amount
            : -1 * transaction.amount;
        // setCounter(counter + 1);
      });
      console.log(loading, sumTotalForMonth);
      setSumForMonth(sumTotalForMonth);
    }
  }, [loading]);

  return (
    <>
      {loading === true ? (
        <div>Loading....</div>
      ) : (
        <div>
          {statementContext.transactions.length > 0 &&
            statementContext.transactions.map((transaction, index) => {
              // setSumTotalForMonth(
              //   sumTotalForMonth +
              //     (transaction.transaction_type === 'debit'
              //       ? transaction.amount
              //       : -1 * transaction.amount)
              // );
              // setCounter(counter + 1);
              return (
                <div
                  key={index}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '0.25fr 1fr 1fr 1fr 1fr',
                  }}
                >
                  <div>{index + 1}</div>
                  <div>{transaction.category}</div>
                  <div>{transaction.vendor}</div>
                  <div>{transaction.transaction_type}</div>
                  <div>{transaction.amount}</div>
                </div>
              );
            })}
          <div>
            {statementContext.transactions.length === 0 ? (
              <div>No Transactions Found!</div>
            ) : null}
          </div>
          {sumForMonth === 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
              <div>Total: </div> <div>{sumForMonth}</div>{' '}
            </div>
          ) : (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
              }}
            >
              <div>Total: </div>
              <div>{sumForMonth}</div>{' '}
            </div>
          )}
        </div>
      )}
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <Link
          to={{
            pathname: '/',
            state: null,
          }}
        >
          <button style={{ borderRadius: '8px' }}>
            {' '}
            <b> Go Back!</b>
          </button>
        </Link>
      </div>
    </>
  );
};

export default TransactionList;
