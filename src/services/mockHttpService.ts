import {
    Address,
    CrewInfo,
    Order,
    RequestGetAvailableCrews,
    RequestMakeOrder,
    Response,
} from './requestTypes';
import { getCrews } from '../mocks/mocks';

export default class MockHttpService {
    static getAvailableCrews(params: Address): Promise<CrewInfo[]> {
        const request: RequestGetAvailableCrews = {
            source_time: '20130101010101', // TODO
            addresses: [
                {
                    address: params.address,
                    lat: params.coords[0],
                    lon: params.coords[1],
                },
            ],
        };
        const response = MockHttpService.okResponse(getCrews(request));
        return Promise.resolve(response.data.crews_info);
    }

    static makeOrder(order: Order) {
        const request: RequestMakeOrder = {
            source_time: '20130101010101', // TODO
            addresses: [
                {
                    address: order.address,
                    lat: order.coords[0],
                    lon: order.coords[1],
                },
            ],
            crew_id: order.crew_id,
        };
        return Promise.resolve(this.okResponse({ order_id: Date.now }));
    }

    static okResponse<T>(data: T): Response<T> {
        return {
            code: 0,
            descr: 'OK',
            data,
        };
    }
}
