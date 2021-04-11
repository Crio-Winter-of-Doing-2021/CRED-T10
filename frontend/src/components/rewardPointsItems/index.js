import React from 'react';

const RewardPointsListItem = ({ name, handleClick, image, currentPoints }) => {
  return (
    <div className="card" style={styleCard}>
      <div className="card-image waves-effect waves-block waves-light">
        <img
          className="activator"
          src={image}
          style={{ height: '75px' }}
          alt="Sponsor Company"
        ></img>
      </div>
      <div className="card-content">
        <span className="card-title activator grey-text text-darken-4">
          Get voucher worth ₹ {name}
        </span>
        <div
          style={{
            display: 'flex',
            flexWrap: 'nowrap',
            justifyContent: 'space-around',
          }}
        >
          <span style={{ textAlign: 'left', color: '#ffae42' }}>
            {' '}
            {name} points
          </span>
          <button
            style={{
              heighbuttont: '35px',
              width: '90px',
              borderRadius: '8px',
              backgroundColor: '#f4f4f4',
              color: '#1f1f1f',
            }}
            onClick={handleClick}
            name={name}
            disabled={currentPoints < name}
          >
            Redeem
          </button>
        </div>
      </div>
    </div>
  );
};

const styleCard = {
  padding: '8px',
  width: '300px',
  height: '240px',
  margin: '10px',
  border: '1px solid #fff',
  backgroundColor: '#1F1F1F',
};

export default RewardPointsListItem;
