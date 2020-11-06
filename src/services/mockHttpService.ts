import { CrewsInfoWrap, GetAvailableCrewsParams, RequestAddress } from './requestTypes';
import { getCrews } from '../mocks/mocks';


export default class MockHttpService {
    static getAvailableCrews(params: RequestAddress): Promise<CrewsInfoWrap> {
        const request: GetAvailableCrewsParams = {
            source_time: '20130101010101',
            addresses: [
                {
                    address: params.address,
                    lat: params.lat,
                    lon: params.lon,
                }
            ]
        }
        return Promise.resolve(getCrews(request));
    }

    static makeOrder() {
        return Promise.resolve();
    }
}
