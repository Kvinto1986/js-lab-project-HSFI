import React, {Component} from 'react';
import './inspectionStyles.css'
import {Redirect, withRouter} from "react-router-dom";
import {connect} from "react-redux";

import {getCountry} from '../../actions/countryAction';
import {findSellers, getCities} from '../../actions/sellerAction';
import {getFood} from '../../actions/foodAction';

import Select from "react-select";
import SellersTable from "./sellersTable";

class Inspection extends Component {
    state = {
        country: [],
        city: [],
        status: '',
        foodGroup: [],
        flag: true,
        stars: false,
        page: 1,
        day: true
    };

    handleChangeCountry = (country) => {
        this.setState({country});
        const countryArr = country.map((elem) => elem.value);
        const countryObj = {country: {$in: countryArr}};
        this.props.getCities(countryObj);
    };

    handleChangeCity = (city) => {
        this.setState({city});
    };

    handleChangeFood = (foodGroup) => {
        this.setState({foodGroup});
    };

    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value

        })
    };

    handleNextUsersPage = (e) => {
        e.preventDefault();

        this.findSellers(1);

    };

    handlePrevUsersPage = (e) => {
        e.preventDefault();
        this.findSellers(-1);
    };

    handleScheduleChange = () => {
        this.setState({day: !this.state.day});
    };

    handleFlagChange = () => {
        this.setState({flag: !this.state.flag});
    };

    findSellers = (num) => {

        const sellersParams = {
            sellers: {},
            page: this.state.page += num,

        };

        if (this.state.country.length > 0) {
            const countryArr = this.state.country.map((elem) => elem.value);
            sellersParams.sellers.country = {$in: countryArr}
        }

        if (this.state.city.length > 0) {
            const cityArr = this.state.city.map((elem) => elem.value);
            sellersParams.sellers.city = {$in: cityArr}
        }

        if (this.state.foodGroup.length > 0) {
            const foodArr = this.state.foodGroup.map((elem) => elem.value);
            sellersParams.sellers.foodGroup = {$in: foodArr}
        }

        if (this.state.stars) {
            sellersParams.sellers.stars = this.state.stars
        }

        if (this.state.day) {
            const todayDate = new Date();
            const weekday = new Array(7);
            weekday[0] = "Sunday";
            weekday[1] = "Monday";
            weekday[2] = "Tuesday";
            weekday[3] = "Wednesday";
            weekday[4] = "Thursday";
            weekday[5] = "Friday";
            weekday[6] = "Saturday";

            const today = weekday[todayDate.getDay()];

            sellersParams.today = today
        }

        if (this.state.flag) {
            this.setState({flag: true});
            sellersParams.sellers.flag = "red flagged"
        }

        this.props.findSellers(sellersParams)
    };


    handleSubmitSearch = (e) => {
        e.preventDefault();
        console.log(this.state)
        this.findSellers(0)

    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    componentDidMount = () => {
        this.props.getCountry();
        this.props.getFood();
    };

    render() {
        const {isAuthenticated, user} = this.props.auth;
        const {country} = this.state.country;
        const {city} = this.state.city;
        const {foodGroup} = this.state.foodGroup;

        if (isAuthenticated) {
            return (
                <div className={'inspectionMainContainer'}>
                    <form className={'inspectionSearchForm'} onSubmit={this.handleSubmitSearch}>
                        <div className={'inspectionSearchFormSection'}>
                            <label>Select countries</label>
                            <Select
                                isMulti
                                joinValues
                                options={this.props.countries}
                                placeholder={'Select countries...'}
                                value={country}
                                onChange={this.handleChangeCountry}
                                className={'inspectionFormSelect'}
                            />
                        </div>

                        <div className={'inspectionSearchFormSection'}>
                            <label>Select cities</label>
                            <Select
                                isMulti
                                joinValues
                                options={this.props.cities}
                                placeholder={'Select cities...'}
                                value={city}
                                onChange={this.handleChangeCity}
                                className={'inspectionFormSelect'}
                            />
                        </div>

                        <div className={'inspectionSearchFormSection'}>
                            <label>Select food group</label>
                            <Select
                                isMulti
                                joinValues
                                options={this.props.food}
                                placeholder={'Select food group...'}
                                value={foodGroup}
                                onChange={this.handleChangeFood}
                                className={'inspectionFormSelect'}
                            />
                        </div>

                        <div className={'inspectionRadioFormSection'}>
                            <label>Work status</label>
                            <label className={'radioLabel'}>
                                <input
                                    type="radio"
                                    checked={this.state.day}
                                    onChange={this.handleScheduleChange}/>
                                Open
                            </label>
                            <label className={'radioLabel'}>
                                <input
                                    type="radio"
                                    checked={!this.state.day}
                                    onChange={this.handleScheduleChange}/>
                                Close</label>
                        </div>

                        <div className={'inspectionRadioFormSection'}>
                            <label>Red flag</label>
                            <label className={'radioLabel'}>
                                <input
                                    type="radio"
                                    checked={this.state.flag}
                                    onChange={this.handleFlagChange}/>
                                Yes
                            </label>

                            <label className={'radioLabel'}>
                                <input
                                    type="radio"
                                    checked={!this.state.flag}
                                    onChange={this.handleFlagChange}/>
                                No</label>

                        </div>

                        <div className={'inspectionRadioFormSection'}>
                            <label>Stars count</label>
                            <input
                                type="number"
                                placeholder="Stars count"
                                name="stars"
                                value={this.state.stars}
                                onChange={this.handleInputChange}
                                min={0}
                            />
                        </div>
                        <div className={'inspectionRadioFormSection'}>
                            <button type='submit'>Search</button>
                        </div>

                    </form>

                    <SellersTable
                        sellers={this.props.sellers}
                        hasPrevPage={this.props.sellers.hasPrevPage}
                        hasNextPage={this.props.sellers.hasNextPage}
                        handlePrevUsersPage={this.handlePrevUsersPage}
                        handleNextUsersPage={this.handleNextUsersPage}
                        totalUsers={this.props.sellers.totalDocs}
                    />

                </div>)
        } else return (<Redirect to={{
            pathname: '/login',
        }}/>)
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors,
    countries: state.countries,
    users: state.users,
    sellers: state.sellers,
    cities: state.cities,
    food: state.food
});


export default connect(mapStateToProps, {
    getCountry,
    findSellers,
    getCities,
    getFood
})(withRouter(Inspection))