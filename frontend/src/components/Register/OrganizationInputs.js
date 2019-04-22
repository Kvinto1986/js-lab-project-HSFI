import classnames from "classnames";
import React, {Component} from 'react';

class OrgInputs extends Component {
    constructor() {
        super();

    }

    render() {
            if (this.props.showOrganizationInput === true) {
                return (
                    <div className="form-group">
                        <div className="form-group">

                            <input
                                type="text"
                                placeholder="Organization Name"
                                className={classnames('form-control form-control-lg', {
                                    'is-invalid': this.props.errors.organizationNew
                                })}
                                name="organizationNew"
                                onChange={this.props.handleInputChange}
                                value={this.props.organizationNew}
                            />
                            {this.props.errors.organizationNew && (
                                <div className="invalid-feedback">{this.props.errors.organizationNew}</div>)}
                        </div>
                        <div className="form-group">

                            <input
                                type="text"
                                placeholder="Organization Address"
                                className={classnames('form-control form-control-lg', {
                                    'is-invalid': this.props.errors.organizationAddress
                                })}
                                name="organizationAddress"
                                onChange={this.props.handleInputChange}
                                value={this.props.organizationAddress}
                            />
                            {this.props.errors.organizationAddress && (
                                <div className="invalid-feedback">{this.props.errors.organizationAddress}</div>)}
                        </div>
                    </div>)
            } else return null
        }
}

export default OrgInputs