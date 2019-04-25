import React, { Component }  from 'react'
import { YMaps, Map,SearchControl } from 'react-yandex-maps';


const mapState = {
    center: [55.751574, 37.573856],
    zoom: 3,
};

const App = () => {
    console.log(<SearchControl/>)
    return (
        <YMaps>
            <Map defaultState={mapState}>
                <SearchControl
                    options={{
                        noPlacemark: true,
                        placeholderContent: 'This is search control',

                    }}
                />
            </Map>
        </YMaps>
    )
}


export default App