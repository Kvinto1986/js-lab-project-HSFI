import React from "react";
import Modal from 'react-modal';

Modal.setAppElement('#root');

const SellerModal = ({modalStatus,closeModal,editSeller}) => {
        return (
            <Modal
                isOpen={modalStatus}
                contentLabel="Modal"
                className={'inspectionModal'}
                >
                <h1>{editSeller.name}</h1>
                <button name={"sellerModal"} onClick={closeModal}>close</button>
            </Modal>
        )
};


export default SellerModal