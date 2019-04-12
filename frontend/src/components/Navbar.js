import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {logoutUser} from '../actions/authentication';
import {withRouter} from 'react-router-dom';

import OperatorNav from './usersNav/operatorNav';
import CoordinatorNav from './usersNav/coordinatorNav';
import ManagerNav from './usersNav/managerNav';

class Navbar extends Component {

    onLogout(e) {
        e.preventDefault();
        this.props.logoutUser(this.props.history);
    }

    render() {
        const {isAuthenticated, user} = this.props.auth;
        const authLinks = (
            <ul className="navbar-nav ml-auto">
                <a href="" className="nav-link" onClick={this.onLogout.bind(this)}>
                    <img src={user.avatar} alt={user.name} title={user.name}
                         className="rounded-circle"
                         style={{width: '25px', marginRight: '5px'}}/>
                    Logout
                </a>
            </ul>
        );
        const guestLinks = (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link className="nav-link" to="/register">Registration</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/login">Login</Link>
                </li>
            </ul>
        );

        const Coord = () => {
            if (user.role === 'coordinator') {
                return (
                    <CoordinatorNav
                        tasks={user.tasks}
                    />
                )
            }
            if (user.role === 'operator') {
                return (
                    <OperatorNav
                    />
                )
            }
            if (user.role === 'manager') {
                return (
                    <ManagerNav
                    />
                )
            }
            else return null
        };

        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link className="navbar-brand" to="/">Street Food Quality Supervision</Link>
                <Coord
                />
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    {isAuthenticated ? authLinks : guestLinks}
                </div>
            </nav>
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