import React, { Fragment, useContext, useState } from 'react';
import CardItemContainer from './CardItemContainer';

import CardContext from '../../context/card/cardContext';

const CardListItem = ({ card, cardPosition }) => {
  const [dropDown, setDropDown] = useState(false);
  const cardContext = useContext(CardContext);
  const {
    name,
    account_number,
    expiry_month,
    expiry_year,
    outstanding_amount,
  } = card;
  const cardInfo = [
    name,
    account_number,
    expiry_month,
    expiry_year,
    outstanding_amount,
  ];
  const handleDropDown = (e) => {
    console.log('dropdown');
    console.log(
      e.target.parentElement.parentElement.parentElement.parentElement.children
    );
    if (dropDown === false) {
      cardContext.setCurrentCard(card);
    } else {
      cardContext.setCurrentCard(null);
    }
    setDropDown(!dropDown);
  };
  // 888888
  return (
    <Fragment>
      <div
        style={{
          display: 'grid',
          backgroundColor: '#4d4d4d',
          margin: '10px',
          padding: '5px',
          color: '#f2f2f2',
          gridTemplateColumns:
            '[first] 1fr [second] 1fr [third] 1fr [fourth] 0.5fr [fifth]',
          columnGap: '0.2 fr',
          justifyItems: 'center',
          boxShadow: '2px 2px #888888',
        }}
      >
        <div
          style={{
            gridColumnStart: 'first',
            gridColumnEnd: 'second',
            padding: '2px',
          }}
        >
          {name.length > 10
            ? name.substring(0, 10).toUpperCase() + '...'
            : name.toUpperCase()}
        </div>
        <div
          style={{
            gridColumnStart: 'second',
            gridColumnEnd: 'third',
            padding: '2px',
          }}
        >
          {account_number.toString().substring(0, 4) +
            ' **** **** ' +
            account_number.toString().substring(11, 16)}
        </div>
        <div
          style={{
            gridColumnStart: 'third',
            gridColumnEnd: 'fourth',
            padding: '2px',
          }}
        >
          {expiry_month.toString().length === 1
            ? '0' + expiry_month.toString()
            : expiry_month}
          /{expiry_year}
        </div>
        <div
          style={{
            gridColumnStart: 'fourth',
            gridColumnEnd: 'fifth',
            padding: '2px',
            backgroundColor: 'f2f2f2',
          }}
        >
          <a onClick={handleDropDown} className="sideButtons" href="#">
            {!dropDown ? (
              <i className="fas fa-chevron-circle-down sideButtons"></i>
            ) : (
              <i className="fas fa-arrow-alt-circle-up sideButtons"></i>
            )}{' '}
            <span className="hide-sm">{!dropDown ? 'More...' : 'Less'}</span>
          </a>
        </div>
      </div>
      <div style={{ margin: '10px', padding: '5px', color: '#f2f2f2' }}>
        {dropDown ? (
          <CardItemContainer card={cardInfo} cardPosition={cardPosition} />
        ) : null}
      </div>
    </Fragment>
  );
};

export default CardListItem;
