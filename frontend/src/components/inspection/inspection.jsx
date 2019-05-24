import React, {Component} from 'react';
import './inspectionStyles.css'
import {Redirect, withRouter} from "react-router-dom";
import {connect} from "react-redux";

import {getCountry} from '../../actions/countryAction';
import {findSellers} from '../../actions/sellerAction';
import Select from "react-select";

class Inspection extends Component {
    state = {
        country: [],
        sity: [],
        status: '',
        foodGroup: [],
        flag: '',
        stars: ''
    };

    handleChangeCountry = (country) => {
        this.setState({country});
    };

    handleSubmitSearch = (e) => {
        e.preventDefault();
        console.log(this.state);

        const usersParams = {};

        if (this.state.country.length > 0) {
            const countryArr = this.state.country.map((elem) => elem.value);
            usersParams.country = {$in: countryArr}
        }

        this.props.findSellers(usersParams)
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
    };

    render() {
        const {isAuthenticated, user} = this.props.auth;
        const {country} = this.state.country;

        if (isAuthenticated) {
            return (
                <div className={'inspectionMainContainer'}>
                    <form className={'inspectionSearchForm'} onSubmit={this.handleSubmitSearch}>
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
                        <button type='submit'>Search</button>
                    </form>


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
    sellers: state.sellers
});


export default connect(mapStateToProps, {
    getCountry,
    findSellers,
})(withRouter(Inspection))