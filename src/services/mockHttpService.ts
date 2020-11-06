import { CrewsInfoWrap, GetAvailableCrewsParams, RequestAddress, Response } from './requestTypes';
import { getCrews } from '../mocks/mocks';


export default class MockHttpService {
    static getAvailableCrews(params: RequestAddress): Promise<Response<CrewsInfoWrap>> {
        const request: GetAvailableCrewsParams = {
            source_time: '20130101010101', // TODO
            addresses: [
                {
                    address: params.address,
                    lat: params.lat,
                    lon: params.lon,
                }
            ]
        }
        const response = MockHttpService.okResponse(getCrews(request));
        return Promise.resolve(response);
    }

    static makeOrder() {
        return Promise.resolve();
    }

    static okResponse<T>(data: T): Response<T> {
        return {
            code: 0,
            descr: 'OK',
            data,
        };
    }
}
