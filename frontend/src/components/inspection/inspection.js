import React, { Component } from 'react';
import {getCards} from '../../actions/cards';
import './inspectionStyles.css'
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import {registerCall} from "../../actions/calls";
import {withRouter} from "react-router-dom";
import Select from "react-select";

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
    render() {
        const {isAuthenticated, user} = this.props.auth;

        if(isAuthenticated) {
            return (
                <div className={'inspectionMainContainer'}>
                </div>)
        }
        else return null
    }
}
Calls.propTypes = {
    auth: PropTypes.object.isRequired,
    cards: PropTypes.array.isRequired,
};
const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors,
    cards: state.cards
});

export default connect(mapStateToProps, {getCards,registerCall})(withRouter(Calls))