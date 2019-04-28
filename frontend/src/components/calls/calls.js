import React, { Component } from 'react';
import {getCards} from '../../actions/cards';
import './callsStyles.css'
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import {getSellers} from "../../actions/sellers";
import {withRouter} from "react-router-dom";
import Select from "react-select";

const getSerialSelect=function (obj) {
    const serialArr=obj.map(function (elem) {
        const newElem={};
        newElem.value=elem.cardSerial;
        newElem.label=elem.cardSerial;
        return newElem
    });

    return serialArr;
};

 class Calls extends Component {
     constructor() {
         super();
         this.state = {
             ID:'',
             serial:'',
             errors: {}
         };
         this.handleInputChange = this.handleInputChange.bind(this);
         this.handleChangeSerial = this.handleChangeSerial.bind(this);
     }

     handleInputChange(e) {
         this.setState({
             [e.target.name]: e.target.value

         })
     }

     handleChangeSerial = (serialSelect) => {
         this.setState({
             currency: serialSelect.value
         });

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
        const {isAuthenticated, user} = this.props.auth;
        const serialsArr = getSerialSelect(this.props.cards);
        const {serialSelect}=this.state.serial
        if(isAuthenticated) {
            return (
                <div className={'callsMainContainer'}>
                    <div className="callFormContainer">
                        <h2>Registration call</h2>
                        <form>
                            <input
                                type="text"
                                placeholder={user.name}
                                disabled = 'disabled'
                                value={user.name}
                            />

                            <input
                                type="text"
                                placeholder="ID"
                                name="ID"
                                onChange={this.props.handleInputChange}
                                value={this.props.ID}
                            />

                            <Select
                                options={serialsArr}
                                value={serialSelect}
                                onChange={this.handleChangeLicense}
                                placeholder={'Select card serial...'}
                                className={'serialSelectInput'}
                            />

                            <button type="submit" className={'btnSubmit'}>
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            );
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

export default connect(mapStateToProps, {getCards})(withRouter(Calls))