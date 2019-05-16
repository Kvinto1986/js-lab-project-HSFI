import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './store';
import jwt_decode from 'jwt-decode';
import setAuthToken from './setAuthToken';
import {setCurrentUser, logoutUser} from './actions/authenticationAction';

import Navbar from './components/navigation/navbar';
import UserRegistration from './components/userRegistration/userRegistration';
import Login from './components/login/Login';
import Home from './components/homePage/Home';
import SellerCard from './components/sellerCards/createSellerCard';
import NewSeller from './components/createSeller/createNewSeller';
import Call from './components/calls/calls';
import Inspection from './components/inspection/inspection';
import AdminPage from './components/admin/adminPage';
import Profile from './components/profile/profile';

if (localStorage.jwtToken) {
    setAuthToken(localStorage.jwtToken);
    const decoded = jwt_decode(localStorage.jwtToken);
    store.dispatch(setCurrentUser(decoded));

    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
        store.dispatch(logoutUser());
        window.location.href = '/login'
    }
}

class App extends Component {

    render() {
        return (
            <Provider store={store}>
                <Router>
                    <div className={'mainContainer'}>
                        <Navbar/>
                        <Route exact path="/" component={Home}/>
                        <Route exact path="/profile" component={Profile}/>
                        <Route exact path='/newSeller' component={NewSeller}/>
                        <Route exact path='/sellerCards' component={SellerCard}/>
                        <Route exact path="/calls" component={Call}/>
                        <Route exact path="/inspection" component={Inspection}/>
                        <Route exact path="/admin" component={AdminPage}/>
                        <Route exact path="/registration" component={UserRegistration}/>
                        <Route exact path="/login" component={Login}/>
                    </div>
                </Router>
            </Provider>
        );
    }
}

export default App;
