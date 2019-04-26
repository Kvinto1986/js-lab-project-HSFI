import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import {registerSeller} from '../../actions/sellers';
import {uploadImage} from '../../actions/uploads';
import Select from "react-select";
import food from "../../resourses/food";
import './createSellerStyles.css'

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
        this.handleInputFileChange = this.handleInputFileChange.bind(this);
        this.handleChangeCountry = this.handleChangeCountry.bind(this);

    }

    handleInputChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleInputFileChange(e) {
        this.setState({
            [e.target.name]: e.target.files[0]
        })
    }

    handleSubmit(e) {
        e.preventDefault();

        const images = new FormData();
        images.append('file', this.state.photo);
        images.append('file', this.state.photoLicense);

        const user = {
            operatorName: this.props.auth.user.name,
            country: this.state.country,
            name: this.state.name,
            photo:'',
            phone: this.state.phone,
            email: this.state.email,
            license: this.state.license,
            location:this.state.location,
            schedule: this.state.schedule,
            ingredients: this.state.ingredients,
            foodGroup: this.state.foodGroup,
            photoLicense:''

        };

        if(this.state.photo.name){
            user.photo=this.state.email+'-'+this.state.photo.name
        }
        if(this.state.photoLicense.name){
            user.photoLicense=this.state.email+'-'+this.state.photoLicense.name
        }

        this.props.registerSeller(user, this.props.history);
        this.props.uploadImage(images,this.state.email);
        console.log(user)
    }

    handleChangeCountry = (countrySelect) => {
        this.setState({country: countrySelect.value});

    };
    handleChangeFood = (foodSelect) => {
        this.setState({foodGroup: foodSelect.value});

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
        const {foodSelect} = this.state.country;

        if(isAuthenticated){
        return (

            <div className="newSellerMainContainer" >
                <div className='newSellerFormContainer'>
                <h3 >Registration new seller</h3>
                <form onSubmit={this.handleSubmit}>
                            <input
                                type="text"
                                placeholder={user.name}
                                className={'sellerFormInput'}
                                 disabled = 'disabled'
                                value={user.name}
                            />

                        <Select
                            options={countries}
                            placeholder={'Select country...'}
                            value={countrySelect}
                            onChange={this.handleChangeCountry}
                            className={'sellerFormSelect'}
                        />
                        {errors.country && (<div className="invalidFeedback">{errors.country}</div>)}

                        <input
                            type="text"
                            placeholder="Name"
                            className={'sellerFormInput'}
                            name="name"
                            onChange={this.handleInputChange}
                            value={this.state.name}
                        />
                        {errors.name && (<div className="invalidFeedback">{errors.name}</div>)}
                    <label>Download Photo: </label>
                        <input
                            type="file"
                            placeholder="Photo"
                            className={'sellerFormInputFile'}
                            name="photo"
                            onChange={this.handleInputFileChange}

                        />
                        {errors.photo && (<div className="invalidFeedback">{errors.photo}</div>)}

                        <input
                            type="text"
                            placeholder="License"
                            className={'sellerFormInput'}
                            name="license"
                            onChange={this.handleInputChange}
                            value={this.state.license}
                        />
                        {errors.license && (<div className="invalidFeedback">{errors.license}</div>)}
                    <label>Download License: </label>
                        <input
                            type="file"
                            placeholder="License photo"
                            className={'sellerFormInputFile'}
                            name="photoLicense"
                            onChange={this.handleInputFileChange}
                        />
                        {errors.photoLicense && (<div className="invalidFeedback">{errors.photoLicense}</div>)}

                        <input
                            type="text"
                            placeholder="location"
                            className={'sellerFormInput'}
                            name="location"
                            onChange={this.handleInputChange}
                            value={this.state.location}
                        />
                        {errors.location && (<div className="invalidFeedback">{errors.location}</div>)}
                        <input
                            type="text"
                            placeholder="schedule"
                            className={'sellerFormInput'}
                            name="schedule"
                            onChange={this.handleInputChange}
                            value={this.state.schedule}
                        />
                        {errors.schedule && (<div className="invalidFeedback">{errors.schedule}</div>)}


                        <input
                            type="text"
                            placeholder="phone"
                            className={'sellerFormInput'}
                            name="phone"
                            onChange={this.handleInputChange}
                            value={this.state.phone}
                        />
                        {errors.phone && (<div className="invalidFeedback">{errors.phone}</div>)}

                        <input
                            type="email"
                            placeholder="Email"
                            className={'sellerFormInput'}
                            name="email"
                            onChange={this.handleInputChange}
                            value={this.state.email}
                        />
                        {errors.email && (<div className="invalidFeedback">{errors.email}</div>)}

                        <input
                            type="text"
                            placeholder="ingredients"
                            className={'sellerFormInput'}
                            name="ingredients"
                            onChange={this.handleInputChange}
                            value={this.state.ingredients}
                        />
                        {errors.ingredients && (<div className="invalidFeedback">{errors.ingredients}</div>)}

                    <Select
                        options={food}
                        placeholder={'Select food group...'}
                        value={foodSelect}
                        onChange={this.handleChangeFood}
                        className={'sellerFormSelect'}
                    />
                        {errors.foodGroup && (<div className="invalidFeedback">{errors.foodGroup}</div>)}

                        <button type="submit" className="btnFormSubmit">
                            Register Seller
                        </button>
                </form>
                </div>
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

export default connect(mapStateToProps, {registerSeller,uploadImage})(withRouter(NewSeller))