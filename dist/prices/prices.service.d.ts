import { Model, Types } from 'mongoose';
import { Price } from 'src/mongo/schemas/price.schema';
import { PricesDto } from './price.dto';
import { RequestWithUser } from 'src/interfaces/requestWithUser';
import { MiddlePrice } from 'src/mongo/schemas/middle-prices/middle.prices';
export declare class PricesService {
    private priceModel;
    private middlePriceModel;
    constructor(priceModel: Model<Price>, middlePriceModel: Model<MiddlePrice>);
    findAll(req: RequestWithUser): Promise<Price[]>;
    create(priceDto: PricesDto, req: RequestWithUser): Promise<Price>;
    update(priceId: Types.ObjectId, priceDto: PricesDto, req: RequestWithUser): Promise<Price>;
    remove(priceId: Types.ObjectId, req: RequestWithUser): Promise<Price>;
    getAll(): Promise<(import("mongoose").Document<unknown, {}, MiddlePrice> & MiddlePrice & {
        _id: Types.ObjectId;
    } & {
        __v?: number;
    })[]>;
    addMiddlePrice(dto: PricesDto): Promise<void>;
    updateMiddlePrice(dto: PricesDto): Promise<void>;
    removeMiddlePrice(priceId: Types.ObjectId): Promise<void>;
}
