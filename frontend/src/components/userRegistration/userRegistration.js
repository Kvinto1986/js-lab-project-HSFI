import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import {registerUser} from '../../actions/userAction';
import {getOrganizations, registerOrganization} from '../../actions/organizationAction';
import {getCountry} from '../../actions/country';
import Select from 'react-select'
import roles from '../../resourses/roles'
import TaskSelect from './TaskSelect'
import OrgInputs from './OrganizationInputs'
import './registerStyle.css'

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
        organizationNew: '',
        organizationAddress: '',
        organizationGPS: {},
        errors: {},
        OrganizationInputVisibility: true,
    };

    handleInputChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    };

    handleRoleChange = (selectedRole) => {
        this.setState({
            role: selectedRole.value
        });

    };

    handleCountryChange = (selectedCountry) => {
        this.setState({
            country: selectedCountry.value
        });
    };

    handleOrganizationChange = (selectedOrganization) => {
        this.setState({
            organization: selectedOrganization.value
        });
    };

    handleTaskChange = (selectedTasks) => {
        this.setState({
            tasks: selectedTasks
        });
    };

    newOrganizationFormVisibility = (event) => {
        event.preventDefault();

        if (this.state.OrganizationInputVisibility === true) {
            this.setState({
                OrganizationInputVisibility: false
            })
        } else this.setState({
            OrganizationInputVisibility: true
        })
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
            organizationNew: '',
            organizationAddress: '',
            organizationGPS: {},
            errors: {},
            OrganizationInputVisibility: true,
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

        if (this.state.OrganizationInputVisibility === false && this.state.role !== 'operator') {
            user.organization = this.state.organizationNew;

            const organization = {
                organizationNew: this.state.organizationNew,
                organizationAddress: this.state.organizationAddress,
                organizationGPS: this.state.organizationGPS
            };

            this.props.registerOrganization(organization);
        }

        this.props.registerUser(user, this.resetForm, this.props.history);
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
        const {selectedOrganization} = this.state.organization;
        const {selectedCountry} = this.state.country;
        const {selectedRole} = this.state.role;

        const Organization = () => {
            if (this.state.role === 'coordinator') {

                return (
                    <button className="btnNewOrganization" onClick={this.newOrganizationFormVisibility}>
                        Create New Organization
                    </button>
                )
            } else return null
        };

        return (
            <div className="registerMainContainer">
                <div className='registerFormContainer'>
                    <h2>Registration new user</h2>
                    <form onSubmit={this.handleSubmit}>

                        <Select
                            options={roles}
                            placeholder={'Select role...'}
                            value={selectedRole}
                            onChange={this.handleRoleChange}
                            className={'registerFormSelect'}
                        />
                        {errors.role && (<div className="invalidFeedback">{errors.role}</div>)}

                        <Select
                            options={this.props.countries}
                            placeholder={'Select country...'}
                            value={selectedCountry}
                            onChange={this.handleCountryChange}
                            className={'registerFormSelect'}
                        />
                        {errors.country && (<div className="invalidFeedback">{errors.country}</div>)}


                        <TaskSelect
                            errors={errors}
                            handleChangeTask={this.handleTaskChange}
                            role={this.state.role}
                        />

                        <input
                            type="text"
                            placeholder="Name"
                            name="name"
                            onChange={this.handleInputChange}
                            value={this.state.name}
                            className={'registerFormInput'}
                        />
                        {errors.name && (<div className="invalidFeedback">{errors.name}</div>)}

                        <Select
                            options={this.props.organizations}
                            value={selectedOrganization}
                            isDisabled={!this.state.OrganizationInputVisibility}
                            placeholder={'Select organization...'}
                            onChange={this.handleOrganizationChange}
                            className={'registerFormSelect'}
                        />
                        {errors.organization && (<div className="invalidFeedback">{errors.organization}</div>)}

                        <Organization
                        />
                        <OrgInputs
                            role={this.state.role}
                            showOrganizationInput={this.state.OrganizationInputVisibility}
                            errors={errors}
                            handleInputChange={this.handleInputChange}
                            organizationNew={this.state.organizationNew}
                            organization={this.state.organization}
                            organizationAddress={this.state.organizationAddress}
                        />
                        <input
                            type="text"
                            placeholder="Phone number"
                            name="phone"
                            onChange={this.handleInputChange}
                            value={this.state.phone}
                            className={'registerFormInput'}
                        />
                        {errors.phone && (<div className="invalidFeedback">{errors.phone}</div>)}

                        <input
                            type="email"
                            placeholder="Email"
                            name="email"
                            onChange={this.handleInputChange}
                            value={this.state.email}
                            className={'registerFormInput'}
                        />
                        {errors.email && (<div className="invalidFeedback">{errors.email}</div>)}

                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            onChange={this.handleInputChange}
                            value={this.state.password}
                            className={'registerFormInput'}
                        />
                        {errors.password && (<div className="invalidFeedback">{errors.password}</div>)}

                        <input
                            type="password"
                            placeholder="Confirm Password"
                            name="password_confirm"
                            onChange={this.handleInputChange}
                            value={this.state.password_confirm}
                            className={'registerFormInput'}
                        />
                        {errors.password_confirm && (<div className="invalidFeedback">{errors.password_confirm}</div>)}

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