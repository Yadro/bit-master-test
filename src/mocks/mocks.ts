import { CrewsInfoWrap, GetAvailableCrewsParams } from '../services/requestTypes';

export function getCrews(params: GetAvailableCrewsParams): CrewsInfoWrap {
    const { lat, lon } = params.addresses[0];
    return {
        crews_info: [
            {
                crew_id: 1,
                car_mark: "Chevrolet",
                car_model: "Lacetti",
                car_color: "синий",
                car_number: "Е234КУ",
                driver_name: "Деточкин",
                driver_phone: "7788",
                lon: lon,
                lat: lat + 0.002,
                distance: 300
            }, {
                crew_id: 2,
                car_mark: "Hyundai",
                car_model: "Solaris",
                car_color: "белый",
                car_number: "У350ЕВ",
                driver_name: "Деточкин",
                driver_phone: "7788",
                lon: lon + 0.002,
                lat: lat,
                distance: 300
            }, {
                crew_id: 3,
                car_mark: "Lada",
                car_model: "Largus",
                car_color: "зелёный",
                car_number: "H901ЕТ",
                driver_name: "Деточкин",
                driver_phone: "7788",
                lon: lon + 0.002,
                lat: lat + 0.002,
                distance: 600
            },
        ],
    }
}
