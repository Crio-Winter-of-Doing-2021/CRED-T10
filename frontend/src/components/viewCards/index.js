import React from 'react';
import Card from '../card/Card';

const ViewCards = () => {
  const values = {};
  return (
    <div>
      <div>You will view cards here</div>
      <Card
        number={values.number || '434'}
        name={values.name || 'Prateek Divyanshu'}
        expiry={values.expiry || '02/25'}
        cvc={values.cvc || '000'}
        focused={true}
      />
    </div>
  );
};

export default ViewCards;
