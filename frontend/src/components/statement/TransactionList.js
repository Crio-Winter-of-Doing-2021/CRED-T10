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
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    if (loading === false) {
      transactions.map((transaction) => {
        sumTotalForMonth +=
          transaction.transaction_type === 'debit'
            ? transaction.amount
            : -1 * transaction.amount;

        return transaction;
        // setCounter(counter + 1);
      });
      console.log(loading, sumTotalForMonth);
      setSumForMonth(sumTotalForMonth);
    }
    // eslint-disable-next-line
  }, [loading]);

  return (
    <div>
      {loading === true ? (
        <div>Loading....</div>
      ) : (
        <div style={{ padding: '10px 5px' }}>
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
                    gridTemplateColumns: '0.2fr 1fr 1fr 0.5fr 0.5fr',
                    backgroundColor: '#1f1f1f',
                    color: '#f2f2f2',
                    margin: '5px',
                    padding: '5px 0px 5px 5px',
                  }}
                >
                  <div>{index + 1}</div>
                  <div>{capitalizeFirstLetter(transaction.category)}</div>
                  <div>{capitalizeFirstLetter(transaction.vendor)}</div>
                  <div>
                    {capitalizeFirstLetter(transaction.transaction_type)}
                  </div>
                  {transaction.transaction_type === 'debit' ? (
                    <div
                      style={{
                        color: '#dc3545',
                      }}
                    >
                      {'-  '}₹{transaction.amount}
                    </div>
                  ) : (
                    <div
                      style={{
                        color: '#28a745',
                      }}
                    >
                      {'+'}₹{transaction.amount}
                    </div>
                  )}
                </div>
              );
            })}
          <div>
            {statementContext.transactions.length === 0 ? (
              <div>No Transactions Found!</div>
            ) : null}
          </div>
          {sumForMonth === 0 ? (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                backgroundColor: '#1f1f1f',
                color: '#f2f2f2',
                margin: '5px',
                padding: '5px 0px 5px 5px',
              }}
            >
              <div>Total: </div> <div>{sumForMonth}</div>{' '}
            </div>
          ) : (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr',

                backgroundColor: '#1f1f1f',
                color: '#f2f2f2',
                margin: '15px 5px 5px 5px',
                padding: '5px 0px 5px 5px',
              }}
            >
              <div style={{ textAlign: 'center' }}>
                Outstanding Amount for this month:{' '}
                <span style={{ color: '#ffae42' }}>
                  {' '}
                  ₹<b>{sumForMonth}</b>
                </span>
              </div>
            </div>
          )}
        </div>
      )}
      <div
        style={{
          textAlign: 'center',
          // marginTop: '20px',
          paddingBottom: '10px',
        }}
      >
        <Link
          to={{
            pathname: '/',
            state: null,
          }}
        >
          <button
            style={{
              borderRadius: '8px',
              width: '90px',
              height: '35px',
              backgroundColor: '#333333',
              color: '#f2f2f2',
              fontWeight: 'normal',
              boxShadow: '#888 5px 5px 5px',
            }}
          >
            {' '}
            Go Back
          </button>
        </Link>
      </div>
    </div>
  );
};

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export default TransactionList;
