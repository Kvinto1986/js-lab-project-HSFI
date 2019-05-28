import React, {Fragment} from "react";

import SellerModal from "./inspectionModal";
import SellersMapContainer from './sellersMap'

const SellersTable = ({sellers, hasPrevPage, hasNextPage, handlePrevUsersPage, handleNextUsersPage,
                          totalUsers,modalStatus,openModal,closeModal,editSeller}) => {
    if (totalUsers > 0) {
        const userList = sellers.docs;
        const liArr = [];

        for (let i = 0; i < userList.length; i++) {
            const elem=
            <div className={'inspectionSellerTableSection'} key={userList[i].name+'div'}>
                <a href={'#'} onClick={(e)=>{ e.preventDefault();
                    openModal(userList[i])}}><img src={'../../../static/'+userList[i].photo}/>
                {userList[i].name}<br />{userList[i].license}</a>
            </div>;

            liArr.push(elem)
        }

        return (<Fragment>
            <div className="inspectionSellerTable">
                <h1>Sellers</h1>
                {liArr}
                <div className="inspectionSellerTableButtons">
                {hasPrevPage && (<button onClick={handlePrevUsersPage}>Previous
                </button>)}
                {hasNextPage && (<button onClick={handleNextUsersPage}>Next
                </button>)}
                </div>
                <SellerModal
                    modalStatus={modalStatus}
                    closeModal={closeModal}
                    editSeller={editSeller}
                />
            </div>
            <SellersMapContainer
            />
            </Fragment>
        )
    } else return null
};

SellersTable.propTypes = {};

export default SellersTable