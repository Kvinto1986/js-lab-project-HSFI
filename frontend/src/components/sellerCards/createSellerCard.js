import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import Select from "react-select";
import SellerInfo from "./SellerInfo";
import CardForm from "./CardForm";
import './sellerCardsStyles.css';
import {getSellers} from "../../actions/sellers";
import {registerCard} from '../../actions/cards';

const getLicenseSelect=function (obj) {
    const licenseArr=obj.map(function (elem) {
        const newElem={};
        newElem.value=elem.license;
        newElem.label=elem.license;
        return newElem
    });

    return licenseArr;
};

const getSeller=function (obj,license) {
    let seller={}
        for(let i=0;i<obj.length;i++){
            if(obj[i].license===license){
                seller=obj[i]
            }
        }

    return seller;
};


class NewCard extends Component {

    constructor() {
        super();
        this.state = {
            license: "",
            seller:null,
            cardsCount: '',
            cardSerial: '',
            cost: '',
            currency: '',
            errors: {}
        };

        this.handleChangeLicense = this.handleChangeLicense.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleChangeCurrency = this.handleChangeCurrency.bind(this);
    }

    handleChangeLicense = (licenseSelect) => {
        this.setState({
            license: licenseSelect.value
        });
        this.setState({
            seller: getSeller(this.props.sellers,licenseSelect.value)
        });

    };

    handleInputChange(e) {
        this.setState({
            [e.target.name]: e.target.value

        })
    }

    handleChangeCurrency = (currencySelect) => {
        this.setState({
            currency: currencySelect.value
        });

    };

    handleSubmit(e) {
        e.preventDefault();

        const card = {
            operatorName: this.props.auth.user.name,
            sellerName: this.state.seller.name,
            sellerPhoto: this.state.seller.photo,
            license: this.state.seller.license,
            cardsCount: this.state.cardsCount,
            cardSerial: this.state.cardSerial,
            cost: this.state.cost,
            currency: this.state.currency,
            foodGroup: this.state.seller.foodGroup

        };
        console.log(card)
        this.props.registerCard(card,this.props.history);
    }

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
        const {licenseSelect}=this.state.license;

        if(isAuthenticated){
            return (

                <div className="cardMainContainer" >

                            <Select
                                options={sellersArr}
                                value={licenseSelect}
                                onChange={this.handleChangeLicense}
                                placeholder={'Select seller license...'}
                                className={'licenseSelectInput'}
                            />
                    <div className="cardContainer">
                            <SellerInfo
                            seller={this.state.seller}
                            />
                            <CardForm
                                user={user}
                                registerCard={this.props.registerCard}
                                seller={this.state.seller}
                                errors={errors}
                                handleSubmit={this.handleSubmit}
                                handleInputChange={this.handleInputChange}
                                cardSerial={this.state.cardSerial}
                                cardsCount={this.state.cardsCount}
                                cost={this.state.cost}
                                handleChangeCurrency={this.handleChangeCurrency}
                                currency={this.state.currency}
                            />

                    </div>
                </div>


            )}
        else return(<Redirect to={{
            pathname: '/login',
        }} />)
    }
}
NewCard.propTypes = {
    auth: PropTypes.object.isRequired,
    sellers: PropTypes.array.isRequired,
};
const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors,
    sellers: state.sellers
});

export default connect(mapStateToProps, {getSellers,registerCard})(withRouter(NewCard))