import React, {Fragment} from 'react';
import PropTypes from 'prop-types';

import MapAutocomplete from "../map/mapAutocomplete";

const NewOrganizationInputs = ({
                                   organizationInputVisibility, errors, mapVisibility, handleInputChange,
                                   newOrganizationName, newOrganizationAddress, newOrganizationGPS,
                                   onChangeLocation, onSelectLocation, handleMapVisibility
                               }) => {
    if (!organizationInputVisibility) {
        return (
            <Fragment>
                <div className='userformSection'>
                    <label>Organization Name</label>
                    <input
                        type="text"
                        placeholder="Organization Name"
                        name="newOrganizationName"
                        onChange={handleInputChange}
                        value={newOrganizationName}
                    />
                    {errors.newOrganizationName && (
                        <div className="invalidFeedback">{errors.newOrganizationName}</div>)}

                    <MapAutocomplete
                        error={errors.newOrganizationAddress}
                        mapVisibility={mapVisibility}
                        value={newOrganizationAddress}
                        onChange={onChangeLocation}
                        onSelect={onSelectLocation}
                        GPS={newOrganizationGPS}
                        handleMapVisibility={handleMapVisibility}
                        mapContainerClass={'userMapContainer'}
                        mapClass={'userMap'}
                        btnMapClass={'btnCheckMap'}
                    />

                </div>
            </Fragment>
        )
    }
};

NewOrganizationInputs.propTypes = {
    organizationInputVisibility: PropTypes.bool.isRequired,
    errors: PropTypes.object,
    mapVisibility: PropTypes.bool.isRequired,
    handleInputChange: PropTypes.func.isRequired,
    newOrganizationName: PropTypes.string.isRequired,
    newOrganizationGPS: PropTypes.object.isRequired,
    onChangeLocation: PropTypes.func.isRequired,
    onSelectLocation: PropTypes.func.isRequired,
    handleMapVisibility: PropTypes.func.isRequired
};

export default NewOrganizationInputs