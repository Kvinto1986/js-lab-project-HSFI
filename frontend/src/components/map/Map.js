import React, { Component } from 'react';
import { Map, GoogleApiWrapper,Marker } from 'google-maps-react';
import '../createSeller/createSellerStyles.css'

export class MapContainer extends Component {
    render() {

        if(this.props.visible===true && this.props.GPS) {
            return (
            <div className={'mapContainer'}>
                <Map
                    google={this.props.google}
                    zoom={18}
                    initialCenter={{
                        lat: this.props.GPS.lat,
                        lng: this.props.GPS.lng
                    }}
                    className={'map'}
                >
                    <Marker
                    />
                </Map>
            </div>
            );
        }
        else return null
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyCCqDJQC4lVsw4pDBHE9D7NbPnlLtqO4yE'
})(MapContainer);