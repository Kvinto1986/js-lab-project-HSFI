import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Redirect, withRouter} from 'react-router-dom';
import Select from "react-select";
import InputMask from 'react-input-mask';

import {getOrganizations, registerOrganization} from '../../actions/organizationAction';
import {getCountry} from '../../actions/countryAction';

import './profileStyles.css';
import likeImg from "../../resourses/images/like.png";

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
        const rotateElem = document.getElementById("profileFormInner");
        rotateElem.style.transform = "rotateY(180deg)";
        setTimeout(() => {
            rotateElem.style.transform = "rotateY(0deg)";
        }, 5000);
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
                    <div className='profileFormInner' id='profileFormInner'>
                        <form className="profileFormFront" onSubmit={this.show}>
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
                            <label>Country</label>

                            {user.role === 'manager' || user.role === 'coordinator' ? (
                                <Select
                                    options={this.props.countries}
                                    placeholder={this.state.country}
                                    value={country}
                                    className={'profileFormSelect'}
                                    isDisabled={this.state.disable}
                                    onChange={this.handleCountryChange}
                                />
                            ):(
                                <Fragment>
                                <Select
                                    placeholder={this.state.country}
                                    className={'profileFormSelect'}
                                    isDisabled={true}
                                />
                                    <label>Tasks</label>
                                    <Select
                                        placeholder={user.tasks.join(', ')}
                                        className={'profileFormSelect'}
                                        isDisabled={true}
                                    />

                                    <label>Organization</label>
                                    <input
                                        type="text"
                                        placeholder={this.state.organization}
                                        disabled={this.state.disable}
                                        value={this.state.organization}
                                        onChange={this.handleInputChange}
                                        name={'organization'}
                                        required
                                    />
                                </Fragment>
                            )}
                            {!this.state.disable && (<button type="submit">
                                Submit
                            </button>)}

                            {this.state.disable && (<button type="submit" onClick={this.handleDisableForm}>
                                Edit
                            </button>)}

                        </form>
                        <div className="profileFormBack">
                            <h1>Seller card successfully added to database!</h1>
                            <img src={likeImg} alt={'like'}/>
                        </div>
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