import React from 'react';
import './types';

interface Props {
    onClick: (buildingName: string) => void;
}

export default class Map extends React.Component<Props> {
    MAP_ID = 'map';

    componentDidMount() {
        ymaps.ready(() => {
            const myMap = new ymaps.Map(this.MAP_ID, {
                center: [55.76, 37.64],
                zoom: 7,
            });
            myMap.events.add('click', async (e) => {
                const coords = e.get('coords');
                console.log(coords);
                const responseGeocode = await ymaps.geocode(coords);
                const nearest = responseGeocode.geoObjects.get(0);
                const buildingName = nearest.properties.get('name');
                myMap.geoObjects.removeAll();
                myMap.geoObjects.add(new ymaps.Placemark(coords));
                console.log(buildingName);
                this.props.onClick(buildingName);
            });
        });
    }

    render() {
        return (
            <div id={this.MAP_ID} style={{ width: 600, height: 400 }}/>
        );
    }
}
