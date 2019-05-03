import React, {Component} from 'react';
import Select from "react-select";
import Modal from 'react-modal';

Modal.setAppElement('#root');

class ModalAdmin extends Component {


    render() {
        const {select} = this.props.select;

        return (

            <Modal
                isOpen={this.props.isOpen}
                onRequestClose={this.props.onRequestClose}
                contentLabel="Modal"
                className={'modal'}
            >
                <button name={"countryModal"} onClick={this.props.onRequestClose}>close</button>
                <h2>Select a country from the list</h2>
                <Select
                    options={this.props.array}
                    placeholder={'Select country...'}
                    value={select}
                    onChange={this.props.handleChange}
                    className={'countrySelect'}
                />
                {this.props.error && (<div className="invalidFeedback">{this.props.error}</div>)}
                <button onClick={this.props.handleSubmit}>Send</button>
            </Modal>
        )
    }
}

export default ModalAdmin