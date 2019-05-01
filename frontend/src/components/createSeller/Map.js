import React, { Component } from 'react';
import { Map, GoogleApiWrapper,Marker } from 'google-maps-react';
import './createSellerStyles.css'
const mapStyles = {
    width: '100%',
    height: '100%',
};

export class MapContainer extends Component {
    render() {
        if(this.props.visible===true && this.props.GPS) {
            return (

                <Map
                    google={this.props.google}
                    zoom={18}
                    style={mapStyles}
                    initialCenter={{
                        lat: this.props.GPS.lat,
                        lng: this.props.GPS.lng
                    }}
                    className={'map'}
                >
                    <Marker
                    />
                </Map>

            );
        }
        else return null
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyCCqDJQC4lVsw4pDBHE9D7NbPnlLtqO4yE'
})(MapContainer);