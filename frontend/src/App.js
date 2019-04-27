import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import jwt_decode from 'jwt-decode';
import setAuthToken from './setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authentication';
import './App.css'

import Navbar from './components/navigation/Navbar';
import Register from './components/register/Register';
import Login from './components/login/Login';
import Home from './components/homePage/Home';
import SellerCard from './components/sellerCards/createSellerCard';
import NewSeller from './components/createSeller/createNewSeller';
import Call from './components/tasksPages/getCall';
import Inspection from './components/tasksPages/inspection';
import OperatorsProfiles from './components/tasksPages/operatorsProfiles';
import CoordinatorsProfiles from './components/tasksPages/coordinatorsProfiles';
import Success from './components/tasksPages/success';
import AdminPage from './components/admin/adminPage';

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
            <div className={'mainContainer'} >
              <Navbar />
              <Route exact path="/" component={ Home } />
                <Route exact path='/newSeller' component={NewSeller} />
                <Route exact path='/success' component={Success} />
                <Route exact path='/sellerCards' component={SellerCard} />
              <Route exact path="/calls" component={ Call } />
                <Route exact path="/inspection" component={ Inspection } />
                <Route exact path="/operatorsProfiles" component={ OperatorsProfiles } />
                <Route exact path="/coordinatorsProfiles" component={ CoordinatorsProfiles } />
                <Route exact path="/admin" component={ AdminPage } />
              <Route exact path="/register" component={ Register } />
              <Route exact path="/login" component={ Login } />
            </div>
          </Router>
        </Provider>
    );
  }
}

export default App;
