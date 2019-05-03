import React, {Component} from 'react';
import MapAutocomplete from "../map/mapAutocomplete";

class OrgInputs extends Component {

    render() {
            if (this.props.organizationInputVisibility === false) {
                return (
                    <div className='formSection'>
                        <label>Organization Name</label>
                            <input
                                type="text"
                                placeholder="Organization Name"
                                className={'formInput'}
                                name="newOrganizationName"
                                onChange={this.props.handleInputChange}
                                value={this.props.newOrganizationName}
                            />
                            {this.props.errors.newOrganizationName && (
                                <div className="invalidFeedback">{this.props.errors.newOrganizationName}</div>)}

                        <MapAutocomplete
                            error={this.props.errors.newOrganizationAddress}
                            mapVisibility={this.props.mapVisibility}
                            value={this.props.newOrganizationAddress}
                            onChange={this.props.onChange}
                            onSelect={this.props.onSelect}
                            GPS={this.props.newOrganizationGPS}
                            handleMapVisibility={this.props.handleMapVisibility}
                        />

                    </div>)
            } else return null
        }
}

export default OrgInputs