import { Fragment, useContext } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import AuthState from './context/auth/AuthState';
import CardState from './context/card/CardState';
import PaymentState from './context/payment/PaymentState';

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

function App() {
  return (
    <AuthState>
      <CardState>
        <PaymentState>
          <Router>
            <Fragment>
              <Navbar />
              {/* add the classname container in div */}
              <div className="container-obj">
                <Switch>
                  <PrivateRoute exact path="/" component={Home} />
                  <PrivateRoute path="/payment/:cardId" component={Payment} />

                  <Route exact path="/about" component={About} />
                  <Route exact path="/login" component={Login} />
                  <Route exact path="/register" component={Signup} />
                  <Route component={NotFound} />
                </Switch>
              </div>
              {/* <Footer /> */}
            </Fragment>
          </Router>
        </PaymentState>
      </CardState>
    </AuthState>
  );
}

export default App;
