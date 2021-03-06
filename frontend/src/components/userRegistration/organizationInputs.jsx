import React, {Fragment} from 'react';
import PropTypes from 'prop-types';

import MapAutocomplete from "../map/mapAutocomplete";

const NewOrganizationInputs = ({
                                   organizationInputVisibility, errors, mapVisibility, handleInputChange,
                                   newOrganizationName,newOrganizationGPS,
                                    onSelectLocation
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
                        required
                    />
                    {errors.newOrganizationName && (
                        <div className="invalidFeedback">{errors.newOrganizationName}</div>)}

                    <MapAutocomplete
                        mapVisibility={mapVisibility}
                        onSelectLocation={onSelectLocation}
                        GPS={newOrganizationGPS}
                        mapContainerClass={'userMapContainer'}
                        mapClass={'userMap'}
                        btnMapClass={'btnCheckMap'}
                    />

                </div>
            </Fragment>
        )
    }
    else return null
};

NewOrganizationInputs.propTypes = {
    organizationInputVisibility: PropTypes.bool.isRequired,
    errors: PropTypes.object,
    mapVisibility: PropTypes.bool.isRequired,
    handleInputChange: PropTypes.func.isRequired,
    newOrganizationName: PropTypes.string.isRequired,
    newOrganizationGPS: PropTypes.object.isRequired,
    onSelectLocation: PropTypes.func.isRequired,
    handleMapVisibility: PropTypes.func.isRequired
};

export default NewOrganizationInputs