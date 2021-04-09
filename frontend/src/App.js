import { Fragment, useContext } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import AuthState from './context/auth/AuthState';
import CardState from './context/card/CardState';
import PaymentState from './context/payment/PaymentState';
import StatementState from './context/statement/StatementState';

import Home from './components/pages/Home';
import About from './components/pages/About';
import Navbar from './components/layout/Navbar';
import NotFound from './components/pages/NotFound';
import Login from './components/loginAndSignup/Login';
import Signup from './components/loginAndSignup/Signup';
import Footer from './components/layout/Footer';

// Routes
import PrivateRoute from './components/routing/PrivateRoute';
import PublicRoute from './components/routing/PublicRoute';
// import NotFoundRoute from './components/routing/NotFoundRoute';

import './App.css';
import Payment from './components/pages/Payment';
import Statement from './components/statement';
import AlertState from './context/alert/AlertState';
import SmartStatement from './components/pages/SmartStatement';
import RewardPoints from './components/pages/RewardPoints';

function App() {
  return (
    <AuthState>
      <CardState>
        <PaymentState>
          <StatementState>
            <AlertState>
              <Router>
                <Fragment>
                  <Navbar />
                  {/* add the classname container in div */}
                  <div className="container-obj">
                    <Switch>
                      <PrivateRoute exact path="/" component={Home} />
                      <PrivateRoute
                        path="/payment/:cardId"
                        component={Payment}
                      />
                      <PrivateRoute
                        path="/statement/:cardId/:year/:month"
                        component={Statement}
                      />
                      <PrivateRoute
                        path="/statement/smartView/:cardId"
                        component={SmartStatement}
                      />
                      <PrivateRoute
                        path="/rewardPoints"
                        component={RewardPoints}
                      />
                      <Route exact path="/about" component={About} />
                      <Route exact path="/login" component={Login} />
                      <Route exact path="/register" component={Signup} />
                      <Route component={NotFound} />
                    </Switch>
                  </div>
                  {/* <Footer /> */}
                </Fragment>
              </Router>
            </AlertState>
          </StatementState>
        </PaymentState>
      </CardState>
    </AuthState>
  );
}

export default App;
