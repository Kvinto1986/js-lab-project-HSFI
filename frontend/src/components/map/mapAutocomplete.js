import React, {Component, Fragment} from 'react';
import PlacesAutocomplete from "react-places-autocomplete";
import MapContainer from "../map/Map"


class Autocomplete extends Component {

    render() {

        return (
            <Fragment>
                <PlacesAutocomplete
                    value={this.props.value}
                    onChange={this.props.onChange}
                    onSelect={this.props.onSelect}
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

                            {this.props.error && (<div className="invalidFeedback">{this.props.error}</div>)}

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
                            <button className={'btnCheckMap'} onClick={this.props.handleMapVisibility}>Check on the
                                map
                            </button>
                        </div>
                    )}

                </PlacesAutocomplete>

                <MapContainer
                    visible={this.props.mapVisibility}
                    GPS={this.props.GPS}
                />

            </Fragment>

        )
    }
}

export default Autocomplete