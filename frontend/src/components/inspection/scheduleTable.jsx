import React from "react";
import PropTypes from "prop-types";

const SheduleListTable = ({disabled,schedule, handleDeleteSchedule}) => {
    if (schedule.length > 0) {
        const liArr = [];

        for (let i = 0; i < schedule.length; i++) {
            liArr.push(<tr key={i}>
                <td key={schedule[i].address}>
                    {schedule[i].address}</td>

                <td key={schedule[i].workingDays[0]+schedule[i].address}>
                    {schedule[i].workingDays.join(', ')}</td>

                <td key={schedule[i].beginningWork+schedule[i].address}>
                    {schedule[i].beginningWork}</td>

                <td key={schedule[i].endWork+schedule[i].address}>
                    {schedule[i].endWork}</td>
                <td key={i+'button'}>
                <button name={schedule[i].address} onClick={handleDeleteSchedule} disabled={!disabled}>Delete
                </button>
            </td>
                </tr>)
        }
        return (
            <table className={'sheduleTable'}>
                <tbody>
                <tr key={'tableHead'}>
                    <th>Location</th>
                    <th>Working days</th>
                    <th>Beginning work time</th>
                    <th>End work time</th>
                    <th>Delete location</th>
                </tr>
                {liArr}
                </tbody>
            </table>

        )
    } else return null
};

SheduleListTable.propTypes = {
    schedule: PropTypes.object,
    handleDeleteSchedule: PropTypes.func
};

export default SheduleListTable