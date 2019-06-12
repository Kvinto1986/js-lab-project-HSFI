import React, {Fragment} from "react";

import SellerModal from "./inspectionEditSellerModal";
import InspectionModal from "./inspectionFormModal";
import SellersMapContainer from './sellersMap'


const SellersTable = ({
                          sellers, hasPrevPage, hasNextPage, handlePrevUsersPage, handleNextUsersPage,
                          totalUsers, modalEditSellerStatus,modalInspectionStatus,
                          openSellerEditModal, closeEditSellerModal,openInspectionModal,closeInspectionModal,
                          editSeller, findSellers
                      }) => {
    if (totalUsers > 0) {
        const userList = sellers.docs;
        const liArr = [];
        const todayDate = new Date();
        const weekday = new Array(7);
        weekday[0] = "sunday";
        weekday[1] = "monday";
        weekday[2] = "tuesday";
        weekday[3] = "wednesday";
        weekday[4] = "thursday";
        weekday[5] = "friday";
        weekday[6] = "saturday";

        const nowDay = weekday[todayDate.getDay()];
        const location = [];

        for (let i = 0; i < userList.length; i++) {
            for (let j = 0; j < userList[i].schedule.length; j++) {
                if (userList[i].schedule[j].workingDays.includes(nowDay)) {

                    location.push(userList[i].schedule[j].GPS)
                }
            }
            const elem = <div className={'inspectionSellerTableSection'} key={userList[i].name + 'div'}>
                <div><img
                    src={userList[i].photo}/><span>{userList[i].name}<br/>{userList[i].license}</span>
                    <button onClick={(e) => {
                        e.preventDefault();
                        openSellerEditModal(userList[i])
                    }}>View
                    </button>
                    {userList[i].flag === 'red flagged' && <button onClick={(e) => {
                        e.preventDefault();
                        openInspectionModal(userList[i])
                    }}>Inspection</button>}
                </div>
            </div>;

            liArr.push(elem)
        }

        return (<Fragment>
                <div className="inspectionSellerTable">
                    <h2>Sellers</h2>
                    {liArr}
                    <div className="inspectionSellerTableButtons">
                        {hasPrevPage && (<button onClick={handlePrevUsersPage}>Previous
                        </button>)}
                        {hasNextPage && (<button onClick={handleNextUsersPage}>Next
                        </button>)}
                    </div>
                    {modalEditSellerStatus && (
                        <SellerModal
                            findSellers={findSellers}
                            modalEditSellerStatus={modalEditSellerStatus}
                            closeEditSellerModal={closeEditSellerModal}
                            editSeller={editSeller}
                        />)}
                    {modalInspectionStatus && (
                        <InspectionModal
                            modalInspectionStatus={modalInspectionStatus}
                            closeInspectionModal={closeInspectionModal}
                            editSeller={editSeller}
                            findSellers={findSellers}
                            day={nowDay}
                        />)}

                </div>
                <SellersMapContainer
                    sellers={userList}
                    location={location}
                    openModal={openInspectionModal}
                />
            </Fragment>
        )
    } else return null
};

SellersTable.propTypes = {};

export default SellersTable