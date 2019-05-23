import React, {Component} from 'react';
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import {withRouter} from "react-router-dom";

import Select from "react-select";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/dist/style.css'

import {getCards} from '../../actions/cardsAction';
import {registerCall} from "../../actions/callsAction";

import './callsStyles.css'

import likeImg from "../../resourses/images/like.png";


class Calls extends Component {

        state = {
            ID: '',
            serial: '',
            errors: {}
        };


    handlePhoneChange = (number) => {
        this.setState({ID: number})
    };

    handleChangeSerial = (serialSelect) => {
        this.setState({
            serial: serialSelect.value
        });

    };

    resetForm = () => {
        const rotateElem = document.getElementById("callsFormInner");
        rotateElem.style.transform = "rotateY(180deg)";

        this.setState({
            ID: '',
            serial: '',
            errors: {}
        });

        setTimeout(() => {
            rotateElem.style.transform = "rotateY(0deg)";
        }, 5000);

    };

    handleSubmit=(e)=> {
        e.preventDefault();

        const call = {
            operatorName: this.props.auth.user.name,
            ID: this.state.ID,
            serial: this.state.serial,
        };

        this.props.registerCall(call, this.resetForm);
    };


    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    componentDidMount() {
        this.props.getCards();
    }


    render() {
        const {errors} = this.state;
        const {isAuthenticated, user} = this.props.auth;
        const serialsArr = this.props.cards;
        const {serialSelect} = this.state.serial;

        if (isAuthenticated) {
            return (
                <div className={'callsMainContainer'}>
                    <div className='callsFormInner' id='callsFormInner'>

                        <form onSubmit={this.handleSubmit} className="callsFormFront">
                            <h1>Registration call</h1>
                            <label>Operator name</label>
                            <input
                                type="text"
                                placeholder={user.name}
                                disabled='disabled'
                                value={user.name}
                            />
                            {errors.operatorName && (<div className="invalidFeedback">{errors.operatorName}</div>)}

                            <label>National caller id</label>
                            <div id='callsPhoneInput'>
                                <PhoneInput
                                    placeholder="Phone number"
                                    onChange={this.handlePhoneChange}
                                    value={this.state.ID}
                                    required
                                >
                                </PhoneInput>
                                {errors.ID && (<div className="invalidFeedback">{errors.ID}</div>)}
                            </div>

                            <label>Card serial number</label>
                            <Select
                                options={serialsArr}
                                value={serialSelect}
                                onChange={this.handleChangeSerial}
                                placeholder={'Select card serial...'}
                                className={'callsFormSelect'}
                            />
                            {errors.serial && (<div className="invalidFeedback">{errors.serial}</div>)}
                            <button type="submit">
                                Submit
                            </button>
                        </form>
                        <div className="callsFormBack">
                            <h2>Seller card successfully added to database!</h2>
                            <img src={likeImg} alt={'like'}/>
                        </div>
                    </div>
                </div>
            );
        } else return null
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

export default connect(mapStateToProps, {getCards, registerCall})(withRouter(Calls))