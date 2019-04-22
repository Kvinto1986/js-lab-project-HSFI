import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import {registerUser, getOrganizations, registerOrganizations} from '../../actions/authentication';
import classnames from 'classnames';
import Select from 'react-select'
import countries from '../../resourses/countries'
import organizations from '../../resourses/organizationsList/organizations'
import roles from '../../resourses/roles'
import TaskSelect from './TaskSelect'
import OrgInputs from './OrganizationInputs'
import getOrganizationsList from '../../resourses/organizationsList/organaizationsList'

const organizationsArray = getOrganizationsList(organizations);

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
            showOrganizationInput: false,

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
        this.props.registerUser(user, this.props.history);

        if(this.state.showOrganizationInput===false) {
            this.setState({
                organization: this.state.organizationNew
            });
            const organization = {
                organizationNew: this.state.organizationNew,
                organizationAddress: this.state.organizationAddress
            };
            this.props.registerOrganizations(organization);
        }

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
        getOrganizations()
    }


    render() {
        const {errors} = this.state;
        const {countrySelect} = this.state.country;
        const {organizationSelect} = this.state.organization;
        const {roleSelect} = this.state.role;

        const Organization = () => {
            if (this.state.role === 'coordinator') {

                return (
                    <div className="form-group mt-3" style={{border: '2px solid black'}}>
                        <button className="btn btn-primary" onClick={this.handleChangeShowInputs}>
                            Create New Organization
                        </button>
                    </div>
                )
            } else return null
        };

        return (
            <div className="container" style={{marginTop: '50px', width: '700px'}}>
                <h2 style={{marginBottom: '40px'}}>Registration new user</h2>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <Select
                            options={roles}
                            placeholder={'Select role...'}
                            value={roleSelect}
                            onChange={this.handleChangeRole}
                            className={classnames('form-control form-control-lg', {
                                'is-invalid': errors.role
                            })}
                        />
                        {errors.role && (<div className="invalid-feedback">{errors.role}</div>)}
                    </div>
                    <div className="form-group">
                        <Select
                            options={countries}
                            placeholder={'Select country...'}
                            value={countrySelect}
                            onChange={this.handleChangeCountry}
                            className={classnames('form-control form-control-lg', {
                                'is-invalid': errors.country
                            })}
                        />
                        {errors.country && (<div className="invalid-feedback">{errors.country}</div>)}
                    </div>

                    <TaskSelect
                        errors={errors}
                        handleChangeTask={this.handleChangeTask}
                        role={this.state.role}
                    />

                    <div className="form-group">

                        <input
                            type="text"
                            placeholder="Name"
                            className={classnames('form-control form-control-lg', {
                                'is-invalid': errors.name
                            })}
                            name="name"
                            onChange={this.handleInputChange}
                            value={this.state.name}
                        />
                        {errors.name && (<div className="invalid-feedback">{errors.name}</div>)}
                    </div>
                    <div className="form-group">
                        <Select
                            options={organizationsArray}
                            value={organizationSelect}
                            isDisabled={this.state.showOrganizationInput}
                            placeholder={'Select organization...'}
                            onChange={this.handleChangeOrganization}
                            className={classnames('form-control form-control-lg', {
                                'is-invalid': errors.organization
                            })}
                        />
                        {errors.organization && (<div className="invalid-feedback">{errors.organization}</div>)}
                    </div>
                    <Organization />
                    <OrgInputs
                        role={this.state.role}
                        showOrganizationInput={this.state.showOrganizationInput}
                        errors={errors}
                        handleInputChange={this.handleInputChange}
                        organizationNew={this.state.organizationNew}
                        organizationAddress={this.state.organizationAddress}
                    />
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="Phone number"
                            className={classnames('form-control form-control-lg', {
                                'is-invalid': errors.phone
                            })}
                            name="phone"
                            onChange={this.handleInputChange}
                            value={this.state.phone}
                        />
                        {errors.phone && (<div className="invalid-feedback">{errors.phone}</div>)}
                    </div>

                    <div className="form-group">
                        <input
                            type="email"
                            placeholder="Email"
                            className={classnames('form-control form-control-lg', {
                                'is-invalid': errors.email
                            })}
                            name="email"
                            onChange={this.handleInputChange}
                            value={this.state.email}
                        />
                        {errors.email && (<div className="invalid-feedback">{errors.email}</div>)}
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            placeholder="Password"
                            className={classnames('form-control form-control-lg', {
                                'is-invalid': errors.password
                            })}
                            name="password"
                            onChange={this.handleInputChange}
                            value={this.state.password}
                        />
                        {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            className={classnames('form-control form-control-lg', {
                                'is-invalid': errors.password_confirm
                            })}
                            name="password_confirm"
                            onChange={this.handleInputChange}
                            value={this.state.password_confirm}
                        />
                        {errors.password_confirm && (<div className="invalid-feedback">{errors.password_confirm}</div>)}
                    </div>

                    <div className="form-group">
                        <button type="submit" className="btn btn-primary">
                            Register User
                        </button>
                    </div>
                </form>
            </div>
        )
    }
}

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, {registerUser, registerOrganizations})(withRouter(Register))