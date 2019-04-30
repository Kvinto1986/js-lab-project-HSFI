import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import {registerSeller} from '../../actions/sellers';
import {getCountry} from '../../actions/country';
import {uploadImage} from '../../actions/uploads';
import Select from "react-select";
import {getFood} from '../../actions/food';
import './createSellerStyles.css'
import Map from './Map'

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
            success:false,
            errors: {},
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputFileChange = this.handleInputFileChange.bind(this);
        this.handleChangeCountry = this.handleChangeCountry.bind(this);
        this.resetForm = this.resetForm.bind(this);

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

    resetForm = () => {
        this.setState({
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
            errors: {},
            success:true,
        });
        setTimeout(() => {
            this.setState({ success:false})
        }, 5000);
    };

    handleSubmit(e) {
        e.preventDefault();

        const images = new FormData();
        images.append('file', this.state.photo);
        images.append('file', this.state.photoLicense);

        const seller = {
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
            photoLicense:'',
            flag:'',
            flagCount:0,
            cards:[],
            OSS:0,
            stars:0
        };

        if(this.state.photo.name){
            seller.photo=this.state.email+'-'+this.state.photo.name
        }
        if(this.state.photoLicense.name){
            seller.photoLicense=this.state.email+'-'+this.state.photoLicense.name
        }

        this.props.registerSeller(seller, this.resetForm);
        this.props.uploadImage(images,this.state.email);
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

    componentDidMount() {
            this.props.getCountry();
        this.props.getFood();
        }




    render() {
        const {isAuthenticated, user} = this.props.auth;
        const {errors} = this.state;
        const {countrySelect} = this.state.country;
        const {foodSelect} = this.state.country;

        const SendSuccess=()=>{
            if(this.state.success===true){
                return(
                    <div className={'successContainer'}><h1>Card created successfully!</h1></div>
                )
            }
            else return null
        };

        if(isAuthenticated){
        return (

            <div className="newSellerMainContainer" >
                <Map
                    className="Map"
                    google={this.props.google}
                    center={{lat: 52.459751, lng: 31.027605}}
                    height='500px'
                    width='500px'
                    zoom={15}
                />
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
                            options={this.props.countries}
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
                        options={this.props.food}
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
                    <SendSuccess
                    />
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
    auth: PropTypes.object.isRequired,
    countries: PropTypes.array.isRequired,
    food: PropTypes.array.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors,
    countries: state.countries,
    food:  state.food
});

export default connect(mapStateToProps, {registerSeller,uploadImage,getCountry,getFood})(withRouter(NewSeller))