import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {logoutUser} from '../../actions/authentication';
import {withRouter} from 'react-router-dom';

import './navigationStyles.css'

import logo from '../../resourses/images/unlogo.png'

import UserNav from './UsersNav';


class Navbar extends Component {

    onLogout(e) {
        e.preventDefault();
        this.props.logoutUser(this.props.history);
    }

    render() {
        const {isAuthenticated, user} = this.props.auth;
        const authLinks = (
            <div className="authContainer" >
                <Link className="authContainerLink" to="" onClick={this.onLogout.bind(this)}>
                    <img src={user.avatar} alt={user.name} title={user.name}/>
                    Logout
                </Link>
            </div>
        );
        const guestLinks = (
            <div className="authContainer" >
                    <Link className="authContainerLink" to="/registration">Registration</Link>
                    <Link className="authContainerLink" to="/login">Login</Link>
            </div>
        );

        return (
            <header className="headerContainer">
                <div className="headerLogo">
                    <Link to="/"><img src={logo} alt={'logo'}/></Link>
                    <h1>Street Food Quality Supervision</h1>
                </div>
                <UserNav
                    user={user}
                    isAuthenticated={isAuthenticated}
                />
                    {isAuthenticated ? authLinks : guestLinks}
            </header>
        )
    }
}

Navbar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps, {logoutUser})(withRouter(Navbar));