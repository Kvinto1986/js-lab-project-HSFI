import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Redirect, withRouter} from 'react-router-dom';
import Select from "react-select";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/dist/style.css'

import {getOrganizations, registerOrganization} from '../../actions/organizationAction';
import {getCountry} from '../../actions/countryAction';
import {updateUser, updateUserPassword, getUsers,confirmUser} from '../../actions/userAction';
import {logoutUser, loginUser} from '../../actions/authenticationAction';


import './profileStyles.css';
import likeImg from "../../resourses/images/like.png";
import UsersListTable from "./userTable";


class Profile extends Component {

    state = {
        role: this.props.auth.user.role,
        page: 1,
        country: this.props.auth.user.country,
        name: this.props.auth.user.name,
        organization: this.props.auth.user.organization,
        phone: this.props.auth.user.phone,
        email: this.props.auth.user.email,
        tasks: this.props.auth.user.tasks,
        password: '',
        password_confirm: '',
        passwordInput: false,
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

    handlePhoneChange = (number) => {
        this.setState({phone: number})
    };

    handleOrganizationChange = (organization) => {
        this.setState({
            organization: organization.value
        });
    };

    handleNextUsersPage = (e) => {
        e.preventDefault();

        this.refreshUsers(1);

    };

    handlePrevUsersPage = (e) => {
        e.preventDefault();
        this.refreshUsers(-1);
    };

    handleDisablePasswordInput = (e) => {
        e.preventDefault();

        this.setState({
            passwordInput: !this.state.passwordInput
        });
    };

    handleDisableForm = (e) => {
        e.preventDefault();
        this.setState({
            passwordInput: !this.state.passwordInput
        });
        this.setState({
            disable: !this.state.disable
        });
    };

    refreshUsers=(num)=> {
        const confirmUsersRole = {
            role: this.state.role,
            page: this.state.page+=num
        };

        this.props.getUsers(confirmUsersRole);
    };

    handleConfirmUser =  (user)=> {
        this.props.confirmUser({id:user._id},this.refreshUsers);
    };

    resetForm = () => {
        const rotateElem = document.getElementById("profileFormInner");
        rotateElem.style.transform = "rotateY(180deg)";

        this.setState({
            role: this.props.auth.user.role,
            country: this.props.auth.user.country,
            name: this.props.auth.user.name,
            organization: this.props.auth.user.organization,
            phone: this.props.auth.user.phone,
            email: this.props.auth.user.email,
            tasks: this.props.auth.user.tasks,
            password: '',
            password_confirm: '',
            passwordInput: false,
            disable: true,
            errors: {},
        });

        setTimeout(() => {
            rotateElem.style.transform = "rotateY(0deg)";
            this.props.logoutUser(this.props.history);
        }, 5000);
    };

    handleSubmit = (e) => {
        e.preventDefault();


        const updatePassword = () => {

            const user = {
                id: this.props.auth.user.id,
                country: this.state.country,
                name: this.state.name,
                organization: this.state.organization,
                phone: this.state.phone,
                email: this.state.email,
                tasks: this.state.tasks,

            };
            this.props.updateUser(user, this.resetForm);
        };

        if (!this.state.passwordInput) {

            const newPassword = {
                id: this.props.auth.user.id,
                password: this.state.password,
                password_confirm: this.state.password_confirm

            };

            this.props.updateUserPassword(newPassword, updatePassword);
        } else updatePassword();
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    componentDidMount = () => {
        this.refreshUsers(0);
        this.props.getOrganizations();
        this.props.getCountry();

    };

    render() {
        const {isAuthenticated, user} = this.props.auth;
        const {country} = this.state.country;
        const {errors} = this.state;
        const {organization} = this.state.organization;
        if (isAuthenticated) {
            return (
                <div className="profileMainContainer">
                    <div className='profileFormInner' id='profileFormInner'>
                        <form className="profileFormFront" onSubmit={this.handleSubmit}>
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
                                type="email"
                                placeholder={this.state.email}
                                disabled={this.state.disable}
                                value={this.state.email}
                                onChange={this.handleInputChange}
                                name={'email'}
                                required
                            />
                            {errors.email && (<div className="invalidFeedback">{errors.email}</div>)}


                            <label>Phone number</label>
                            <div id='profilePhoneInput'>
                                <PhoneInput
                                    placeholder="Phone number"
                                    onChange={this.handlePhoneChange}
                                    value={this.state.phone}
                                    disabled={this.state.disable}
                                    required
                                >
                                </PhoneInput>
                                {errors.phone && (<div className="invalidFeedback">{errors.phone}</div>)}
                            </div>

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
                            ) : (
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
                                    <Select
                                        options={this.props.organizations}
                                        value={organization}
                                        isDisabled={this.state.disable}
                                        placeholder={this.state.organization}
                                        onChange={this.handleOrganizationChange}
                                        className={'profileFormSelect'}
                                    />
                                    {errors.organization && (
                                        <div className="invalidFeedback">{errors.organization}</div>)}
                                </Fragment>
                            )}

                            {this.state.passwordInput && (<button onClick={this.handleDisablePasswordInput}>
                                Change password
                            </button>)}

                            {!this.state.disable && (
                                <Fragment>
                                    <label>Password</label>
                                    <input
                                        type="password"
                                        placeholder={'********'}
                                        disabled={this.state.passwordInput}
                                        value={this.state.password}
                                        onChange={this.handleInputChange}
                                        name={'password'}
                                        required
                                    />
                                    {errors.password && (<div className="invalidFeedback">{errors.password}</div>)}
                                    <label>confirm password</label>
                                    <input
                                        type="password"
                                        placeholder={'********'}
                                        disabled={this.state.passwordInput}
                                        value={this.state.password_confirm}
                                        onChange={this.handleInputChange}
                                        name={'password_confirm'}
                                        required
                                    />
                                    {errors.password_confirm && (
                                        <div className="invalidFeedback">{errors.password_confirm}</div>)}
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
                            <h1>User profile successfully updated!</h1>
                            <img src={likeImg} alt={'like'}/>
                        </div>
                    </div>
                        <UsersListTable
                            users={this.props.users}
                            handleConfirmUser={this.handleConfirmUser}
                            hasPrevPage={this.props.users.hasPrevPage}
                            hasNextPage={this.props.users.hasNextPage}
                            handlePrevUsersPage={this.handlePrevUsersPage}
                            handleNextUsersPage={this.handleNextUsersPage}
                            totalUsers={this.props.users.totalDocs}
                        />
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
    getCountry: PropTypes.func.isRequired,
    updateUser: PropTypes.func.isRequired,
    logoutUser: PropTypes.func.isRequired,
    loginUser: PropTypes.func.isRequired,
    getUsers: PropTypes.func.isRequired,
    confirmUser:PropTypes.func.isRequired,
    updateUserPassword: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    organizations: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors,
    organizations: state.organizations,
    countries: state.countries,
    users: state.users
});

export default connect(mapStateToProps, {
    registerOrganization,
    getOrganizations,
    getCountry,
    updateUser,
    logoutUser,
    loginUser,
    updateUserPassword,
    getUsers,
    confirmUser
})(withRouter(Profile))