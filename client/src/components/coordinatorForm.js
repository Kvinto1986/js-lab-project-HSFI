import Select from "react-select";
import React from "react";
import countries from './countries';
import organizations from './organizations'


const countriesOption = countries.map(function (item) {
    const elem = {
        value: item.name.toLowerCase(),
        label: item.name
    };
    return elem
});

const CoordinatorForm = ({selectedOption}) => {
    return(
    <form className={'newUserForm'}>
        <h2>New {selectedOption.value} registration form</h2>
        <ul>
            <li><label>Country: </label>
                <Select
                    className='selectCountry'
                    options={countriesOption}

                /></li>
            <li><label>Name: </label>
                <input/></li>
            <li><label>Organization: </label>
                <Select
                    className='selectCountry'
                    options={organizations}

                /></li>
            <li><label>Phone: </label>
                <input/></li>
            <li><label>Email: </label>
                <input/></li>
            <li><label>Password: </label>
                <input/></li>
        </ul>
        <button className={'formSendBtn'}>Registration</button>
    </form>
    )
};
export default CoordinatorForm