import React from 'react';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';

import SmartStatementOverall from '../smartStatement/SmartStatementOverall';

const backendApi = {
  local: 'http://localhost:8081',
  hosted: 'http://localhost:8081',
};
// import dataObject from '../../data.json';
const SmartStatement = () => {
  const authContext = useContext(AuthContext);
  const { cardId } = useParams();
  const [categoriesCount, setCategoriesCount] = useState([]);
  const [vendorsCount, setVendorsCount] = useState([]);
  const [categoriesNames, setCategoriesNames] = useState([]);
  const [vendorsNames, setVendorsNames] = useState([]);
  const [categoriesAmount, setCategoriesAmount] = useState([]);
  const [vendorsAmount, setVendorsAmount] = useState([]);
  const [categoriesAmountPercent, setCategoriesAmountPercent] = useState([]);
  const [vendorsAmountPercent, setVendorsAmountPercent] = useState([]);

  const [loading, setLoading] = useState(true);
  // const [data, setData] = useState(dataObject);
  const [data, setData] = useState([25, 30, 45, 60, 10, 65, 75]);
  const getSmartStatementData = async () => {
    console.log(typeof cardId, cardId);
    const res = await axios.get(
      backendApi.local + `/api/cards/${cardId}/smartstatement`
    );
    console.log(res);
    setCategoriesCount(res.data.categoriesCount);
    setVendorsCount(res.data.vendorsCount);
    setCategoriesNames(res.data.categoriesNames);
    setVendorsNames(res.data.vendorsNames);
    setVendorsAmount(res.data.vendorsAmount);
    setCategoriesAmount(res.data.categoriesAmount);
    setVendorsAmountPercent(res.data.vendorsAmountPercent);
    setCategoriesAmountPercent(res.data.categoriesAmountPercent);
    setLoading(false);
    console.log('Get smart Statements');
  };
  useEffect(() => {
    authContext.loadUser();
    getSmartStatementData();
    // console.log(data);
    // eslint-disable-next-line
  }, []);

  return (
    <React.Fragment>
      {loading ? null : (
        <SmartStatementOverall
          data={data}
          categoriesCount={categoriesCount}
          vendorsCount={vendorsCount}
          vendorsNames={vendorsNames}
          categoriesNames={categoriesNames}
          categoriesAmount={categoriesAmount}
          vendorsAmount={vendorsAmount}
          categoriesAmountPercent={categoriesAmountPercent}
          vendorsAmountPercent={vendorsAmountPercent}
        />
      )}
      {/* <button onClick={() => setData(data.map((value) => value + 5))}>
        Update data
      </button>
      <button onClick={() => setData(data.filter((value) => value < 35))}>
        Filter data
      </button>
      <button
        onClick={() => setData([...data, Math.round(Math.random() * 100)])}
      >
        Add data
      </button> */}
    </React.Fragment>
  );
};
/*
import React, { useState } from "react";
import BarChart from "./BarChart";
import "./App.css";

function App() {
  const [data, setData] = useState([25, 30, 45, 60, 10, 65, 75]);

  return (
    <React.Fragment>
      <BarChart data={data} />
      <button onClick={() => setData(data.map(value => value + 5))}>
        Update data
      </button>
      <button onClick={() => setData(data.filter(value => value < 35))}>
        Filter data
      </button>
      <button
        onClick={() => setData([...data, Math.round(Math.random() * 100)])}
      >
        Add data
      </button>
    </React.Fragment>
  );
}

export default App;
*/

export default SmartStatement;
