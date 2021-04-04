import React, { Fragment, useContext, useEffect, useLayoutEffect } from 'react';

import CardContext from '../../context/card/cardContext';
import AuthContext from '../../context/auth/authContext';

import CardListItem from './CardListItem';

const ViewCards = () => {
  const cardContext = useContext(CardContext);
  const { getAllCards, cardList, loading, removeAllCards } = cardContext;
  useEffect(() => {
    getAllCards();
    return () => removeAllCards();
  }, []);
  const values = {};
  if (cardList !== null && cardList.length === 0 && !loading) {
    return (
      <Fragment>
        {/* <div>View Cards</div> */}
        <h3 style={{ textAlign: 'center', color: '#f4f4f4' }}>
          Please add a Card!
        </h3>
      </Fragment>
    );
  }
  /* #93a1a1*/
  return (
    <div style={{ backgroundColor: ' #e0e0e0' }}>
      <div>
        {' '}
        <h2> View Cards</h2>
      </div>
      <div>
        {cardList !== null && !loading ? (
          <Fragment>
            {cardList.map((card, index) => {
              return (
                <CardListItem key={index} card={card} cardPosition={index} />
              );
            })}
          </Fragment>
        ) : null}
      </div>
    </div>
  );
};

export default ViewCards;
