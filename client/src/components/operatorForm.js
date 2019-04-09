import Select from "react-select";
import React from "react";
import countries from './countries';
import organizations from './organizations'
import tasks from './tasks'

const countriesOption = countries.map(function (item) {
    const elem = {
        value: item.name.toLowerCase(),
        label: item.name
    };
    return elem
});

const OperatorForm = ({selectedOption}) => {
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
                <li><label>Email: </label>
                    <input/></li>
                <li><label>Password: </label>
                    <input/></li>
                <li><label>Tasks: </label>
                    <Select
                    isMulti
                    className='selectCountry'
                    options={tasks}

                /></li>
            </ul>
            <button className={'formSendBtn'}>Registration</button>
        </form>
    )
};
export default OperatorForm