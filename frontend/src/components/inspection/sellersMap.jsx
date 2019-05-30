import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {Map, GoogleApiWrapper, Marker} from 'google-maps-react';

export class SellersMapContainer extends Component {
    render() {
        const location = this.props.location;
        const sellers = this.props.sellers;
        const openModal=this.props.openSellerEditModal;

        const marker = location.map((elem,i) => {

            return <Marker
                key={i}
                position={{
                    lat: elem.lat,
                    lng: elem.lng
                }}
                title={sellers[i].name}
                onClick={() => {
                    openModal(sellers[i])
                }}
            />

        });

        return (
            <div className={'sellerMapContainer'}>
                <Map
                    google={this.props.google}
                    zoom={5}
                    className={'sellerMap'}
                    initialCenter={
                        location[0]
                    }
                >
                    {marker}
                </Map>
            </div>
        );
    }
}


export default GoogleApiWrapper({
    apiKey: 'AIzaSyCCqDJQC4lVsw4pDBHE9D7NbPnlLtqO4yE'
})(SellersMapContainer);