import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Map, GoogleApiWrapper, Marker} from 'google-maps-react';

export class OperatorsMapContainer extends Component {
    render() {
        const inspections = this.props.inspectionsGPS;
        const mapVisibility = this.props.inspectionMapVisibility;
        const operatorName=this.props.operatorName;

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

        const sellerMarker=[];
        const operatorMarker=[];

        inspections.map((elem, i) => {

            const randomColor=((1 << 24) * Math.random() | 0).toString(16);
            const sMarker=<Marker
                key={i}
                position={{
                    lat: elem.sellerGPS.lat,
                    lng: elem.sellerGPS.lng
                }}
                icon={pinSymbol("#" + randomColor)}
                title={inspections[i].sellerName}
            />;

            const oMarker= <Marker
                    key={i}
                    position={{
                        lat: elem.GPS.lat,
                        lng: elem.GPS.lng
                    }}
                    icon={pinSymbol("#" + randomColor)}
                    title={'Inspection '+inspections[i].sellerName+' by '+operatorName}
                />;

            sellerMarker.push(sMarker);
            operatorMarker.push(oMarker);
        });

        if (mapVisibility) {
            return (
                <div className={'inspectionMapContainer'}>
                    <Map
                        google={this.props.google}
                        zoom={4}
                        className={'sellerMap'}
                        initialCenter={{
                            lat: 54,
                            lng: 27
                        }}
                    >
                        {sellerMarker}
                        {operatorMarker}
                    </Map>
                </div>
            );
        }
        else return null
    }
}


export default GoogleApiWrapper({
    apiKey: 'AIzaSyCCqDJQC4lVsw4pDBHE9D7NbPnlLtqO4yE'
})(OperatorsMapContainer);