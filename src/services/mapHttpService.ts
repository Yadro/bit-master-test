import { Coords } from './requestTypes';
import env from '../../env.json';

export default class MapHttpService {
    static apiKey = env.yMapApiKey;

    static async geocoding(search: string): Promise<Coords> {
        try {
            const resp = await fetch(`https://geocode-maps.yandex.ru/1.x?geocode=${search}&apikey=${MapHttpService.apiKey}&kind=house&format=json`);
            const respJson = await resp.json();
            const geoObjCollection = respJson.response.GeoObjectCollection.featureMember;
            const firstGeoObj = geoObjCollection[0];
            if (firstGeoObj) {
                const geoObj = firstGeoObj.GeoObject;
                const [y, x] =  geoObj.Point.pos.split(' ').map(coord => +coord);
                return [x, y];
            }
            return null;
        } catch (e) {
            console.error(e);
            return null;
        }
    }
}
