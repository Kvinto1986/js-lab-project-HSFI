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
import {getInspectionsOperators, getInspectionsGPS} from "../../actions/inspectionAction";

import countriesArr from "../../resourses/countries";
import './adminStyles.css'
import {geocodeByAddress, getLatLng} from "react-places-autocomplete";
import MapAutocomplete from "../map/mapAutocomplete";
import OperatorsMapContainer from "./operatorsMap";
import likeImg from "../../resourses/images/like.png";


Modal.setAppElement('#root');

class Admin extends Component {


    state = {
        country: '',
        food: '',
        question: '',
        newOrganizationName: '',
        newOrganizationAddress: '',
        newOrganizationGPS: {},
        countryModal: false,
        foodModal: false,
        questionModal: false,
        organizationModal: false,
        success: false,
        mapVisibility: false,
        inspectionMapVisibility: false,
        errors: {},
        operator: '',
        startDate:'',
        endDate:''
    };

    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value

        })
    };

    handleChangeOperator = (operator) => {
        this.setState({
            operator: operator.value
        });
    };

    handleInspectionMapVisibility=()=>{
        this.setState({
            inspectionMapVisibility: true

        })
    };

    handleSendInspection=()=>{
        const operatorSearch = {
            startDate: this.state.startDate,
            endDate:this.state.endDate,
            operatorName: this.state.operator
        };

        this.props.getInspectionsGPS(operatorSearch,this.handleInspectionMapVisibility)
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
        console.log(this.state.country);
        this.props.registerCountry(country, this.resetForm)
    };

    handleSubmitQuestion = (e) => {
        e.preventDefault();
        const question = {
            question: this.state.question
        };

        this.props.registerInspectionQuestion(question, this.resetForm)
    };

    handleOrganizationLocation= (location) => {
        this.setState({
            newOrganizationAddress: location.description
        });
        this.setState({mapVisibility: false});

        geocodeByAddress(location.description)
            .then(results => {
                return getLatLng(results[0])
            })
            .then(latLng => {
                this.setState({newOrganizationGPS: latLng});
                this.setState({mapVisibility: true})
            })

    };

    handleOrganizationAddress = (address) => {
        this.setState({newOrganizationAddress: address});
        this.setState({mapVisibility: false})
    };

    handleSubmitOrganization = (e) => {
        e.preventDefault();

        const organization = {
            newOrganizationName: this.state.newOrganizationName,
            newOrganizationAddress: this.state.newOrganizationAddress,
            newOrganizationGPS: this.state.newOrganizationGPS
        };

        this.props.registerOrganization(organization, this.resetForm);
    };

    resetForm = () => {
        this.setState({
            country: '',
            food: '',
            question: '',
            countryModal: false,
            foodModal: false,
            questionModal: false,
            organizationModal: false,
            success: true
        });
        setTimeout(() => {
            this.setState({success: false})
        }, 5000);
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    componentDidMount() {
        this.props.getOrganizations();
        this.props.getCountry();
        this.props.getFood();
        this.props.getInspectionQuestions();
        this.props.getInspectionsOperators()
    }

    render() {
        const {isAuthenticated, user} = this.props.auth;
        const {errors} = this.state;
        const {country} = this.state.country;
        const {operator} = this.state.operator;

        const SendSuccess = () => {
            if (this.state.success === true) {
                return (
                    <div className="adminSuccessContainer">
                        <h1>Data written successfully!</h1>
                        <img src={likeImg} alt={'like'}/>
                    </div>
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
                                <button name={"organizationModal"} onClick={this.openModal}
                                        className={'modalButton'}>Add
                                    organization
                                </button>
                            </li>
                        </ul>

                        <Modal
                            isOpen={this.state.countryModal}
                            onRequestClose={this.closeModal}
                            contentLabel="Modal"
                            className={'modal'}
                        >
                            <button name={"countryModal"} className={"closeModalBtn"} onClick={this.closeModal}>X
                            </button>
                            <h2>Select a country from the list</h2>
                            <Select
                                options={countriesArr}
                                placeholder={'Select country...'}
                                value={country}
                                onChange={this.handleChangeCountry}
                                className={'countrySelect'}
                            />
                            {errors.country && (<div className="invalidFeedback">{errors.country}</div>)}
                            <button onClick={this.handleSubmitCountry} className={"submitModalBtn"}>Send</button>
                        </Modal>

                        <Modal
                            isOpen={this.state.foodModal}
                            onRequestClose={this.closeModal}
                            contentLabel="Modal"
                            className={'modal'}
                        >
                            <button name={"foodModal"} className={"closeModalBtn"} onClick={this.closeModal}>X</button>
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
                            <button onClick={this.handleSubmitFood} className={"submitModalBtn"}>Send</button>
                        </Modal>

                        <Modal
                            isOpen={this.state.questionModal}
                            onRequestClose={this.closeModal}
                            contentLabel="Modal"
                            className={'modal'}
                        >
                            <button name={"questionModal"} className={"closeModalBtn"} onClick={this.closeModal}>X
                            </button>
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
                            <button onClick={this.handleSubmitQuestion} className={"submitModalBtn"}>Send</button>
                        </Modal>

                        <Modal
                            isOpen={this.state.organizationModal}
                            onRequestClose={this.closeModal}
                            contentLabel="Modal"
                            className={'modalMap'}
                        >
                            <button name={"organizationModal"} className={"closeModalBtn"} onClick={this.closeModal}>X
                            </button>

                            <h2>Enter organization</h2>
                            <input
                                type="text"
                                placeholder="Organization"
                                name="newOrganizationName"
                                onChange={this.handleInputChange}
                                value={this.state.newOrganizationName}
                                className={'formInput'}
                            />
                            {errors.newOrganizationName && (
                                <div className="invalidFeedback">{errors.newOrganizationName}</div>)}

                            <MapAutocomplete
                                error={this.state.errors.newOrganizationAddress}
                                mapVisibility={this.state.mapVisibility}
                                onChange={this.handleOrganizationAddress}
                                onSelectLocation={this.handleOrganizationLocation}
                                GPS={this.state.newOrganizationGPS}
                                mapClass={'userMap'}
                                mapContainerClass={'adminMap'}
                            />

                            <button onClick={this.handleSubmitOrganization} className={"submitModalBtn"}>Send</button>
                        </Modal>
                    </div>

                    <SendSuccess/>
                    <div className={'searchInspectionsForm'}>
                    <h1>Track operator</h1>
                        <div className={'searchInspectionsFormSection'}>
                            <label>From</label>
                            <input
                                type={'date'}
                                onChange={this.handleInputChange}
                                value={this.state.startDate}
                                name={'startDate'}
                            />
                            {errors.startDate && (<div className="invalidFeedback">{errors.startDate}</div>)}
                        </div>

                        <div className={'searchInspectionsFormSection'}>
                        <label>To</label>
                            <input
                                type={'date'}
                                onChange={this.handleInputChange}
                                value={this.state.endDate}
                                name={'endDate'}
                            />
                            {errors.endDate && (<div className="invalidFeedback">{errors.endDate}</div>)}
                        </div>

                        <div className={'searchInspectionsFormSection'}>
                    <Select
                        placeholder={'Select operator...'}
                        value={operator}
                        onChange={this.handleChangeOperator}
                        options={this.props.inspectionsOperators}
                        className={'searchInspectionSelect'}
                    />
                            {errors.operatorName && (<div className="invalidFeedback">{errors.operatorName}</div>)}
                        </div>

                        <button onClick={this.handleSendInspection}>Search...</button>
                    </div>

                    <OperatorsMapContainer
                        inspectionMapVisibility={this.state.inspectionMapVisibility}
                        inspectionsGPS={this.props.inspectionsGPS}
                        operatorName={this.state.operator.value}
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
    inspectionQuestions: state.questions,
    inspectionsOperators: state.inspectionsOperators,
    inspectionsGPS: state.inspectionsGPS,
});

export default connect(mapStateToProps, {
    getCountry,
    registerCountry,
    getFood,
    registerFood,
    getOrganizations,
    registerOrganization,
    getInspectionQuestions,
    registerInspectionQuestion,
    getInspectionsOperators,
    getInspectionsGPS
})(withRouter(Admin))