import { CrewsInfoWrap, GetAvailableCrewsParams } from '../services/requestTypes';

export function getCrews(params: GetAvailableCrewsParams): CrewsInfoWrap {
    const { lat, lon } = params.addresses[0];
    return {
        crews_info: [
            {
                crew_id: 123,
                car_mark: "Chevrolet",
                car_model: "Lacetti",
                car_color: "синий",
                car_number: "Е234КУ",
                driver_name: "Деточкин",
                driver_phone: "7788",
                lon: lon,
                lat: lat + 0.005,
                distance: 300
            },
        ],
    }
}
