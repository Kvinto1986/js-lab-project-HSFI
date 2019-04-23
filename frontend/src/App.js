import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import jwt_decode from 'jwt-decode';
import setAuthToken from './setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authentication';

import Navbar from './components/Navbar';
import Register from './components/Register/Register';
import Login from './components/Login';
import Home from './components/Home';
import SellerCard from './components/tasksPages/createSellerCard';
import NewSeller from './components/CreateSeller/createNewSeller';
import Call from './components/tasksPages/getCall';
import Inspection from './components/tasksPages/inspection';
import OperatorsProfiles from './components/tasksPages/operatorsProfiles';
import CoordinatorsProfiles from './components/tasksPages/coordinatorsProfiles';
import Success from './components/tasksPages/success';
import AdminPage from './components/tasksPages/adminPage';

import 'bootstrap/dist/css/bootstrap.min.css';

if(localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));

  const currentTime = Date.now() / 1000;
  if(decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = '/login'
  }
}

class App extends Component {

  render() {
    return (
      <Provider store = { store }>
        <Router>
            <div>
              <Navbar />
              <Route exact path="/" component={ Home } />
              <div className="container">
                <Route exact path='/newSeller' component={NewSeller} />
                <Route exact path='/Success' component={Success} />
                <Route exact path='/sellerCards' component={SellerCard} />
              <Route exact path="/calls" component={ Call } />
                <Route exact path="/inspection" component={ Inspection } />
                <Route exact path="/operatorsProfiles" component={ OperatorsProfiles } />
                <Route exact path="/coordinatorsProfiles" component={ CoordinatorsProfiles } />
                <Route exact path="/admin" component={ AdminPage } />
              <Route exact path="/register" component={ Register } />
              <Route exact path="/login" component={ Login } />
                </div>
            </div>
          </Router>
        </Provider>
    );
  }
}

export default App;
