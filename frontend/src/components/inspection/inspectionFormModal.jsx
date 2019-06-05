import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {registerInspection} from '../../actions/inspectionAction';
import {getInspectionQuestions} from '../../actions/inspectionQuestionsAction'
import Modal from 'react-modal';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/dist/style.css'

import likeImg from '../../resourses/images/like.png'

import './inspectionStyles.css'
import '../createSeller/createSellerStyles.css'

Modal.setAppElement('#root');

class InspectionModal extends Component {
    state = {
        lat: '',
        lng: '',
        OSS: '',
    };

    getCurrentLoacation = () => {
        navigator.geolocation.getCurrentPosition((position) => {
            this.setState({lat: position.coords.latitude});
            this.setState({lng: position.coords.longitude});
        });
    };

    handleOSSPlus = (e) => {
        this.setState({[e.target.name]: true});
        this.setState({OSS: this.state.OSS += 2});
    };

    handleOSSMinus = (e) => {
        this.setState({[e.target.name]: false});
        this.setState({OSS: this.state.OSS -= 2});
    };

    radioStatus = () => {
        for (let i = 0; i < this.props.inspectionQuestions.length; i++) {
            this.setState({[this.props.inspectionQuestions[i]._id]: true});
        }
        this.setState({OSS: this.state.OSS = this.props.inspectionQuestions.length});
        this.getCurrentLoacation();
    };

    resetForm = () => {
        const rotateElem = document.getElementsByClassName("inspectionModalSellerFormInner")[0];
        rotateElem.style.transform = "rotateY(180deg)";
        setTimeout(() => {
            rotateElem.style.transform = "rotateY(0deg)";
            this.props.closeInspectionModal();
            this.props.findSellers(0);
        }, 3000);
    };

    handleSubmit = (e) => {
        e.preventDefault();

        const inspectionQuestionsArr=this.props.inspectionQuestions.map((elem)=>elem.question);

        const inspection={
            operatorName: this.props.auth.user.name,
            sellerName: this.props.editSeller.name,
            sellerPhoto: this.props.editSeller.photo,
            license: this.props.editSeller.license,
            foodGroup: this.props.editSeller.foodGroup,
            GPS:{
                lat: this.state.lat,
                lng: this.state.lng,
            },
            questions: inspectionQuestionsArr,
            OSS:this.state.OSS
        };

        for(let i=0;i<this.props.editSeller.schedule.length;i++){
            if(this.props.editSeller.schedule[i].workingDays.includes(this.props.day)){
                inspection.sellerGPS=this.props.editSeller.schedule[i].GPS
            }
        }

        this.props.registerInspection(inspection,this.resetForm);
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    componentDidMount() {
        this.props.getInspectionQuestions(this.radioStatus);
        console.log(this.props)
    }

    render() {
        const InspectionQuestionsList = () => {
            const questionsArr = this.props.inspectionQuestions.map((elem) => {
                const questionsList =
                    <div key={elem.question}>
                        <label>{elem.question}</label>
                        <input
                            type="radio"
                            onChange={this.handleOSSPlus}
                            name={elem._id}
                            checked={this.state[elem._id]}
                            required
                        />
                        Good
                        <input
                            type="radio"
                            onChange={this.handleOSSMinus}
                            name={elem._id}
                            checked={!this.state[elem._id]}
                        />
                        Bad
                    </div>;

                return questionsList
            });
            return <Fragment>{questionsArr}</Fragment>
        };

        return (
            <Modal
                isOpen={this.props.modalInspectionStatus}
                contentLabel="Modal"
                className='inspectionModalSellerFormInner'
                id='inspectionModalSellerFormInner'
            >

                <div className="inspectionModalFormFront">
                    <div className="inspectionModalH">
                        <h1>Edit seller details </h1>
                        <button className={'closeModalButton'} onClick={this.props.closeInspectionModal}>
                            <strong>X</strong>
                        </button>
                    </div>
                    <form onSubmit={this.handleSubmit} className={'inspectionModalSellerForm'}>
                        <div className='inspectionModalSection'>

                            <div className={'sellerPhoto'}>
                                <img alt={this.props.editSeller.photo}
                                     src={'../../../static/' + this.props.editSeller.photo}/>
                                <img alt={this.props.editSeller.photoLicense}
                                     src={'../../../static/' + this.props.editSeller.photoLicense}/>
                            </div>

                            <label>Operator name</label>
                            <input
                                type="text"
                                value={this.props.editSeller.operatorName}
                                disabled={true}
                            />
                            <label>Seller name</label>
                            <input
                                type="text"
                                value={this.props.editSeller.name}
                                disabled={true}
                            />
                            <label>Country</label>
                            <input
                                type="text"
                                value={this.props.editSeller.country}
                                disabled={true}
                            />
                            <label>City</label>
                            <input
                                type="text"
                                value={this.props.editSeller.city}
                                disabled={true}
                            />

                            <label>Seller license </label>
                            <input
                                type="text"
                                value={this.props.editSeller.license}
                                disabled={true}
                            />

                            <label>Seller phone number </label>
                            <div id='sellerPhoneInput'>
                                <PhoneInput
                                    value={this.props.editSeller.phone}
                                    disabled={true}
                                >
                                </PhoneInput>
                            </div>

                            <label>Seller email </label>
                            <input
                                type="text"
                                value={this.props.editSeller.email}
                                disabled={true}
                            />

                            <label>Food group </label>
                            <input
                                type="text"
                                value={this.props.editSeller.foodGroup}
                                disabled={true}
                            />
                        </div>
                        <div className='inspectionModalRadioSection'>
                            <InspectionQuestionsList
                            />
                            <h1>OOS: {this.state.OSS}</h1>
                        </div>
                        <button type="submit" className="btnSellerFormSubmit">
                            Submit
                        </button>
                    </form>
                </div>

                <div className="sellerFormBack">
                    <h1>Seller successfully updated!</h1>
                    <img src={likeImg} alt={'like'}/>
                </div>

            </Modal>
        )
    }
}

InspectionModal.propTypes = {};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors,
    inspectionQuestions: state.inspectionQuestions
});

export default connect(mapStateToProps, {registerInspection, getInspectionQuestions})(withRouter(InspectionModal))