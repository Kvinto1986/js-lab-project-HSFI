import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import Select from "react-select";
import food from "../../resourses/food";
import './sellerCardsStyles.css'
import {getSellers} from "../../actions/sellers";

class NewCard extends Component {

    constructor() {
        super();
        this.state = {
            operatorName: "",
            data: "",
            license: "",
            name: "",
            photo: "",
            foodGroup: "",
            cardCount:'',
            cardNumber:'',
            cardCost:'',
            currency:'',
            errors: {}
        };
    }

    componentWillMount() {
        getSellers()
    }

    render() {
        const {isAuthenticated, user} = this.props.auth;
        const {errors} = this.state;


        if(isAuthenticated){
            return (

                <div className="cardMainContainer" >
                    <img src={'../../../static/Krabs@krabs.com-crabs.jpg'}/>
                            <Select
                                options={food}
                                placeholder={'Select seller license...'}
                                className={'licenseSelect'}
                            />
                </div>


            )}
        else return(<Redirect to={{
            pathname: '/login',
        }} />)
    }
}
NewCard.propTypes = {
    auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, {getSellers})(withRouter(NewCard))