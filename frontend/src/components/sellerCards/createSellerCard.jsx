import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import {getSellers} from "../../actions/sellerAction";
import {registerCard} from '../../actions/cardsAction';

import {getLicenseSelect,getSeller,getRandomSerial} from '../../utils/utils'

import Select from "react-select";

import SellerInfo from "./SellerInfo";
import CardForm from "./CardForm";

import './sellerCardsStyles.css';

class NewCard extends Component {

    constructor() {
        super();
        this.state = {
            license: "",
            seller: null,
            cardsCount: '',
            cardSerial: '',
            cost: '',
            currency: '',
            success:false,
            errors: {}
        };

        this.handleChangeLicense = this.handleChangeLicense.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleChangeCurrency = this.handleChangeCurrency.bind(this);
        this.resetForm = this.resetForm.bind(this);

    }

    handleChangeLicense = (licenseSelect) => {
        this.setState({
            license: licenseSelect.value
        });
        this.setState({
            seller: getSeller(this.props.sellers, licenseSelect.value)
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

    resetForm = () => {
        this.setState({
            license: "",
            cardsCount: '',
            cardSerial: '',
            cost: '',
            currency: '',
            seller: null,
            success:true,
    });
        setTimeout(() => {
            this.setState({ success:false})
        }, 5000);
    };

    handleSubmit(e) {
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

        this.props.registerCard(card,this.resetForm);
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
        const {licenseSelect} = this.state.license;

        const SendSuccess=()=>{
            if(this.state.success===true){
                return(
                    <div className={'successContainer'}><h1>Card created successfully!</h1></div>
                )
            }
            else return null
        };

        if (isAuthenticated) {
            return (

                <div className="cardMainContainer">

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
                    <SendSuccess
                    />
                </div>


            )
        } else return (<Redirect to={{
            pathname: '/login',
        }}/>)
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

export default connect(mapStateToProps, {getSellers, registerCard})(withRouter(NewCard))