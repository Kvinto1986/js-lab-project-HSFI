import React from "react";

const SellersTable = ({sellers, hasPrevPage, hasNextPage, handlePrevUsersPage, handleNextUsersPage, totalUsers}) => {
    if (totalUsers > 0) {
        const userList = sellers.docs;
        const liArr = [];

        for (let i = 0; i < userList.length; i++) {
            liArr.push(<tr key={i}>
                <td key={userList[i].country}>
                    {userList[i].country}</td>
                <td key={userList[i].city}>
                    {userList[i].city}</td>
                <td key={userList[i].foodGroup}>
                    {userList[i].foodGroup}</td>
                <td key={userList[i].license}>
                    {userList[i].license}</td>
                <td key={userList[i].name}>
                    {userList[i].name}</td>
                <td key={userList[i].email}>
                    {userList[i].email}</td>
            </tr>)
        }

        return (
            <div className="profileTableInner">
                <h1>Not confirmed users</h1>
                <table className={'userListTable'}>
                    <tbody>
                    <tr key={'tableHead'}>
                        <th>Country</th>
                        <th>City</th>
                        <th>Food group</th>
                        <th>License</th>
                        <th>Name</th>
                        <th>Email</th>
                    </tr>
                    {liArr}
                    </tbody>
                </table>
                {hasPrevPage && (<button className={'listUserBtn'} onClick={handlePrevUsersPage}>Previous
                </button>)}
                {hasNextPage && (<button className={'listUserBtn'} onClick={handleNextUsersPage}>Next
                </button>)}
            </div>

        )
    } else return null
};

SellersTable.propTypes = {};

export default SellersTable