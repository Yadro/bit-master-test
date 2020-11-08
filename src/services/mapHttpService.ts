import { Coords } from './requestTypes';

export default class MapHttpService {
    static apiKey = '46fe6104-98d3-4c85-a4ea-648358dc3189';

    static async geocoding(search: string): Promise<Coords> {
        const resp = await fetch(`https://geocode-maps.yandex.ru/1.x?geocode=${search}&apikey=${MapHttpService.apiKey}&kind=house&format=json`);
        const respJson = await resp.json();
        const geoObjCollection = respJson.response.GeoObjectCollection.featureMember;
        const firstGeoObj = geoObjCollection[0];
        if (firstGeoObj) {
            const geoObj = firstGeoObj.GeoObject;
            return geoObj.Point.pos.split(' ').map(coord => +coord);
        }
        return null;
    }
}
