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
        status: true,
        foodGroup: [],
        flag: [true],
        stars: false,
        page: 1,
        modalEditSellerStatus:false,
        modalInspectionStatus:false,
        editSeller:{}

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
        this.setState({status: !this.state.status});
    };

    handleFlagChange = () => {
        this.setState({flag: !this.state.flag});
    };

    openSellerEditModal = (seller) => {
        this.setState({modalEditSellerStatus: true});
        this.setState({editSeller: seller});
    };


    closeEditSellerModal = () => {
        this.setState({modalEditSellerStatus: false});
    };

    openInspectionModal = (seller) => {
        this.setState({modalInspectionStatus: true});
        this.setState({editSeller: seller});
    };


    closeInspectionModal = () => {
        this.setState({modalInspectionStatus: false});
    };

    findSellers = (num) => {

        const sellersParams = {
            sellers: {
                country:this.state.country,
                city:this.state.city,
                foodGroup:this.state.foodGroup,
                stars:this.state.stars,
                flag:this.state.flag
            },
            page: this.state.page += num,
            status:this.state.status,
        };

        this.props.findSellers(sellersParams)
    };


    handleSubmitSearch = (e) => {
        e.preventDefault();
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
                                    checked={this.state.status}
                                    onChange={this.handleScheduleChange}
                                />

                                Open
                            </label>
                            <label className={'radioLabel'}>
                                <input
                                    type="radio"
                                    checked={!this.state.status}
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
                        modalEditSellerStatus={this.state.modalEditSellerStatus}
                        modalInspectionStatus={this.state.modalInspectionStatus}
                        openSellerEditModal={this.openSellerEditModal}
                        closeEditSellerModal={this.closeEditSellerModal}
                        openInspectionModal={this.openInspectionModal}
                        closeInspectionModal={this.closeInspectionModal}
                        editSeller={this.state.editSeller}
                        findSellers={this.findSellers}
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