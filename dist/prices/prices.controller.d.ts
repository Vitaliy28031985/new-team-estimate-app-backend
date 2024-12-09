import { PricesService } from './prices.service';
import { RequestWithUser } from 'src/interfaces/requestWithUser';
import { PricesDto } from './price.dto';
import { Price } from 'src/mongo/schemas/price.schema';
import { Types } from 'mongoose';
export declare class PricesController {
    private readonly pricesService;
    constructor(pricesService: PricesService);
    getAllMiddlePrice(): Promise<(import("mongoose").Document<unknown, {}, import("../mongo/schemas/middle-prices/middle.prices").MiddlePrice> & import("../mongo/schemas/middle-prices/middle.prices").MiddlePrice & {
        _id: Types.ObjectId;
    } & {
        __v?: number;
    })[]>;
    getAll(req: RequestWithUser): Promise<Price[]>;
    create(priceDto: PricesDto, req: RequestWithUser): Promise<Price>;
    update(priceId: string, priceDto: PricesDto, req: RequestWithUser): Promise<Price>;
    remove(priceId: string, req: RequestWithUser): Promise<Price>;
}
