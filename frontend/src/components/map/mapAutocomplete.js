import React, {Component} from 'react';
import {Map, GoogleApiWrapper, Marker} from 'google-maps-react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';

export class MapContainer extends Component {

    render() {
        const {error,mapVisibility,
            mapContainerClass,
            mapClass, onSelectLocation, GPS
        } = this.props;

        return (
            <div className={mapContainerClass}>

                <label>Enter location</label>
                <GooglePlacesAutocomplete
                    onSelect={onSelectLocation}
                />
                {error && (
                    <div className="invalidFeedback">{error}</div>)}
                {mapVisibility&&(<Map
                    google={this.props.google}
                    zoom={18}
                    className={mapClass}
                    initialCenter={GPS}
                >
                    <Marker
                    />
                </Map>)}

            </div>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyCCqDJQC4lVsw4pDBHE9D7NbPnlLtqO4yE'
})(MapContainer);