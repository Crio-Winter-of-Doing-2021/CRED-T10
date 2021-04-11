import React, { Fragment, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import RewardPointsListItem from '../rewardPointsItems/index';
import Alerts from '../layout/Alerts';

import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';

import flipkartImage from '../static/flipkart.svg';
import amazonImage from '../static/amazon.svg';
import swiggyImage from '../static/swiggy.svg';
import zomatoImage from '../static/zomato.svg';
import netflixImage from '../static/netflix.svg';
import trivagoImage from '../static/trivago.svg';

const backendApi = {
  local: 'http://localhost:8081',
  hosted: 'http://localhost:8081',
};

const RewardPoints = () => {
  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);
  const { loadUser, loading, user } = authContext;
  const { setAlert } = alertContext;
  const [currentPoints, setCurrentPoints] = useState(0);
  useEffect(() => {
    let isMounted = true;
    loadUser();
    if (isMounted && loading === false) {
      setCurrentPoints(user.rewardPoints);
    }
    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line
  }, [loading]);

  const handleClick = async (e) => {
    console.log(e.target.name);
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const data = {
      newRewardPoints: currentPoints - Number(e.target.name),
    };
    const res = await axios.post(
      backendApi.local + '/api/rewardPoints',
      data,
      config
    );
    // set Alert here
    setAlert(
      `Congratulations, You have successfully redeemed ${e.target.name} points. Pay more to earn more rewards`,
      'success'
    );
    setCurrentPoints(currentPoints - Number(e.target.name));
  };
  return loading === false ? (
    <Fragment>
      <Alerts />
      <div style={{ color: '#f2f2f2', backgroundColor: '#E0E0E0' }}>
        <div
          style={{
            border: '1px solid #fff',
            backgroundColor: '#1F1F1F',
            padding: '8px',
          }}
        >
          <h2>CRED coins : &nbsp;{currentPoints}</h2>
        </div>
        <div
          style={{
            display: 'flex',
            flexFlow: 'row wrap',
            justifyContent: 'center',
            textAlign: 'center',
          }}
        >
          <RewardPointsListItem
            name={500}
            image={zomatoImage}
            handleClick={handleClick}
            currentPoints={currentPoints}
          />
          <RewardPointsListItem
            name={500}
            image={swiggyImage}
            handleClick={handleClick}
            currentPoints={currentPoints}
          />
          <RewardPointsListItem
            name={1000}
            image={flipkartImage}
            handleClick={handleClick}
            currentPoints={currentPoints}
          />

          <RewardPointsListItem
            name={2000}
            image={netflixImage}
            handleClick={handleClick}
            currentPoints={currentPoints}
          />
          <RewardPointsListItem
            name={5000}
            image={amazonImage}
            handleClick={handleClick}
            currentPoints={currentPoints}
          />
          <RewardPointsListItem
            name={10000}
            image={trivagoImage}
            handleClick={handleClick}
            currentPoints={currentPoints}
          />
        </div>
      </div>
    </Fragment>
  ) : null;
};

// const styleCard = {
//   padding: '8px',
//   width: '300px',
//   height: '240px',
//   margin: '10px',
//   border: '1px solid #fff',
//   backgroundColor: '#1F1F1F',
// };

export default RewardPoints;
