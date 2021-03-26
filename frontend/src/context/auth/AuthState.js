import { useReducer } from 'react';
import AuthContext from './authContext';
import authReducer from './authReducer';
import axios from 'axios';
import setAuthToken from '../../utils/setAuthToken';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
} from '../types';

const backendApi = {
  local: 'http://localhost:8081',
  hosted: 'http://localhost:8081',
};

const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    user: null,
    loading: true,
    errors: null,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);
  // Actions:

  // load user
  const loadUser = async () => {
    // add header for auth and load user from backend
    if (localStorage.token) {
      setAuthToken(localStorage.getItem('token'));
    }
    try {
      const res = await axios.get(backendApi.local + '/api/auth');
      console.log(res);
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    } catch (err) {
      console.log(err, 'auth error');
      dispatch({ type: AUTH_ERROR });
    }
    console.log('load user');
  };

  // register user
  const register = async (userData) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const res = await axios.post(
        backendApi.local + '/api/users',
        userData,
        config
      );
      console.log(res.data);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
      console.log('REGISTRATION DONE', userData);
      console.log('register');
    } catch (err) {
      console.log('Server error');
    }
  };

  // login user
  const login = async (userData) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.post(
        backendApi.local + '/api/auth',
        userData,
        config
      );

      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
      console.log('USER LOGGED IN');
      loadUser();
    } catch (err) {
      console.log('ERROR');
      dispatch({
        type: LOGIN_FAIL,
        payload: err.response.data.msg,
      });
    }
  };
  // logout user
  const logout = () => {
    dispatch({
      type: LOGOUT,
    });
  };
  // clear errors
  const clearErrors = () => {
    dispatch({
      type: CLEAR_ERRORS,
    });
  };

  // return context provider
  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        loading: state.loading,
        errors: state.errors,
        loadUser,
        register,
        login,
        logout,
        clearErrors,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
