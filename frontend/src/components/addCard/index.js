import React, { useEffect, useState } from 'react';
import CreditCard from '../card/index';

const AddCard = () => {
  const [showInfo, setShowInfo] = useState(false);
  const [showAddCard, setShowAddCard] = useState(false);
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
  return (
    <div>
      {showAddCard ? (
        <div style={{ margin: '10px', border: '2px solid black' }}>
          <div style={{ float: 'right' }}>
            <a onClick={onAddButtonToggle} href="#">
              <i className="fas fa-times-circle"></i>{' '}
              <span className="hide-sm">Close</span>
            </a>
          </div>
          <CreditCard />
        </div>
      ) : (
        <div>
          <button onClick={onAddButtonToggle} className="btn">
            {' '}
            Add Cards
          </button>
          {'  '}
          <a onClick={handleInfoClick} href="#">
            <i className="fas fa-info-circle"></i>{' '}
            <span className="hide-sm">Info</span>
            {'   '}
          </a>
          {showInfo ? (
            <div className="info-card"> Add your credit cards here</div>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default AddCard;
