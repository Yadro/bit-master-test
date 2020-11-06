import React from 'react';
import './types';

export default class Map extends React.Component {
    componentDidMount() {
        ymaps.ready(() => {
            const map = new ymaps.Map('map', {
                center: [55.76, 37.64],
                zoom: 7,
            });
            map.events.add('click', async (e) => {
                const coords = e.get('coords');
                console.log(coords);
                const geocode = await ymaps.geocode(coords);
                console.log(geocode);
            });
        });
    }

    render() {
        return (
            <div id="map" style={{ width: 600, height: 400 }}/>
        );
    }
}
