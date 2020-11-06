import React from 'react';
import { Address, CrewsInfo } from './services/requestTypes';
import './types';

interface Props {
    onClick: (address: Address) => void;
    crews: CrewsInfo[];
}

export default class Map extends React.Component<Props> {
    MAP_ID = 'map';
    myMap: any;

    componentDidMount() {
        ymaps.ready(() => {
            this.myMap = new ymaps.Map(this.MAP_ID, {
                center: [55.76, 37.64],
                zoom: 7,
            });
            this.myMap.events.add('click', async (e) => {
                const coords = e.get('coords');
                console.log(coords);
                const responseGeocode = await ymaps.geocode(coords);
                const nearest = responseGeocode.geoObjects.get(0);
                const address = nearest.properties.get('name');
                this.myMap.geoObjects.removeAll();
                this.myMap.geoObjects.add(new ymaps.Placemark(coords, null, {
                    preset: 'islands#yellowIcon', // 'islands#darkGreenIcon'
                }));
                console.log(address);
                this.props.onClick({
                    address,
                    coords,
                });
            });
        });
    }

    componentDidUpdate() {
        const coords = this.props.crews.map(crew => [crew.lat, crew.lon]);
        coords.forEach((coord) => {
            this.myMap.geoObjects.add(new ymaps.Placemark(coord, null, {
                preset: 'islands#darkGreenIcon',
            }));
        });
    }

    render() {
        return (
            <div id={this.MAP_ID} style={{ width: '100%', height: 600 }}/>
        );
    }
}
