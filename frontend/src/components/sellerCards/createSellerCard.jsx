import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import {getSellers} from "../../actions/sellerAction";
import {registerCard} from '../../actions/cardsAction';

import {getLicenseSelect, getSeller, getRandomSerial} from '../../utils/utils'

import Select from "react-select";

import SellerInfo from "./SellerInfo";
import CardForm from "./CardForm";

import './sellerCardsStyles.css';
import likeImg from "../../resourses/images/like.png";

class NewCard extends Component {

    state = {
        license: "",
        seller: null,
        cardsCount: '',
        cardSerial: '',
        cost: '',
        currency: '',
        errors: {}
    };

    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value

        })
    };

    handleChangeLicense = (licenseSelect) => {
        this.setState({
            license: licenseSelect.value
        });
        this.setState({
            seller: getSeller(this.props.sellers, licenseSelect.value)
        });

    };

    handleChangeCurrency = (currencySelect) => {
        this.setState({
            currency: currencySelect.value
        });

    };

    resetForm = () => {
        const rotateElem = document.getElementById("cardFormInner");
        rotateElem.style.transform = "rotateY(180deg)";

        this.setState({
            license: "",
            cardsCount: '',
            cardSerial: '',
            cost: '',
            currency: ''
        });

        setTimeout(() => {
            rotateElem.style.transform = "rotateY(0deg)";
        }, 5000);
    };

    handleSubmit = (e) => {
        e.preventDefault();

        const card = {
            operatorName: this.props.auth.user.name,
            sellerName: this.state.seller.name,
            sellerPhoto: this.state.seller.photo,
            license: this.state.seller.license,
            cardsCount: this.state.cardsCount,
            cardSerial: getRandomSerial(),
            cost: this.state.cost,
            currency: this.state.currency,
            foodGroup: this.state.seller.foodGroup

        };

        this.props.registerCard(card, this.resetForm);
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    componentDidMount() {
        this.props.getSellers();
    }

    render() {
        const {isAuthenticated, user} = this.props.auth;
        const {errors} = this.state;
        const sellersArr = getLicenseSelect(this.props.sellers);
        const {licenseSelect} = this.state.license;

        if (isAuthenticated) {
            return (

                <div className="cardMainContainer">
                    <h1>Select seller license</h1>
                    <Select
                        options={sellersArr}
                        value={licenseSelect}
                        onChange={this.handleChangeLicense}
                        placeholder={'Select seller license...'}
                        className={'licenseSelectInput'}
                    />
                    {this.state.seller ? (
                        <div className='cardFormInner' id='cardFormInner'>
                            <div className="cardFormFront">
                                <h2>Registration user card</h2>
                                <SellerInfo
                                    seller={this.state.seller}
                                />

                                <CardForm
                                    user={user}
                                    seller={this.state.seller}
                                    errors={errors}
                                    handleSubmit={this.handleSubmit}
                                    handleInputChange={this.handleInputChange}
                                    cardsCount={this.state.cardsCount}
                                    cost={this.state.cost}
                                    handleChangeCurrency={this.handleChangeCurrency}
                                    currency={this.state.currency}
                                />

                            </div>
                            <div className="cardFormBack">
                                <h1>Seller card successfully added to database!</h1>
                                <img src={likeImg} alt={'like'}/>
                            </div>
                        </div>
                    ) : null}
                </div>


            )
        } else return (<Redirect to={{
            pathname: '/login',
        }}/>)
    }
}

NewCard.propTypes = {
    getSellers: PropTypes.func.isRequired,
    registerCard: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    sellers: PropTypes.array.isRequired,
};
const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors,
    sellers: state.sellers
});

export default connect(mapStateToProps, {getSellers, registerCard})(withRouter(NewCard))