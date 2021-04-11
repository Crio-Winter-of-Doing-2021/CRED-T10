import React from 'react';
import Styles from './Styles';
import { Form, Field } from 'react-final-form';

import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate,
} from './cardUtils';
import CardSmall from './CardSmall';

// const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const CreditCard = ({ handleAddCard }) => {
  const onSubmit = async (values) => {
    //console.log(e);
    handleAddCard(values);
    // await sleep(300);
    // console.log('adding card');
    // console.log(values);
    // window.alert(JSON.stringify(values, 0, 2));
  };
  return (
    <Styles>
      <Form
        onSubmit={onSubmit}
        render={({
          handleSubmit,
          form,
          submitting,
          pristine,
          values,
          active,
        }) => {
          return (
            <form onSubmit={handleSubmit}>
              {/* {window.innerWidth > 700 ? (
              <Card
                number={values.number || ''}
                name={values.name || ''}
                expiry={values.expiry || ''}
                cvc={values.cvc || ''}
                focused={active}
              />
            ) : ( */}
              <CardSmall
                number={values.number || ''}
                name={values.name || ''}
                expiry={values.expiry || ''}
                cvc={values.cvc || ''}
                focused={active}
              />
              <div>
                <Field
                  name="number"
                  component="input"
                  type="text"
                  pattern="[\d| ]{16,22}"
                  placeholder="Card Number"
                  format={formatCreditCardNumber}
                  required
                />
              </div>
              <div>
                <Field
                  name="name"
                  component="input"
                  type="text"
                  placeholder="Name"
                  required
                />
              </div>
              <div>
                <Field
                  name="expiry"
                  component="input"
                  type="text"
                  pattern="\d\d/\d\d"
                  placeholder="Valid Thru"
                  format={formatExpirationDate}
                  required
                />
                <Field
                  name="cvc"
                  component="input"
                  type="text"
                  pattern="\d{3,4}"
                  placeholder="CVC"
                  format={formatCVC}
                  required
                />
              </div>
              <div className="buttons">
                <button type="submit" disabled={submitting}>
                  Submit
                </button>
                <button
                  type="button"
                  onClick={form.reset}
                  disabled={submitting || pristine}
                >
                  Reset
                </button>
              </div>
            </form>
          );
        }}
      />
    </Styles>
  );
};

export default CreditCard;
