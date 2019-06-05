import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {Map, GoogleApiWrapper, Marker} from 'google-maps-react';

export class SellersMapContainer extends Component {
    render() {
        const location = this.props.location;
        const sellers = this.props.sellers;
        const openModal=this.props.openModal;

        function pinSymbol(color) {


            return {
                path: 'M 0,0 C -2,-20 -10,-22 -10,-30 A 10,10 0 1,1 10,-30 C 10,-22 2,-20 0,0 z M -2,-30 a 2,2 0 1,1 4,0 2,2 0 1,1 -4,0',
                fillColor: color,
                fillOpacity: 1,
                strokeColor: '#000',
                strokeWeight: 2,
                scale: 1,
            };
        }

        const marker = location.map((elem,i) => {

            return <Marker
                key={i}
                position={{
                    lat: elem.lat,
                    lng: elem.lng
                }}
                icon={ pinSymbol("#"+((1<<24)*Math.random()|0).toString(16))}
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