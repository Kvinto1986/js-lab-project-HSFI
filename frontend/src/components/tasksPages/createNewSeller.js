import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {registerSeller} from '../../actions/authentication';
import Select from "react-select";
import classnames from "classnames";

import countries from "../../resourses/countries";


class NewSeller extends Component {

    constructor() {
        super();
        this.state = {
            operatorName: '',
            country: '',
            name: '',
            organization: '',
            tasks: [],
            phone: '',
            email: '',
            password: '',
            password_confirm: '',
            errors: {}
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.handleChangeCountry = this.handleChangeCountry.bind(this);

    }

    handleInputChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault();

        const user = {
            role: this.state.role,
            country: this.state.country,
            name: this.state.name,
            organization: this.state.organization,
            tasks: this.state.tasks,
            phone: this.state.phone,
            email: this.state.email,
            password: this.state.password,
            password_confirm: this.state.password_confirm
        };
        
        console.log(this.props)
    }

    handleChangeCountry = (countrySelect) => {
        this.setState({country: countrySelect.value});

    };



    render() {
        const {isAuthenticated, user} = this.props.auth;
        console.log(this.props);
        const {errors} = this.state;
        const {countrySelect} = this.state.country;

        if(isAuthenticated){
        return (
            <div className="container" style={{marginTop: '50px', width: '700px'}}>
                <h2 style={{marginBottom: '40px'}}>Registration new seller</h2>
                <form onSubmit={this.handleSubmit}>

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
                            placeholder={user.name}
                            className={classnames('form-control form-control-lg', {
                                'is-invalid': errors.name
                            })}
                            name="name"
                            onChange={this.handleInputChange}
                            value={this.state.name}
                        />
                        {errors.name && (<div className="invalid-feedback">{errors.name}</div>)}
                    </div>

                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="Phone number"
                            className={classnames('form-control form-control-lg', {
                                'is-invalid': errors.phone
                            })}
                            name="phone"
                            onChange={this.handleInputChange}
                            value={this.state.phone}
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
                            onChange={this.handleInputChange}
                            value={this.state.email}
                        />
                        {errors.email && (<div className="invalid-feedback">{errors.email}</div>)}
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary">
                            Register Seller
                        </button>
                    </div>
                </form>
            </div>
        )}
        else return(<Redirect to={{
            pathname: '/login',
        }} />)
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps)(withRouter(NewSeller));