import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import Select from "react-select";
import Modal from 'react-modal';
import {getOrganizations, registerOrganization,deleteOrganization} from "../../actions/organizationAction";
import {getCountry, registerCountry,deleteCountry} from "../../actions/countryAction";
import {getFood, registerFood,deleteFood} from "../../actions/foodAction";
import {getInspectionQuestions, registerInspectionQuestion,deleteInspectionQuestion} from "../../actions/inspectionQuestionsAction";
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
        startDate: '',
        endDate: '',
        deletedCountry:'',
        deletedFood:'',
        deletedQuestion:'',
        deletedOrganization:'',
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


    handleInspectionMapVisibility = () => {
        this.setState({
            inspectionMapVisibility: true

        })
    };

    handleSendInspection = () => {
        const operatorSearch = {
            startDate: this.state.startDate,
            endDate: this.state.endDate,
            operatorName: this.state.operator
        };

        this.props.getInspectionsGPS(operatorSearch, this.handleInspectionMapVisibility)
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

    handleChangeDeletedCountry = (countrySelect) => {
        this.setState({
            deletedCountry: countrySelect.value
        });
    };

    handleChangeDeletedFood = (food) => {
        this.setState({
            deletedFood: food.value
        });
    };

    handleChangeDeletedQuestion = (question) => {
        this.setState({
            deletedQuestion: question.value
        });
    };

    handleChangeDeletedOrganization = (organization) => {
        this.setState({
            deletedOrganization: organization.value
        });
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
        this.props.getOrganizations();
        this.props.getCountry();
        this.props.getFood();
        this.props.getInspectionQuestions();
        this.props.getInspectionsOperators()
    };

    handleSubmitFood = (e) => {
        e.preventDefault();
        const food = {
            food: this.state.food
        };

        this.props.registerFood(food, this.resetForm)
    };

    handleSubmitDeletedFood = (e) => {
        e.preventDefault();
        const food = {
            food: this.state.deletedFood
        };
        this.props.deleteFood(food, this.resetForm)
    };

    handleSubmitCountry = (e) => {
        e.preventDefault();
        const country = {
            country: this.state.country
        };

        this.props.registerCountry(country, this.resetForm)
    };

    handleSubmitDeletedCountry = (e) => {
        e.preventDefault();
        const country = {
            country: this.state.deletedCountry
        };
        this.props.deleteCountry(country, this.resetForm)
    };

    handleSubmitQuestion = (e) => {
        e.preventDefault();
        const question = {
            question: this.state.question
        };

        this.props.registerInspectionQuestion(question, this.resetForm)
    };

    handleSubmitDeletedQuestion = (e) => {
        e.preventDefault();
        const question = {
            question: this.state.deletedQuestion
        };
        this.props.deleteInspectionQuestion(question, this.resetForm)
    };

    handleOrganizationLocation = (location) => {
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

    handleSubmitDeletedOrganization = (e) => {
        e.preventDefault();
        const organization = {
            organization: this.state.deletedOrganization
        };
        this.props.deleteOrganization(organization, this.resetForm)
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
        const {isAuthenticated} = this.props.auth;
        const {errors} = this.state;
        const {country} = this.state.country;
        const {deletedCountry} = this.state.deletedCountry;
        const {deletedFood} = this.state.deletedFood;
        const {deletedQuestion} = this.state.deletedQuestion;
        const {deletedOrganization} = this.state.deletedOrganization;
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

        console.log(this.props);

        if (isAuthenticated) {
            return (

                <div className="adminMainContainer">
                    <div className="adminAddDataContainer">
                        <ul>
                            <li>
                                <button name={"countryModal"} onClick={this.openModal} className={'modalButton'}>
                                    Counties action
                                </button>
                            </li>
                            <li>
                                <button name={"foodModal"} onClick={this.openModal} className={'modalButton'}>
                                    Food group action
                                </button>
                            </li>
                            <li>
                                <button name={"questionModal"} onClick={this.openModal} className={'modalButton'}>
                                    Inspection questions action
                                </button>
                            </li>
                            <li>
                                <button name={"organizationModal"} onClick={this.openModal}
                                        className={'modalButton'}>Organizations action
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
                            <h2>Add a country from the list</h2>
                            <Select
                                options={countriesArr}
                                placeholder={'Select country...'}
                                value={country}
                                onChange={this.handleChangeCountry}
                                className={'countrySelect'}
                            />
                            {errors.country && (<div className="invalidFeedback">{errors.country}</div>)}
                            <button onClick={this.handleSubmitCountry} className={"submitModalBtn"}>Add country</button>

                            <h2>Delete a country from the list</h2>
                            <Select
                                options={this.props.countries}
                                placeholder={'Select country...'}
                                value={deletedCountry}
                                onChange={this.handleChangeDeletedCountry}
                                className={'countrySelect'}
                            />
                            <button onClick={this.handleSubmitDeletedCountry} className={"submitModalBtn"}>Delete country</button>
                        </Modal>

                        <Modal
                            isOpen={this.state.foodModal}
                            onRequestClose={this.closeModal}
                            contentLabel="Modal"
                            className={'modal'}
                        >
                            <button name={"foodModal"} className={"closeModalBtn"} onClick={this.closeModal}>X</button>
                            <h2>Add food group </h2>
                            <input
                                type="text"
                                placeholder="Food group"
                                name="food"
                                onChange={this.handleInputChange}
                                value={this.state.food}
                                className={'registerFormInput'}
                            />
                            {errors.food && (<div className="invalidFeedback">{errors.food}</div>)}
                            <button onClick={this.handleSubmitFood} className={"submitModalBtn"}>Add food group</button>
                            <h2>Delete a food group from the list</h2>
                            <Select
                                options={this.props.food}
                                placeholder={'Select food group...'}
                                value={deletedFood}
                                onChange={this.handleChangeDeletedFood}
                                className={'countrySelect'}
                            />
                            <button onClick={this.handleSubmitDeletedFood} className={"submitModalBtn"}>Delete food group</button>
                        </Modal>

                        <Modal
                            isOpen={this.state.questionModal}
                            onRequestClose={this.closeModal}
                            contentLabel="Modal"
                            className={'modal'}
                        >
                            <button name={"questionModal"} className={"closeModalBtn"} onClick={this.closeModal}>X
                            </button>
                            <h2>Add inspection question</h2>
                            <input
                                type="text"
                                placeholder="Question"
                                name="question"
                                onChange={this.handleInputChange}
                                value={this.state.question}
                                className={'registerFormInput'}
                            />
                            {errors.question && (<div className="invalidFeedback">{errors.question}</div>)}
                            <button onClick={this.handleSubmitQuestion} className={"submitModalBtn"}>Add question</button>

                            <h2>Delete inspection question</h2>
                            <Select
                                options={this.props.inspectionQuestions}
                                placeholder={'Select question...'}
                                value={deletedQuestion}
                                onChange={this.handleChangeDeletedQuestion}
                                className={'countrySelect'}
                            />
                            <button onClick={this.handleSubmitDeletedQuestion} className={"submitModalBtn"}>Delete question</button>
                        </Modal>

                        <Modal
                            isOpen={this.state.organizationModal}
                            onRequestClose={this.closeModal}
                            contentLabel="Modal"
                            className={'modalMap'}
                        >
                            <button name={"organizationModal"} className={"closeModalBtn"} onClick={this.closeModal}>X
                            </button>

                            <h2>Add new organization</h2>
                            <input
                                type="text"
                                placeholder="Organization"
                                name="newOrganizationName"
                                onChange={this.handleInputChange}
                                value={this.state.newOrganizationName}
                                className={'formInput'}
                            />
                            {errors.organization && (
                                <div className="invalidFeedback">{errors.organization}</div>)}

                            <MapAutocomplete
                                error={this.state.errors.newOrganizationAddress}
                                mapVisibility={this.state.mapVisibility}
                                onChange={this.handleOrganizationAddress}
                                onSelectLocation={this.handleOrganizationLocation}
                                GPS={this.state.newOrganizationGPS}
                                mapClass={'userMap'}
                                mapContainerClass={'adminMap'}
                            />

                            <button onClick={this.handleSubmitOrganization} className={"submitModalBtn"}>Add organization</button>

                            <h2>Delete organization</h2>
                            <Select
                                options={this.props.organizations}
                                placeholder={'Select organization...'}
                                value={deletedOrganization}
                                onChange={this.handleChangeDeletedOrganization}
                                className={'countrySelect'}
                            />
                            <button onClick={this.handleSubmitDeletedOrganization} className={"submitModalBtn"}>Delete organization</button>
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
    inspectionQuestions: state.inspectionQuestions,
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
    getInspectionsGPS,
    deleteOrganization,
    deleteCountry,
    deleteFood,
    deleteInspectionQuestion
})(withRouter(Admin))