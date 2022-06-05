import { ApiResponse } from "./ApiResponse";
import { VehicleType } from "./VehicleType";

export interface VehiclesTypesResponse extends ApiResponse {
    data: {
        vehicle_types: VehicleType[],
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
