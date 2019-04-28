import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import Select from "react-select";
import Modal from 'react-modal';
import {getOrganizations, registerOrganizations} from "../../actions/organizations";
import {getCountry, registerCountry} from "../../actions/country";
import {getFood, registerFood} from "../../actions/food";
import countriesArr from "../../resourses/countries";
import './adminStyles.css'

Modal.setAppElement('#root');

class Admin extends Component {

    constructor() {
        super();
        this.state = {
            country: '',
            modalIsOpen: false,
            food:'',
            errors: {},
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmitFood = this.handleSubmitFood.bind(this);
        this.handleChangeCountry = this.handleChangeCountry.bind(this);
        this.handleSubmitCountry = this.handleSubmitCountry.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);

    }

    handleInputChange(e) {
        this.setState({
            [e.target.name]: e.target.value

        })
    }

    openModal() {
        this.setState({modalIsOpen: true});
    }


    closeModal() {
        this.setState({modalIsOpen: false});
    }

    handleChangeCountry = (countrySelect) => {
        this.setState({
            country: countrySelect.value
        });

    };

    handleSubmitFood(e) {
        e.preventDefault();
        const food = {
            food: this.state.food
        };

        this.props.registerFood(food)
    }

    handleSubmitCountry(e) {
        e.preventDefault();
        const country = {
            country: this.state.country
        };

        this.props.registerCountry(country)
    }

    static getDerivedStateFromProps(nextProps, prevState){
        if(nextProps.errors!==prevState.errors){
            return { errors: nextProps.errors};
        }
        else return null;
    }


    componentDidMount() {
        this.props.getOrganizations()
        this.props.getCountry()
        this.props.getFood()
    }

    render() {
        const {isAuthenticated, user} = this.props.auth;
        const {errors} = this.state;
        const {countrySelect} = this.state.country;

        if (isAuthenticated) {
            return (

                <div className="adminMainContainer">
                    <button onClick={this.openModal} className={'modalButton'}>Add country</button>
                    <Modal
                        isOpen={this.state.modalIsOpen}
                        onRequestClose={this.closeModal}
                        contentLabel="Modal"
                        className={'modal'}
                    >

                        <h2>Select a country from the list</h2>
                        <Select
                            options={countriesArr}
                            placeholder={'Select country...'}
                            value={countrySelect}
                            onChange={this.handleChangeCountry}
                            className={'countrySelect'}
                        />
                        {errors.country && (<div className="invalidFeedback">{errors.country}</div>)}
                        <button onClick={this.handleSubmitCountry} className={'modalButton'}>Send</button>

                        <input
                            type="text"
                            placeholder="Food group"
                            name="food"
                            onChange={this.handleInputChange}
                            value={this.state.food}
                            className={'registerFormInput'}
                        />
                        {errors.food && (<div className="invalidFeedback">{errors.food}</div>)}
                        <button onClick={this.handleSubmitFood} className={'modalButton'}>Send</button>
                    </Modal>

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
    organizations:PropTypes.array.isRequired,
    food:PropTypes.array.isRequired,
};
const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors,
    countries: state.countries,
    organizations:state.organizations,
    food:state.food,
});

export default connect(mapStateToProps, {getCountry, registerCountry,getFood,
    registerFood,getOrganizations, registerOrganizations})(withRouter(Admin))