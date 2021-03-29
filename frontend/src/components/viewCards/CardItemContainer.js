import React, { useLayoutEffect, useState } from 'react';

import Card from '../card/Card';
import CardSmall from '../card/CardSmall';

const CardItemContainer = ({ card }) => {
  useLayoutEffect(() => {}, [window.innerWidth]);
  const [inputCalendar, setShowInputCalendar] = useState(false);

  const colorArr = [];
  const values = {};
  const arr = ['#93a1a1', '#073642', '#586e75', '#002b36'];

  const handleStatementClick = () => {
    setShowInputCalendar(!inputCalendar);
  };

  const handleViewSubmit = (e) => {
    const months = {
      Jan: '01',
      Feb: '02',
      Mar: '03',
      Apr: '04',
      May: '05',
      Jun: '06',
      Jul: '07',
      Aug: '08',
      Sep: '09',
      Oct: '10',
      Nov: '11',
      Dec: '12',
    };
    e.preventDefault();
    const val = e.target[0].valueAsDate.toString();
    console.log(months[val.split(' ')[1]] + val.split(' ')[3]);
    console.log('Submit');
  };
  /* #00b383 #93a1a1*/
  return (
    <div
      style={{
        backgroundColor: '#002b36',
        paddingTop: '10px',
        paddingBottom: '10px',
        boxShadow: '3px 3px #1f5361',
      }}
    >
      {window.innerWidth > 700 ? (
        <Card
          number={card[1]}
          name={card[0]}
          expiry={
            (card[2].toString().length === 1
              ? '0' + card[2].toString()
              : card[2].toString()) +
            '' +
            card[3].toString()
          }
          cvc={'000'}
          focused={'number'}
        />
      ) : (
        <CardSmall
          number={card[1]}
          name={card[0]}
          expiry={card[2] + card[3]}
          cvc={'000'}
          focused={'number'}
        />
      )}
      <div style={{ paddingTop: '5px', textAlign: 'center', color: '#f4f4f4' }}>
        Balance: {card[4]}
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',

          paddingTop: '10px',
        }}
      >
        <div style={{ margin: '2px' }}>
          <button
            style={{
              height: '40px',
              width: '100px',
              borderRadius: '8px',
              backgroundColor: '#0B2859',
              color: '#f4f4f4',
            }}
          >
            Smart View
          </button>
        </div>
        <div style={{ margin: '2px' }}>
          <button
            style={{
              height: '40px',
              width: '100px',
              borderRadius: '8px',
              backgroundColor: '#0B2859',
              color: '#f4f4f4',
            }}
            onClick={handleStatementClick}
          >
            Statements
          </button>
        </div>
        <div style={{ margin: '2px' }}>
          <button
            style={{
              height: '40px',
              width: '100px',
              borderRadius: '8px',
              backgroundColor: '#0B2859',
              color: '#f4f4f4',
            }}
            disabled={card[4] >= 0}
          >
            Pay {'  '}Bill
          </button>
        </div>
      </div>
      {inputCalendar ? (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div>
            <form action="#" onSubmit={handleViewSubmit}>
              <label htmlFor="calendar">Select mm/yy:</label>{' '}
              <input type="month" name="calendar" required></input>
              <button
                type="submit"
                style={{
                  marginLeft: '5px',
                  width: '50px',
                  borderRadius: '5px',
                }}
              >
                View
              </button>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default CardItemContainer;
