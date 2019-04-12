import React, { Component } from 'react';
import food from '../resourses/food.jpg'

export default class Home extends Component {

    render() {
        return (
            <div style={ {backgroundImage: `url(${food})`,height: 878 } }>
            </div>
        );
    }
}