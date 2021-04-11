// auth
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAIL = 'REGISTER_FAIL';
export const USER_LOADED = 'USER_LOADED';
export const AUTH_ERROR = 'AUTH_ERROR';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const LOGOUT = 'LOGOUT';
export const CLEAR_ERRORS = 'CLEAR_ERRORS';

// cards
export const GET_CARDS = 'GET_CARDS';
export const ADD_CARD = 'ADD_CARD';
export const SET_CURRENT = 'SET_CURRENT'; // for viewing a particular card
export const CLEAR_CURRENT = 'CLEAR_CURRENT'; // remove from a view a particular card
export const CLEAR_CARDS = 'CLEAR_CARDS'; // remove card list from memory/localStorage
export const CARD_ERROR = 'CARD_ERROR'; // error for any card
// export const DELETE_CARD = 'DELETE_CARD';
// export const UPDATE_CARD = 'UPDATE_CARD';
// export const FILTER_CARDS = 'FILTER_CARDS';
// export const CLEAR_FILTER = 'CLEAR_FILTER';

// payment
export const GET_TOTAL_PAYMENT_DUE = 'GET_TOTAL_PAYMENT_DUE';
export const PAY_AMOUNT = 'PAY_AMOUNT';
export const CONFIRM_PAYMENT = 'CONFIRM_PAYMENT';
export const CLEAR_PAYMENT_STATE = 'CLEAR_PAYMENT_STATE';

// statement context
export const GET_TRANSACTIONS = 'GET_TRANSACTIONS';
export const SET_TRANSACTIONS = 'SET_TRANSACTIONS';
export const CLEAR_TRANSACTIONS = 'CLEAR_TRANSACTIONS';

// alerts
export const SET_ALERT = 'SET_ALERT';
export const REMOVE_ALERT = 'REMOVE_ALERT';
