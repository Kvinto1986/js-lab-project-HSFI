import React, {Component} from 'react';
import '../inspection/inspectionStyles.css'
import {Redirect, withRouter} from "react-router-dom";
import {connect} from "react-redux";

import {getCountry} from '../../actions/countryAction';
import {findSellers, getCities} from '../../actions/sellerAction';
import {getFood} from '../../actions/foodAction';
import {getReport} from '../../actions/reportActions';

import Select from "react-select";

import ReportTable from "./reportTable";

import './reportStyles.css'


class Report extends Component {
    state = {
        country: [],
        city: [],
        foodGroup: [],
        startDate: '',
        endDate: '',
        regSellers: true,
        OSSaverage: true,
        flag: true,
        stars: true,
        calls: true,
        cards: true,
        total: true,
        errors: {},
        reportTable: false
    };

    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };

    handleRadioChange = (e) => {
        this.setState({
            [e.target.name]: !this.state[e.target.name]
        })
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



    handleSubmitSearch = (e) => {
        e.preventDefault();

        const report = {
            startDate: this.state.startDate,
            endDate: this.state.endDate,
            country: this.state.country,
            city: this.state.city,
            foodGroup: this.state.foodGroup,
            regSellers: this.state.regSellers,
            OSSaverage: this.state.OSSaverage,
            flag: this.state.flag,
            stars: this.state.stars,
            calls: this.state.calls,
            cards: this.state.cards,
            total: this.state.total
        };

        this.setState({
            reportTable: true
        });

        this.props.getReport(report);
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
        const {errors} = this.state;

        if (isAuthenticated) {
            return (
                <div className={'reportMainContainer'}>
                    <form className={'reportSearchForm'} onSubmit={this.handleSubmitSearch}>
                        <h1>Search options</h1>
                        <div className={'reportSearchFormSection'}>
                            <label>From</label>
                            <input
                                type={'date'}
                                onChange={this.handleInputChange}
                                value={this.state.startDate}
                                name={'startDate'}
                            />
                            <label>To</label>
                            <input
                                type={'date'}
                                onChange={this.handleInputChange}
                                value={this.state.endDate}
                                name={'endDate'}
                            />
                        </div>
                        {errors.startDate && (
                            <div className="invalidFeedback">{errors.startDate}</div>)}
                        {errors.endDate && (
                            <div className="invalidFeedback">{errors.endDate}</div>)}

                        <div className={'reportSearchFormSection'}>
                            <label>Select countries</label>
                            <Select
                                isMulti
                                joinValues
                                options={this.props.countries}
                                placeholder={'Select countries...'}
                                value={country}
                                onChange={this.handleChangeCountry}
                                className={'reportSelect'}
                            />
                        </div>

                        <div className={'reportSearchFormSection'}>
                            <label>Select cities</label>
                            <Select
                                isMulti
                                joinValues
                                options={this.props.cities}
                                placeholder={'Select cities...'}
                                value={city}
                                onChange={this.handleChangeCity}
                                className={'reportSelect'}
                            />
                        </div>

                        <div className={'reportSearchFormSection'}>
                            <label>Select food group</label>
                            <Select
                                isMulti
                                joinValues
                                options={this.props.food}
                                placeholder={'Select food group...'}
                                value={foodGroup}
                                onChange={this.handleChangeFood}
                                className={'reportSelect'}
                            />
                        </div>

                        <div className={'reportSearchFormSection'}>
                            <label>Registered sellers</label>
                            <input
                                type="radio"
                                checked={this.state.regSellers}
                                onChange={this.handleRadioChange}
                                name={'regSellers'}
                            />
                            Yes

                            <input
                                type="radio"
                                checked={!this.state.regSellers}
                                onChange={this.handleRadioChange}
                                name={'regSellers'}
                            />
                            No
                        </div>


                        <div className={'reportSearchFormSection'}>
                            <label>OSS average value</label>
                            <input
                                type="radio"
                                checked={this.state.OSSaverage}
                                onChange={this.handleRadioChange}
                                name={'OSSaverage'}
                            />
                            Yes

                            <input
                                type="radio"
                                checked={!this.state.OSSaverage}
                                onChange={this.handleRadioChange}
                                name={'OSSaverage'}
                            />
                            No

                        </div>

                        <div className={'reportSearchFormSection'}>
                            <label>Red flagged sellers</label>
                            <input
                                type="radio"
                                checked={this.state.flag}
                                onChange={this.handleRadioChange}
                                name={'flag'}
                            />
                            Yes

                            <input
                                type="radio"
                                checked={!this.state.flag}
                                onChange={this.handleRadioChange}
                                name={'flag'}
                            />
                            No
                        </div>

                        <div className={'reportSearchFormSection'}>
                            <label>Stars average</label>
                            <input
                                type="radio"
                                checked={this.state.stars}
                                onChange={this.handleRadioChange}
                                name={'stars'}
                            />
                            Yes

                            <input
                                type="radio"
                                checked={!this.state.stars}
                                onChange={this.handleRadioChange}
                                name={'stars'}
                            />
                            No
                        </div>

                        <div className={'reportSearchFormSection'}>
                            <label>Calls count</label>
                            <input
                                type="radio"
                                checked={this.state.calls}
                                onChange={this.handleRadioChange}
                                name={'calls'}
                            />
                            Yes

                            <input
                                type="radio"
                                checked={!this.state.calls}
                                onChange={this.handleRadioChange}
                                name={'calls'}
                            />
                            No
                        </div>

                        <div className={'reportSearchFormSection'}>
                            <label>Cards transactions</label>
                            <input
                                type="radio"
                                checked={this.state.cards}
                                onChange={this.handleRadioChange}
                                name={'cards'}
                            />
                            Yes

                            <input
                                type="radio"
                                checked={!this.state.cards}
                                onChange={this.handleRadioChange}
                                name={'cards'}
                            />
                            No
                        </div>

                        <div className={'reportSearchFormSection'}>
                            <label>Total income</label>
                            <input
                                type="radio"
                                checked={this.state.total}
                                onChange={this.handleRadioChange}
                                name={'total'}
                            />
                            Yes

                            <input
                                type="radio"
                                checked={!this.state.total}
                                onChange={this.handleRadioChange}
                                name={'total'}
                            />
                            No
                        </div>


                        <button type='submit'>Search</button>
                    </form>

                    <ReportTable
                        reportTable={this.state.reportTable}
                        report={this.props.report}
                    />
                </div>

            )
        } else return (<Redirect to={{
            pathname: '/login',
        }}/>)
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors,
    countries: state.countries,
    cities: state.cities,
    report: state.report,
    food:state.food
});


export default connect(mapStateToProps, {
    getCountry,
    findSellers,
    getCities,
    getFood,
    getReport
})(withRouter(Report))