import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import jwt_decode from 'jwt-decode';
import setAuthToken from './setAuthToken';
import { setCurrentUser} from './actions/authentication';
import './App.css'

import Navbar from './components/navigation/Navbar';
import Register from './components/register/Register';
import Login from './components/login/Login';
import Home from './components/homePage/Home';
import SellerCard from './components/sellerCards/createSellerCard';
import NewSeller from './components/createSeller/createNewSeller';
import Call from './components/calls/calls';
import Inspection from './components/inspection/inspection';
import AdminPage from './components/admin/adminPage';

if(localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));
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
                <Route exact path='/sellerCards' component={SellerCard} />
                <Route exact path="/calls" component={ Call } />
                <Route exact path="/inspection" component={ Inspection } />
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
