import { Model, Types } from 'mongoose';
import { MiddlePrice } from 'src/mongo/schemas/middle-prices/middle.prices';
import { PricesDto } from 'src/prices/price.dto';
export declare class MiddlePricesService {
    private middlePriceModel;
    constructor(middlePriceModel: Model<MiddlePrice>);
    getAll(): Promise<(import("mongoose").Document<unknown, {}, MiddlePrice> & MiddlePrice & {
        _id: Types.ObjectId;
    } & {
        __v?: number;
    })[]>;
    addMiddlePrice(dto: PricesDto): Promise<void>;
    updateMiddlePrice(dto: PricesDto): Promise<void>;
    removeMiddlePrice(priceId: Types.ObjectId): Promise<void>;
}
