import React, {Component} from 'react';
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import {withRouter} from "react-router-dom";

import Select from "react-select";
import InputMask from 'react-input-mask';

import {getCards} from '../../actions/cardsAction';
import {registerCall} from "../../actions/callsAction";

import './callsStyles.css'

import {getSerialSelect} from '../../utils/utils'
import likeImg from "../../resourses/images/like.png";


class Calls extends Component {

        state = {
            ID: '',
            serial: '',
            errors: {}
        };


    handleInputChange=(e)=> {
        this.setState({
            [e.target.name]: e.target.value

        })
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
        const serialsArr = getSerialSelect(this.props.cards);
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
                            <InputMask
                                type="tel"
                                mask="+999 (99) 999 99 99"
                                placeholder="ID phone"
                                name="ID"
                                onChange={this.handleInputChange}
                                value={this.state.ID}
                                required
                            >
                            </InputMask>

                            {errors.ID && (<div className="invalidFeedback">{errors.ID}</div>)}

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