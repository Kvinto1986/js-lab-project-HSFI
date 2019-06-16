import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import Select from "react-select";
import Modal from 'react-modal';
import {geocodeByAddress, getLatLng} from "react-places-autocomplete";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/dist/style.css'

import {updateSeller} from '../../actions/sellerAction';
import {getCountry} from '../../actions/countryAction';
import {uploadImage} from '../../actions/uploadAction';
import {getFood} from '../../actions/foodAction';

import MapAutocomplete from "../map/mapAutocomplete";
import SupplersTable from "./supplersTable";
import SheduleListTable from './scheduleTable'

import daysList from '../../resourses/days';
import likeImg from '../../resourses/images/like.png'

import './inspectionStyles.css'
import '../createSeller/createSellerStyles.css'

Modal.setAppElement('#root');

class SellerModal extends Component {
    state = {
        id: this.props.editSeller._id,
        operatorName: this.props.editSeller.operatorName,
        country: this.props.editSeller.country,
        name: this.props.editSeller.name,
        photo: this.props.editSeller.photo,
        phone: this.props.editSeller.phone,
        email: this.props.editSeller.email,
        license: this.props.editSeller.license,
        photoLicense: this.props.editSeller.photoLicense,
        GPS: {},
        city: this.props.editSeller.city,
        schedule: this.props.editSeller.schedule,
        ingredientSuppliers: this.props.editSeller.ingredientSuppliers,
        ingredient: '',
        foodGroup: this.props.editSeller.foodGroup,
        data: "",
        success: false,
        workingDays: [],
        beginningWork: '',
        endWork: '',
        address: '',
        mapVisibility: false,
        editSeller: false,
        errors: {},
    };

    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };

    handleDisableForm = (e) => {
        e.preventDefault();
        this.setState({
            editSeller: !this.state.editSeller
        });
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
        this.setState({
            ingredientSuppliers: this.state.ingredientSuppliers
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


    handleChangeSchedule = (workingDays) => {
        this.setState({workingDays});
    };

    handleAddSchedule = (e) => {
        e.preventDefault();
        if (this.state.address !== '' && this.state.workingDays.length > 0
            && this.state.beginningWork !== '' && this.state.endWork !== '') {
            const schedule = {};

            const workingDaysArr = this.state.workingDays;

            for (let i = 0; i < workingDaysArr.length; i++) {
                workingDaysArr[i] = workingDaysArr[i].value
            }

            this.setState({workingDaysArr: workingDaysArr});

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

        this.state.schedule.splice(index, 1);

        this.setState({
            schedule: this.state.schedule
        });


    };

    resetForm = () => {

        this.setState({
            id: this.props.editSeller._id,
            operatorName: this.props.editSeller.operatorName,
            country: this.props.editSeller.country,
            name: this.props.editSeller.name,
            photo: this.props.editSeller.photo,
            photoURL: this.props.editSeller.photoURL,
            photoLicenseURL: this.props.editSeller.photoLicenseURL,
            phone: this.props.editSeller.phone,
            email: this.props.editSeller.email,
            license: this.props.editSeller.license,
            photoLicense: this.props.editSeller.photoLicense,
            GPS: {},
            city: this.props.editSeller.city,
            schedule: this.props.editSeller.schedule,
            ingredientSuppliers: this.props.editSeller.ingredientSuppliers,
            ingredient: '',
            foodGroup: this.props.editSeller.foodGroup,
            data: "",
            success: false,
            workingDays: [],
            beginningWork: '',
            endWork: '',
            address: '',
            mapVisibility: false,
            editSeller: false,
            errors: {},
        });
        const rotateElem = document.getElementsByClassName("inspectionModalSellerFormInner")[0];
        rotateElem.style.transform = "rotateY(180deg)";
        setTimeout(() => {
            rotateElem.style.transform = "rotateY(0deg)";
            this.props.closeEditSellerModal()
        }, 3000);
    };

    handleSubmit = (e) => {
        e.preventDefault();

        const imdTypePhoto='imagePhoto';
        const imdTypePhotoLicense='imagePhotoLicense';

        const seller = {
            id: this.state.id,
            country: this.state.country,
            name: this.state.name,
            photo: this.state.photo,
            phone: this.state.phone,
            email: this.state.email,
            license: this.state.license,
            schedule: this.state.schedule,
            ingredientSuppliers: this.state.ingredientSuppliers,
            foodGroup: this.state.foodGroup,
            city: this.state.city,
            photoLicense: this.state.photoLicense,
        };



        if (this.state.photo.name) {
            const imagePhoto = new FormData();
            imagePhoto.append('file', this.state.photo);
            seller.photo = this.state.email + '-' + this.state.photo.name;
            this.props.uploadImage(imagePhoto, this.state.email,imdTypePhoto);
        }

        if (this.state.photoLicense.name) {
            const imagePhotoLicense = new FormData();
            imagePhotoLicense.append('file', this.state.photoLicense);
            seller.photo = this.state.email + '-' + this.state.photoLicense.name;
            this.props.uploadImage(imagePhotoLicense, this.state.email,imdTypePhotoLicense);
        }

        this.props.updateSeller(seller, this.resetForm, this.props.findSellers);
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
        const {errors} = this.state;
        const {countrySelect} = this.state.country;
        const {foodSelect} = this.state.foodGroup;

        return (
            <Modal
                isOpen={this.props.modalEditSellerStatus}
                contentLabel="Modal"
                className='inspectionModalSellerFormInner'
                id='inspectionModalSellerFormInner'
            >

                <div className="inspectionModalFormFront">
                    <div className="inspectionModalH">
                        <h1>Edit seller details </h1>
                        <button className={'closeModalButton'} onClick={this.props.closeEditSellerModal}><strong>X</strong>
                        </button>
                    </div>
                    <form onSubmit={this.handleSubmit} className={'sellerForm'}>
                        <div className='sellerformSection'>
                            {this.state.editSeller ? (
                                    <Fragment>
                                        <label>Download new photo </label>
                                        <input
                                            type="file"
                                            placeholder="Photo"
                                            name="photo"
                                            onChange={this.handleInputFileChange}
                                        />
                                        {errors.photo && (<div className="invalidFeedback">{errors.photo}</div>)}

                                        <label>Download new license photo </label>
                                        <input
                                            type="file"
                                            placeholder="License photo"
                                            name="photoLicense"
                                            onChange={this.handleInputFileChange}
                                        />
                                        {errors.photoLicense && (
                                            <div className="invalidFeedback">{errors.photoLicense}</div>)}
                                    </Fragment>) :
                                <Fragment>
                                    <div className={'sellerPhoto'}>
                                        <img alt={this.state.photo} src={this.state.photo}/>
                                        <img alt={this.state.photoLicense}
                                             src={this.state.photoLicense}/>
                                    </div>
                                </Fragment>
                            }
                            <label>Operator name</label>
                            <input
                                type="text"
                                placeholder={this.state.operatorName}
                                disabled='disabled'
                                value={this.state.operatorName}

                            />
                            <label>Seller name</label>
                            <input
                                type="text"
                                placeholder="Name"
                                name="name"
                                onChange={this.handleInputChange}
                                value={this.state.name}
                                disabled={!this.state.editSeller}
                            />
                            {errors.name && (<div className="invalidFeedback">{errors.name}</div>)}

                            <label>Country</label>
                            <Select
                                options={this.props.countries}
                                placeholder={this.state.country}
                                value={countrySelect}
                                onChange={this.handleChangeCountry}
                                className={'sellerFormSelect'}
                                isDisabled={!this.state.editSeller}
                            />
                            {errors.country && (<div className="invalidFeedback">{errors.country}</div>)}

                            <label>City</label>
                            <input
                                type="text"
                                placeholder="City"
                                name="city"
                                onChange={this.handleInputChange}
                                value={this.state.city}
                                disabled={!this.state.editSeller}
                            />
                            {errors.city && (<div className="invalidFeedback">{errors.city}</div>)}

                            <label>Seller license </label>
                            <input
                                type="text"
                                placeholder="License"
                                name="license"
                                onChange={this.handleInputChange}
                                value={this.state.license}
                                disabled={!this.state.editSeller}
                            />
                            {errors.license && (<div className="invalidFeedback">{errors.license}</div>)}

                            <label>Seller phone number </label>
                            <div id='sellerPhoneInput'>
                                <PhoneInput
                                    placeholder="Phone number"
                                    onChange={this.handlePhoneChange}
                                    value={this.state.phone}
                                    disabled={!this.state.editSeller}
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
                                disabled={!this.state.editSeller}
                            />
                            {errors.email && (<div className="invalidFeedback">{errors.email}</div>)}

                            <label>Food group </label>
                            <Select
                                options={this.props.food}
                                placeholder={this.state.foodGroup}
                                value={foodSelect}
                                onChange={this.handleChangeFood}
                                className={'sellerFormSelect'}
                                isDisabled={!this.state.editSeller}
                            />
                            {errors.foodGroup && (<div className="invalidFeedback">{errors.foodGroup}</div>)}

                            {this.state.editSeller && (<button type="submit" className="btnSellerFormSubmit">
                                Submit
                            </button>)}

                            {!this.state.editSeller && (<button type="submit" className="btnSellerFormSubmit"
                                                                onClick={this.handleDisableForm}>
                                Edit
                            </button>)}
                        </div>

                        <div className={'sellerformSection'}>
                            <div className={'sellerIngredientFormSection'}>

                                <SupplersTable
                                    disabled={this.state.editSeller}
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
                                    disabled={!this.state.editSeller}
                                />
                                <button onClick={this.handleAddSupplier} disabled={!this.state.editSeller}>
                                    Add supplier
                                </button>
                            </div>
                            {errors.ingredientSuppliers && (
                                <div className="invalidFeedback">{errors.ingredientSuppliers}</div>)}
                            <div className={'sellerScheduleFormSection'}>

                                <h3>Work schedule </h3>

                                <SheduleListTable
                                    disabled={this.state.editSeller}
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
                                    isDisabled={!this.state.editSeller}
                                />

                                <label>Beginning of work</label>
                                <input
                                    type="time"
                                    step="600"
                                    placeholder="Working hours"
                                    name="beginningWork"
                                    onChange={this.handleInputChange}
                                    value={this.state.beginningWork}
                                    disabled={!this.state.editSeller}
                                />

                                <label>End of work</label>
                                <input
                                    type="time"
                                    step="600"
                                    placeholder="Working hours"
                                    name="endWork"
                                    onChange={this.handleInputChange}
                                    value={this.state.endWork}
                                    disabled={!this.state.editSeller}
                                />

                                <MapAutocomplete
                                    error={errors.foodGroup}
                                    mapVisibility={this.state.mapVisibility}
                                    value={this.state.address}
                                    onChange={this.onChangeLocation}
                                    onSelect={this.onSelectLocation}
                                    GPS={this.state.GPS}
                                    handleMapVisibility={this.handleMapVisibility}
                                    mapContainerClass={'inputMapContainer'}
                                    mapClass={'sellerMap'}
                                    btnMapClass={'btnSellerCheckMap'}
                                />

                                <button className={'btnSellerCheckMap'} onClick={this.handleAddSchedule}
                                        disabled={!this.state.editSeller}>
                                    Add schedule
                                </button>
                                {errors.schedule && (
                                    <div className="invalidFeedback">{errors.schedule}</div>)}

                            </div>
                        </div>
                    </form>
                </div>

                <div className="sellerFormBack">
                    <h1>Seller successfully updated!</h1>
                    <img src={likeImg} alt={'like'}/>
                </div>

            </Modal>
        )
    }
}

SellerModal.propTypes = {
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

export default connect(mapStateToProps, {updateSeller, uploadImage, getCountry, getFood})(withRouter(SellerModal))