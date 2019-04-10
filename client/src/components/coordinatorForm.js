import Select from "react-select";
import React, {Component} from 'react';
import countries from './countries';
import organizations from './organizations'
import axios from 'axios'

const countriesOption = countries.map(function (item) {
    const elem = {
        value: item.name.toLowerCase(),
        label: item.name
    };
    return elem
});

class CoordinatorForm extends Component {
    state = {
        country: '',
        name: null,
        organization: '',
        phone: null,
        email:null,
        password:null,
    };



    handleEntailmentRequest() {


        axios.post("http://localhost:3001/server/putData", {
            country: this.state.country,
            name: this.state.name,
            organization: this.state.organization,
            phone: this.state.phone,
            email:this.state.email,
            password:this.state.password,
        })
    }

    handleChangeCountry = (countrySelect) => {
        this.setState({country: countrySelect.value });

    };
    handleChangeOrganization = (organizationSelect) => {
        this.setState({organization: organizationSelect.value });

    };

    render() {

        const {countrySelect } = this.state.country;
        const {organizationSelect } = this.state.organization;
        return(
        <form className={'newUserForm'}>
            <h2>New coordinator registration form</h2>
            <ul>
                <li><label>Country: </label>
                    <Select
                        className='selectCountry'
                        options={countriesOption}
                        value={countrySelect}
                        onChange={this.handleChangeCountry}
                    /></li>
                <li><label>Name: </label>
                    <input type="text"
                           onChange={e => this.setState({ name: e.target.value })}
                           placeholder="Name"/></li>
                <li><label>Organization: </label>
                    <Select
                        className='selectCountry'
                        options={organizations}
                        value={organizationSelect}
                        onChange={this.handleChangeOrganization}
                    /></li>
                <li><label>Phone: </label>
                    <input type="text"
                           onChange={e => this.setState({ phone: e.target.value })}
                           placeholder="Name"/></li>
                <li><label>Email: </label>
                    <input type="text"
                           onChange={e => this.setState({ email: e.target.value })}
                           placeholder="Name"/></li>
                <li><label>Password: </label>
                    <input type="text"
                           onChange={e => this.setState({ password: e.target.value })}
                           placeholder="Name"/></li>
            </ul>
            <button type="simpleQuery" onClick={() => {this.handleEntailmentRequest()}}>Registration</button>
        </form>
        )
    }
}


export default CoordinatorForm