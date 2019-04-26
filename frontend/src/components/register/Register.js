import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import {registerUser} from '../../actions/users';
import {getOrganizations, registerOrganizations} from '../../actions/organizations';
import {getCountry} from '../../actions/country';
import Select from 'react-select'
import countries from '../../resourses/countries'
import roles from '../../resourses/roles'
import TaskSelect from './TaskSelect'
import OrgInputs from './OrganizationInputs'
import './registerStyle.css'

class Register extends Component {

    constructor() {
        super();
        this.state = {
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
            errors: {},
            showOrganizationInput: true,
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeTask = this.handleChangeTask.bind(this);
        this.handleChangeCountry = this.handleChangeCountry.bind(this);
        this.handleChangeOrganization = this.handleChangeOrganization.bind(this);
        this.handleChangeRole = this.handleChangeRole.bind(this);
    }

    handleInputChange(e) {
        this.setState({
                [e.target.name]: e.target.value

        })
    }

    handleChangeCountry = (countrySelect) => {
        this.setState({
                country: countrySelect.value
        });

    };

    handleChangeOrganization = (organizationSelect) => {
        this.setState({
                organization: organizationSelect.value
        });

    };

    handleChangeRole = (roleSelect) => {
        this.setState({
                role: roleSelect.value
        });

    };

    handleChangeTask = (tasks) => {
        this.setState({tasks});
    };

    handleChangeShowInputs = (e) => {
        e.preventDefault();
        if (this.state.showOrganizationInput === true) {
            this.setState({
                showOrganizationInput: false
            })
        } else this.setState({
            showOrganizationInput: true
        })
    };

    handleSubmit(e) {
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


        if(this.state.showOrganizationInput===false&&this.state.role!=='operator') {
            user.organization= this.state.organizationNew;
            const organization = {
                organizationNew: this.state.organizationNew,
                organizationAddress: this.state.organizationAddress
            };
                this.props.registerOrganizations(organization);
        }
        this.props.registerUser(user, this.props.history);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated) {
            this.props.history.push('/')
        }
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push('/');
        }
        this.props.getOrganizations();
        this.props.getCountry();
    }

    render() {

        const {errors} = this.state;
        const {countrySelect} = this.state.country;
        const {organizationSelect} = this.state.organization;
        const {roleSelect} = this.state.role;
        const countryArr = this.props.country;
        const Organization = () => {
            if (this.state.role === 'coordinator') {

                return (
                        <button className="btnNewOrganization" onClick={this.handleChangeShowInputs}>
                            Create New Organization
                        </button>
                )
            } else return null
        };

        return (
            <div className="registerMainContainer">
                <div className='registerFormContainer'>
                <h2>Registration new user</h2>
                <form onSubmit={this.handleSubmit} >

                        <Select
                            options={roles}
                            placeholder={'Select role...'}
                            value={roleSelect}
                            onChange={this.handleChangeRole}
                            className={'registerFormSelect'}
                        />
                        {errors.role && (<div className="invalidFeedback">{errors.role}</div>)}

                        <Select
                            options={countryArr}
                            placeholder={'Select country...'}
                            value={countrySelect}
                            onChange={this.handleChangeCountry}
                            className={'registerFormSelect'}
                        />
                        {errors.country && (<div className="invalidFeedback">{errors.country}</div>)}


                    <TaskSelect
                        errors={errors}
                        handleChangeTask={this.handleChangeTask}
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
                            value={organizationSelect}
                            isDisabled={!this.state.showOrganizationInput}
                            placeholder={'Select organization...'}
                            onChange={this.handleChangeOrganization}
                            className={'registerFormSelect'}
                        />
                        {errors.organization && (<div className="invalidFeedback">{errors.organization}</div>)}

                    <Organization />
                    <OrgInputs
                        role={this.state.role}
                        showOrganizationInput={this.state.showOrganizationInput}
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

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    organizations: PropTypes.array.isRequired,
    country: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors,
    organizations: state.organizations,
    country: state.country
});

export default connect(mapStateToProps, {registerUser, registerOrganizations,getOrganizations,getCountry})(withRouter(Register))