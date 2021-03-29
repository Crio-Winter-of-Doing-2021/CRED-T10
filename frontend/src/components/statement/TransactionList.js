import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import StatementContext from '../../context/statement/statementContext';

const TransactionList = ({ locationState }) => {
  // Here the prop locationState is card object which is passed as a prop to this component.
  const [sumForMonth, setSumForMonth] = useState(0);
  // const [counter, setCounter] = useState(0);
  let sumTotalForMonth = 0;
  const { cardId, month, year } = useParams();
  const statementContext = useContext(StatementContext);
  const { getTransactions, loading, transactions } = statementContext;
  useEffect(() => {
    console.log('call the statement state here');
    console.log(locationState[0][1], cardId, month, year);
    getTransactions(month, year, cardId, locationState[0][1]);
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
          {statementContext.transactions.map((transaction, index) => {
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
    </>
  );
};

export default TransactionList;
