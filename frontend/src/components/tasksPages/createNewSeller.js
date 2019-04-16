import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import {registerSeller} from '../../actions/authentication';
import Select from "react-select";
import classnames from "classnames";

import countries from "../../resourses/countries";


class NewSeller extends Component {

    constructor() {
        super();
        this.state = {
            operatorName: "",
            country: '',
            name: "",
            photo: "",
            phone: "",
            email: "",
            license: "",
            photoLicense:'',
            location:'',
            schedule: "",
            ingredients: "",
            foodGroup: "",
            data: "",
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
            operatorName: this.props.auth.user.name,
            country: this.state.country,
            name: this.state.name,
            photo: this.state.photo,
            phone: this.state.phone,
            email: this.state.email,
            license: this.state.license,
            location:this.state.location,
            schedule: this.state.schedule,
            ingredients: this.state.ingredients,
            foodGroup: this.state.foodGroup,
            photoLicense:this.state.photoLicense,

        };
        this.props.registerSeller(user, this.props.history);
        console.log(user)
    }

    handleChangeCountry = (countrySelect) => {
        this.setState({country: countrySelect.value});

    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    render() {
        const {isAuthenticated, user} = this.props.auth;
        const {errors} = this.state;
        const {countrySelect} = this.state.country;

        if(isAuthenticated){
        return (
            <div className="container" style={{marginTop: '50px', width: '700px'}}>
                <h2 style={{marginBottom: '40px'}}>Registration new seller</h2>
                <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <input
                                type="text"
                                placeholder={user.name}
                                className={classnames('form-control form-control-lg')}
                            disabled = 'disabled'
                                value={user.name}
                            />
                        </div>

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
                            onChange={this.handleInputChange}
                            value={this.state.name}
                        />
                        {errors.name && (<div className="invalid-feedback">{errors.name}</div>)}
                    </div>

                    <div className="form-group">
                        <input
                            type="file"
                            placeholder="Photo"
                            className={classnames('form-control form-control-lg', {
                                'is-invalid': errors.photo
                            })}
                            name="photo"
                            onChange={this.handleInputChange}
                            value={this.state.photo}
                        />
                        {errors.photo && (<div className="invalid-feedback">{errors.photo}</div>)}
                    </div>

                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="License"
                            className={classnames('form-control form-control-lg', {
                                'is-invalid': errors.license
                            })}
                            name="license"
                            onChange={this.handleInputChange}
                            value={this.state.license}
                        />
                        {errors.license && (<div className="invalid-feedback">{errors.license}</div>)}
                    </div>

                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="License photo"
                            className={classnames('form-control form-control-lg', {
                                'is-invalid': errors.photoLicense
                            })}
                            name="photoLicense"
                            onChange={this.handleInputChange}
                            value={this.state.photoLicense}
                        />
                        {errors.photoLicense && (<div className="invalid-feedback">{errors.photoLicense}</div>)}
                    </div>

                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="location"
                            className={classnames('form-control form-control-lg', {
                                'is-invalid': errors.location
                            })}
                            name="location"
                            onChange={this.handleInputChange}
                            value={this.state.location}
                        />
                        {errors.location && (<div className="invalid-feedback">{errors.location}</div>)}
                    </div>

                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="schedule"
                            className={classnames('form-control form-control-lg', {
                                'is-invalid': errors.schedule
                            })}
                            name="schedule"
                            onChange={this.handleInputChange}
                            value={this.state.schedule}
                        />
                        {errors.schedule && (<div className="invalid-feedback">{errors.schedule}</div>)}
                    </div>

                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="phone"
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
                        <input
                            type="text"
                            placeholder="ingredients"
                            className={classnames('form-control form-control-lg', {
                                'is-invalid': errors.ingredients
                            })}
                            name="ingredients"
                            onChange={this.handleInputChange}
                            value={this.state.ingredients}
                        />
                        {errors.ingredients && (<div className="invalid-feedback">{errors.ingredients}</div>)}
                    </div>

                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="foodGroup"
                            className={classnames('form-control form-control-lg', {
                                'is-invalid': errors.foodGroup
                            })}
                            name="foodGroup"
                            onChange={this.handleInputChange}
                            value={this.state.foodGroup}
                        />
                        {errors.foodGroup && (<div className="invalid-feedback">{errors.foodGroup}</div>)}
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
NewSeller.propTypes = {
    registerSeller: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, {registerSeller})(withRouter(NewSeller))