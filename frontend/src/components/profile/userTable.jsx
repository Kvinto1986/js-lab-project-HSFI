import React from "react";

const UsersListTable = ({users, handleConfirmUser,hasPrevPage,hasNextPage,handlePrevUsersPage,handleNextUsersPage,totalUsers}) => {
    if (totalUsers>0) {
        const userList = users.docs;
        const liArr = [];

        for (let i = 0; i < userList.length; i++) {
            liArr.push(<tr key={userList[i].country+userList[i].name}>
                <td key={userList[i].country}>
                    {userList[i].country}</td>
                <td key={userList[i].name}>
                    {userList[i].name}</td>
                <td key={userList[i].email}>
                    {userList[i].email}</td>
                <td key={userList[i].organization}>
                    {userList[i].organization}</td>
                <td key={userList[i].id}>
                    <button key={userList[i].id+userList[i].organization} className={'confirmUserBtn'} onClick={(e)=>{ e.preventDefault();
                    handleConfirmUser(userList[i])}}>Confirm</button></td>
            </tr>)
        }

        return (
            <div className="profileTableInner">
                <h1>Not confirmed users</h1>
            <table className={'userListTable'}>
                <tbody>
                <tr key={'tableHead'}>
                    <th>Country</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Organization</th>
                    <th>Action</th>
                </tr>
                {liArr}
                </tbody>
            </table>
                {hasPrevPage&&(<button className={'listUserBtn'} onClick={handlePrevUsersPage}>Previous
                </button>)}
                {hasNextPage&&(<button className={'listUserBtn'} onClick={handleNextUsersPage}>Next
                </button>)}
            </div>

        )
    } else return null
};

export default UsersListTable