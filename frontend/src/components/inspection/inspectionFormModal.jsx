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
        GPS: '',
        OSS: 0,
        status:{}
    };

    handleOSSPlus = (e) => {
            this.setState({...this.state.status, [e.target.name]: false});
            this.setState({OSS: this.state.OSS += 1});
            console.log(this.state.OSS)
    };

    handleOSSMinus= (e) => {
        this.setState({...this.state.status, [e.target.name]: true});
        this.setState({OSS: this.state.OSS -= 1});
        console.log(this.state.OSS)
    };

    radioStatus=()=>{
        for(let i=0;i<this.props.inspectionQuestions.length;i++){
            this.setState({...this.state.status, [this.props.inspectionQuestions[i]._id]:true});
        }
        console.log(this.state)
    };

    resetForm = () => {
        const rotateElem = document.getElementsByClassName("inspectionModalSellerFormInner")[0];
        rotateElem.style.transform = "rotateY(180deg)";
        setTimeout(() => {
            rotateElem.style.transform = "rotateY(0deg)";
            this.props.closeInspectionModal()
        }, 3000);
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.resetForm()

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
    }

    render() {
        const InspectionQuestionsList = () => {
            const questionsArr = this.props.inspectionQuestions.map((elem) => {
                const questionsList =
                    <div key={elem.question} >
                        <label>{elem.question}</label>
                        <label className={'radioLabel'}>
                            <input
                                type="radio"
                                onChange={this.handleOSSPlus}
                                name={elem._id}
                                checked={this.state.status[elem._id]}
                            />
                            Good
                        </label>
                        <label className={'radioLabel'}>
                            <input
                                type="radio"
                                onChange={this.handleOSSMinus}
                                name={elem._id}
                                checked={!this.state.status[elem._id]}
                            />
                            Bad</label>
                    </div>;

                return questionsList
            });
            return <div className={'inspectionFormModalRadio'}>{questionsArr}</div>
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
                    <form onSubmit={this.handleSubmit} className={'sellerForm'}>
                        <div className='sellerformSection'>

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
                            <InspectionQuestionsList
                            />
                            <button type="submit" className="btnSellerFormSubmit">
                                Submit
                            </button>

                        </div>
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
    errors: state.errors,
    inspectionQuestions:state.inspectionQuestions
});

export default connect(mapStateToProps, {registerInspection, getInspectionQuestions})(withRouter(InspectionModal))