import React from 'react';
import '../App.css';
import CoordinatorForm from './coordinatorForm'
import OperatorForm from './operatorForm'


const Form = ({selectedOption}) => {

    if (selectedOption !== null) {
        if (selectedOption.value === 'coordinator') {
            return (
                <CoordinatorForm
                    selectedOption={selectedOption}/>
            );
        }
        if (selectedOption.value === 'operator') {
            return (
                <OperatorForm
                    selectedOption={selectedOption}/>
            );
        }


    } else return null
};

export default Form;