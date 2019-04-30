import React, { Component } from 'react';
import './inspectionStyles.css'
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import {Redirect, withRouter} from "react-router-dom";
import Select from "react-select";
import {getSellers} from "../../actions/sellers";
import {getInspectionQuestions} from "../../actions/inspectionQuestions";
import {registerInspection} from "../../actions/inspection";


class Calls extends Component {
    constructor() {
        super();
        this.state = {
            ID: '',
            serial: '',
            success: false,
            errors: {}
        };
    }

    componentDidMount() {
        this.props.getSellers();
        this.props.getInspectionQuestions();
    }

    render() {
        const {isAuthenticated, user} = this.props.auth;
        const {questions} = this.props.sellers;
        console.log(questions);
        if(isAuthenticated) {
            return (
                <div className={'inspectionMainContainer'}>



                </div>)
        }
        else return (<Redirect to={{
            pathname: '/login',
        }}/>)
    }
}
Calls.propTypes = {
    auth: PropTypes.object.isRequired,
    sellers: PropTypes.array.isRequired,
};
const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors,
    sellers: state.sellers,
    questions:state.questions
});

export default connect(mapStateToProps, {getSellers,getInspectionQuestions, registerInspection})(withRouter(Calls))