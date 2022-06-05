import { ApiResponse } from "./ApiResponse";
import { VehicleStay } from "./VehicleStay";

export interface VehicleStaysResponse extends ApiResponse {
    data: {
        vehicle_stays: VehicleStay[],
        meta: {
            count: number,
            current_page: number,
            first_item: number,
            last_item: number,
            per_page: number,
            total: number,
            total_pages:number,
        },
    },
}
