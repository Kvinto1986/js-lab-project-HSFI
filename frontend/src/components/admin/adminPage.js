import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import Select from "react-select";
import Modal from 'react-modal';
import {getOrganizations, registerOrganization} from "../../actions/organizationAction";
import {getCountry, registerCountry} from "../../actions/countryAction";
import {getFood, registerFood} from "../../actions/foodAction";
import {getInspectionQuestions, registerInspectionQuestion} from "../../actions/inspectionQuestionsAction";
import countriesArr from "../../resourses/countries";
import './adminStyles.css'
import ModalWindow from './modalAdmin'
import {geocodeByAddress, getLatLng} from "react-places-autocomplete";
import MapAutocomplete from "../map/mapAutocomplete";


Modal.setAppElement('#root');

class Admin extends Component {


    state = {
        country: '',
        food: '',
        question: '',
        newOrganizationName:'',
        newOrganizationAddress:'',
        newOrganizationGPS:{},
        countryModal: false,
        foodModal: false,
        questionModal: false,
        organizationModal:false,
        success: false,
        mapVisibility: false,
        errors: {},

    };

    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value

        })
    };

    openModal = (e) => {
        this.setState({[e.target.name]: true});
    };


    closeModal = (e) => {
        this.setState({[e.target.name]: false});
    };

    handleChangeCountry = (countrySelect) => {
        this.setState({
            country: countrySelect.value
        });

    };

    handleSubmitFood = (e) => {
        e.preventDefault();
        const food = {
            food: this.state.food
        };

        this.props.registerFood(food, this.resetForm)
    };

    handleSubmitCountry = (e) => {
        e.preventDefault();
        const country = {
            country: this.state.country
        };

        this.props.registerCountry(country, this.resetForm)
    };

    handleSubmitQuestion = (e) => {
        e.preventDefault();
        const question = {
            question: this.state.question
        };

        this.props.registerInspectionQuestion(question, this.resetForm)
    };

    handleOrganizationLocation = (location) => {
        this.setState({newOrganizationAddress:location});
        geocodeByAddress(location)
            .then(results => {
                return getLatLng(results[0])
            })
            .then(latLng => {
                this.setState({newOrganizationGPS: latLng})
            })
            .catch(error => console.error('Error', error));
    };

    handleOrganizationAddress = (address) => {
        this.setState({newOrganizationAddress:address});
        this.setState({mapVisibility: false})
    };

    handleSubmitOrganization = (e) => {
        e.preventDefault();

        const organization = {
            newOrganizationName: this.state.newOrganizationName,
            newOrganizationAddress: this.state.newOrganizationAddress,
            newOrganizationGPS: this.state.newOrganizationGPS
        };

        this.props.registerOrganization(organization);
    };

    handleMapVisibility = (e) => {
        e.preventDefault();
        this.setState({mapVisibility: true})
    };

    resetForm = () => {
        this.setState({
            country: '',
            food: '',
            question: '',
            countryModal: false,
            foodModal: false,
            questionModal: false,
            success: true
        });
        setTimeout(() => {
            this.setState({success: false})
        }, 5000);
    };

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.errors !== prevState.errors) {
            return {errors: nextProps.errors};
        } else return null;
    }


    componentDidMount() {
        this.props.getOrganizations();
        this.props.getCountry();
        this.props.getFood();
        this.props.getInspectionQuestions()
    }

    render() {
        const {isAuthenticated, user} = this.props.auth;
        const {errors} = this.state;

        const SendSuccess = () => {
            if (this.state.success === true) {
                return (
                    <div className={'successContainer'}><h1>Data written successfully!</h1></div>
                )
            } else return null
        };


        if (isAuthenticated) {
            return (

                <div className="adminMainContainer">
                    <div className="adminAddDataContainer">
                        <ul>
                            <li>
                                <button name={"countryModal"} onClick={this.openModal} className={'modalButton'}>Add
                                    country
                                </button>
                            </li>
                            <li>
                                <button name={"foodModal"} onClick={this.openModal} className={'modalButton'}>Add food
                                    group
                                </button>
                            </li>
                            <li>
                                <button name={"questionModal"} onClick={this.openModal} className={'modalButton'}>Add
                                    inspection question
                                </button>
                            </li>
                            <li>
                                <button name={"organizationModal"} onClick={this.openModal} className={'modalButton'}>Add
                                    organization
                                </button>
                            </li>
                        </ul>

                        <ModalWindow
                            isOpen={this.state.countryModal}
                            onRequestClose={this.closeModal}
                            array={countriesArr}
                            select={this.state.country}
                            handleChange={this.handleChangeCountry}
                            handleSubmit={this.handleSubmitCountry}
                            error={errors.country}
                            />

                        <ModalWindow
                            isOpen={this.state.foodModal}
                            onRequestClose={this.closeModal}
                            array={countriesArr}
                            select={this.state.country}
                            handleChange={this.handleChangeCountry}
                            handleSubmit={this.handleSubmitCountry}
                            error={errors.country}
                        />

                        <Modal
                            isOpen={this.state.foodModal}
                            onRequestClose={this.closeModal}
                            contentLabel="Modal"
                            className={'modal'}
                        >
                            <button name={"foodModal"} onClick={this.closeModal}>close</button>
                            <h2>Enter food group </h2>
                            <input
                                type="text"
                                placeholder="Food group"
                                name="food"
                                onChange={this.handleInputChange}
                                value={this.state.food}
                                className={'registerFormInput'}
                            />
                            {errors.food && (<div className="invalidFeedback">{errors.food}</div>)}
                            <button onClick={this.handleSubmitFood}>Send</button>
                        </Modal>

                        <Modal
                            isOpen={this.state.questionModal}
                            onRequestClose={this.closeModal}
                            contentLabel="Modal"
                            className={'modal'}
                        >
                            <button name={"questionModal"} onClick={this.closeModal}>close</button>
                            <h2>Enter question</h2>
                            <input
                                type="text"
                                placeholder="Question"
                                name="question"
                                onChange={this.handleInputChange}
                                value={this.state.question}
                                className={'registerFormInput'}
                            />
                            {errors.question && (<div className="invalidFeedback">{errors.question}</div>)}
                            <button onClick={this.handleSubmitQuestion}>Send</button>
                        </Modal>



                        <Modal
                            isOpen={this.state.organizationModal}
                            onRequestClose={this.closeModal}
                            contentLabel="Modal"
                            className={'modal'}
                        >
                            <button name={"organizationModal"} onClick={this.closeModal}>close</button>
                            <h2>Enter organization</h2>

                            <input
                                type="text"
                                placeholder="Organization"
                                name="newOrganizationName"
                                onChange={this.handleInputChange}
                                value={this.state.newOrganizationName}
                                className={'formInput'}
                            />
                            {errors.newOrganizationName && (<div className="invalidFeedback">{errors.newOrganizationName}</div>)}

                            <MapAutocomplete
                                errors={errors}
                                mapVisibility={this.state.mapVisibility}
                                value={this.state.newOrganizationAddress}
                                onChange={this.handleOrganizationAddress}
                                onSelect={this.handleOrganizationLocation}
                                GPS={this.state.newOrganizationGPS}
                                handleMapVisibility={this.handleMapVisibility}
                            />

                            <button onClick={this.handleSubmitOrganization}>Send</button>
                        </Modal>


                    </div>
                    <SendSuccess
                    />
                </div>


            )
        } else return (<Redirect to={{
            pathname: '/login',
        }}/>)
    }
}

Admin.propTypes = {
    auth: PropTypes.object.isRequired,
    countries: PropTypes.array.isRequired,
    organizations: PropTypes.array.isRequired,
    food: PropTypes.array.isRequired,
};
const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors,
    countries: state.countries,
    organizations: state.organizations,
    food: state.food,
    inspectionQuestions: state.questions
});

export default connect(mapStateToProps, {
    getCountry,
    registerCountry,
    getFood,
    registerFood,
    getOrganizations,
    registerOrganization,
    getInspectionQuestions,
    registerInspectionQuestion
})(withRouter(Admin))