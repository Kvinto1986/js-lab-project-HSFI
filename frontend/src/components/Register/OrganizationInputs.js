import classnames from "classnames";
import React from "react";

const OrgInputs = ({...props}) => {
    if (props.showOrganizationInput === true) {
        return (
            <div className="form-group">
                <div className="form-group">

                    <input
                        type="text"
                        placeholder="organizationNew"
                        className={classnames('form-control form-control-lg', {
                            'is-invalid': props.errors.organizationNew
                        })}
                        name="organizationNew"
                        onChange={props.handleInputChange}
                        value={props.organizationNew}
                    />
                    {props.errors.organizationNew && (
                        <div className="invalid-feedback">{props.errors.organizationNew}</div>)}
                </div>
                <div className="form-group">

                    <input
                        type="text"
                        placeholder="organizationAddress"
                        className={classnames('form-control form-control-lg', {
                            'is-invalid': props.errors.organizationAddress
                        })}
                        name="organizationAddress"
                        onChange={props.handleInputChange}
                        value={props.organizationAddress}
                    />
                    {props.errors.organizationAddress && (
                        <div className="invalid-feedback">{props.errors.organizationAddress}</div>)}
                </div>
                <button className="btn btn-primary" onClick={props.handleNewOrganization}>
                    Register New Organization
                </button>
            </div>)
    } else return null
}

export default OrgInputs