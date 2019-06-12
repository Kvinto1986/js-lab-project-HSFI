import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import Select from "react-select";
import {geocodeByAddress, getLatLng} from "react-places-autocomplete";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/dist/style.css'

import {registerSeller} from '../../actions/sellerAction';
import {getCountry} from '../../actions/countryAction';
import {uploadImage} from '../../actions/uploadAction';
import {getFood} from '../../actions/foodAction';

import MapContainer from "../map/mapAutocomplete";
import SupplersTable from "./supplersTable";
import SheduleListTable from './scheduleTable'

import daysList from '../../resourses/days';
import likeImg from '../../resourses/images/like.png'

import './createSellerStyles.css'

class NewSeller extends Component {

    state = {
        operatorName: "",
        country: '',
        name: "",
        photo: "",
        phone: "",
        email: "",
        license: "",
        photoLicense: '',
        GPS: {},
        city: '',
        schedule: [],
        ingredientSuppliers: [],
        ingredient: '',
        foodGroup: "",
        data: "",
        success: false,
        workingDays: [],
        beginningWork: '',
        endWork: '',
        address: '',
        mapVisibility: true,
        errors: {},
    };

    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };

    handleChangeCountry = (countrySelect) => {
        this.setState({country: countrySelect.value});
    };

    handlePhoneChange = (number) => {
        this.setState({phone: number})
    };

    handleInputFileChange = (e) => {
        this.setState({
            [e.target.name]: e.target.files[0]
        })
    };

    handleChangeFood = (foodSelect) => {
        this.setState({foodGroup: foodSelect.value});

    };

    handleAddSupplier = (e) => {
        e.preventDefault();
        if (this.state.ingredient !== '' && !this.state.ingredientSuppliers.includes(this.state.ingredient)) {
            this.state.ingredientSuppliers.push(this.state.ingredient);
            this.setState({
                ingredient: ''
            });

        }
    };

    handleDeleteSupplier = (e) => {
        e.preventDefault();
        const index = this.state.ingredientSuppliers.indexOf(e.target.name);
        this.state.ingredientSuppliers.splice(index, 1);
        console.log(this.state.ingredientSuppliers);
        this.setState({
            ingredientSuppliers: this.state.ingredientSuppliers
        });
    };

    onSelectLocation = (location) => {
        this.setState({
            address: location.description
        });
        this.setState({mapVisibility: false});

        geocodeByAddress(location.description)
            .then(results => {
                return getLatLng(results[0])
            })
            .then(latLng => {
                this.setState({GPS: latLng});
                this.setState({mapVisibility: true})
            })

    };

    handleChangeSchedule = (workingDays) => {
        this.setState({workingDays});
    };

    handleAddSchedule = (e) => {
        e.preventDefault();
        if (this.state.address !== '' && this.state.workingDays.length > 0
            && this.state.beginningWork !== '' && this.state.endWork !== '') {
            const schedule = {};

            for (let i = 0; i < this.state.workingDays.length; i++) {
                this.state.workingDays[i] = this.state.workingDays[i].value
            }

            schedule.address = this.state.address;
            schedule.GPS = this.state.GPS;
            schedule.workingDays = this.state.workingDays;
            schedule.beginningWork = this.state.beginningWork;
            schedule.endWork = this.state.endWork;

            this.state.schedule.push(schedule);

            this.setState({
                GPS: {},
                workingDays: [],
                beginningWork: '',
                endWork: '',
                address: '',
                mapVisibility: false
            });
        }
    };

    handleDeleteSchedule = (e) => {
        e.preventDefault();
        const index = this.state.schedule.indexOf(e.target.name);
        console.log(this.state.schedule[index]);

        this.state.schedule.splice(index, 1);
        console.log(this.state.schedule);
        this.setState({
            schedule: this.state.schedule
        });


    };

    resetForm = () => {
        const rotateElem=document.getElementById("sellerFormInner");
        rotateElem.style.transform = "rotateY(180deg)";

        this.setState({
            operatorName: "",
            country: '',
            name: "",
            photo: "",
            phone: "",
            email: "",
            license: "",
            photoLicense: '',
            GPS: {},
            city: '',
            schedule: [],
            ingredientSuppliers: [],
            ingredient: '',
            foodGroup: "",
            data: "",
            success: true,
            workingDays: [],
            beginningWork: '',
            endWork: '',
            address: '',
            mapVisibility: false,
            errors: {},
        });

        setTimeout(() => {
            rotateElem.style.transform = "rotateY(0deg)";
        }, 5000);
    };

    handleSubmit = (e) => {
        e.preventDefault();

        const imagePhoto = new FormData();
        const imagePhotoLicense = new FormData();
        imagePhoto.append('file', this.state.photo);
        imagePhotoLicense.append('file', this.state.photoLicense);

        const seller = {
            operatorName: this.props.auth.user.name,
            name: this.state.name,
            photo: '',
            phone: this.state.phone,
            email: this.state.email,
            license: this.state.license,
            schedule: this.state.schedule,
            ingredientSuppliers: this.state.ingredientSuppliers,
            foodGroup: this.state.foodGroup,
            city: this.state.city,
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
        if(this.props.auth.user.role!=='manager'){
            seller.country=this.props.auth.user.country
        }

        if(this.props.auth.user.role==='manager'){
            seller.country=this.state.country
        }

        const imdTypePhoto='imagePhoto';
        const imdTypePhotoLicense='imagePhotoLicense';

        const upload = () => {
            this.props.uploadImage(imagePhoto, this.state.email,imdTypePhoto);
            this.props.uploadImage(imagePhotoLicense, this.state.email,imdTypePhotoLicense);
        };

        this.props.registerSeller(seller, this.resetForm, upload);

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
        const {foodSelect} = this.state.foodGroup;

        if (isAuthenticated && user.tasks.includes('createNewSeller')) {
            return (
                <div className="sellerMainContainer">
                    <div className='sellerFormInner' id='sellerFormInner'>
                        <div className="sellerFormFront">
                            <h1>Register a new seller</h1>
                            <form onSubmit={this.handleSubmit} className={'sellerForm'}>
                                <div className='sellerformSection'>
                                    <label>Operator name</label>
                                    <input
                                        type="text"
                                        placeholder={user.name}
                                        disabled='disabled'
                                        value={user.name}
                                        required
                                    />
                                    <label>Seller name</label>
                                    <input
                                        type="text"
                                        placeholder="Name"
                                        name="name"
                                        onChange={this.handleInputChange}
                                        value={this.state.name}
                                        required
                                    />
                                    {errors.name && (<div className="invalidFeedback">{errors.name}</div>)}

                                    <label>Country</label>
                                    {user.role!=='manager'?(
                                        <Select
                                            placeholder={user.country}
                                            value={user.country}
                                            className={'sellerFormSelect'}
                                            isDisabled={true}
                                        />):<Select
                                        options={this.props.countries}
                                        placeholder={'Select country...'}
                                        value={countrySelect}
                                        onChange={this.handleChangeCountry}
                                        className={'sellerFormSelect'}
                                    />}
                                    {errors.country && (<div className="invalidFeedback">{errors.country}</div>)}

                                    <label>City</label>
                                    <input
                                        type="text"
                                        placeholder="City"
                                        name="city"
                                        onChange={this.handleInputChange}
                                        value={this.state.city}
                                        required
                                    />
                                    {errors.city && (<div className="invalidFeedback">{errors.city}</div>)}

                                    <label>Seller license </label>
                                    <input
                                        type="text"
                                        placeholder="License"
                                        name="license"
                                        onChange={this.handleInputChange}
                                        value={this.state.license}
                                        required
                                    />
                                    {errors.license && (<div className="invalidFeedback">{errors.license}</div>)}

                                    <label>Seller phone number </label>
                                    <div id='sellerPhoneInput'>
                                        <PhoneInput
                                            placeholder="Phone number"
                                            onChange={this.handlePhoneChange}
                                            value={this.state.phone}
                                            required
                                        >
                                        </PhoneInput>
                                        {errors.phone && (<div className="invalidFeedback">{errors.phone}</div>)}
                                    </div>

                                    <label>Seller email </label>
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        name="email"
                                        onChange={this.handleInputChange}
                                        value={this.state.email}
                                        required
                                    />
                                    {errors.email && (<div className="invalidFeedback">{errors.email}</div>)}

                                    <label>Download Photo </label>
                                    <input
                                        type="file"
                                        placeholder="Photo"
                                        name="photo"
                                        onChange={this.handleInputFileChange}
                                        required
                                    />
                                    {errors.photo && (<div className="invalidFeedback">{errors.photo}</div>)}

                                    <label>Download License photo </label>
                                    <input
                                        type="file"
                                        placeholder="License photo"
                                        name="photoLicense"
                                        onChange={this.handleInputFileChange}
                                        required
                                    />
                                    {errors.photoLicense && (
                                        <div className="invalidFeedback">{errors.photoLicense}</div>)}

                                    <label>Food group </label>
                                    <Select
                                        options={this.props.food}
                                        placeholder={'Select food group...'}
                                        value={foodSelect}
                                        onChange={this.handleChangeFood}
                                        className={'sellerFormSelect'}
                                    />
                                    {errors.foodGroup && (<div className="invalidFeedback">{errors.foodGroup}</div>)}

                                    <button type="submit" className="btnSellerFormSubmit">
                                        Submit
                                    </button>

                                </div>

                                <div className={'sellerformSection'}>
                                    <div className={'sellerIngredientFormSection'}>

                                        <SupplersTable
                                            ingredientSuppliers={this.state.ingredientSuppliers}
                                            handleDeleteSupplier={this.handleDeleteSupplier}
                                        />

                                        <label>Ingredient supplier </label>
                                        <input
                                            type="text"
                                            placeholder="Ingredient supplier"
                                            name="ingredient"
                                            onChange={this.handleInputChange}
                                            value={this.state.ingredient}
                                        />
                                        <button onClick={this.handleAddSupplier}>
                                            Add supplier
                                        </button>
                                    </div>
                                    {errors.ingredientSuppliers && (
                                        <div className="invalidFeedback">{errors.ingredientSuppliers}</div>)}
                                    <div className={'sellerScheduleFormSection'}>

                                        <h3>Work schedule </h3>

                                        <SheduleListTable
                                            schedule={this.state.schedule}
                                            handleDeleteSchedule={this.handleDeleteSchedule}
                                        />

                                        <label>Working days </label>
                                        <Select
                                            isMulti
                                            joinValues
                                            options={daysList}
                                            placeholder={'Select days...'}
                                            value={this.state.workingDays}
                                            onChange={this.handleChangeSchedule}
                                            className={'sellerFormSelect'}
                                        />

                                        <label>Beginning of work</label>
                                        <input
                                            type="time"
                                            step="600"
                                            placeholder="Working hours"
                                            name="beginningWork"
                                            onChange={this.handleInputChange}
                                            value={this.state.beginningWork}

                                        />

                                        <label>End of work</label>
                                        <input
                                            type="time"
                                            step="600"
                                            placeholder="Working hours"
                                            name="endWork"
                                            onChange={this.handleInputChange}
                                            value={this.state.endWork}

                                        />

                                        <MapContainer
                                            error={errors.foodGroup}
                                            onSelectLocation={this.onSelectLocation}
                                            GPS={this.state.GPS}
                                            mapVisibility={this.state.mapVisibility}
                                            mapContainerClass={'sellerCreateMapContainer'}
                                            mapClass={'sellerMap'}
                                            btnMapClass={'btnSellerCheckMap'}
                                        />

                                        <button className={'btnSellerCheckMap'} onClick={this.handleAddSchedule}>
                                            Add schedule
                                        </button>
                                        {errors.schedule && (
                                            <div className="invalidFeedback">{errors.schedule}</div>)}

                                    </div>
                                </div>
                            </form>
                        </div>

                        <div className="sellerFormBack">
                            <h1>Seller successfully added to database!</h1>
                            <img src={likeImg} alt={'like'}/>
                        </div>

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
    uploadImage: PropTypes.func.isRequired,
    getCountry: PropTypes.func.isRequired,
    getFood: PropTypes.func.isRequired,
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