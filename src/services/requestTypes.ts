export interface RequestAddress {
    address: string;
    lat: number;
    lon: number;
}

export interface Address {
    address: string;
    coords: Coords;
}

export interface Order extends Address {
    crew_id: number;
}

export interface RequestGetAvailableCrews {
    source_time: string;
    addresses: RequestAddress[];
}

export interface RequestMakeOrder {
    source_time: string;
    addresses: RequestAddress[];
    crew_id: number;
}

export interface Response<T> {
    code: number;
    descr: string;
    data: T;
}

export interface CrewsInfoWrap {
    crews_info: CrewInfo[];
}

export interface CrewInfo {
    crew_id: number;
    car_mark: string;
    car_model: string;
    car_color: string;
    car_number: string;
    driver_name: string;
    driver_phone: string;
    lat: number;
    lon: number;
    distance: number;
}

export type Coords = [number, number];
