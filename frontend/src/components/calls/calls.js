import React, { Component } from 'react';
import {getCards} from '../../actions/cards';
import './callsStyles.css'
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import {registerCall} from "../../actions/calls";
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
             success:false,
             errors: {}
         };
         this.handleInputChange = this.handleInputChange.bind(this);
         this.handleChangeSerial = this.handleChangeSerial.bind(this);
         this.handleSubmit = this.handleSubmit.bind(this);
         this.resetForm = this.resetForm.bind(this);
     }

     handleInputChange(e) {
         this.setState({
             [e.target.name]: e.target.value

         })
     }

     handleChangeSerial = (serialSelect) => {
         this.setState({
             serial: serialSelect.value
         });

     };

     resetForm = () => {
         this.setState({
             ID:'',
             serial:'',
             success:true
         });
         setTimeout(() => {
             this.setState({ success:false})
         }, 5000);
     };

     handleSubmit(e) {
         e.preventDefault();

         const call = {
             operatorName:this.props.auth.user.name,
             ID:this.state.ID,
             serial:this.state.serial,
         };
                console.log(call)
         this.props.registerCall(call, this.resetForm);
     }


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
        const {serialSelect}=this.state.serial;

        const SendSuccess=()=>{
            if(this.state.success===true){
                return(
                    <div className={'successContainer'}><h1>Card created successfully!</h1></div>
                )
            }
            else return null
        };

        if(isAuthenticated) {
            return (
                <div className={'callsMainContainer'}>
                    <div className="callFormContainer">
                        <h2>Registration call</h2>
                        <form onSubmit={this.handleSubmit}>
                            <input
                                type="text"
                                placeholder={user.name}
                                disabled = 'disabled'
                                value={user.name}
                            />
                            {errors.operatorName && (<div className="invalidFeedbackCalls">{errors.operatorName}</div>)}

                            <input
                                type="text"
                                placeholder="ID"
                                name="ID"
                                onChange={this.handleInputChange}
                                value={this.state.ID}
                            />
                            {errors.ID && (<div className="invalidFeedbackCalls">{errors.ID}</div>)}

                            <Select
                                options={serialsArr}
                                value={serialSelect}
                                onChange={this.handleChangeSerial}
                                placeholder={'Select card serial...'}
                                className={'serialSelectInput'}
                            />
                            {errors.serial && (<div className="invalidFeedbackCalls">{errors.serial}</div>)}
                            {errors.call && (<div className="invalidFeedbackCalls">{errors.call}</div>)}
                            <button type="submit" className={'btnSubmit'}>
                                Submit
                            </button>
                        </form>
                    </div>
                    <SendSuccess
                    />
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

export default connect(mapStateToProps, {getCards,registerCall})(withRouter(Calls))