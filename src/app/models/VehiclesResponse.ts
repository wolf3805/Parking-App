import { ApiResponse } from "./ApiResponse";
import { Vehicle } from "./Vehicle";

export interface VehiclesResponse extends ApiResponse {
    data: {
        vehicles: Vehicle[],
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
