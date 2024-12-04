import { MiddlePricesService } from './middle.prices.service';
export declare class MiddlePricesController {
    private readonly middlePricesService;
    constructor(middlePricesService: MiddlePricesService);
    getAll(): Promise<(import("mongoose").Document<unknown, {}, import("../mongo/schemas/middle-prices/middle.prices").MiddlePrice> & import("../mongo/schemas/middle-prices/middle.prices").MiddlePrice & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v?: number;
    })[]>;
}
