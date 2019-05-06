import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import Select from "react-select";
import {geocodeByAddress, getLatLng} from "react-places-autocomplete";

import {registerSeller} from '../../actions/sellerAction';
import {getCountry} from '../../actions/countryAction';
import {uploadImage} from '../../actions/uploadAction';
import {getFood} from '../../actions/foodAction';

import MapAutocomplete from "../map/mapAutocomplete";

import days from '../../resourses/days';

import './createSellerStyles.css'

const daysList=Array.from(days).slice(0);

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
            sity: '',
            schedule: [],
            ingredientSuppliers:[],
            ingredient: '',
            foodGroup: "",
            data: "",
            success: false,
            workingDays:[],
            beginningWork:'',
            endWork:'',
            address:'',
            mapVisibility:false,
            errors: {},
        };

    handleAddSchedule=(e)=>{
        e.preventDefault();

        const schedule={};

        for(let i=0;i<this.state. workingDays.length;i++){
            const index=daysList.indexOf(this.state. workingDays[i]);
            daysList.splice(index, 1);
            this.state. workingDays[i]=this.state. workingDays[i].value
        }

        schedule.address=this.state.address;
        schedule.GPS=this.state.GPS;
        schedule.workingDays=this.state.workingDays;
        schedule.beginningWork=this.state.beginningWork;
        schedule.endWork=this.state.endWork;

        this.state.schedule.push(schedule);

        this.setState({
            GPS:{},
            workingDays:[],
            beginningWork:'',
            endWork:'',
            address:'',
           });
    };

    onChangeLocation = (location) => {
        this.setState({address: location});
        this.setState({mapVisibility: false});

        geocodeByAddress(location)
            .then(results => {
                return getLatLng(results[0])
            })
            .then(latLng => {
                this.setState({GPS: latLng})
            })
            .catch(error => console.error('Error', error));

    };

    onSelectLocation = (address) => {
        this.setState({address: address});


    };

    handleMapVisibility = (e) => {
        e.preventDefault();
        this.setState({mapVisibility: true})
    };

    handleAddSupplier=(e)=>{
        e.preventDefault();
        this.state.ingredientSuppliers.push(this.state.ingredient);
        this.setState({
            ingredient: ''
        });


    };

    handleDeleteSupplier=(e)=>{
        e.preventDefault();
        const index=this.state.ingredientSuppliers.indexOf(e.target.name);
        this.state.ingredientSuppliers.splice(index, 1);
        console.log(this.state.ingredientSuppliers);
        this.setState({
            ingredientSuppliers: this.state.ingredientSuppliers
        });

    };

    handleChangeSchedule = (workingDays) => {
        this.setState({workingDays});
    };

    handleChange = (location) => {
        this.setState({location});
        this.setState({map: false})
    };



    handleInputChange=(e)=> {
        this.setState({
            [e.target.name]: e.target.value
        })
    };

    handleInputFileChange=(e)=> {
        this.setState({
            [e.target.name]: e.target.files[0]
        })
    };

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
            ingredientSuppliers: [],
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

    handleSubmit=(e) =>{
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
            schedule: this.state.schedule,
            ingredientSuppliers: this.state.ingredientSuppliers,
            foodGroup: this.state.foodGroup,
            sity: this.state.sity,
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
    };

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
        const {foodSelect} = this.state.foodGroup;

        const SendSuccess = () => {
            if (this.state.success) {
                return (
                    <div className={'successContainer'}><h1>Card created successfully!</h1></div>
                )
            } else return null
        };

        const IngridientsList = () => {
            if (this.state.ingredientSuppliers.length>0) {
                const liArr=[];

                for(let i=0;i<this.state.ingredientSuppliers.length;i++){
                    liArr.push(<li key={this.state.ingredientSuppliers[i]}>
                        {this.state.ingredientSuppliers[i]}
                        <button name={this.state.ingredientSuppliers[i]} onClick={this.handleDeleteSupplier}>Delete</button></li>)
                }
                return (
                    <ul>
                        {liArr}
                    </ul>

                )
            } else return null
        };


        if (isAuthenticated) {
            return (

                <div className="sellerMainContainer">
                    <div className='formContainer'>
                        <h1>Register a new seller</h1>
                        <form onSubmit={this.handleSubmit} className={'sellerForm'}>
                            <div className='sellerformSection'>
                                <label>Operator name</label>
                                <input
                                    type="text"
                                    placeholder={user.name}
                                    disabled='disabled'
                                    value={user.name}
                                />
                                <label>Seller name</label>
                                <input
                                    type="text"
                                    placeholder="Name"
                                    name="name"
                                    onChange={this.handleInputChange}
                                    value={this.state.name}
                                />
                                {errors.name && (<div className="invalidFeedback">{errors.name}</div>)}

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
                                    name="sity"
                                    onChange={this.handleInputChange}
                                    value={this.state.sity}
                                />
                                {errors.sity && (<div className="invalidFeedback">{errors.sity}</div>)}

                                <label>Seller license </label>
                                <input
                                    type="text"
                                    placeholder="License"
                                    name="license"
                                    onChange={this.handleInputChange}
                                    value={this.state.license}
                                />
                                {errors.license && (<div className="invalidFeedback">{errors.license}</div>)}

                                <label>Seller phone number </label>
                                <input
                                    type="text"
                                    placeholder="phone"
                                    name="phone"
                                    onChange={this.handleInputChange}
                                    value={this.state.phone}
                                />
                                {errors.phone && (<div className="invalidFeedback">{errors.phone}</div>)}

                                <label>Seller email </label>
                                <input
                                    type="email"
                                    placeholder="Email"
                                    name="email"
                                    onChange={this.handleInputChange}
                                    value={this.state.email}
                                />
                                {errors.email && (<div className="invalidFeedback">{errors.email}</div>)}

                                <label>Download Photo </label>
                                <input
                                    type="file"
                                    placeholder="Photo"
                                    name="photo"
                                    onChange={this.handleInputFileChange}

                                />
                                {errors.photo && (<div className="invalidFeedback">{errors.photo}</div>)}

                                <label>Download License photo </label>
                                <input
                                    type="file"
                                    placeholder="License photo"
                                    name="photoLicense"
                                    onChange={this.handleInputFileChange}
                                />
                                {errors.photoLicense && (<div className="invalidFeedback">{errors.photoLicense}</div>)}

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
                                    <IngridientsList
                                    />
                                <label>Ingredient supplier </label>
                                <input
                                    type="text"
                                    placeholder="Ingredient supplier"
                                    name="ingredient"
                                    onChange={this.handleInputChange}
                                    value={this.state.ingredient}
                                />
                                {errors.ingredientSuppliers && (<div className="invalidFeedback">{errors.ingredientSuppliers}</div>)}

                                <button onClick={this.handleAddSupplier}>
                                    Add supplier
                                </button>
                                </div>
                                <div className={'sellerScheduleFormSection'}>
                                    <h3>Work schedule </h3>
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
                                    <MapAutocomplete
                                        error={errors.foodGroup}
                                        mapVisibility={this.state.mapVisibility}
                                        value={this.state.address}
                                        onChange={this.onChangeLocation}
                                        onSelect={this.onSelectLocation}
                                        GPS={this.state.GPS}
                                        handleMapVisibility={this.handleMapVisibility}
                                        mapContainerClass={'sellerMapContainer'}
                                        mapClass={'sellerMap'}
                                        btnMapClass={'btnSellerCheckMap'}
                                    />
                                    <button className={'btnSellerCheckMap'} onClick={this.handleAddSchedule}>
                                        Add schedule
                                    </button>
                                </div>
                            </div>
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