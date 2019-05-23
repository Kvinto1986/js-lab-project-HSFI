import React, { Component } from 'react';
import './inspectionStyles.css'
import {Redirect, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {findSeller, getSellersLicenses} from "../../actions/sellerAction";
import {registerCard} from "../../actions/cardsAction";
import {getLicenseSelect} from "../../utils/utils";



class Inspection extends Component {

    render() {
        const {isAuthenticated, user} = this.props.auth;
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

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors,
});


export default connect(mapStateToProps, {
})(withRouter(Inspection))