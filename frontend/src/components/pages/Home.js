import React from 'react';
import ViewCards from '../viewCards/index';
import AddCard from '../addCard/index';
const Home = () => {
  return (
    <div>
      <h1>Home Page!</h1>
      <div>
        <AddCard />
      </div>
      <div>
        <ViewCards />
      </div>
    </div>
  );
};

export default Home;
