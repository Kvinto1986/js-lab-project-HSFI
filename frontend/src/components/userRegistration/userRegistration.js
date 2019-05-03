import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import {registerUser} from '../../actions/userAction';
import {getOrganizations, registerOrganization} from '../../actions/organizationAction';
import {getCountry} from '../../actions/countryAction';
import Select from 'react-select'
import roles from '../../resourses/roles'
import NewOrganizationInputs from './organizationInputs'
import './registerStyle.css'
import tasksList from "../../resourses/tasks";
import {geocodeByAddress, getLatLng} from "react-places-autocomplete";

class UserRegistration extends Component {

    state = {
        role: '',
        country: '',
        name: '',
        organization: '',
        tasks: [],
        phone: '',
        email: '',
        password: '',
        password_confirm: '',
        newOrganizationName: '',
        newOrganizationAddress: '',
        newOrganizationGPS: {},
        errors: {},
        organizationInputVisibility: true,
        mapVisibility: false,
    };

    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };

    handleRoleChange = (role) => {
        this.setState({
            role: role.value
        });

    };

    handleCountryChange = (country) => {
        this.setState({
            country: country.value
        });
    };

    handleOrganizationChange = (organization) => {
        this.setState({
            organization: organization.value
        });
    };

    handleTaskChange = (selectedTasks) => {
        this.setState({
            tasks: selectedTasks
        });
    };

    newOrganizationFormVisibility = (e) => {
        e.preventDefault();

        if (this.state.organizationInputVisibility === true) {
            this.setState({
                organizationInputVisibility: false
            })
        } else this.setState({
            organizationInputVisibility: true
        });
    };

    handleOrganizationLocation = (location) => {
        this.setState({newOrganizationAddress:location});
        geocodeByAddress(location)
            .then(results => {
                return getLatLng(results[0])
            })
            .then(latLng => {
                this.setState({newOrganizationGPS: latLng})
            })
            .catch(error => console.error('Error', error));
    };

    handleOrganizationAddress = (address) => {
        this.setState({newOrganizationAddress:address});
        this.setState({mapVisibility: false});
        this.setState({organization:this.state.newOrganizationName});

    };

    handleMapVisibility = (e) => {
        e.preventDefault();
        this.setState({mapVisibility: true})
    };

    resetForm = () => {
        this.setState({
            role: '',
            country: '',
            name: '',
            organization: '',
            tasks: [],
            phone: '',
            email: '',
            password: '',
            password_confirm: '',
            newOrganizationName: '',
            newOrganizationAddress: '',
            newOrganizationGPS: {},
            errors: {},
            organizationInputVisibility: true,
            mapVisibility: false,
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();

        const user = {
            role: this.state.role,
            country: this.state.country,
            name: this.state.name,
            organization: this.state.organization,
            tasks: this.state.tasks,
            phone: this.state.phone,
            email: this.state.email,
            password: this.state.password,
            password_confirm: this.state.password_confirm,
        };

        if (this.state.organizationInputVisibility === false && this.state.role !== 'operator' ) {

            const organization = {
                newOrganizationName: this.state.newOrganizationName,
                newOrganizationAddress: this.state.newOrganizationAddress,
                newOrganizationGPS: this.state.newOrganizationGPS
            };
            
            this.props.registerOrganization(organization);

        }

        this.props.registerUser(user, this.resetForm, this.props.history);
        console.log(this.state)

    };

    componentWillReceiveProps = (nextProps) => {
        if (nextProps.auth.isAuthenticated) {
            this.props.history.push('/')
        }
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    };

    componentDidMount = () => {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push('/');
        } else {
            this.props.getOrganizations();
            this.props.getCountry();
        }
    };

    render() {
        const {errors} = this.state;
        const {role} = this.state.role;
        const {organization} = this.state.organization;
        const {country} = this.state.country;
        const {tasks} = this.state.tasks;

        return (
            <div className="formMainContainer">
                <div className='formContainer'>
                    <h1>Registration new user</h1>
                    <form onSubmit={this.handleSubmit}>
                        <div className='formSection'>
                            <label>Select role</label>
                            <Select
                                options={roles}
                                placeholder={'Select role...'}
                                value={role}
                                onChange={this.handleRoleChange}
                                className={'formSelect'}
                            />
                            {errors.role && (<div className="invalidFeedback">{errors.role}</div>)}

                            <label>Select country</label>
                            <Select
                                options={this.props.countries}
                                placeholder={'Select country...'}
                                value={country}
                                onChange={this.handleCountryChange}
                                className={'formSelect'}
                            />
                            {errors.country && (<div className="invalidFeedback">{errors.country}</div>)}

                            {this.state.role === 'operator' && (
                                <Fragment>
                                    <label>Select tasks</label>
                                    <Select
                                        isMulti
                                        joinValues
                                        options={tasksList}
                                        placeholder={'Select tasks...'}
                                        value={tasks}
                                        onChange={this.handleTaskChange}
                                        className={'formSelect'}
                                    />
                                    {errors.tasks && (<div className="invalidFeedback">{errors.tasks}</div>)}
                                </Fragment>
                            )
                            }

                            <label>Name</label>
                            <input
                                type="text"
                                placeholder="Name"
                                name="name"
                                onChange={this.handleInputChange}
                                value={this.state.name}
                                className={'formInput'}
                            />
                            {errors.name && (<div className="invalidFeedback">{errors.name}</div>)}

                            <label>Phone</label>
                            <input
                                type="text"
                                placeholder="Phone number"
                                name="phone"
                                onChange={this.handleInputChange}
                                value={this.state.phone}
                                className={'formInput'}
                            />
                            {errors.phone && (<div className="invalidFeedback">{errors.phone}</div>)}

                            <label>Email</label>
                            <input
                                type="email"
                                placeholder="Email"
                                name="email"
                                onChange={this.handleInputChange}
                                value={this.state.email}
                                className={'formInput'}
                            />
                            {errors.email && (<div className="invalidFeedback">{errors.email}</div>)}

                            <label>Password</label>
                            <input
                                type="password"
                                placeholder="Password"
                                name="password"
                                onChange={this.handleInputChange}
                                value={this.state.password}
                                className={'formInput'}
                            />
                            {errors.password && (<div className="invalidFeedback">{errors.password}</div>)}

                            <label>Confirm password</label>
                            <input
                                type="password"
                                placeholder="Confirm Password"
                                name="password_confirm"
                                onChange={this.handleInputChange}
                                value={this.state.password_confirm}
                                className={'formInput'}
                            />
                            {errors.password_confirm && (
                                <div className="invalidFeedback">{errors.password_confirm}</div>)}

                            <label>Organization</label>
                            <Select
                                options={this.props.organizations}
                                value={organization}
                                isDisabled={!this.state.organizationInputVisibility}
                                placeholder={'Select organization...'}
                                onChange={this.handleOrganizationChange}
                                className={'formSelect'}
                            />
                            {errors.organization && (<div className="invalidFeedback">{errors.organization}</div>)}

                            {this.state.role === 'coordinator' && (
                                <button className="btnNewOrganization" onClick={this.newOrganizationFormVisibility}>
                                    Create New Organization
                                </button>
                            )}
                        </div>

                            <NewOrganizationInputs
                                organizationInputVisibility={this.state.organizationInputVisibility}
                                errors={errors}
                                mapVisibility={this.state.mapVisibility}
                                handleInputChange={this.handleInputChange}
                                organizationNew={this.state.newOrganizationName}
                                newOrganizationAddress={this.state.newOrganizationAddress}
                                newOrganizationGPS={this.state.newOrganizationGPS}
                                onChange={this.handleOrganizationAddress}
                                onSelect={this.handleOrganizationLocation}
                                handleMapVisibility={this.handleMapVisibility}
                            />

                        <button type="submit" className="btnFormSubmit">
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        )
    }
}

UserRegistration.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    organizations: PropTypes.array.isRequired,
    countries: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors,
    organizations: state.organizations,
    countries: state.countries
});

export default connect(mapStateToProps, {
    registerUser,
    registerOrganization,
    getOrganizations,
    getCountry
})(withRouter(UserRegistration))