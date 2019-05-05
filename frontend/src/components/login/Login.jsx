import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { loginUser } from '../../actions/authenticationAction';

import './loginStyle.css'

class Login extends Component {

        state = {
            email: '',
            password: '',
            errors: {}
        };

    handleInputChange=(e)=> {
        this.setState({
            [e.target.name]: e.target.value
        })
    };

    handleSubmit=(e)=> {
        e.preventDefault();

        const user = {
            email: this.state.email,
            password: this.state.password,
        };

        this.props.loginUser(user);
    };

    componentDidMount=()=> {
        if(this.props.auth.isAuthenticated) {
            this.props.history.push('/');
        }
    };

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.auth.isAuthenticated) {
            this.props.history.push('/')
        }

        if (nextProps.errors !== prevState.errors) {
            return {errors: nextProps.errors};
        } else return null;
    }

    render() {
        const {errors} = this.state;

        return(
        <div className="formMainContainer" >
            <div className='formContainer'>
            <h1>Login</h1>
            <form onSubmit={ this.handleSubmit }>
                    <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    onChange={ this.handleInputChange }
                    value={ this.state.email }
                    className={'formInput'}
                    />
                    {errors.email && (<div className="invalidFeedback">{errors.email}</div>)}

                    <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={ this.handleInputChange }
                    value={ this.state.password }
                    className={'formInput'}
                    />
                    {errors.password && (<div className="invalidFeedback">{errors.password}</div>)}

                    <button type="submit" className="btnFormSubmit">
                        Login
                    </button>

            </form>
            </div>
        </div>
        )
    }
}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
});

export  default connect(mapStateToProps, { loginUser })(Login)