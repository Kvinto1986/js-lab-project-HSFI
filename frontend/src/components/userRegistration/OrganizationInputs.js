import React, {Component} from 'react';

class OrgInputs extends Component {

    render() {
            if (this.props.OrganizationInputVisibility === false) {
                return (
                    <div className="organizationInputContainer">
                            <input
                                type="text"
                                placeholder="Organization Name"
                                className={'registerFormInput'}
                                name="organizationNew"
                                onChange={this.props.handleInputChange}
                                value={this.props.organizationNew}
                            />
                            {this.props.errors.organizationNew && (
                                <div className="invalidFeedback">{this.props.errors.organizationNew}</div>)}

                            <input
                                type="text"
                                placeholder="Organization Address"
                                className={'registerFormInput'}
                                name="organizationAddress"
                                onChange={this.props.handleInputChange}
                                value={this.props.organizationAddress}
                            />
                            {this.props.errors.organizationAddress && (
                                <div className="invalidFeedback">{this.props.errors.organizationAddress}</div>)}
                    </div>)
            } else return null
        }
}

export default OrgInputs