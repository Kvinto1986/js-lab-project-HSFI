import React from "react";
import PropTypes from "prop-types";

const UsersListTable = ({users}) => {
    if (users.docs) {
        const userList=users.docs;
        const liArr = [];

        for (let i = 0; i < userList.length; i++) {
            liArr.push(<tr key={i}>
                <td key={userList[i].country}>
                    {userList[i].country}</td>
                <td key={userList[i].name}>
                    {userList[i].name}</td>
                <td key={userList[i].email}>
                    {userList[i].email}</td>
                <td key={userList[i].organization}>
                    {userList[i].organization}</td>
            </tr>)
        }

        return (
            <table className={'sheduleTable'}>
                <tbody>
                <tr key={'tableHead'}>
                    <th>Country</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Name</th>
                </tr>
                {liArr}
                </tbody>
            </table>

        )
    } else return null
};

UsersListTable.propTypes = {

};

export default UsersListTable