import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Redirect, withRouter} from 'react-router-dom';
import Select from "react-select";
import InputMask from 'react-input-mask';

import {getOrganizations, registerOrganization} from '../../actions/organizationAction';
import {getCountry} from '../../actions/countryAction';

import './profileStyles.css';

class Profile extends Component {

    state = {
        country: this.props.auth.user.country,
        name: this.props.auth.user.name,
        organization: this.props.auth.user.organization,
        phone: this.props.auth.user.phone,
        email: this.props.auth.user.email,
        tasks: this.props.auth.user.tasks,
        password: '',
        password_confirm: '',
        disable: true,
        errors: {},
    };

    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };

    handleCountryChange = (country) => {
        this.setState({
            country: country.value
        });
    };

    show = (e) => {
        e.preventDefault();
        console.log(this.state)
    };

    handleDisableForm = (e) => {
        e.preventDefault();

        this.setState({
            disable: !this.state.disable
        });
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    componentDidMount = () => {
        this.props.getOrganizations();
        this.props.getCountry();

    };

    render() {
        const {isAuthenticated, user} = this.props.auth;
        const {country} = this.state.country;

        if (isAuthenticated) {
            return (
                <div className="profileMainContainer">
                    <div className='callsFormInner' id='callsFormInner'>
                        <form className="callsFormFront" onSubmit={this.show}>
                            <h1>User profile</h1>
                            <label>Name</label>
                            <input
                                type="text"
                                placeholder={this.state.name}
                                disabled={this.state.disable}
                                value={this.state.name}
                                onChange={this.handleInputChange}
                                name={'name'}
                                required
                            />

                            <label>Email</label>
                            <input
                                type="text"
                                placeholder={this.state.email}
                                disabled={this.state.disable}
                                value={this.state.email}
                                onChange={this.handleInputChange}
                                name={'email'}
                                required
                            />

                            <label>Country</label>
                            <Select
                                options={this.props.countries}
                                placeholder={this.state.country}
                                value={country}
                                className={'userFormSelect'}
                                isDisabled={this.state.disable}
                                onChange={this.handleCountryChange}
                            />

                            <label>Phone number</label>
                            <InputMask
                                type="tel"
                                mask="+999 (99) 999 99 99"
                                placeholder="Phone number"
                                name="phone"
                                value={this.state.phone}
                                disabled={this.state.disable}
                                onChange={this.handleInputChange}
                                required
                            >
                            </InputMask>

                            {!this.state.disable && (<button type="submit">
                                Submit
                            </button>)}

                            {this.state.disable && (<button type="submit" onClick={this.handleDisableForm}>
                                Edit
                            </button>)}

                        </form>
                    </div>
                </div>
            )
        } else return (<Redirect to={{
            pathname: '/login',
        }}/>)
    }
}

Profile.propTypes = {
    registerOrganization: PropTypes.func.isRequired,
    getOrganizations: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    organizations: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors,
    organizations: state.organizations,
    countries: state.countries
});

export default connect(mapStateToProps, {
    registerOrganization,
    getOrganizations,
    getCountry
})(withRouter(Profile))