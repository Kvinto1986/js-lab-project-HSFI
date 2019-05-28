import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Map, GoogleApiWrapper, Marker} from 'google-maps-react';

export class SellersMapContainer extends Component {
    render() {

            return (
                <div className={'sellerMapContainer'}>
                    <Map
                        google={this.props.google}
                        zoom={18}
                        className={'sellerMap'}
                    >
                        <Marker
                        />
                    </Map>
                </div>
            );
    }
}


export default GoogleApiWrapper({
    apiKey: 'AIzaSyCCqDJQC4lVsw4pDBHE9D7NbPnlLtqO4yE'
})(SellersMapContainer);