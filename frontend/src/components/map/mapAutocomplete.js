import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import PlacesAutocomplete from "react-places-autocomplete";

import MapContainer from './map';

const MapAutocomplete = ({error, mapVisibility, value, onChange, onSelect, GPS, handleMapVisibility,mapContainerClass,
                             mapClass,btnMapClass}) => {
    return (
        <Fragment>
            <PlacesAutocomplete
                value={value}
                onChange={onChange}
                onSelect={onSelect}
            >
                {({getInputProps, suggestions, getSuggestionItemProps, loading}) => (
                    <div className={'searchLocationContainer'}>
                        <label>Full address</label>
                        <input
                            {...getInputProps({
                                placeholder: 'Search Full Location Address...',
                                className: 'formInput',
                            })}
                        />

                        {error && (<div className="invalidFeedback">{error}</div>)}

                        <div className="autocompleteContainer">
                            {loading && <div>Loading...</div>}
                            {suggestions.map(suggestion => {
                                const className = suggestion.active
                                    ? 'suggestion-item--active'
                                    : 'suggestion-item';
                                const style = suggestion.active
                                    ? {backgroundColor: 'aquamarine', cursor: 'pointer'}
                                    : {backgroundColor: 'white', cursor: 'pointer'};
                                return (
                                    <div
                                        {...getSuggestionItemProps(suggestion, {
                                            className,
                                            style,
                                        })}
                                    >
                                        <span className={'spanSearch'}>{suggestion.description}</span>
                                    </div>
                                );
                            })}
                        </div>
                        <button className={btnMapClass} onClick={handleMapVisibility}>Check on the map</button>
                    </div>
                )}
            </PlacesAutocomplete>

            <MapContainer
                visible={mapVisibility}
                GPS={GPS}
                mapContainerClass={mapContainerClass}
                mapClass={mapClass}
            />

        </Fragment>
    )

};

MapAutocomplete.propTypes = {
    error: PropTypes.string,
    mapVisibility: PropTypes.bool.isRequired,
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    GPS: PropTypes.object.isRequired,
    onSelect: PropTypes.func.isRequired,
    handleMapVisibility: PropTypes.func.isRequired
};

export default MapAutocomplete