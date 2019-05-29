import React from "react";
import PropTypes from "prop-types";
import SheduleListTable from "./scheduleTable";

const SupplersTable = ({ disabled,ingredientSuppliers,handleDeleteSupplier}) => {
    if (ingredientSuppliers.length > 0) {
        const liArr = [];

        for (let i = 0; i < ingredientSuppliers.length; i++) {
            liArr.push(<li key={ingredientSuppliers[i]}>
                {ingredientSuppliers[i]}
                <button name={ingredientSuppliers[i]} onClick={handleDeleteSupplier} disabled={!disabled}>Delete
                </button>
            </li>)
        }
        return (
            <ul>
                {liArr}
            </ul>

        )
    } else return null
};

SheduleListTable.propTypes = {

    ingredientSuppliers: PropTypes.object,
    handleDeleteSupplier: PropTypes.func
};

export default SupplersTable