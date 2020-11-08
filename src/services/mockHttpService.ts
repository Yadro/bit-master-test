import { Address, CrewInfo, GetAvailableCrewsParams, Response } from './requestTypes';
import { getCrews } from '../mocks/mocks';

export default class MockHttpService {
    static getAvailableCrews(params: Address): Promise<CrewInfo[]> {
        const request: GetAvailableCrewsParams = {
            source_time: '20130101010101', // TODO
            addresses: [
                {
                    address: params.address,
                    lat: params.coords[0],
                    lon: params.coords[1],
                }
            ]
        }
        const response = MockHttpService.okResponse(getCrews(request));
        return Promise.resolve(response.data.crews_info);
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
