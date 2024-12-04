import { Model, Types } from 'mongoose';
import { Price } from 'src/mongo/schemas/price.schema';
import { PricesDto } from './price.dto';
import { RequestWithUser } from 'src/interfaces/requestWithUser';
import { MiddlePricesService } from 'src/middle-prices/middle.prices.service';
export declare class PricesService {
    private priceModel;
    private readonly middlePricesService;
    constructor(priceModel: Model<Price>, middlePricesService: MiddlePricesService);
    findAll(req: RequestWithUser): Promise<Price[]>;
    create(priceDto: PricesDto, req: RequestWithUser): Promise<Price>;
    update(priceId: Types.ObjectId, priceDto: PricesDto, req: RequestWithUser): Promise<Price>;
    remove(priceId: Types.ObjectId, req: RequestWithUser): Promise<Price>;
}
