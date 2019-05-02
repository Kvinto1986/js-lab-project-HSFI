import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authentication';
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

    componentWillReceiveProps=(nextProps)=> {
        if(nextProps.auth.isAuthenticated) {
            this.props.history.push('/')
        }
        if(nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    };

    render() {
        const {errors} = this.state;
        return(
        <div className="containerLogin" >
            <div className='LoginFormContainer'>
            <h2>Login</h2>
            <form onSubmit={ this.handleSubmit }>
                    <input
                    type="email"
                    placeholder="Email"

                    name="email"
                    onChange={ this.handleInputChange }
                    value={ this.state.email }
                    />
                    {errors.email && (<div className="invalidFeedback">{errors.email}</div>)}

                    <input
                    type="password"
                    placeholder="Password"

                    name="password"
                    onChange={ this.handleInputChange }
                    value={ this.state.password }
                    />
                    {errors.password && (<div className="invalidFeedback">{errors.password}</div>)}

                    <button type="submit" className="btnLoginSubmit">
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