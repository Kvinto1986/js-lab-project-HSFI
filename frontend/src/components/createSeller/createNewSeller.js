import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import {registerSeller} from '../../actions/sellers';
import {getCountry} from '../../actions/country';
import {uploadImage} from '../../actions/uploads';
import Select from "react-select";
import {getFood} from '../../actions/food';
import './createSellerStyles.css'
import {Map, GoogleApiWrapper} from 'google-maps-react';
import PlacesAutocomplete, {geocodeByAddress, getLatLng} from "react-places-autocomplete";
import MapContainer from "./Map"


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
            photoLicense: '',
            GPS: null,
            sity: '',
            location: '',
            schedule: "",
            ingredients: "",
            foodGroup: "",
            data: "",
            success: false,
            map: false,
            errors: {},
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputFileChange = this.handleInputFileChange.bind(this);
        this.handleChangeCountry = this.handleChangeCountry.bind(this);
        this.resetForm = this.resetForm.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
    }


    handleChange = (location) => {
        this.setState({location});
        this.setState({map: false})
    };

    handleSelect = (location) => {
        this.setState({location});
        geocodeByAddress(location)
            .then(results => {
                return getLatLng(results[0])
            })
            .then(latLng => {
                this.setState({GPS: latLng})
            })
            .catch(error => console.error('Error', error));
    };


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
            photoLicense: '',
            GPS: null,
            sity: '',
            location: '',
            schedule: "",
            ingredients: "",
            foodGroup: "",
            data: "",
            success: false,
            map: false,
            errors: {},
        });
        setTimeout(() => {
            this.setState({success: false})
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
            photo: '',
            phone: this.state.phone,
            email: this.state.email,
            license: this.state.license,
            location: this.state.location,
            schedule: this.state.schedule,
            ingredients: this.state.ingredients,
            foodGroup: this.state.foodGroup,
            sity: this.state.sity,
            GPS: this.state.GPS,
            photoLicense: '',
            flag: '',
            flagCount: 0,
            cards: [],
            OSS: 0,
            stars: 0
        };

        if (this.state.photo.name) {
            seller.photo = this.state.email + '-' + this.state.photo.name
        }
        if (this.state.photoLicense.name) {
            seller.photoLicense = this.state.email + '-' + this.state.photoLicense.name
        }

        this.props.registerSeller(seller, this.resetForm);
        this.props.uploadImage(images, this.state.email);
        console.log(seller)
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

        const Map = (e) => {
            e.preventDefault();
            this.setState({map: true})

        };

        const SendSuccess = () => {
            if (this.state.success === true) {
                return (
                    <div className={'successContainer'}><h1>Card created successfully!</h1></div>
                )
            } else return null
        };

        if (isAuthenticated) {
            return (

                <div className="newSellerMainContainer">

                    <div className='newSellerFormContainer'>
                        <h3>Register a new seller</h3>
                        <form onSubmit={this.handleSubmit}>
                            <div className={'formSection'}>
                                <label>Operator name</label>
                                <input
                                    type="text"
                                    placeholder={user.name}
                                    className={'sellerFormInput'}
                                    disabled='disabled'
                                    value={user.name}
                                />
                                <label>Seller name</label>
                                <input
                                    type="text"
                                    placeholder="Name"
                                    className={'sellerFormInput'}
                                    name="name"
                                    onChange={this.handleInputChange}
                                    value={this.state.name}
                                />
                                {errors.name && (<div className="invalidFeedback">{errors.name}</div>)}
                                <label>Seller license </label>
                                <input
                                    type="text"
                                    placeholder="License"
                                    className={'sellerFormInput'}
                                    name="license"
                                    onChange={this.handleInputChange}
                                    value={this.state.license}
                                />
                                {errors.license && (<div className="invalidFeedback">{errors.license}</div>)}

                                <label>Seller phone number </label>
                                <input
                                    type="text"
                                    placeholder="phone"
                                    className={'sellerFormInput'}
                                    name="phone"
                                    onChange={this.handleInputChange}
                                    value={this.state.phone}
                                />
                                {errors.phone && (<div className="invalidFeedback">{errors.phone}</div>)}

                                <label>Seller email </label>
                                <input
                                    type="email"
                                    placeholder="Email"
                                    className={'sellerFormInput'}
                                    name="email"
                                    onChange={this.handleInputChange}
                                    value={this.state.email}
                                />
                                {errors.email && (<div className="invalidFeedback">{errors.email}</div>)}

                                <label>Download Photo </label>
                                <input
                                    type="file"
                                    placeholder="Photo"
                                    className={'sellerFormInputFile'}
                                    name="photo"
                                    onChange={this.handleInputFileChange}

                                />
                                {errors.photo && (<div className="invalidFeedback">{errors.photo}</div>)}

                                <label>Download License photo </label>
                                <input
                                    type="file"
                                    placeholder="License photo"
                                    className={'sellerFormInputFile'}
                                    name="photoLicense"
                                    onChange={this.handleInputFileChange}
                                />
                                {errors.photoLicense && (<div className="invalidFeedback">{errors.photoLicense}</div>)}
                                <label>Ingredient supplier </label>
                                <input
                                    type="text"
                                    placeholder="ingredients"
                                    className={'sellerFormInput'}
                                    name="ingredients"
                                    onChange={this.handleInputChange}
                                    value={this.state.ingredients}
                                />
                                {errors.ingredients && (<div className="invalidFeedback">{errors.ingredients}</div>)}
                                <label>Food group </label>
                                <Select
                                    options={this.props.food}
                                    placeholder={'Select food group...'}
                                    value={foodSelect}
                                    onChange={this.handleChangeFood}
                                    className={'sellerFormSelect'}
                                />
                                {errors.foodGroup && (<div className="invalidFeedback">{errors.foodGroup}</div>)}
                                <label>Work schedule </label>
                                <input
                                    type="text"
                                    placeholder="schedule"
                                    className={'sellerFormInput'}
                                    name="schedule"
                                    onChange={this.handleInputChange}
                                    value={this.state.schedule}
                                />
                                {errors.schedule && (<div className="invalidFeedback">{errors.schedule}</div>)}

                            </div>
                            <div className={'formSection'}>
                                <label>Country</label>
                                <Select
                                    options={this.props.countries}
                                    placeholder={'Select country...'}
                                    value={countrySelect}
                                    onChange={this.handleChangeCountry}
                                    className={'sellerFormSelect'}
                                />
                                {errors.country && (<div className="invalidFeedback">{errors.country}</div>)}

                                <label>Sity</label>
                                <input
                                    type="text"
                                    placeholder="Sity"
                                    className={'sellerFormInput'}
                                    name="sity"
                                    onChange={this.handleInputChange}
                                    value={this.state.sity}
                                />
                                {errors.sity && (<div className="invalidFeedback">{errors.sity}</div>)}

                                <PlacesAutocomplete
                                    value={this.state.location}
                                    onChange={this.handleChange}
                                    onSelect={this.handleSelect}
                                >
                                    {({getInputProps, suggestions, getSuggestionItemProps, loading}) => (
                                        <div className={'searchLocationContainer'}>
                                            <label>Full address</label>
                                            <input
                                                {...getInputProps({
                                                    placeholder: 'Search Full Location Address...',
                                                    className: 'sellerFormInput',
                                                })}
                                            />
                                            {errors.location && (
                                                <div className="invalidFeedback">{errors.location}</div>)}

                                            <div className="autocompleteContainer">
                                                {loading && <div>Loading...</div>}
                                                {suggestions.map(suggestion => {
                                                    const className = suggestion.active
                                                        ? 'suggestion-item--active'
                                                        : 'suggestion-item';
                                                    const style = suggestion.active
                                                        ? {backgroundColor: 'aquamarine', cursor: 'pointer'}
                                                        : {backgroundColor: 'white', cursor: 'pointer'};
                                                    return (
                                                        <div
                                                            {...getSuggestionItemProps(suggestion, {
                                                                className,
                                                                style,
                                                            })}
                                                        >
                                                            <span
                                                                className={'spanSearch'}>{suggestion.description}</span>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                            <button className={'btnCheckMap'} onClick={Map}>Check on the map</button>
                                        </div>
                                    )}

                                </PlacesAutocomplete>
                                <MapContainer
                                    visible={this.state.map}
                                    GPS={this.state.GPS}
                                />

                            </div>

                            <button type="submit" className="btnFormSubmit">
                                Submit
                            </button>
                        </form>
                        <SendSuccess
                        />
                    </div>
                </div>

            )
        } else return (<Redirect to={{
            pathname: '/login',
        }}/>)
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
    food: state.food
});

export default connect(mapStateToProps, {registerSeller, uploadImage, getCountry, getFood})(withRouter(NewSeller))