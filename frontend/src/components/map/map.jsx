import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Map, GoogleApiWrapper, Marker} from 'google-maps-react';

export class MapContainer extends Component {
    render() {

        const {visible, GPS} = this.props;
        if (visible) {
            return (
                <div className={'mapContainer'}>
                    <Map
                        google={this.props.google}
                        zoom={18}
                        initialCenter={{
                            lat: GPS.lat,
                            lng: GPS.lng
                        }}
                        className={'map'}
                    >
                        <Marker
                        />
                    </Map>
                </div>
            );
        } else return null
    }
}

MapContainer.propTypes = {
    value: PropTypes.string,
    GPS: PropTypes.object.isRequired,
};

export default GoogleApiWrapper({
    apiKey: 'AIzaSyCCqDJQC4lVsw4pDBHE9D7NbPnlLtqO4yE'
})(MapContainer);