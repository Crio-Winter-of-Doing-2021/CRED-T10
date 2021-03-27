import React, { useEffect, useLayoutEffect, useState, useContext } from 'react';

import CreditCard from '../card/index';

import CardContext from '../../context/card/cardContext';

const AddCard = () => {
  const [showInfo, setShowInfo] = useState(false);
  const [showAddCard, setShowAddCard] = useState(false);
  const cardContext = useContext(CardContext);
  const { addCard } = cardContext;

  // useLayoutEffect(() => {}, [window.innerWidth > 700]);
  const closeInfo = () => {
    setTimeout(() => {
      console.log('here');
      setShowInfo(false);
    }, 2500);
  };
  useEffect(() => {
    if (showInfo) {
      closeInfo();
    }
  }, [showInfo]);
  const onAddButtonToggle = () => {
    setShowAddCard(!showAddCard);
  };

  const handleInfoClick = () => {
    console.log('show info');
    setShowInfo(!showInfo);
  };

  const handleAddCard = (values) => {
    //console.log(values);
    const tmpNumber = values.number.split(' ');
    let tmpNumberAsString = '';
    tmpNumber.map((elem) => {
      tmpNumberAsString += elem;
      return elem;
    });
    const cardObject = {
      cardName: values.name,
      cardNumber: Number(tmpNumberAsString),
      expiryMonth: Number(values.expiry.split('/')[0]),
      expiryYear: Number(values.expiry.split('/')[1]),
      cvv: values.cvc,
    };
    addCard(cardObject);
    setTimeout(setShowAddCard(!showAddCard), 1000);
  };
  return (
    <div>
      {showAddCard ? (
        <div
          style={{
            margin: '10px',
            border: '2px solid black',
            backgroundColor: '#586e75',
            boxShadow: '3px 3px #888888',
          }}
        >
          <div style={{ float: 'right' }} className="sideButtons">
            <a onClick={onAddButtonToggle} href="#">
              <i className="fas fa-times-circle sideButtons"></i>{' '}
              <span className="hide-sm sideButtons">Close</span>
            </a>
          </div>
          <div>
            <h2 className="light-text-color">Add Credit Card</h2>
            <CreditCard handleAddCard={handleAddCard} />
          </div>
        </div>
      ) : (
        <div>
          <button
            onClick={onAddButtonToggle}
            className="btn"
            style={{ borderRadius: '12px' }}
          >
            {' '}
            Add Cards
          </button>
          {'  '}
          <a onClick={handleInfoClick} href="#" className="sideButtons">
            <i className="fas fa-info-circle sideButtons"></i>{' '}
            <span className="hide-sm sideButtons">Info</span>
            {'   '}
          </a>
          {showInfo ? (
            <span
              className="info-card light-text-color"
              style={{ backgroundColor: '#000' }}
            >
              {' '}
              Add your credit cards here
            </span>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default AddCard;
