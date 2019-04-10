import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { registerUser } from '../actions/authentication';
import classnames from 'classnames';
import Select from 'react-select'
import countries from '../resourses/countries'
import organizations from '../resourses/organizations'


class Register extends Component {

    constructor() {
        super();
        this.state = {
            country:'',
            name: '',
            organization:'',
            phone:'',
            email: '',
            password: '',
            password_confirm: '',
            errors: {}
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleChangeCountry = this.handleChangeCountry.bind(this);
        this.handleChangeOrganization = this.handleChangeOrganization.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        const user = {
            country: this.state.country,
            name: this.state.name,
            organization: this.state.organization,
            phone: this.state.phone,
            email: this.state.email,
            password: this.state.password,
            password_confirm: this.state.password_confirm
        };
        this.props.registerUser(user, this.props.history);
    }

    handleChangeCountry = (countrySelect) => {
        this.setState({country: countrySelect.value });

    };

    handleChangeOrganization = (organizationSelect) => {
        this.setState({organization: organizationSelect.value });

    };

    componentWillReceiveProps(nextProps) {
        if(nextProps.auth.isAuthenticated) {
            this.props.history.push('/')
        }
        if(nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    componentDidMount() {
        if(this.props.auth.isAuthenticated) {
            this.props.history.push('/');
        }
    }

    render() {
        const { errors } = this.state;
        const {countrySelect } = this.state.country;
        const {organizationSelect } = this.state.organization;

        return(
        <div className="container" style={{ marginTop: '50px', width: '700px'}}>
            <h2 style={{marginBottom: '40px'}}>Coordinator registration</h2>
            <form onSubmit={ this.handleSubmit }>
                <div className="form-group">
                    <Select
                        options={countries}
                        placeholder={'Select country...'}
                        value={countrySelect}
                        onChange={this.handleChangeCountry}
                        className={classnames('form-control form-control-lg', {
                            'is-invalid': errors.country
                        })}
                    />
                    {errors.country && (<div className="invalid-feedback">{errors.country}</div>)}
                </div>
                <div className="form-group">

                    <input
                    type="text"
                    placeholder="Name"
                    className={classnames('form-control form-control-lg', {
                        'is-invalid': errors.name
                    })}
                    name="name"
                    onChange={ this.handleInputChange }
                    value={ this.state.name }
                    />
                    {errors.name && (<div className="invalid-feedback">{errors.name}</div>)}
                </div>
                <div className="form-group">
                    <Select
                        options={organizations}
                        value={ organizationSelect}
                        placeholder={'Select organization...'}
                        onChange={this.handleChangeOrganization}
                        className={classnames('form-control form-control-lg', {
                            'is-invalid': errors.organization
                        })}
                    />
                    {errors.organization && (<div className="invalid-feedback">{errors.organization}</div>)}
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Phone number"
                        className={classnames('form-control form-control-lg', {
                            'is-invalid': errors.phone
                        })}
                        name="phone"
                        onChange={ this.handleInputChange }
                        value={ this.state.phone }
                    />
                    {errors.phone && (<div className="invalid-feedback">{errors.phone}</div>)}
                </div>
                <div className="form-group">
                    <input
                    type="email"
                    placeholder="Email"
                    className={classnames('form-control form-control-lg', {
                        'is-invalid': errors.email
                    })}
                    name="email"
                    onChange={ this.handleInputChange }
                    value={ this.state.email }
                    />
                    {errors.email && (<div className="invalid-feedback">{errors.email}</div>)}
                </div>
                <div className="form-group">
                    <input
                    type="password"
                    placeholder="Password"
                    className={classnames('form-control form-control-lg', {
                        'is-invalid': errors.password
                    })}
                    name="password"
                    onChange={ this.handleInputChange }
                    value={ this.state.password }
                    />
                    {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
                </div>
                <div className="form-group">
                    <input
                    type="password"
                    placeholder="Confirm Password"
                    className={classnames('form-control form-control-lg', {
                        'is-invalid': errors.password_confirm
                    })}
                    name="password_confirm"
                    onChange={ this.handleInputChange }
                    value={ this.state.password_confirm }
                    />
                    {errors.password_confirm && (<div className="invalid-feedback">{errors.password_confirm}</div>)}
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-primary">
                        Register User
                    </button>
                </div>
            </form>
        </div>
        )
    }
}

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps,{ registerUser })(withRouter(Register))